import fs from 'fs';
/**
 * Updates the signal file with the current timestamp.
 * This is used to notify clients that there are new data available.
 */
export declare function updateSignalFile(): void;
/**
 * Ensures the signal file exists, creating it if necessary.
 */
export declare function ensureSignalFile(): void;
/**
 * Sets up a watcher on the signal file and calls the callback when it changes.
 * @param onChange - Callback function that is called when the signal file changes
 * @returns The watcher instance
 */
export declare function setupSignalWatcher(onChange: () => void): fs.FSWatcher;
//# sourceMappingURL=signal.d.ts.map