import { AccountDTO } from '../../domain/dtos/account/account.dto';
import { AuthPlugin, IAuthPlugin } from '../plugins/auth.plugin';
import { Request, Response, NextFunction } from 'express';
import { Exception, HttpStatusCode } from '../http';

/**
 * @openapi
 * components:
 *   securitySchemes:
 *     JWTAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
export function authenticationMiddleware() {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;

      if (!authorization) {
        return res.sendResponse(HttpStatusCode.UNAUTHORIZED, {
          success: false,
          errors: [
            {
              message: 'Authorization header not found',
            },
            {
              message: 'Token not found',
            },
          ],
        });
      }

      const authPlugin: IAuthPlugin = new AuthPlugin();
      const token = authorization.split(' ')[1];

      const { account } = await authPlugin.verifyToken<{account: AccountDTO}>(token);

      if (!account) throw new Exception('UNAUTHORIZED', 'Invalid token');

      req.account = new AccountDTO(account);

      next();
    } catch {
      return res.sendResponse(HttpStatusCode.UNAUTHORIZED, {
        success: false,
        errors: [
          {
            message: 'Invalid token',
          },
          {
            message: 'You are not authorized to access this resource',
          },
        ],
      });
    }
  };
}
