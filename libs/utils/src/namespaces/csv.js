"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseArrayLikeCSVEntry = exports.parseCSV = void 0;
const papaparse_1 = __importDefault(require("papaparse"));
const parseCSV = (string) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        papaparse_1.default.parse(string, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                resolve(results.data);
            },
            error: (error) => {
                reject(error);
            },
        });
    });
});
exports.parseCSV = parseCSV;
/**
 * Parser for cases when we receive an array like structure f.e. in the LinkedIn Profile.csv import
 * @param csvEntry array-like entry such as [TAG:https://some.link,TAG:https://someother.link]
 * @returns
 */
const parseArrayLikeCSVEntry = (csvEntry) => csvEntry.replace(/^\[/, "").replace(/$]/, "").split(",");
exports.parseArrayLikeCSVEntry = parseArrayLikeCSVEntry;
