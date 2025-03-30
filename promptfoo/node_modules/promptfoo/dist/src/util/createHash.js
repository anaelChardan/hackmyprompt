"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sha256 = sha256;
exports.randomSequence = randomSequence;
const crypto_1 = require("crypto");
function sha256(str) {
    return (0, crypto_1.createHash)('sha256').update(str).digest('hex');
}
function randomSequence(length = 3) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
//# sourceMappingURL=createHash.js.map