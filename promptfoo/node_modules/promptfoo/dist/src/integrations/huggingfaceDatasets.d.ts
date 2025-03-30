import type { TestCase } from '../types';
export declare function parseDatasetPath(path: string): {
    owner: string;
    repo: string;
    queryParams: URLSearchParams;
};
export declare function fetchHuggingFaceDataset(datasetPath: string, limit?: number): Promise<TestCase[]>;
//# sourceMappingURL=huggingfaceDatasets.d.ts.map