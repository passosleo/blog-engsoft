"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    userId;
    email;
    emailVerified;
    name;
    password;
    isEnabled;
    createdAt;
    updatedAt;
    constructor(data) {
        this.userId = data.userId;
        this.email = data.email;
        this.emailVerified = data.emailVerified;
        this.name = data.name;
        this.password = data.password;
        this.isEnabled = data.isEnabled;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}
exports.User = User;
