"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = void 0;
exports.getCurrentTimestamp = getCurrentTimestamp;
function getCurrentTimestamp() {
    return Math.floor(new Date().getTime() / 1000);
}
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
exports.sleep = sleep;
//# sourceMappingURL=time.js.map