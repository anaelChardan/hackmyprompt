import { exec } from 'child_process';
/**
 * Promisified version of Node.js `exec` function.
 *
 * This wrapper was created to work around a Jest mocking limitation
 * where directly mocking `util.promisify(exec)` was not being respected
 * in tests.
 */
export declare const execAsync: typeof exec.__promisify__;
//# sourceMappingURL=execAsync.d.ts.map