import type { CsvRow } from './types';
export declare function checkGoogleSheetAccess(url: string): Promise<{
    public: boolean;
    status: number;
} | {
    public: boolean;
    status?: undefined;
}>;
export declare function fetchCsvFromGoogleSheetUnauthenticated(url: string): Promise<CsvRow[]>;
export declare function fetchCsvFromGoogleSheetAuthenticated(url: string): Promise<CsvRow[]>;
export declare function fetchCsvFromGoogleSheet(url: string): Promise<CsvRow[]>;
export declare function writeCsvToGoogleSheet(rows: CsvRow[], url: string): Promise<void>;
//# sourceMappingURL=googleSheets.d.ts.map