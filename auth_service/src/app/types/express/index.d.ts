import { AccountDTO } from '../../../domain/dtos/account/account.dto';
import { HttpStatusCode } from './../../http/index';
import { ServiceResult } from '../generic';

declare global {
  namespace Express {
    interface Request {
      account: AccountDTO;
    }

    interface Response {
      sendResponse: (status: HttpStatusCode, data: ServiceResult) => void;
    }
  }
}
