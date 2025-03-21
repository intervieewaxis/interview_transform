"use strict";
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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeService = void 0;
const common_1 = require("@nestjs/common");
const schema_1 = require("@reactive-resume/schema");
const utils_1 = require("@reactive-resume/utils");
const slugify_1 = __importDefault(require("@sindresorhus/slugify"));
let ResumeService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ResumeService = _classThis = class {
        constructor(prisma, printerService, storageService) {
            this.prisma = prisma;
            this.printerService = printerService;
            this.storageService = storageService;
        }
        create(userId, createResumeDto) {
            return __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                const { name, email, picture } = yield this.prisma.user.findUniqueOrThrow({
                    where: { id: userId },
                    select: { name: true, email: true, picture: true },
                });
                // const data = deepmerge(defaultResumeData, {
                //   basics: { name, email, picture: { url: picture ?? "" } },
                // } satisfies DeepPartial<ResumeData>);
                // const data = deepmerge(
                //   defaultResumeData,
                //   {
                //     basics: {
                //       name: createResumeDto.data.basics.name || name, // Use incoming name if provided, otherwise use user's name
                //       email: createResumeDto.data.basics.email || email, // Use incoming email if provided, otherwise use user's email
                //       picture: {
                //         url: createResumeDto.data.basics.picture?.url || picture || "", // Use incoming picture if provided, otherwise use user's picture
                //       },
                //     },
                //   } satisfies DeepPartial<ResumeData>,
                //   createResumeDto.data, // Preserve all other fields from the incoming `basics` object
                // );
                const data = Object.assign(Object.assign(Object.assign({}, schema_1.defaultResumeData), { basics: {
                        name: (createResumeDto === null || createResumeDto === void 0 ? void 0 : createResumeDto.data.basics.name) || name,
                        email: (createResumeDto === null || createResumeDto === void 0 ? void 0 : createResumeDto.data.basics.email) || email,
                        picture: {
                            url: ((_a = createResumeDto === null || createResumeDto === void 0 ? void 0 : createResumeDto.data.basics.picture) === null || _a === void 0 ? void 0 : _a.url) || picture || "",
                        },
                    } }), createResumeDto.data);
                console.log("########################################################################################");
                console.log("########################################################################################");
                console.log("########################################################################################");
                console.log("########################################################################################");
                console.log(data);
                console.log("########################################################################################");
                console.log("########################################################################################");
                console.log("########################################################################################");
                console.log("########################################################################################");
                return this.prisma.resume.create({
                    data: {
                        data,
                        userId,
                        title: createResumeDto.title,
                        visibility: createResumeDto.visibility,
                        slug: (_b = createResumeDto.slug) !== null && _b !== void 0 ? _b : (0, slugify_1.default)(createResumeDto.title),
                    },
                });
            });
        }
        import(userId, importResumeDto) {
            var _a, _b;
            const randomTitle = (0, utils_1.generateRandomName)();
            return this.prisma.resume.create({
                data: {
                    userId,
                    visibility: "private",
                    data: importResumeDto.data,
                    title: (_a = importResumeDto.title) !== null && _a !== void 0 ? _a : randomTitle,
                    slug: (_b = importResumeDto.slug) !== null && _b !== void 0 ? _b : (0, slugify_1.default)(randomTitle),
                },
            });
        }
        findAll(userId) {
            return this.prisma.resume.findMany({ where: { userId }, orderBy: { updatedAt: "desc" } });
        }
        findOne(id, userId) {
            if (userId) {
                return this.prisma.resume.findUniqueOrThrow({ where: { userId_id: { userId, id } } });
            }
            return this.prisma.resume.findUniqueOrThrow({ where: { id } });
        }
        findOneStatistics(id) {
            return __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                const result = yield this.prisma.statistics.findFirst({
                    select: { views: true, downloads: true },
                    where: { resumeId: id },
                });
                return {
                    views: (_a = result === null || result === void 0 ? void 0 : result.views) !== null && _a !== void 0 ? _a : 0,
                    downloads: (_b = result === null || result === void 0 ? void 0 : result.downloads) !== null && _b !== void 0 ? _b : 0,
                };
            });
        }
        findOneByUsernameSlug(username, slug, userId) {
            return __awaiter(this, void 0, void 0, function* () {
                const resume = yield this.prisma.resume.findFirstOrThrow({
                    where: { user: { username }, slug, visibility: "public" },
                });
                // Update statistics: increment the number of views by 1
                if (!userId) {
                    yield this.prisma.statistics.upsert({
                        where: { resumeId: resume.id },
                        create: { views: 1, downloads: 0, resumeId: resume.id },
                        update: { views: { increment: 1 } },
                    });
                }
                return resume;
            });
        }
        update(userId, id, updateResumeDto) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const { locked } = yield this.prisma.resume.findUniqueOrThrow({
                        where: { id },
                        select: { locked: true },
                    });
                    if (locked)
                        throw new common_1.BadRequestException(utils_1.ErrorMessage.ResumeLocked);
                    return yield this.prisma.resume.update({
                        data: {
                            title: updateResumeDto.title,
                            slug: updateResumeDto.slug,
                            visibility: updateResumeDto.visibility,
                            data: updateResumeDto.data,
                        },
                        where: { userId_id: { userId, id } },
                    });
                }
                catch (error) {
                    if (error.code === "P2025") {
                        common_1.Logger.error(error);
                        throw new common_1.InternalServerErrorException(error);
                    }
                }
            });
        }
        lock(userId, id, set) {
            return this.prisma.resume.update({
                data: { locked: set },
                where: { userId_id: { userId, id } },
            });
        }
        remove(userId, id) {
            return __awaiter(this, void 0, void 0, function* () {
                yield Promise.all([
                    // Remove files in storage, and their cached keys
                    this.storageService.deleteObject(userId, "resumes", id),
                    this.storageService.deleteObject(userId, "previews", id),
                ]);
                return this.prisma.resume.delete({ where: { userId_id: { userId, id } } });
            });
        }
        printResume(resume, userId) {
            return __awaiter(this, void 0, void 0, function* () {
                const url = yield this.printerService.printResume(resume);
                // Update statistics: increment the number of downloads by 1
                if (!userId) {
                    yield this.prisma.statistics.upsert({
                        where: { resumeId: resume.id },
                        create: { views: 0, downloads: 1, resumeId: resume.id },
                        update: { downloads: { increment: 1 } },
                    });
                }
                return url;
            });
        }
        printPreview(resume) {
            return this.printerService.printPreview(resume);
        }
    };
    __setFunctionName(_classThis, "ResumeService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ResumeService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ResumeService = _classThis;
})();
exports.ResumeService = ResumeService;
