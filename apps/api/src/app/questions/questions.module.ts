import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuestionAnswer } from "./entities/question-answer.entity";
import { Question } from "./entities/question.entity";
import { QuestionsController } from "./questions.controller";
import { QuestionsService } from "./questions.service";

@Module({
  imports: [TypeOrmModule.forFeature([Question, QuestionAnswer])],
  controllers: [QuestionsController],
  providers: [QuestionsService],
  exports: [QuestionsService],
})
export class QuestionsModule {}
