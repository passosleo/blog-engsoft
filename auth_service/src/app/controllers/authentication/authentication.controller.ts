import { IAuthenticationService } from '../../../domain/services/authentication/authentication.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { CredentialsDTO } from '../../../domain/dtos/authentication/credentials.dto';
import { UserRepository } from '../../repositories/user.repository';
import { Request, Response, NextFunction } from 'express';
import { AuthPlugin } from '../../plugins/auth.plugin';
import { DbContext } from '../../data/db-context';

const authenticationService: IAuthenticationService = new AuthenticationService(
  new UserRepository(DbContext.getConnection()),
  new AuthPlugin(),
);

export class AuthenticationController {
  /**
   * @openapi
   * /api/v1/authenticate:
   *   post:
   *     tags:
   *       - Authentication
   *     summary: Authenticate user
   *     requestBody:
   *       description: CredentialsDTO
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CredentialsDTO'
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
   *       401:
   *         description: Unauthorized
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UnauthorizedDTO'
   *       404:
   *         description: Not Found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/NotFoundDTO'
   *       500:
   *         description: Internal Server Error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/InternalServerErrorDTO'
   */
  static async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const data = new CredentialsDTO(req.body);
      const response = await authenticationService.authenticate(data);

      return res.sendResponse(200, response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @openapi
   * /api/v1/validate-token:
   *   post:
   *     tags:
   *       - Authentication
   *     summary: Validate token
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
   *       401:
   *         description: Unauthorized
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UnauthorizedDTO'
   */
  static async validateToken(req: Request, res: Response, next: NextFunction) {
    return res.sendResponse(200, {
      success: true,
      data: req.account,
    });
  }
}
