import { User } from '../../entities/user.entity';

export class UpdateUserDTO implements Partial<User> {
  email?: string;
  name?: string;
  username?: string;
  password?: string;
  emailVerified?: boolean;
  isEnabled?: boolean;

  constructor(data: UpdateUserDTO) {
    this.email = data.email;
    this.name = data.name;
    this.username = data.username;
    this.password = data.password;
    this.emailVerified = data.emailVerified;
    this.isEnabled = data.isEnabled;
  }
}
