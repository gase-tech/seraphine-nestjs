import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SessionsController } from "./controllers/sessions.controller";
import { QuestionAnswer } from '../question-answers/entities/question-answer.entity';
import { Question } from '../questions/entities/question.entity';
import { Session } from "./models/entity/session.entity";
import { SessionsService } from "./services/sessions.service";

@Module({
  imports: [TypeOrmModule.forFeature([Session, QuestionAnswer, Question])],
  controllers: [SessionsController],
  providers: [SessionsService],
  exports: [SessionsService],
})
export class SessionsModule {}
