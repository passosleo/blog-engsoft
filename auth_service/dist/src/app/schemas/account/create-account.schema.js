"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAccountSchema = void 0;
const zod_1 = require("zod");
exports.CreateAccountSchema = {
    body: {
        name: zod_1.z.string().min(3).max(50).trim().toUpperCase(),
        email: zod_1.z.string().email().max(255).trim().toLowerCase(),
        password: zod_1.z.string().min(8).max(255),
    },
};
