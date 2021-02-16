import { AutoMap } from "@automapper/classes";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Session } from "./session.entity";

@Entity()
export class QuestionAnswer {
  @AutoMap()
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  questionId: number;

  @Column()
  optionId: number;

  @Column()
  answer: string;

  @ManyToOne(() => Session, session => session.questionAnswers)
  session: Session;
}
