import type { Assertion } from '../../types';
import { RedteamPluginBase, RedteamGraderBase } from './base';
export declare const PLUGIN_ID = "promptfoo:redteam:hallucination";
export declare class HallucinationPlugin extends RedteamPluginBase {
    readonly id = "promptfoo:redteam:hallucination";
    protected getTemplate(): Promise<string>;
    protected getAssertions(prompt: string): Assertion[];
}
export declare class HallucinationGrader extends RedteamGraderBase {
    readonly id = "promptfoo:redteam:hallucination";
    rubric: string;
}
//# sourceMappingURL=hallucination.d.ts.map