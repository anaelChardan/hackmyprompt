export declare class JsonlFileWriter {
    private filePath;
    private writeStream;
    constructor(filePath: string);
    write(data: Record<string, any>): Promise<void>;
    close(): Promise<void>;
}
//# sourceMappingURL=writeToFile.d.ts.map