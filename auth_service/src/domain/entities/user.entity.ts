import { User as UserPrismaModel } from '@prisma/client';

export class User implements Omit<UserPrismaModel, 'password'> {
  userId: string;
  email: string;
  emailVerified: boolean;
  name: string;
  username: string;
  password: string;
  isEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: User) {
    this.userId = data.userId;
    this.email = data.email;
    this.emailVerified = data.emailVerified;
    this.name = data.name;
    this.username = data.username;
    this.password = data.password;
    this.isEnabled = data.isEnabled;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
