import { Exception } from '../../http';
import { IAccountService } from '../../../domain/services/account/account.service';
import { AccountDTO } from '../../../domain/dtos/account/account.dto';
import { ServiceResult } from '../../types/generic';
import { UpdateAccountDTO } from '../../../domain/dtos/account/update-account.dto';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { CreateAccountDTO } from '../../../domain/dtos/account/create-account.dto';
import { CreateUserDTO } from '../../../domain/dtos/user/create-user.dto';

export class AccountService implements IAccountService {
  constructor(private readonly userRepository: IUserRepository) {}

  async createAccount(data: CreateAccountDTO): Promise<ServiceResult<AccountDTO>> {
    const emailExists = await this.userRepository.findOneByEmail(data.email);

    if (emailExists) {
      throw new Exception('CONFLICT', 'Email already exists');
    }

    // const hashedPassword = await helpers.password.hashPassword(data.password);

    const userData = new CreateUserDTO({
      ...data,
      // password: hashedPassword,
    });

    const newUser = await this.userRepository.create({
      ...data,
      // password: hashedPassword,
    });

    // const token = await authPlugin.generateToken({
    //     payload: {
    //       user: new UserDTO(newUser),
    //     },
    //   });

    return {
      success: true,
      // data: new AccountDTO({}),
    };
  }

  getAccount(userId: string): Promise<ServiceResult<AccountDTO>> {
    throw new Error('Method not implemented.');
  }
  updateAccount(userId: string, data: UpdateAccountDTO): Promise<ServiceResult<AccountDTO>> {
    throw new Error('Method not implemented.');
  }
}
