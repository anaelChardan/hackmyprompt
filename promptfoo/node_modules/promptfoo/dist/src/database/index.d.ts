import Database from 'better-sqlite3';
export declare function getDbPath(): string;
export declare function getDbSignalPath(): string;
export declare function getDb(): import("drizzle-orm/better-sqlite3").BetterSQLite3Database<Record<string, unknown>> & {
    $client: Database.Database;
};
//# sourceMappingURL=index.d.ts.map