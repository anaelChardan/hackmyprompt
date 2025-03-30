import Table from 'cli-table3';
import { type EvaluateTable } from './types';
export declare function generateTable(evaluateTable: EvaluateTable, tableCellMaxLength?: number, maxRows?: number): string;
export declare function wrapTable(rows: Record<string, string | number>[], columnWidths?: Record<string, number>): Table.Table | "No data to display";
//# sourceMappingURL=table.d.ts.map