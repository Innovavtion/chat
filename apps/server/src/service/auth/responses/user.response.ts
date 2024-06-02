import { Provider, Role, User } from '@packages/database';
import { Exclude } from 'class-transformer';

export class UserResponse implements User {
  id: string;
  login: string;
  email: string;
  lastName: string;
  firstName: string;

  @Exclude()
  password: string;

  @Exclude()
  provider: Provider;

  @Exclude()
  avatar: string;

  @Exclude()
  dataActive: Date;

  dataRegistrate: Date;
  roles: Role[];

  constructor(user: User) {
    Object.assign(this, user);
  }
}
