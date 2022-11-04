import {
  Body,
  Controller,
  Get,
  HttpCode,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardsDto } from './dto/create-boards.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardService: BoardsService) {}

  /**
   * @url POST '/api/boards'
   * @param createBoardsDto 생성할 게시글 정보 {제목, 본문, 비밀번호}
   * @description 비밀번호를 입력받아 게시글을 작성합니다.
   * @returns 201 상태코드
   */
  @Post()
  @HttpCode(201)
  async createPost(@Body() createBoardsDto: CreateBoardsDto): Promise<void> {
    return await this.boardService.createPost(createBoardsDto);
  }

  /**
   * @url GET '/api/boards'
   * @param offset 조회할 게시글 아이디
   * @description 게시글 아이디 기준으로 20개의 게시글을 조회합니다.
   * @returns 20개 게시글(최신순)
   */
  @Get()
  @HttpCode(200)
  async getAllPosts(@Query('offset', ParseIntPipe) offset: number) {
    return await this.boardService.getAllPosts(offset);
  }
}
