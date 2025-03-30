"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonlFileWriter = void 0;
const fs_1 = require("fs");
class JsonlFileWriter {
    constructor(filePath) {
        this.filePath = filePath;
        this.writeStream = (0, fs_1.createWriteStream)(filePath, { flags: 'a' });
    }
    async write(data) {
        const jsonLine = JSON.stringify(data) + '\n';
        return new Promise((resolve, reject) => {
            this.writeStream.write(jsonLine, (error) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve();
                }
            });
        });
    }
    async close() {
        return new Promise((resolve) => {
            this.writeStream.end(resolve);
        });
    }
}
exports.JsonlFileWriter = JsonlFileWriter;
//# sourceMappingURL=writeToFile.js.map