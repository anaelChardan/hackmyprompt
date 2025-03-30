import type { TestCase } from '../../types';
/**
 * Converts text to an image and then to base64 encoded string
 * using the sharp library which has better cross-platform support than canvas
 */
export declare function textToImage(text: string): Promise<string>;
/**
 * Adds image encoding to test cases
 */
export declare function addImageToBase64(testCases: TestCase[], injectVar: string): Promise<TestCase[]>;
//# sourceMappingURL=simpleImage.d.ts.map