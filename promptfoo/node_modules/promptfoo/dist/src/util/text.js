"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ellipsize = ellipsize;
/**
 * Truncates a string to a maximum length, adding an ellipsis (...) if truncated.
 * @param str The string to truncate
 * @param maxLen The maximum length of the resulting string, including the ellipsis
 * @returns The truncated string, with ellipsis if necessary
 */
function ellipsize(str, maxLen) {
    if (str.length > maxLen) {
        return str.slice(0, maxLen - 3) + '...';
    }
    return str;
}
//# sourceMappingURL=text.js.map