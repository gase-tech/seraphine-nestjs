import { AutoMap } from '@automapper/classes';

export class UserDto {
  @AutoMap()
  id: number;

  @AutoMap()
  username: string;

  @AutoMap()
  firstName: string;

  @AutoMap()
  lastName: string;

  @AutoMap()
  role: string; // TODO: string to => UserRole

  @AutoMap()
  isActive: boolean;
}
