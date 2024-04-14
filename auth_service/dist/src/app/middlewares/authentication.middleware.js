"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationMiddleware = void 0;
const account_dto_1 = require("../../domain/dtos/account/account.dto");
const auth_plugin_1 = require("../plugins/auth.plugin");
const http_1 = require("../http");
/**
 * @openapi
 * components:
 *   securitySchemes:
 *     JWTAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
function authenticationMiddleware() {
    return async (req, res, next) => {
        try {
            const { authorization } = req.headers;
            if (!authorization) {
                return res.sendResponse(http_1.HttpStatusCode.UNAUTHORIZED, {
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
            const authPlugin = new auth_plugin_1.AuthPlugin();
            const token = authorization.split(' ')[1];
            const { account } = await authPlugin.verifyToken(token);
            if (!account)
                throw new http_1.Exception('UNAUTHORIZED', 'Invalid token');
            req.account = new account_dto_1.AccountDTO(account);
            next();
        }
        catch {
            return res.sendResponse(http_1.HttpStatusCode.UNAUTHORIZED, {
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
exports.authenticationMiddleware = authenticationMiddleware;
