import type { Assertion } from '../../types';
import { RedteamGraderBase, RedteamPluginBase } from './base';
export declare const PLUGIN_ID = "promptfoo:redteam:shell-injection";
declare const DEFAULT_EXAMPLES: string;
export declare class ShellInjectionPlugin extends RedteamPluginBase {
    readonly id = "promptfoo:redteam:shell-injection";
    protected getTemplate(): Promise<string>;
    protected getAssertions(prompt: string): Assertion[];
}
export declare class ShellInjectionGrader extends RedteamGraderBase {
    readonly id = "promptfoo:redteam:shell-injection";
    rubric: string;
}
export { DEFAULT_EXAMPLES };
//# sourceMappingURL=shellInjection.d.ts.map