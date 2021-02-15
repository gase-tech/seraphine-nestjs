import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SessionsController } from "./controllers/sessions.controller";
import { QuestionAnswer } from './models/entity/question-answer.entity';
import { Question } from './models/entity/question.entity';
import { Session } from "./models/entity/session.entity";
import { SessionsService } from "./services/sessions.service";

@Module({
  imports: [TypeOrmModule.forFeature([Session, QuestionAnswer, Question])],
  controllers: [SessionsController],
  providers: [SessionsService],
  exports: [SessionsService],
})
export class SessionsModule {}
