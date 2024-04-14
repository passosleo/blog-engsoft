import { AuthenticationDTO } from '../../dtos/authentication/authentication.dto';
import { CredentialsDTO } from '../../dtos/authentication/credentials.dto';
import { ServiceResult } from '../../../app/types/generic';

export interface IAuthenticationService {
  authenticate(credentials: CredentialsDTO): Promise<ServiceResult<AuthenticationDTO>>;
}
