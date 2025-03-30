"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeEmpty = void 0;
/**
 * Creates a clean copy of an object by removing empty arrays and objects at the top level only
 * @param obj The object to clean
 * @returns A new object with empty arrays and objects removed from the top level
 */
const removeEmpty = (obj) => {
    // Create a deep copy to avoid modifying the original
    const copy = JSON.parse(JSON.stringify(obj));
    // Process only the top level keys
    Object.keys(copy).forEach((key) => {
        // Check if value is an array with zero items
        if (Array.isArray(copy[key]) && copy[key].length === 0) {
            delete copy[key];
        }
        // Check if value is an empty object with no properties
        else if (copy[key] &&
            typeof copy[key] === 'object' &&
            !Array.isArray(copy[key]) &&
            Object.keys(copy[key]).length === 0) {
            delete copy[key];
        }
    });
    return copy;
};
exports.removeEmpty = removeEmpty;
//# sourceMappingURL=objectUtils.js.map