"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const zod_1 = require("zod");
const zod_validation_error_1 = require("zod-validation-error");
const envars_1 = require("../../envars");
const accounts_1 = require("../../globalConfig/accounts");
const logger_1 = __importDefault(require("../../logger"));
const telemetry_1 = __importDefault(require("../../telemetry"));
const apiSchemas_1 = require("../apiSchemas");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.get('/email', async (req, res) => {
    try {
        const email = (0, accounts_1.getUserEmail)();
        if (email) {
            res.json(apiSchemas_1.ApiSchemas.User.Get.Response.parse({ email }));
        }
        else {
            res.status(404).json({ error: 'User not found' });
        }
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            logger_1.default.error(`Error getting email: ${(0, zod_validation_error_1.fromError)(error)}`);
        }
        else {
            logger_1.default.error(`Error getting email: ${error}`);
        }
        res.status(500).json({ error: 'Failed to get email' });
    }
});
exports.userRouter.post('/email', async (req, res) => {
    try {
        const { email } = apiSchemas_1.ApiSchemas.User.Update.Request.parse(req.body);
        (0, accounts_1.setUserEmail)(email);
        res.json(apiSchemas_1.ApiSchemas.User.Update.Response.parse({
            success: true,
            message: `Email updated`,
        }));
        await telemetry_1.default.recordAndSend('webui_api', {
            event: 'email_set',
            email,
            selfHosted: (0, envars_1.getEnvBool)('PROMPTFOO_SELF_HOSTED'),
        });
    }
    catch (error) {
        logger_1.default.error(`Error setting email: ${error}`);
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({ error: (0, zod_validation_error_1.fromError)(error).toString() });
        }
        else {
            res.status(500).json({ error: 'Failed to set email' });
        }
    }
});
exports.userRouter.post('/consent', async (req, res) => {
    const { email, metadata } = req.body;
    if (!email) {
        res.status(400).json({ error: 'Email is required' });
        return;
    }
    try {
        await telemetry_1.default.saveConsent(email, metadata);
        res.status(200).json({ success: true });
    }
    catch (error) {
        logger_1.default.debug(`Failed to save consent: ${error.message}`);
        res.status(500).json({ error: 'Failed to save consent' });
    }
});
//# sourceMappingURL=user.js.map