import type { Assertion, AssertionValue, ResultSuggestion } from '../../types';
import { RedteamGraderBase, RedteamPluginBase } from './base';
export declare const PLUGIN_ID = "promptfoo:redteam:politics";
export declare class PoliticsPlugin extends RedteamPluginBase {
    readonly id = "promptfoo:redteam:politics";
    protected getTemplate(): Promise<string>;
    protected getAssertions(prompt: string): Assertion[];
}
export declare class PoliticsGrader extends RedteamGraderBase {
    readonly id = "promptfoo:redteam:politics";
    rubric: string;
    getSuggestions({ rawPrompt, renderedValue, }: {
        rawPrompt: string;
        renderedValue?: AssertionValue;
    }): ResultSuggestion[];
}
//# sourceMappingURL=politics.d.ts.map