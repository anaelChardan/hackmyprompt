"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeResolve = safeResolve;
exports.safeJoin = safeJoin;
/**
 * Node-only file utilities.
 * Application tests were failing when trying to import this module possibly
 * because of an older version of polyfilled of node:url.
 *
 * TODO:vedant Fix this hack one day
 */
const node_url_1 = require("node:url");
const path_1 = __importDefault(require("path"));
function isAbsolute(filePath) {
    try {
        // Handle both Windows and POSIX file URL formats
        // Windows: file://C:/path or file:///C:/path
        // POSIX: file:///path
        if (filePath.startsWith('file://')) {
            return path_1.default.isAbsolute((0, node_url_1.fileURLToPath)(filePath));
        }
        return path_1.default.isAbsolute(filePath);
    }
    catch {
        return false;
    }
}
/**
 * Safely resolves a path - only calls resolve() if the last path is relative
 * Leaves absolute paths and absolute URLs unchanged
 *
 * @param paths - The path segments to resolve
 * @returns The resolved path if last path is relative, or the last path if it's absolute
 */
function safeResolve(...paths) {
    const lastPath = paths[paths.length - 1] || '';
    if (isAbsolute(lastPath)) {
        return lastPath;
    }
    return path_1.default.resolve(...paths);
}
/**
 * Safely joins paths - only joins if the last path is relative
 * If the last path is absolute or an absolute URL, returns it directly
 *
 * @param paths - The path segments to join
 * @returns The joined path if last path is relative, or the last path if it's absolute
 */
function safeJoin(...paths) {
    const lastPath = paths[paths.length - 1] || '';
    if (isAbsolute(lastPath)) {
        return lastPath;
    }
    return path_1.default.join(...paths);
}
//# sourceMappingURL=file.node.js.map