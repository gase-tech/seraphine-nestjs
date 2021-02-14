import { AutoMap } from "@automapper/classes";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from "../../../user/models/user.entity";
import { Answer } from './answer.entity';
import { Session } from "./session.entity";

@Entity()
export class Question {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  text: string;

  @AutoMap()
  @CreateDateColumn()
  createDate: Date;

  @AutoMap()
  @UpdateDateColumn()
  updateDate: Date;

  createdBy: User;

  // options: Array<Option>;

  @ManyToOne(() => Session, (session) => session.questions)
  @Column()
  session: Session;

  @OneToOne(() => Answer)
  @JoinColumn()
  answer: Answer;

  // @OneToOne(() => QuestionType)
  // @JoinColumn()
  // type: QuestionType;
}
