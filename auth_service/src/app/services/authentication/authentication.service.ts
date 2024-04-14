import { IAuthenticationService } from '../../../domain/services/authentication/authentication.service';
import { AuthenticationDTO } from '../../../domain/dtos/authentication/authentication.dto';
import { CredentialsDTO } from '../../../domain/dtos/authentication/credentials.dto';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { AccountDTO } from '../../../domain/dtos/account/account.dto';
import { IAuthPlugin } from '../../plugins/auth.plugin';
import { ServiceResult } from '../../types/generic';
import { Helpers } from '../../helpers';
import { Exception } from '../../http';

export class AuthenticationService implements IAuthenticationService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly authPlugin: IAuthPlugin,
  ) {}

  async authenticate(credentials: CredentialsDTO): Promise<ServiceResult<AuthenticationDTO>> {
    const user = await this.userRepository.findOneByEmail(credentials.email);

    if (!user) {
      throw new Exception('NOT_FOUND', 'User not found');
    }

    const { password: hashedUserPassword } = user;

    const isValidPassword = await Helpers.validateHashedPassword(credentials.password, hashedUserPassword);

    if (!isValidPassword) {
      throw new Exception('UNAUTHORIZED', 'Invalid password');
    }

    const token = await this.authPlugin.generateToken({
      payload: {
        account: new AccountDTO(user),
      },
    });

    return {
      success: true,
      data: new AuthenticationDTO({ token, type: 'Bearer' }),
    };
  }
}
