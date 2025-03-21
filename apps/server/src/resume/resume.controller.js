"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const library_1 = require("@prisma/client/runtime/library");
const dto_1 = require("@reactive-resume/dto");
const schema_1 = require("@reactive-resume/schema");
const utils_1 = require("@reactive-resume/utils");
const zod_to_json_schema_1 = require("zod-to-json-schema");
const optional_guard_1 = require("../auth/guards/optional.guard");
const two_factor_guard_1 = require("../auth/guards/two-factor.guard");
const resume_guard_1 = require("./guards/resume.guard");
let ResumeController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)("Resume"), (0, common_1.Controller)("resume")];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getSchema_decorators;
    let _create_decorators;
    let _import_decorators;
    let _findAll_decorators;
    let _findOne_decorators;
    let _findOneStatistics_decorators;
    let _findOneByUsernameSlug_decorators;
    let _update_decorators;
    let _lock_decorators;
    let _remove_decorators;
    let _printResume_decorators;
    let _printPreview_decorators;
    var ResumeController = _classThis = class {
        constructor(resumeService) {
            this.resumeService = (__runInitializers(this, _instanceExtraInitializers), resumeService);
        }
        getSchema() {
            return (0, zod_to_json_schema_1.zodToJsonSchema)(schema_1.resumeDataSchema);
        }
        create(user, createResumeDto) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    return yield this.resumeService.create(user.id, createResumeDto);
                }
                catch (error) {
                    if (error instanceof library_1.PrismaClientKnownRequestError && error.code === "P2002") {
                        throw new common_1.BadRequestException(utils_1.ErrorMessage.ResumeSlugAlreadyExists);
                    }
                    common_1.Logger.error(error);
                    throw new common_1.InternalServerErrorException(error);
                }
            });
        }
        import(user, importResumeDto) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const result = dto_1.importResumeSchema.parse(importResumeDto);
                    return yield this.resumeService.import(user.id, result);
                }
                catch (error) {
                    if (error instanceof library_1.PrismaClientKnownRequestError && error.code === "P2002") {
                        throw new common_1.BadRequestException(utils_1.ErrorMessage.ResumeSlugAlreadyExists);
                    }
                    common_1.Logger.error(error);
                    throw new common_1.InternalServerErrorException(error);
                }
            });
        }
        findAll(user) {
            return this.resumeService.findAll(user.id);
        }
        findOne(resume) {
            return resume;
        }
        findOneStatistics(id) {
            return this.resumeService.findOneStatistics(id);
        }
        findOneByUsernameSlug(username, slug, userId) {
            return this.resumeService.findOneByUsernameSlug(username, slug, userId);
        }
        update(user, id, updateResumeDto) {
            return this.resumeService.update(user.id, id, updateResumeDto);
        }
        lock(user, id, set = true) {
            return this.resumeService.lock(user.id, id, set);
        }
        remove(user, id) {
            return this.resumeService.remove(user.id, id);
        }
        printResume(userId, resume) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const url = yield this.resumeService.printResume(resume, userId);
                    return { url };
                }
                catch (error) {
                    common_1.Logger.error(error);
                    throw new common_1.InternalServerErrorException(error);
                }
            });
        }
        printPreview(resume) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const url = yield this.resumeService.printPreview(resume);
                    return { url };
                }
                catch (error) {
                    common_1.Logger.error(error);
                    throw new common_1.InternalServerErrorException(error);
                }
            });
        }
    };
    __setFunctionName(_classThis, "ResumeController");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getSchema_decorators = [(0, common_1.Get)("schema")];
        _create_decorators = [(0, common_1.Post)(), (0, common_1.UseGuards)(two_factor_guard_1.TwoFactorGuard)];
        _import_decorators = [(0, common_1.Post)("import"), (0, common_1.UseGuards)(two_factor_guard_1.TwoFactorGuard)];
        _findAll_decorators = [(0, common_1.Get)(), (0, common_1.UseGuards)(two_factor_guard_1.TwoFactorGuard)];
        _findOne_decorators = [(0, common_1.Get)(":id"), (0, common_1.UseGuards)(two_factor_guard_1.TwoFactorGuard, resume_guard_1.ResumeGuard)];
        _findOneStatistics_decorators = [(0, common_1.Get)(":id/statistics"), (0, common_1.UseGuards)(two_factor_guard_1.TwoFactorGuard)];
        _findOneByUsernameSlug_decorators = [(0, common_1.Get)("/public/:username/:slug"), (0, common_1.UseGuards)(optional_guard_1.OptionalGuard)];
        _update_decorators = [(0, common_1.Patch)(":id"), (0, common_1.UseGuards)(two_factor_guard_1.TwoFactorGuard)];
        _lock_decorators = [(0, common_1.Patch)(":id/lock"), (0, common_1.UseGuards)(two_factor_guard_1.TwoFactorGuard)];
        _remove_decorators = [(0, common_1.Delete)(":id"), (0, common_1.UseGuards)(two_factor_guard_1.TwoFactorGuard)];
        _printResume_decorators = [(0, common_1.Get)("/print/:id"), (0, common_1.UseGuards)(optional_guard_1.OptionalGuard, resume_guard_1.ResumeGuard)];
        _printPreview_decorators = [(0, common_1.Get)("/print/:id/preview"), (0, common_1.UseGuards)(two_factor_guard_1.TwoFactorGuard, resume_guard_1.ResumeGuard)];
        __esDecorate(_classThis, null, _getSchema_decorators, { kind: "method", name: "getSchema", static: false, private: false, access: { has: obj => "getSchema" in obj, get: obj => obj.getSchema }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: obj => "create" in obj, get: obj => obj.create }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _import_decorators, { kind: "method", name: "import", static: false, private: false, access: { has: obj => "import" in obj, get: obj => obj.import }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: obj => "findAll" in obj, get: obj => obj.findAll }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: obj => "findOne" in obj, get: obj => obj.findOne }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findOneStatistics_decorators, { kind: "method", name: "findOneStatistics", static: false, private: false, access: { has: obj => "findOneStatistics" in obj, get: obj => obj.findOneStatistics }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findOneByUsernameSlug_decorators, { kind: "method", name: "findOneByUsernameSlug", static: false, private: false, access: { has: obj => "findOneByUsernameSlug" in obj, get: obj => obj.findOneByUsernameSlug }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: obj => "update" in obj, get: obj => obj.update }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _lock_decorators, { kind: "method", name: "lock", static: false, private: false, access: { has: obj => "lock" in obj, get: obj => obj.lock }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _remove_decorators, { kind: "method", name: "remove", static: false, private: false, access: { has: obj => "remove" in obj, get: obj => obj.remove }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _printResume_decorators, { kind: "method", name: "printResume", static: false, private: false, access: { has: obj => "printResume" in obj, get: obj => obj.printResume }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _printPreview_decorators, { kind: "method", name: "printPreview", static: false, private: false, access: { has: obj => "printPreview" in obj, get: obj => obj.printPreview }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ResumeController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ResumeController = _classThis;
})();
exports.ResumeController = ResumeController;
