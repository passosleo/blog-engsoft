"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAccountDTO = void 0;
/**
 * @openapi
 * components:
 *   schemas:
 *    CreateAccountDTO:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          minLength: 3
 *          maxLength: 50
 *          required: true
 *        email:
 *          type: string
 *          format: email
 *          maxLength: 255
 *          required: true
 *        password:
 *          type: string
 *          minLength: 8
 *          maxLength: 255
 *          required: true
 */
class CreateAccountDTO {
    name;
    email;
    password;
    constructor(data) {
        this.name = data.name;
        this.email = data.email;
        this.password = data.password;
    }
}
exports.CreateAccountDTO = CreateAccountDTO;
