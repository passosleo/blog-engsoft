import { Request, Response, NextFunction } from 'express';

export class CreateClientController {
  /**
   * @openapi
   * /api/v1/clients:
   *   post:
   *     tags:
   *       - Clients
   *     summary: Create a new client
   *     security:
   *       - JWTAuth: []
   *     requestBody:
   *       description: CreateClientDTO
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateClientDTO'
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
   *                   $ref: '#/components/schemas/ClientDTO'
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

      return res.sendResponse(200, response);
    } catch (error) {
      next(error);
    }
  }
}
