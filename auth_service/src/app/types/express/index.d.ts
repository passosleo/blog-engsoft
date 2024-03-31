import { HttpStatusCode } from './../../http/index';
import { ServiceResult } from '../generic';

declare global {
  namespace Express {
    interface Response {
      sendResponse: (status: HttpStatusCode, data: ServiceResult) => void;
    }
  }
}
