import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardsDto } from './dto/create-boards.dto';
import { Board } from './entities/Board';
import * as bcrypt from 'bcrypt';
import { UpdateBoardsDto } from './dto/update-boards.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  /**
   * @param createBoardsDto 생성할 게시글 정보 {제목, 본문, 비밀번호}
   * @description 비밀번호를 입력받아 게시글을 작성합니다.
   * @returns 201 상태코드
   */
  async createPost(createBoardsDto: CreateBoardsDto): Promise<void> {
    const { password } = createBoardsDto;
    const isMatched = /(?=.*\d)./g.test(password);

    if (!isMatched) {
      throw new BadRequestException({
        statusCode: 400,
        message: '비밀번호는 최소 1개의 숫자를 포함해야합니다.',
      });
    }

    createBoardsDto.password = await bcrypt.hash(password, 10);

    await this.boardRepository.save(createBoardsDto);
  }

  /**
   * @param offset 조회할 게시글 아이디
   * @description 게시글 아이디 기준으로 20개의 게시글을 조회합니다.
   * @returns 20개 게시글(최신순)
   */
  async getAllPosts(offset: number) {
    return await this.boardRepository.find({
      order: { createdAt: 'DESC' },
      skip: offset,
      take: 20,
    });
  }

  /**
   * @param boardId 수정할 게시글 아이디
   * @description 게시글의 내용을 수정합니다 {제목, 본문, 비밀번호}
   * @returns 201 상태코드
   */
  async updatePost(
    boardId: number,
    updateBoardsDto: UpdateBoardsDto,
  ): Promise<void> {
    // 요청된 아이디가 존재하는지 확인
    const isExistPost = await this.boardRepository.findOneBy({ boardId });

    // 존재하지않으면 404
    if (!isExistPost) {
      throw new NotFoundException({
        statusCode: 404,
        message: '존재하지않는 게시글입니다.',
      });
    }

    // 요청된 비밀번호가 숫자를 포함하는지 확인
    const { password } = updateBoardsDto;
    const isMatched = /(?=.*\d)./g.test(password);

    // 포함하지않으면 400
    if (!isMatched) {
      throw new BadRequestException({
        statusCode: 400,
        message: '비밀번호는 최소 1개의 숫자를 포함해야합니다.',
      });
    }

    // 요청된 비밀번호가 일치하는지 확인
    const validate = await bcrypt.compare(password, isExistPost.password);

    // 일치하지않으면 400
    if (!validate) {
      throw new BadRequestException({
        statusCode: 400,
        message: '비밀번호가 일치하지 않습니다.',
      });
    }

    await this.boardRepository.update(boardId, updateBoardsDto);
  }
}
