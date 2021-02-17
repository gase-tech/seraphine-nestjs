import { AutoMap } from "@automapper/classes";
import { CreateQuestionDto } from '../../questions/dto/create-question.dto';

export class QuestionAnswerDto {
  @AutoMap(() => CreateQuestionDto)
  question: CreateQuestionDto;

  @AutoMap()
  optionId: number;

  @AutoMap()
  answer: string;
}
