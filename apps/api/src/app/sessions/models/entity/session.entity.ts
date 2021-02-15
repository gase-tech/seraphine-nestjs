import { AutoMap } from "@automapper/classes";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  VersionColumn,
} from "typeorm";
import { User } from "../../../user/models/user.entity";
import { QuestionAnswer } from "./question-answer.entity";

@Entity()
export class Session {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  // @AutoMap()
  // @Column()
  // description: string;
  //
  // @CreateDateColumn()
  // createDate: Date;
  //
  // @UpdateDateColumn()
  // updateDate: Date;

  // @AutoMap() // TODO: uncomment this, typeorm'de audit nasil yapilir arastirilacak.
  @ManyToOne(() => User, user => user.sessions)
  createdBy: User;

  // @Column()
  // meetingStartTime: Date;
  //
  // @Column()
  // meetingEndTime: Date;
  //
  // @Column()
  // sessionStartTime: Date;
  //
  // @Column()
  // sessionEndTime: Date;
  //
  // @Column()
  // duration: number;

  // TODO: uncomment this after if createdBy ManyToOne relation is successful
  // @AutoMap()
  // @Column()
  // participants: string[];

  @OneToMany(() => QuestionAnswer, (questionAnswer) => questionAnswer.session)
  questionAnswers: QuestionAnswer[];

  @VersionColumn()
  version: number;
}

// @Entity()
// export class QuestionOptions {
//   questionId: number;
//
//   optionId: number;
// }

// @Entity()
// export class Option {
//   @AutoMap()
//   @PrimaryGeneratedColumn()
//   id: number;
//
//   value: string;
// }

// @Entity()
// export class QuestionType {
//   @AutoMap()
//   @PrimaryGeneratedColumn()
//   id: number;
//
//   displayValue: string;
//
//   code: string;
//
//   mustHaveOption: boolean;
// }
