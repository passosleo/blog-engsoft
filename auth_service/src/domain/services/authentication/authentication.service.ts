import { AuthenticationDTO } from '../../dtos/authentication/authentication.dto';
import { CredentialsDTO } from '../../dtos/authentication/credentials.dto';
import { ServiceResult } from '../../../app/types/generic';
import { AccountDTO } from '../../dtos/account/account.dto';

export interface IAuthenticationService {
  authenticate(credentials: CredentialsDTO): Promise<ServiceResult<AuthenticationDTO>>;
  validateToken(token: string): Promise<ServiceResult<AccountDTO>>;
}
