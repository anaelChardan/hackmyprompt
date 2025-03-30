"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configCommand = configCommand;
const confirm_1 = __importDefault(require("@inquirer/confirm"));
const zod_1 = require("zod");
const accounts_1 = require("../globalConfig/accounts");
const cloud_1 = require("../globalConfig/cloud");
const logger_1 = __importDefault(require("../logger"));
const telemetry_1 = __importDefault(require("../telemetry"));
const EmailSchema = zod_1.z.string().email();
function configCommand(program) {
    const configCommand = program.command('config').description('Edit configuration settings');
    const getCommand = configCommand.command('get').description('Get configuration settings');
    const setCommand = configCommand.command('set').description('Set configuration settings');
    const unsetCommand = configCommand.command('unset').description('Unset configuration settings');
    getCommand
        .command('email')
        .description('Get user email')
        .action(async () => {
        const email = (0, accounts_1.getUserEmail)();
        if (email) {
            logger_1.default.info(email);
        }
        else {
            logger_1.default.info('No email set.');
        }
        telemetry_1.default.record('command_used', {
            name: 'config get',
            configKey: 'email',
        });
        await telemetry_1.default.send();
    });
    setCommand
        .command('email <email>')
        .description('Set user email')
        .action(async (email) => {
        if (cloud_1.cloudConfig.getApiKey()) {
            logger_1.default.error("Cannot update email while logged in. Email is managed through 'promptfoo auth login'. Please use 'promptfoo auth logout' first if you want to use a different email.");
            process.exitCode = 1;
            return;
        }
        const parsedEmail = EmailSchema.safeParse(email);
        if (!parsedEmail.success) {
            logger_1.default.error(`Invalid email address: ${email}`);
            process.exitCode = 1;
            return;
        }
        (0, accounts_1.setUserEmail)(parsedEmail.data);
        logger_1.default.info(`Email set to ${parsedEmail.data}`);
        telemetry_1.default.record('command_used', {
            name: 'config set',
            configKey: 'email',
        });
        await telemetry_1.default.send();
    });
    unsetCommand
        .command('email')
        .description('Unset user email')
        .option('-f, --force', 'Force unset without confirmation')
        .action(async (options) => {
        if (cloud_1.cloudConfig.getApiKey()) {
            logger_1.default.error("Cannot update email while logged in. Email is managed through 'promptfoo auth login'. Please use 'promptfoo auth logout' first if you want to use a different email.");
            process.exitCode = 1;
            return;
        }
        const currentEmail = (0, accounts_1.getUserEmail)();
        if (!currentEmail) {
            logger_1.default.info('No email is currently set.');
            return;
        }
        if (!options.force) {
            const shouldUnset = await (0, confirm_1.default)({
                message: `Are you sure you want to unset the email "${currentEmail}"?`,
                default: false,
            });
            if (!shouldUnset) {
                logger_1.default.info('Operation cancelled.');
                return;
            }
        }
        (0, accounts_1.setUserEmail)('');
        logger_1.default.info('Email has been unset.');
        telemetry_1.default.record('command_used', {
            name: 'config unset',
            configKey: 'email',
        });
        await telemetry_1.default.send();
    });
}
//# sourceMappingURL=config.js.map