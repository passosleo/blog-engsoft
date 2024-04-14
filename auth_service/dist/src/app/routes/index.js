"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const authentication_controller_1 = require("../controllers/authentication/authentication.controller");
const credentials_schema_1 = require("../schemas/authentication/credentials.schema");
const create_account_schema_1 = require("../schemas/account/create-account.schema");
const account_controller_1 = require("../controllers/account/account.controller");
exports.routes = [
    {
        path: '/api/v1/account',
        method: 'POST',
        schema: create_account_schema_1.CreateAccountSchema,
        controller: account_controller_1.AccountController.createAccount,
    },
    {
        path: '/api/v1/account',
        method: 'GET',
        auth: true,
        controller: account_controller_1.AccountController.getAccount,
    },
    {
        path: '/api/v1/authenticate',
        method: 'POST',
        schema: credentials_schema_1.CredentialsSchema,
        controller: authentication_controller_1.AuthenticationController.authenticate,
    },
    {
        path: '/api/v1/validate-token',
        method: 'POST',
        auth: true,
        controller: authentication_controller_1.AuthenticationController.validateToken,
    },
];
