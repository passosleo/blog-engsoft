"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserDTO = void 0;
class UpdateUserDTO {
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
exports.UpdateUserDTO = UpdateUserDTO;
