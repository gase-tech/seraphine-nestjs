import { AutoMap } from '@automapper/classes';
import { UserDto } from '../../users/models/user.dto';

export class CreateQuestionDto {
  @AutoMap()
  id: number;

  @AutoMap()
  text: string;

  @AutoMap({typeFn: () => UserDto})
  createdBy: UserDto;
}
