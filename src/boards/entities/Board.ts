import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn({ type: 'int', name: 'boardId' })
  boardId: number;

  @Column({ type: 'varchar', length: 80, name: 'title' })
  title: string;

  @Column({ type: 'text', name: 'content' })
  content: string;

  // 비밀번호 컬럼이 조회되는 것을 방지합니다.
  @Exclude()
  @Column({ type: 'text', name: 'password' })
  password: string;

  @CreateDateColumn({ type: 'datetime', name: 'createdAt' })
  createdAt: Date;
}
