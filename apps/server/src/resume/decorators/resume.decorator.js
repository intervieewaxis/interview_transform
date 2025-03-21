"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resume = void 0;
const common_1 = require("@nestjs/common");
exports.Resume = (0, common_1.createParamDecorator)((data, ctx) => {
    var _a;
    const request = ctx.switchToHttp().getRequest();
    const resume = (_a = request.payload) === null || _a === void 0 ? void 0 : _a.resume;
    return data ? resume[data] : resume;
});
