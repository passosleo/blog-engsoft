"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthPlugin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_config_1 = require("../../config/app.config");
class AuthPlugin {
    async generateToken({ payload, }) {
        return jsonwebtoken_1.default.sign(payload, app_config_1.config.jwt.secret, {
            expiresIn: app_config_1.config.jwt.expiresIn,
        });
    }
    async verifyToken(token) {
        return jsonwebtoken_1.default.verify(token, app_config_1.config.jwt.secret);
    }
}
exports.AuthPlugin = AuthPlugin;
