import type { AssertionParams, GradingResult } from '../types';
export declare function validateXml(xmlString: string, requiredElements?: string[]): {
    isValid: boolean;
    reason: string;
};
export declare function containsXml(outputString: string, requiredElements?: string[]): {
    isValid: boolean;
    reason: string;
};
export declare const handleIsXml: ({ assertion, renderedValue, outputString, inverse, baseType, }: AssertionParams) => GradingResult;
//# sourceMappingURL=xml.d.ts.map