"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const authentication_dto_1 = require("../../../domain/dtos/authentication/authentication.dto");
const account_dto_1 = require("../../../domain/dtos/account/account.dto");
const helpers_1 = require("../../helpers");
const http_1 = require("../../http");
class AuthenticationService {
    userRepository;
    authPlugin;
    constructor(userRepository, authPlugin) {
        this.userRepository = userRepository;
        this.authPlugin = authPlugin;
    }
    async authenticate(credentials) {
        const user = await this.userRepository.findOneByEmail(credentials.email);
        if (!user) {
            throw new http_1.Exception('NOT_FOUND', 'User not found');
        }
        const { password: hashedUserPassword } = user;
        const isValidPassword = await helpers_1.Helpers.validateHashedPassword(credentials.password, hashedUserPassword);
        if (!isValidPassword) {
            throw new http_1.Exception('UNAUTHORIZED', 'Invalid password');
        }
        const token = await this.authPlugin.generateToken({
            payload: {
                account: new account_dto_1.AccountDTO(user),
            },
        });
        return {
            success: true,
            data: new authentication_dto_1.AuthenticationDTO({ token, type: 'Bearer' }),
        };
    }
}
exports.AuthenticationService = AuthenticationService;
