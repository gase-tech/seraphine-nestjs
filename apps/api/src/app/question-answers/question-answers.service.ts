import { Injectable } from '@nestjs/common';
import { QuestionAnswer } from './entities/question-answer.entity';

@Injectable()
export class QuestionAnswersService {
  create(questionAnswer: QuestionAnswer) {
    return 'This action adds a new questionAnswer';
  }

  findAll() {
    return `This action returns all questionAnswers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} questionAnswer`;
  }

  update(id: number, questionAnswer: QuestionAnswer) {
    return `This action updates a #${id} questionAnswer`;
  }

  remove(id: number) {
    return `This action removes a #${id} questionAnswer`;
  }
}
