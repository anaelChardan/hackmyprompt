import type { AssertionValue, ResultSuggestion } from '../../types';
import { RedteamGraderBase } from './base';
export declare const PLUGIN_ID = "promptfoo:redteam:indirect-prompt-injection";
export declare class IndirectPromptInjectionGrader extends RedteamGraderBase {
    id: string;
    rubric: string;
    getSuggestions({ rawPrompt, renderedValue, }: {
        rawPrompt: string;
        renderedValue?: AssertionValue;
    }): ResultSuggestion[];
    private getDatamarkingSuggestion;
    private getEncodingSuggestion;
}
//# sourceMappingURL=indirectPromptInjection.d.ts.map