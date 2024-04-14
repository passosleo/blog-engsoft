"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationDTO = void 0;
/**
 * @openapi
 * components:
 *   schemas:
 *     AuthenticationDTO:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           example: Bearer
 *         token:
 *           type: string
 */
class AuthenticationDTO {
    type;
    token;
    constructor(data) {
        this.type = data.type;
        this.token = data.token;
    }
}
exports.AuthenticationDTO = AuthenticationDTO;
