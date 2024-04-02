import { PrismaClient } from '@prisma/client';
import { User } from '../../domain/entities/user.entity';
import { CreateUserDTO } from '../../domain/dtos/user/create-user.dto';
import { UpdateUserDTO } from '../../domain/dtos/user/update-user.dto';
import { IUserRepository } from '../../domain/repositories/user.repository';

export class UserRepository implements IUserRepository {
  constructor(private readonly dbContext: PrismaClient) {}

  async findOneById(userId: string): Promise<User | null> {
    try {
      const model = await this.dbContext.user.findFirst({ where: { userId } });

      return model ? new User(model) : null;
    } finally {
      await this.dbContext.$disconnect();
    }
  }

  async findOneByEmail(email: string): Promise<User | null> {
    try {
      const model = await this.dbContext.user.findFirst({ where: { email } });

      return model ? new User(model) : null;
    } finally {
      await this.dbContext.$disconnect();
    }
  }

  async create(data: CreateUserDTO): Promise<User> {
    try {
      const model = await this.dbContext.user.create({ data });

      return new User(model);
    } finally {
      await this.dbContext.$disconnect();
    }
  }

  async update(userId: string, data: UpdateUserDTO): Promise<User> {
    try {
      const model = await this.dbContext.user.update({
        where: { userId },
        data,
      });

      return new User(model);
    } finally {
      await this.dbContext.$disconnect();
    }
  }
}
