import { IAccountService } from '../../../domain/services/account/account.service';
import { CreateAccountDTO } from '../../../domain/dtos/account/create-account.dto';
import { AccountService } from '../../services/account/account.service';
import { UserRepository } from '../../repositories/user.repository';
import { Request, Response, NextFunction } from 'express';
import { AuthPlugin } from '../../plugins/auth.plugin';
import { DbContext } from '../../data/db-context';

const accountService: IAccountService = new AccountService(
  new UserRepository(DbContext.getConnection()),
  new AuthPlugin(),
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
   *                   example: 'OK'
   *                 data:
   *                   $ref: '#/components/schemas/AuthenticationDTO'
   *       400:
   *         description: Bad Request
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/BadRequestDTO'
   *       409:
   *         description: Conflict
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ConflictDTO'
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

  /**
   * @openapi
   * /api/v1/account:
   *   get:
   *     tags:
   *       - Account
   *     summary: Get user account info
   *     security:
   *       - JWTAuth: []
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
   *                   example: 'OK'
   *                 data:
   *                   $ref: '#/components/schemas/AccountDTO'
   *       400:
   *         description: Bad Request
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/BadRequestDTO'
   *       409:
   *         description: Conflict
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ConflictDTO'
   *       500:
   *         description: Internal Server Error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/InternalServerErrorDTO'
   */
  static async getAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await accountService.getAccount(req.account.userId);

      return res.sendResponse(200, response);
    } catch (error) {
      next(error);
    }
  }
}
