"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsDTO = void 0;
/**
 * @openapi
 * components:
 *   schemas:
 *     CredentialsDTO:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           minLength: 8
 */
class CredentialsDTO {
    email;
    password;
    constructor(data) {
        this.email = data.email;
        this.password = data.password;
    }
}
exports.CredentialsDTO = CredentialsDTO;
