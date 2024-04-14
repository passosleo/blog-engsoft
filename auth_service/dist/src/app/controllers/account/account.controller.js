"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountController = void 0;
const create_account_dto_1 = require("../../../domain/dtos/account/create-account.dto");
const account_service_1 = require("../../services/account/account.service");
const user_repository_1 = require("../../repositories/user.repository");
const auth_plugin_1 = require("../../plugins/auth.plugin");
const db_context_1 = require("../../data/db-context");
const accountService = new account_service_1.AccountService(new user_repository_1.UserRepository(db_context_1.DbContext.getConnection()), new auth_plugin_1.AuthPlugin());
class AccountController {
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
    static async createAccount(req, res, next) {
        try {
            const data = new create_account_dto_1.CreateAccountDTO(req.body);
            const response = await accountService.createAccount(data);
            return res.sendResponse(200, response);
        }
        catch (error) {
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
    static async getAccount(req, res, next) {
        try {
            const response = await accountService.getAccount(req.account.userId);
            return res.sendResponse(200, response);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AccountController = AccountController;
