"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationController = void 0;
const authentication_service_1 = require("../../services/authentication/authentication.service");
const credentials_dto_1 = require("../../../domain/dtos/authentication/credentials.dto");
const user_repository_1 = require("../../repositories/user.repository");
const auth_plugin_1 = require("../../plugins/auth.plugin");
const db_context_1 = require("../../data/db-context");
const authenticationService = new authentication_service_1.AuthenticationService(new user_repository_1.UserRepository(db_context_1.DbContext.getConnection()), new auth_plugin_1.AuthPlugin());
class AuthenticationController {
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
    static async authenticate(req, res, next) {
        try {
            const data = new credentials_dto_1.CredentialsDTO(req.body);
            const response = await authenticationService.authenticate(data);
            return res.sendResponse(200, response);
        }
        catch (error) {
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
    static async validateToken(req, res, next) {
        return res.sendResponse(200, {
            success: true,
            data: req.account,
        });
    }
}
exports.AuthenticationController = AuthenticationController;
