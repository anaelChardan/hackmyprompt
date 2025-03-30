import winston from 'winston';
type LogCallback = (message: string) => void;
export declare let globalLogCallback: LogCallback | null;
export declare function setLogCallback(callback: LogCallback | null): void;
export declare const LOG_LEVELS: {
    readonly error: 0;
    readonly warn: 1;
    readonly info: 2;
    readonly debug: 3;
};
type LogLevel = keyof typeof LOG_LEVELS;
declare let sourceMapSupportInitialized: boolean;
declare function initializeSourceMapSupport(): Promise<void>;
/**
 * Gets the caller location (filename and line number)
 * @returns String with file location information
 */
declare function getCallerLocation(): string;
type StrictLogMethod = (message: string) => winston.Logger;
type StrictLogger = Omit<winston.Logger, keyof typeof LOG_LEVELS> & {
    [K in keyof typeof LOG_LEVELS]: StrictLogMethod;
};
export declare const consoleFormatter: winston.Logform.Format;
export declare const fileFormatter: winston.Logform.Format;
export declare const winstonLogger: winston.Logger;
export declare function getLogLevel(): LogLevel;
export declare function setLogLevel(level: LogLevel): void;
export declare function isDebugEnabled(): boolean;
export declare const logger: StrictLogger;
export default logger;
export { sourceMapSupportInitialized, initializeSourceMapSupport, getCallerLocation };
//# sourceMappingURL=logger.d.ts.map