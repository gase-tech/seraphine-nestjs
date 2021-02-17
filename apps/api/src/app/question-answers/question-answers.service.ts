import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from } from "rxjs";
import { Repository } from "typeorm";
import { QuestionAnswer } from "./entities/question-answer.entity";

@Injectable()
export class QuestionAnswersService {
  constructor(
    @InjectRepository(QuestionAnswer)
    private readonly questionAnswerRepository: Repository<QuestionAnswer>
  ) {}

  create(questionAnswer: QuestionAnswer) {
    return from(this.questionAnswerRepository.save(questionAnswer));
  }

  findAll() {
    return from(this.questionAnswerRepository.find());
  }

  findOne(id: number) {
    return from(this.questionAnswerRepository.findOne({ id }));
  }

  update(id: number, questionAnswer: QuestionAnswer) {
    return from(this.questionAnswerRepository.update(id, questionAnswer));
  }

  remove(id: number) {
    return from(this.questionAnswerRepository.delete({ id }));
  }
}
