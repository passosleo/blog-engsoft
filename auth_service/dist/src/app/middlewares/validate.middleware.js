"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = void 0;
const zod_1 = require("zod");
const http_1 = require("../http");
function validationMiddleware(schema) {
    function createZodSchema(requestSchema) {
        return zod_1.z.object({
            body: requestSchema.body ? zod_1.z.object(requestSchema.body) : zod_1.z.unknown(),
            query: requestSchema.query ? zod_1.z.object(requestSchema.query) : zod_1.z.unknown(),
            params: requestSchema.params
                ? zod_1.z.object(requestSchema.params)
                : zod_1.z.unknown(),
        });
    }
    return (req, res, next) => {
        const data = {
            body: req.body,
            query: req.query,
            params: req.params,
        };
        const zodSchema = createZodSchema(schema);
        const validation = zodSchema.safeParse(data);
        if (validation.success) {
            req.body = validation.data.body;
            req.query = validation.data.query;
            req.params = validation.data.params;
            next();
        }
        else {
            return res.sendResponse(http_1.HttpStatusCode.BAD_REQUEST, {
                success: false,
                errors: JSON.parse(validation.error.message),
            });
        }
    };
}
exports.validationMiddleware = validationMiddleware;
