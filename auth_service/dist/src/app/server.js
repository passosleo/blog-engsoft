"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_middleware_1 = require("./middlewares/authentication.middleware");
const validate_middleware_1 = require("./middlewares/validate.middleware");
const response_middleware_1 = require("./middlewares/response.middleware");
const error_middleware_1 = require("./middlewares/error.middleware");
const swagger_config_1 = require("../config/swagger.config");
const app_1 = require("./app");
const routes_1 = require("./routes");
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const server = new app_1.Application({
    routes: routes_1.routes,
    swagger: {
        enabled: true,
        path: '/api/v1/docs',
        config: swagger_config_1.swaggerSpec,
    },
    middlewares: {
        global: [(0, cors_1.default)(), (0, morgan_1.default)('dev')],
        authentication: authentication_middleware_1.authenticationMiddleware,
        validation: validate_middleware_1.validationMiddleware,
        response: response_middleware_1.responseMiddleware,
        error: error_middleware_1.errorMiddleware,
    },
});
server.start();
