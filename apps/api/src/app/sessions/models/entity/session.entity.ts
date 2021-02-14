import { AutoMap } from "@automapper/classes";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from "typeorm";
import { User } from "../../../user/models/user.entity";
import { Question } from "./question.entity";

@Entity()
export class Session {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column()
  description: string;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  // @AutoMap() // TODO: uncomment this, typeorm'de audit nasil yapilir arastirilacak.
  @Column()
  @ManyToOne(() => User, (user) => user.sessions)
  createdBy: User;

  @AutoMap()
  @Column()
  startDate: Date;

  @AutoMap()
  @Column()
  endDate: Date;

  // TODO: uncomment this after if createdBy ManyToOne relation is successful
  // @AutoMap()
  // @Column()
  // participants: Array<User>;

  @Column()
  @OneToMany(() => Question, (question) => question.answer)
  questions: Array<Question>;

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
