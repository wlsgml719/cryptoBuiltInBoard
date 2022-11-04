import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  ParseIntPipe,
  Post,
  Query,
  UseInterceptors,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardsDto } from './dto/create-boards.dto';
import { UpdateBoardsDto } from './dto/update-boards.dto';

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
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @HttpCode(200)
  async getAllPosts(@Query('offset', ParseIntPipe) offset: number) {
    return await this.boardService.getAllPosts(offset);
  }

  /**
   * @url PUT '/api/boards'
   * @param boardId 수정할 게시글 아이디
   * @description 게시글의 내용을 수정합니다 {제목, 본문, 비밀번호}
   * @returns 201 상태코드
   */
  @Put(':boardId')
  @HttpCode(201)
  async updatePost(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Body() updateBoardsDto: UpdateBoardsDto,
  ): Promise<void> {
    return this.boardService.updatePost(boardId, updateBoardsDto);
  }

  /**
   * @url DELETE '/api/boards'
   * @param boardId 삭제할 게시글 아이디
   * @param password 게시글 비밀번호
   * @description 게시글을 삭제합니다
   * @returns 201 상태코드
   */
  @Delete(':boardId')
  @HttpCode(201)
  async deletePost(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Body('password') password: string,
  ): Promise<void> {
    return await this.boardService.deletePost(boardId, password);
  }
}
