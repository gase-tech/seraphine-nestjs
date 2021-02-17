import { AutoMap } from '@automapper/classes';
import { UserDto } from '../../users/models/user.dto';

export class CreateQuestionDto {
  @AutoMap()
  text: string;

  @AutoMap(() => UserDto)
  createdBy: UserDto;
}
