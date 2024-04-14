"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const logger_plugin_1 = require("../plugins/logger.plugin");
const http_1 = require("../http");
async function errorMiddleware(error, req, res, next) {
    const logger = new logger_plugin_1.Logger({ context: 'error-handler' });
    const { method, path, params, query, body } = req;
    const ctx = {
        method,
        path,
        params,
        query,
        body,
        error: JSON.stringify(error.stack, null, 2),
    };
    if (error instanceof http_1.Exception) {
        if (error.statusCode === http_1.HttpStatusCode.INTERNAL_SERVER_ERROR) {
            logger.error(ctx);
        }
        return res.sendResponse(error.statusCode, {
            success: false,
            errors: [
                {
                    message: error.message,
                },
            ],
        });
    }
    else {
        logger.error(ctx);
        return res.status(http_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            status: http_1.HttpStatusCode.INTERNAL_SERVER_ERROR,
            message: http_1.ResponseMessages[http_1.HttpStatusCode.INTERNAL_SERVER_ERROR],
            errors: [
                {
                    message: 'Something went wrong',
                },
                {
                    message: 'An unexpected error occurred. Please try again later.',
                },
            ],
        });
    }
}
exports.errorMiddleware = errorMiddleware;
