import { ServiceResult } from '../../../app/types/generic';
import { AccountDTO } from '../../dtos/account/account.dto';
import { CreateAccountDTO } from '../../dtos/account/create-account.dto';
import { UpdateAccountDTO } from '../../dtos/account/update-account.dto';
import { AuthenticationDTO } from '../../dtos/authentication/authentication.dto';

export interface IAccountService {
  getAccount(userId: string): Promise<ServiceResult<AccountDTO>>;
  createAccount(data: CreateAccountDTO): Promise<ServiceResult<AuthenticationDTO>>;
  updateAccount(
    userId: string,
    data: UpdateAccountDTO,
  ): Promise<ServiceResult<AccountDTO>>;
}
