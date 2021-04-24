import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from } from "rxjs";
import { Repository } from "typeorm";
import { Question } from "./entities/question.entity";

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>
  ) {}

  create(question: Question) {
    return from(this.questionRepository.save(question));
  }

  findAll() {
    return from(this.questionRepository.find());
  }

  findOne(id: number) {
    return from(this.questionRepository.findOne({ id }));
  }

  update(id: number, question: Question) {
    return from(this.questionRepository.update(id, question));
  }

  remove(id: number) {
    return from(this.questionRepository.softDelete({ id }));
  }
}
