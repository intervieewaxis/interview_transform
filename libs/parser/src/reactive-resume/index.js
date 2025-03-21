"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactiveResumeParser = void 0;
const schema_1 = require("@reactive-resume/schema");
class ReactiveResumeParser {
    constructor() {
        this.schema = schema_1.resumeDataSchema;
    }
    readFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            // eslint-disable-next-line unicorn/prefer-add-event-listener
            reader.onload = () => {
                try {
                    const result = JSON.parse(reader.result);
                    resolve(result);
                }
                catch (_a) {
                    reject(new Error("Failed to parse JSON"));
                }
            };
            // eslint-disable-next-line unicorn/prefer-add-event-listener
            reader.onerror = () => {
                reject(new Error("Failed to read the file"));
            };
            // eslint-disable-next-line unicorn/prefer-blob-reading-methods
            reader.readAsText(file);
        });
    }
    validate(data) {
        return this.schema.parse(data);
    }
    convert(data) {
        return data;
    }
}
exports.ReactiveResumeParser = ReactiveResumeParser;
