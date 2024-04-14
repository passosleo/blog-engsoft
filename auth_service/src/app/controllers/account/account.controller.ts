import { Request, Response, NextFunction } from 'express';
import { CreateAccountDTO } from '../../../domain/dtos/account/create-account.dto';
import { AccountService } from '../../services/account/account.service';
import { UserRepository } from '../../repositories/user.repository';
import { DbContext } from '../../data/db-context';
import { IAccountService } from '../../../domain/services/account/account.service';
import { AuthPlugin } from '../../plugins/auth.plugin';

const accountService: IAccountService = new AccountService(
  new UserRepository(DbContext.getConnection()),
  new AuthPlugin()
);

export class AccountController {
  /**
   * @openapi
   * /api/v1/account:
   *   post:
   *     tags:
   *       - Account
   *     summary: Create a new account
   *     requestBody:
   *       description: CreateAccountDTO
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateAccountDTO'
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: number
   *                   example: 200
   *                 message:
   *                   type: string
   *                   example: 'Created'
   *                 data:
   *                   $ref: '#/components/schemas/AccountDTO'
   *       400:
   *         description: Bad Request
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/BadRequestDTO'
   *       500:
   *         description: Internal Server Error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/InternalServerErrorDTO'
   */
  static async createAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const data = new CreateAccountDTO(req.body);
      const response = await accountService.createAccount(data);

      return res.sendResponse(200, response);
    } catch (error) {
      next(error);
    }
  }
}
