"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const express_1 = __importDefault(require("express"));
const logger_plugin_1 = require("./plugins/logger.plugin");
const app_config_1 = require("../config/app.config");
const db_context_1 = require("./data/db-context");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
class Application {
    app;
    config;
    routes;
    middlewares;
    logger;
    constructor({ name = app_config_1.config.app.name, host = app_config_1.config.app.host, port = app_config_1.config.app.port, baseUrl = app_config_1.config.app.baseUrl, swagger, routes = [], middlewares = {}, }) {
        this.app = (0, express_1.default)();
        this.config = {
            name,
            host,
            port,
            baseUrl,
            swagger,
        };
        this.logger = new logger_plugin_1.Logger({ context: 'bootstrap' });
        this.routes = routes;
        this.middlewares = middlewares;
        this.initialize();
    }
    initialize() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        if (this.config.swagger?.enabled) {
            this.app.use(this.config.swagger.path, swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(this.config.swagger.config));
        }
        if (this.middlewares.global) {
            this.app.use(this.middlewares.global);
        }
        if (this.middlewares.response) {
            this.app.use(this.middlewares.response);
        }
        this.setupRoutes();
        if (this.middlewares.error) {
            this.app.use(this.middlewares.error);
        }
    }
    setupRoutes() {
        this.routes.forEach((route) => {
            const routeMiddlewaresList = new Array();
            if (route.auth) {
                if (this.middlewares.authentication) {
                    routeMiddlewaresList.push(this.middlewares.authentication());
                }
                else {
                    this.logger.warn(`Route "${route.path}" requires authentication but no auth middleware is provided`);
                }
            }
            if (route.schema) {
                if (this.middlewares.validation) {
                    routeMiddlewaresList.push(this.middlewares.validation(route.schema));
                }
                else {
                    this.logger.warn(`Route "${route.path}" requires validation but no validation middleware is provided`);
                }
            }
            if (route.middlewares) {
                routeMiddlewaresList.push(...route.middlewares);
            }
            this.app[route.method.toLowerCase()](route.path, routeMiddlewaresList, route.controller);
            this.logger.info(`Route ${route.method} ${route.path} successfully registered`);
        });
    }
    start({ port = this.config.port } = {}) {
        db_context_1.DbContext.checkConnection().then(() => {
            this.logger.info('Application is ready to start');
            this.app.listen(port, () => {
                this.logger.info(`Application ${this.config.name ?? ''} successfully started on ${this.config.baseUrl}`);
                if (this.config.swagger?.enabled) {
                    this.logger.info(`Swagger is available under ${this.config.baseUrl}${this.config.swagger.path}`);
                }
            });
        });
    }
    stop() {
        this.logger.info('Shutting down application...');
        process.exit(0);
    }
}
exports.Application = Application;
