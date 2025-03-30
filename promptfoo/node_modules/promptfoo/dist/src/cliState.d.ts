import type { UnifiedConfig } from './types';
interface CliState {
    basePath?: string;
    config?: Partial<UnifiedConfig>;
    remote?: boolean;
    webUI?: boolean;
}
declare const state: CliState;
export default state;
//# sourceMappingURL=cliState.d.ts.map