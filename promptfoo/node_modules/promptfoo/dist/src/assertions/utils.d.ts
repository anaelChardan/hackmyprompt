import { type Assertion, type TestCase } from '../types';
export declare function getFinalTest(test: TestCase, assertion: Assertion): any;
export declare function loadFromJavaScriptFile(filePath: string, functionName: string | undefined, args: any[]): Promise<any>;
export declare function processFileReference(fileRef: string): object | string;
export declare function coerceString(value: string | object): string;
//# sourceMappingURL=utils.d.ts.map