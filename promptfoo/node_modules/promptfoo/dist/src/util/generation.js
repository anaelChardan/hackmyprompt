"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retryWithDeduplication = retryWithDeduplication;
exports.sampleArray = sampleArray;
const logger_1 = __importDefault(require("../logger"));
/**
 * Retries an operation with deduplication until the target count is reached or max retries are exhausted.
 *
 * @param operation - A function that takes the current items and returns a Promise of new items.
 * @param targetCount - The desired number of unique items to collect.
 * @param maxConsecutiveRetries - Maximum number of consecutive retries allowed when no new items are found. Defaults to 2.
 * @param dedupFn - A function to deduplicate items. Defaults to using a Set for uniqueness.
 * @returns A Promise that resolves to an array of unique items.
 *
 * @typeParam T - The type of items being collected.
 */
async function retryWithDeduplication(operation, targetCount, maxConsecutiveRetries = 2, dedupFn = (items) => Array.from(new Set(items.map((item) => JSON.stringify(item)))).map((item) => JSON.parse(item))) {
    const allItems = [];
    let consecutiveRetries = 0;
    while (allItems.length < targetCount && consecutiveRetries <= maxConsecutiveRetries) {
        const newItems = await operation(allItems);
        if (!Array.isArray(newItems)) {
            logger_1.default.warn('Operation returned non-iterable result. Skipping this iteration.');
            consecutiveRetries++;
            continue;
        }
        const uniqueNewItems = dedupFn([...allItems, ...newItems]).slice(allItems.length);
        allItems.push(...uniqueNewItems);
        logger_1.default.debug(`Added ${uniqueNewItems.length} unique items. Total: ${allItems.length}`);
        if (uniqueNewItems.length === 0) {
            consecutiveRetries++;
            logger_1.default.debug(`No new unique items. Consecutive retries: ${consecutiveRetries}`);
        }
        else {
            consecutiveRetries = 0;
        }
    }
    return allItems;
}
/**
 * Randomly samples n items from an array.
 * If n is greater than the length of the array, the entire array is returned.
 *
 * @param array The array to sample from
 * @param n The number of items to sample
 * @returns A new array with n randomly sampled items
 */
function sampleArray(array, n) {
    logger_1.default.debug(`Sampling ${n} items from array of length ${array.length}`);
    const shuffled = array.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(n, array.length));
}
//# sourceMappingURL=generation.js.map