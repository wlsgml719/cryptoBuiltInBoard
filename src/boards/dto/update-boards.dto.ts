import { IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateBoardsDto {
  @MaxLength(20, { message: '제목은 20자 내외로 작성해주세요.' })
  title: string;

  @MaxLength(200, { message: '본문은 200자 내외로 작성해주세요.' })
  content: string;

  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  password: string;
}
