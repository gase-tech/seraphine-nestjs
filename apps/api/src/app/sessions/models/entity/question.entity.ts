import { AutoMap } from "@automapper/classes";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { QuestionAnswer } from "./question-answer.entity";

@Entity()
export class Question {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @AutoMap()
  @CreateDateColumn()
  createDate: Date;

  @AutoMap()
  @UpdateDateColumn()
  updateDate: Date;

  @OneToOne(() => QuestionAnswer)
  @JoinColumn()
  questionAnswer: QuestionAnswer;

  // @ManyToOne(() => User, user => user.questions)
  // createdBy: User;

  // options: Array<Option>;

  // @ManyToOne(() => Session, (session) => session.questions)
  // @Column()
  // session: Session;

  // @OneToOne(() => QuestionType)
  // @JoinColumn()
  // type: QuestionType;
}
