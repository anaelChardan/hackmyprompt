import type { AssertionValue, ResultSuggestion } from '../../types';
import { RedteamGraderBase } from './base';
export declare const PLUGIN_ID = "promptfoo:redteam:rag-document-exfiltration";
export declare class RagDocumentExfiltrationGrader extends RedteamGraderBase {
    id: string;
    rubric: string;
    getSuggestions({ rawPrompt, renderedValue, }: {
        rawPrompt: string;
        renderedValue?: AssertionValue;
    }): ResultSuggestion[];
}
//# sourceMappingURL=ragDocumentExfiltration.d.ts.map