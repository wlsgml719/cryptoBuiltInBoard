import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardsDto } from './dto/create-boards.dto';
import { Board } from './entities/Board';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  /**
   * @param createBoardsDto 생성할 게시글 정보 {제목, 본문, 비밀번호}
   * @description 비밀번호를 입력받아 게시글을 작성합니다.
   * @returns 생성된 게시글
   */
  async createPost(createBoardsDto: CreateBoardsDto) {
    const { password } = createBoardsDto;
    const isMatched = /(?=.*\d)./g.test(password);

    if (!isMatched) {
      throw new BadRequestException({
        statusCode: 400,
        message: '비밀번호는 최소 1개의 숫자를 포함해야합니다.',
      });
    }
  }
}
