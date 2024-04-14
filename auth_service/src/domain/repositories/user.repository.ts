import { CreateUserDTO } from '../dtos/user/create-user.dto';
import { UpdateUserDTO } from '../dtos/user/update-user.dto';
import { User } from '../entities/user.entity';

export interface IUserRepository {
  findOneById(userId: string): Promise<User | null>;
  findOneByEmail(email: string): Promise<User | null>;
  create(data: CreateUserDTO): Promise<User>;
  update(userId: string, data: UpdateUserDTO): Promise<User>;
}
