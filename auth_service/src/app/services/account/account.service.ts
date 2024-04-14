import { AuthenticationDTO } from '../../../domain/dtos/authentication/authentication.dto';
import { IAccountService } from '../../../domain/services/account/account.service';
import { UpdateAccountDTO } from '../../../domain/dtos/account/update-account.dto';
import { CreateAccountDTO } from '../../../domain/dtos/account/create-account.dto';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { CreateUserDTO } from '../../../domain/dtos/user/create-user.dto';
import { AccountDTO } from '../../../domain/dtos/account/account.dto';
import { IAuthPlugin } from '../../plugins/auth.plugin';
import { ServiceResult } from '../../types/generic';
import { Helpers } from '../../helpers';
import { Exception } from '../../http';

export class AccountService implements IAccountService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly authPlugin: IAuthPlugin,
  ) {}

  async createAccount(data: CreateAccountDTO): Promise<ServiceResult<AuthenticationDTO>> {
    const emailExists = await this.userRepository.findOneByEmail(data.email);

    if (emailExists) {
      throw new Exception('CONFLICT', 'Email already exists');
    }

    const hashedPassword = await Helpers.hashPassword(data.password);

    const userData = new CreateUserDTO({
      ...data,
      password: hashedPassword,
    });

    const createdUser = await this.userRepository.create(userData);

    const token = await this.authPlugin.generateToken({
        payload: {
          user: new AccountDTO(createdUser),
        },
      });

    return {
      success: true,
      data: new AuthenticationDTO({ token, type: 'Bearer' }),
    };
  }

  async getAccount(userId: string): Promise<ServiceResult<AccountDTO>> {
    throw new Error('Method not implemented.');
  }

  async updateAccount(userId: string, data: UpdateAccountDTO): Promise<ServiceResult<AccountDTO>> {
    throw new Error('Method not implemented.');
  }
}
