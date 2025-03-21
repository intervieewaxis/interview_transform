"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepSearchAndParseDates = exports.sortByDate = exports.dateSchema = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const zod_1 = require("zod");
exports.dateSchema = zod_1.z.union([zod_1.z.date(), zod_1.z.string().datetime()]).transform((value) => {
    if (typeof value === "string")
        return (0, dayjs_1.default)(value).toDate();
    return value;
});
const sortByDate = (a, b, key, desc = true) => {
    if (!a[key] || !b[key])
        return 0;
    if (!(a[key] instanceof Date) || !(b[key] instanceof Date))
        return 0;
    if ((0, dayjs_1.default)(a[key]).isSame((0, dayjs_1.default)(b[key])))
        return 0;
    if (desc)
        return (0, dayjs_1.default)(a[key]).isBefore((0, dayjs_1.default)(b[key])) ? 1 : -1;
    else
        return (0, dayjs_1.default)(a[key]).isBefore((0, dayjs_1.default)(b[key])) ? -1 : 1;
};
exports.sortByDate = sortByDate;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deepSearchAndParseDates = (obj, dateKeys) => {
    if (typeof obj !== "object" || obj === null) {
        return obj;
    }
    const keys = Object.keys(obj);
    if (keys.length === 0) {
        return obj;
    }
    for (const key of keys) {
        let value = obj[key];
        if (dateKeys.includes(key) && typeof value === "string") {
            const parsedDate = new Date(value);
            if (!Number.isNaN(parsedDate.getTime())) {
                value = parsedDate;
            }
        }
        obj[key] = (0, exports.deepSearchAndParseDates)(value, dateKeys);
    }
    return obj;
};
exports.deepSearchAndParseDates = deepSearchAndParseDates;
