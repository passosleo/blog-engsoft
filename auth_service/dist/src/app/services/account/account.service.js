"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountService = void 0;
const authentication_dto_1 = require("../../../domain/dtos/authentication/authentication.dto");
const create_user_dto_1 = require("../../../domain/dtos/user/create-user.dto");
const account_dto_1 = require("../../../domain/dtos/account/account.dto");
const helpers_1 = require("../../helpers");
const http_1 = require("../../http");
class AccountService {
    userRepository;
    authPlugin;
    constructor(userRepository, authPlugin) {
        this.userRepository = userRepository;
        this.authPlugin = authPlugin;
    }
    async createAccount(data) {
        const emailExists = await this.userRepository.findOneByEmail(data.email);
        if (emailExists) {
            throw new http_1.Exception('CONFLICT', 'Email already exists');
        }
        const hashedPassword = await helpers_1.Helpers.hashPassword(data.password);
        const userData = new create_user_dto_1.CreateUserDTO({
            ...data,
            password: hashedPassword,
        });
        const createdUser = await this.userRepository.create(userData);
        const token = await this.authPlugin.generateToken({
            payload: {
                account: new account_dto_1.AccountDTO(createdUser),
            },
        });
        return {
            success: true,
            data: new authentication_dto_1.AuthenticationDTO({ token, type: 'Bearer' }),
        };
    }
    async getAccount(userId) {
        const user = await this.userRepository.findOneById(userId);
        if (!user) {
            throw new http_1.Exception('NOT_FOUND', 'User not found');
        }
        return {
            success: true,
            data: new account_dto_1.AccountDTO(user),
        };
    }
    async updateAccount(userId, data) {
        throw new Error('Method not implemented.');
    }
}
exports.AccountService = AccountService;
