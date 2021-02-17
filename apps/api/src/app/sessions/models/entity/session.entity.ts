import { AutoMap } from "@automapper/classes";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from "typeorm";
import { User } from "../../../users/models/user.entity";
import { QuestionAnswer } from "../../../question-answers/entities/question-answer.entity";

@Entity()
export class Session {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @AutoMap()
  @Column({nullable: true})
  description: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  // @AutoMap() // TODO: uncomment this, typeorm'de audit nasil yapilir arastirilacak.
  @AutoMap()
  @ManyToOne(() => User, user => user.sessions)
  createdBy: User;

  @AutoMap()
  @Column({nullable: true})
  meetingStartTime: Date;

  @AutoMap()
  @Column({nullable: true})
  meetingEndTime: Date;

  @AutoMap()
  @Column({nullable: true})
  sessionStartTime: Date;

  @AutoMap()
  @Column({nullable: true})
  sessionEndTime: Date;

  @AutoMap()
  @Column({nullable: true})
  duration: number;

  // TODO: uncomment this after if createdBy ManyToOne relation is successful
  // @AutoMap()
  // @Column()
  // participants: string[];

  @AutoMap()
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
//   @PrimaryGeneratedColumn("uuid")
//   id: number;
//
//   value: string;
// }

// @Entity()
// export class QuestionType {
//   @AutoMap()
//   @PrimaryGeneratedColumn("uuid")
//   id: number;
//
//   displayValue: string;
//
//   code: string;
//
//   mustHaveOption: boolean;
// }
