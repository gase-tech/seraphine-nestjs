import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionAnswer } from './entities/question-answer.entity';
import { QuestionAnswersService } from './question-answers.service';

describe('QuestionAnswersService', () => {
  let service: QuestionAnswersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionAnswersService,
        {
          provide: getRepositoryToken(QuestionAnswer),
          useValue: Repository
        }
      ],
    }).compile();

    service = module.get<QuestionAnswersService>(QuestionAnswersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
