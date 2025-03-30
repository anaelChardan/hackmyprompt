import type { Assertion, AssertionValue, ResultSuggestion } from '../../types';
import { RedteamGraderBase, RedteamPluginBase } from './base';
export declare const PLUGIN_ID = "promptfoo:redteam:imitation";
export declare class ImitationPlugin extends RedteamPluginBase {
    readonly id = "promptfoo:redteam:imitation";
    protected getTemplate(): Promise<string>;
    protected getAssertions(prompt: string): Assertion[];
}
export declare class ImitationGrader extends RedteamGraderBase {
    readonly id = "promptfoo:redteam:imitation";
    rubric: string;
    getSuggestions({ rawPrompt, renderedValue, }: {
        rawPrompt: string;
        renderedValue?: AssertionValue;
    }): ResultSuggestion[];
}
//# sourceMappingURL=imitation.d.ts.map