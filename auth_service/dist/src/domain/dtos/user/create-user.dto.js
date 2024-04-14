"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDTO = void 0;
class CreateUserDTO {
    email;
    name;
    password;
    emailVerified;
    isEnabled;
    constructor(data) {
        this.email = data.email;
        this.name = data.name;
        this.password = data.password;
        this.emailVerified = data.emailVerified;
        this.isEnabled = data.isEnabled;
    }
}
exports.CreateUserDTO = CreateUserDTO;
