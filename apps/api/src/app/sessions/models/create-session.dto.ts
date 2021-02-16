import { AutoMap } from "@automapper/classes";
import { UserDto } from "../../user/models/user.dto";
import { QuestionAnswerDto } from "../../questions/dto/question-answer.dto";

export class CreateSessionDto {
  @AutoMap()
  description: string;

  @AutoMap(() => UserDto)
  createdBy: UserDto;

  @AutoMap()
  meetingStartTime: Date;

  @AutoMap()
  meetingEndTime: Date;

  @AutoMap()
  sessionStartTime: Date;

  @AutoMap()
  sessionEndTime: Date;

  @AutoMap()
  duration: number;

  @AutoMap(() => QuestionAnswerDto)
  questionAnswers: QuestionAnswerDto[];
}
