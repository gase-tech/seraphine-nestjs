import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionAnswer } from './entities/question-answer.entity';
import { QuestionAnswersController } from './controllers/question-answers.controller';
import { QuestionAnswersService } from './services/question-answers.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionAnswer])],
  controllers: [QuestionAnswersController],
  providers: [QuestionAnswersService],
  exports: [QuestionAnswersService],
})
export class QuestionAnswersModule {}
