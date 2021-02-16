import { AutoMap } from "@automapper/classes";

export class QuestionAnswerDto {
  @AutoMap()
  id: number;

  @AutoMap()
  questionId: number;

  @AutoMap()
  optionId: number;

  @AutoMap()
  answer: string;
}
