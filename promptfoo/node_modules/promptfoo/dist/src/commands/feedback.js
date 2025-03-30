"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbackCommand = feedbackCommand;
const feedback_1 = require("../feedback");
function feedbackCommand(program) {
    program
        .command('feedback [message]')
        .description('Send feedback to the promptfoo developers')
        .action((message) => {
        (0, feedback_1.gatherFeedback)(message);
    });
}
//# sourceMappingURL=feedback.js.map