"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const app_config_1 = require("./app.config");
const package_json_1 = require("../../package.json");
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: app_config_1.config.app.name,
            version: package_json_1.version,
            description: package_json_1.description,
        },
        servers: [
            {
                url: app_config_1.config.app.baseUrl,
            },
        ],
        consumes: ['application/json'],
        produces: ['application/json'],
        schemes: ['http'],
    },
    apis: ['src/**/*.{ts,js}'],
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
