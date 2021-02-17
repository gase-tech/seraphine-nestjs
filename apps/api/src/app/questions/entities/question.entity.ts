import { AutoMap } from "@automapper/classes";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../../users/models/user.entity";

@Entity()
export class Question {
  @AutoMap()
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @AutoMap()
  @Column()
  text: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @AutoMap()
  @ManyToOne(() => User, user => user.questions)
  createdBy: User;

  // options: Array<Option>;

  // @ManyToOne(() => Session, (session) => session.questions)
  // @Column()
  // session: Session;

  // @OneToOne(() => QuestionType)
  // @JoinColumn()
  // type: QuestionType;
}
