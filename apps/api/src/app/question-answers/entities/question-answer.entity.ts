import { AutoMap } from '@automapper/classes';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from '../../questions/entities/question.entity';
import { Session } from '../../sessions/models/entity/session.entity';

@Entity()
export class QuestionAnswer {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @AutoMap({typeFn: () => Question})
  @OneToOne(() => Question)
  @JoinColumn()
  question: Question;

  @AutoMap()
  @Column({ nullable: true })
  optionId: number;

  @AutoMap()
  @Column({ nullable: true })
  answer: string;

  @ManyToOne(() => Session, (session) => session.questionAnswers)
  session: Session;
}
