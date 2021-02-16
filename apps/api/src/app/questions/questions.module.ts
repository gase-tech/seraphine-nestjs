import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Question } from "./entities/question.entity";
import { QuestionsController } from "./questions.controller";
import { QuestionsService } from "./questions.service";

@Module({
  imports: [TypeOrmModule.forFeature([Question])],
  controllers: [QuestionsController],
  providers: [QuestionsService],
  exports: [QuestionsService],
})
export class QuestionsModule {}
