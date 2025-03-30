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
export declare function retryWithDeduplication<T>(operation: (currentItems: T[]) => Promise<T[]>, targetCount: number, maxConsecutiveRetries?: number, dedupFn?: (items: T[]) => T[]): Promise<T[]>;
/**
 * Randomly samples n items from an array.
 * If n is greater than the length of the array, the entire array is returned.
 *
 * @param array The array to sample from
 * @param n The number of items to sample
 * @returns A new array with n randomly sampled items
 */
export declare function sampleArray<T>(array: T[], n: number): T[];
//# sourceMappingURL=generation.d.ts.map