"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountDTO = void 0;
/**
 * @openapi
 * components:
 *   schemas:
 *     AccountDTO:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         emailVerified:
 *           type: boolean
 *         isEnabled:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
class AccountDTO {
    userId;
    name;
    email;
    emailVerified;
    isEnabled;
    createdAt;
    updatedAt;
    constructor(data) {
        this.userId = data.userId;
        this.name = data.name;
        this.email = data.email;
        this.emailVerified = data.emailVerified;
        this.isEnabled = data.isEnabled;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}
exports.AccountDTO = AccountDTO;
