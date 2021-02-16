import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuestionAnswer } from "./entities/question-answer.entity";
import { QuestionAnswersController } from "./question-answers.controller";
import { QuestionAnswersService } from "./question-answers.service";

@Module({
  imports: [TypeOrmModule.forFeature([QuestionAnswer])],
  controllers: [QuestionAnswersController],
  providers: [QuestionAnswersService],
  exports: [QuestionAnswersService],
})
export class QuestionAnswersModule {}
