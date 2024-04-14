"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseMiddleware = void 0;
const http_1 = require("../http");
async function responseMiddleware(req, res, next) {
    res.sendResponse = (status, { data, errors }) => {
        res.status(status).json({
            status,
            message: http_1.ResponseMessages[status],
            data,
            errors,
        });
    };
    next();
}
exports.responseMiddleware = responseMiddleware;
