import type { Assertion } from '../../types';
import { RedteamGraderBase, RedteamPluginBase } from './base';
export declare const PLUGIN_ID = "promptfoo:redteam:sql-injection";
export declare class SqlInjectionPlugin extends RedteamPluginBase {
    readonly id = "promptfoo:redteam:sql-injection";
    protected getTemplate(): Promise<string>;
    protected getAssertions(prompt: string): Assertion[];
}
export declare class SqlInjectionGrader extends RedteamGraderBase {
    readonly id = "promptfoo:redteam:sql-injection";
    rubric: string;
}
//# sourceMappingURL=sqlInjection.d.ts.map