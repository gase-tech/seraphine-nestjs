import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Question } from "./entities/question.entity";
import { QuestionsService } from "./questions.service";

describe("QuestionsService", () => {
  let service: QuestionsService;
  let repo: Repository<Question>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionsService,
        {
          provide: getRepositoryToken(Question),
          useValue: Repository,
        },
      ],
    }).compile();

    service = module.get<QuestionsService>(QuestionsService);
    repo = module.get<Repository<Question>>(getRepositoryToken(Question));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return for findAll", async (done) => {
    const question: Question = {
      id: 1234,
      text: "text1234",
    };
    // notice we are pulling the repo variable and using jest.spyOn with no issues
    jest.spyOn(repo, "save").mockResolvedValueOnce(question);
    service.create(question).subscribe((createdQuestion) => {
      expect(createdQuestion.text).toEqual(question.text);
      done();
    });
  });
});
