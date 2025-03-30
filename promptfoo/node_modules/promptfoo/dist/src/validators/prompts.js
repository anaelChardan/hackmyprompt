"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptSchema = exports.PromptFunctionSchema = exports.PromptConfigSchema = void 0;
const zod_1 = require("zod");
// Zod schemas for validation
exports.PromptConfigSchema = zod_1.z.object({
    prefix: zod_1.z.string().optional(),
    suffix: zod_1.z.string().optional(),
});
exports.PromptFunctionSchema = zod_1.z
    .function()
    .args(zod_1.z.object({
    vars: zod_1.z.record(zod_1.z.union([zod_1.z.string(), zod_1.z.any()])),
    provider: zod_1.z.custom().optional(),
}))
    .returns(zod_1.z.promise(zod_1.z.union([zod_1.z.string(), zod_1.z.any()])));
exports.PromptSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    raw: zod_1.z.string(),
    /**
     * @deprecated in > 0.59.0. Use `label` instead.
     */
    display: zod_1.z.string().optional(),
    label: zod_1.z.string(),
    function: exports.PromptFunctionSchema.optional(),
    // These config options are merged into the provider config.
    config: zod_1.z.any().optional(),
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function assert() { }
assert();
assert();
assert();
//# sourceMappingURL=prompts.js.map