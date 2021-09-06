import { AutoMap } from '@automapper/classes';

export class UserResource {
  @AutoMap()
  id: number;

  @AutoMap()
  username: string;

  @AutoMap()
  email: string;

  @AutoMap()
  firstName: string;

  @AutoMap()
  lastName: string;

  @AutoMap()
  fullName: string;

  @AutoMap()
  role: string;

  @AutoMap()
  isActive: boolean;
}
