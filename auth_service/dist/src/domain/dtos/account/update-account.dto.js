"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAccountDTO = void 0;
/**
 * @openapi
 * components:
 *   schemas:
 *    UpdateAccountDTO:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          minLength: 3
 *          maxLength: 50
 *          required: false
 *        email:
 *          type: string
 *          format: email
 *          maxLength: 255
 *          required: false
 */
class UpdateAccountDTO {
    name;
    email;
    constructor(data) {
        this.name = data.name;
        this.email = data.email;
    }
}
exports.UpdateAccountDTO = UpdateAccountDTO;
