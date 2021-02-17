import { AutoMap } from "@automapper/classes";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from '../../questions/entities/question.entity';
import { Session } from "../../sessions/models/entity/session.entity";

@Entity()
export class QuestionAnswer {
  @AutoMap()
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @OneToOne(() => Question)
  @JoinColumn()
  question: Question;

  @Column()
  optionId: number;

  @Column()
  answer: string;

  @ManyToOne(() => Session, session => session.questionAnswers)
  session: Session;
}
