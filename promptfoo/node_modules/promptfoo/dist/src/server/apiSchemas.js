"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiSchemas = void 0;
const zod_1 = require("zod");
const EmailSchema = zod_1.z.string().email();
exports.ApiSchemas = {
    User: {
        Get: {
            Response: zod_1.z.object({
                email: EmailSchema.nullable(),
            }),
        },
        Update: {
            Request: zod_1.z.object({
                email: EmailSchema,
            }),
            Response: zod_1.z.object({
                success: zod_1.z.boolean(),
                message: zod_1.z.string(),
            }),
        },
    },
    Eval: {
        UpdateAuthor: {
            Params: zod_1.z.object({
                id: zod_1.z.string(),
            }),
            Request: zod_1.z.object({
                author: zod_1.z.string().email(),
            }),
            Response: zod_1.z.object({
                message: zod_1.z.string(),
            }),
        },
    },
};
//# sourceMappingURL=apiSchemas.js.map