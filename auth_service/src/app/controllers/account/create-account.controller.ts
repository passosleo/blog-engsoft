import { Request, Response, NextFunction } from 'express';

export class CreateAccountController {
  /**
   * @openapi
   * /api/v1/account:
   *   post:
   *     tags:
   *       - Account
   *     summary: Create a new account
   *     security:
   *       - JWTAuth: []
   *     requestBody:
   *       description: CreateAccountDTO
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateAccountDTO'
   *     responses:
   *       201:
   *         description: Created
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: number
   *                   example: 201
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
  static async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const response = {
        success: true,
        data: req.body,
      };

      return res.sendResponse(201, response);
    } catch (error) {
      next(error);
    }
  }
}
