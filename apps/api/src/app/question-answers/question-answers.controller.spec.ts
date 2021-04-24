import { Test, TestingModule } from '@nestjs/testing';
import { QuestionAnswersController } from './question-answers.controller';
import { QuestionAnswersService } from './question-answers.service';

xdescribe('QuestionAnswersController', () => {
  let controller: QuestionAnswersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionAnswersController],
      providers: [
        {
          provide: QuestionAnswersService,
          useValue: jest.fn(),
        },
      ],
    }).compile();

    controller = module.get<QuestionAnswersController>(QuestionAnswersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
