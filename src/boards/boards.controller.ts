import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardsDto } from './dto/create-boards.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardService: BoardsService) {}

  /**
   * @url POST '/api/boards'
   * @param createBoardsDto 생성할 게시글 정보 {제목, 본문, 비밀번호}
   * @description 비밀번호를 입력받아 게시글을 작성합니다.
   * @returns 생성된 게시글
   */
  @Post()
  @HttpCode(201)
  async createPost(@Body() createBoardsDto: CreateBoardsDto): Promise<void> {
    return await this.boardService.createPost(createBoardsDto);
  }
}
