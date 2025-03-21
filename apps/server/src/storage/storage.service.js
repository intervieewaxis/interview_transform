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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const common_1 = require("@nestjs/common");
const cuid2_1 = require("@paralleldrive/cuid2");
const slugify_1 = __importDefault(require("@sindresorhus/slugify"));
const sharp_1 = __importDefault(require("sharp"));
const PUBLIC_ACCESS_POLICY = {
    Version: "2012-10-17",
    Statement: [
        {
            Sid: "PublicAccess",
            Effect: "Allow",
            Action: ["s3:GetObject"],
            Principal: { AWS: ["*"] },
            Resource: [
                "arn:aws:s3:::{{bucketName}}/*/pictures/*",
                "arn:aws:s3:::{{bucketName}}/*/previews/*",
                "arn:aws:s3:::{{bucketName}}/*/resumes/*",
            ],
        },
    ],
};
let StorageService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var StorageService = _classThis = class {
        constructor(configService, minioService) {
            this.configService = configService;
            this.minioService = minioService;
            this.logger = new common_1.Logger(StorageService.name);
        }
        onModuleInit() {
            return __awaiter(this, void 0, void 0, function* () {
                this.client = this.minioService.client;
                this.bucketName = this.configService.getOrThrow("STORAGE_BUCKET");
                const skipBucketCheck = this.configService.getOrThrow("STORAGE_SKIP_BUCKET_CHECK");
                if (skipBucketCheck) {
                    this.logger.warn("Skipping the verification of whether the storage bucket exists.");
                    this.logger.warn("Make sure that the following paths are publicly accessible: `/{pictures,previews,resumes}/*`");
                    return;
                }
                try {
                    // Create a storage bucket if it doesn't exist
                    // if it exists, log that we were able to connect to the storage service
                    const bucketExists = yield this.client.bucketExists(this.bucketName);
                    if (bucketExists) {
                        this.logger.log("Successfully connected to the storage service.");
                    }
                    else {
                        const bucketPolicy = JSON.stringify(PUBLIC_ACCESS_POLICY).replace(/{{bucketName}}/g, this.bucketName);
                        try {
                            yield this.client.makeBucket(this.bucketName);
                        }
                        catch (_a) {
                            throw new common_1.InternalServerErrorException("There was an error while creating the storage bucket.");
                        }
                        try {
                            yield this.client.setBucketPolicy(this.bucketName, bucketPolicy);
                        }
                        catch (_b) {
                            throw new common_1.InternalServerErrorException("There was an error while applying the policy to the storage bucket.");
                        }
                        this.logger.log("A new storage bucket has been created and the policy has been applied successfully.");
                    }
                }
                catch (error) {
                    throw new common_1.InternalServerErrorException(error);
                }
            });
        }
        bucketExists() {
            return __awaiter(this, void 0, void 0, function* () {
                const exists = yield this.client.bucketExists(this.bucketName);
                if (!exists) {
                    throw new common_1.InternalServerErrorException("There was an error while checking if the storage bucket exists.");
                }
            });
        }
        uploadObject(userId_1, type_1, buffer_1) {
            return __awaiter(this, arguments, void 0, function* (userId, type, buffer, filename = (0, cuid2_1.createId)()) {
                const extension = type === "resumes" ? "pdf" : "jpg";
                const storageUrl = this.configService.getOrThrow("STORAGE_URL");
                let normalizedFilename = (0, slugify_1.default)(filename);
                if (!normalizedFilename)
                    normalizedFilename = (0, cuid2_1.createId)();
                const filepath = `${userId}/${type}/${normalizedFilename}.${extension}`;
                const url = `${storageUrl}/${filepath}`;
                const metadata = extension === "jpg"
                    ? { "Content-Type": "image/jpeg" }
                    : {
                        "Content-Type": "application/pdf",
                        "Content-Disposition": `attachment; filename=${normalizedFilename}.${extension}`,
                    };
                try {
                    if (extension === "jpg") {
                        // If the uploaded file is an image, use sharp to resize the image to a maximum width/height of 600px
                        buffer = yield (0, sharp_1.default)(buffer)
                            .resize({ width: 600, height: 600, fit: sharp_1.default.fit.outside })
                            .jpeg({ quality: 80 })
                            .toBuffer();
                    }
                    yield this.client.putObject(this.bucketName, filepath, buffer, metadata);
                    return url;
                }
                catch (_a) {
                    throw new common_1.InternalServerErrorException("There was an error while uploading the file.");
                }
            });
        }
        deleteObject(userId, type, filename) {
            return __awaiter(this, void 0, void 0, function* () {
                const extension = type === "resumes" ? "pdf" : "jpg";
                const path = `${userId}/${type}/${filename}.${extension}`;
                try {
                    yield this.client.removeObject(this.bucketName, path);
                    return;
                }
                catch (_a) {
                    throw new common_1.InternalServerErrorException(`There was an error while deleting the document at the specified path: ${path}.`);
                }
            });
        }
        deleteFolder(prefix) {
            return __awaiter(this, void 0, void 0, function* () {
                var _a, e_1, _b, _c;
                const objectsList = [];
                const objectsStream = this.client.listObjectsV2(this.bucketName, prefix, true);
                try {
                    for (var _d = true, objectsStream_1 = __asyncValues(objectsStream), objectsStream_1_1; objectsStream_1_1 = yield objectsStream_1.next(), _a = objectsStream_1_1.done, !_a; _d = true) {
                        _c = objectsStream_1_1.value;
                        _d = false;
                        const object = _c;
                        objectsList.push(object.name);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (!_d && !_a && (_b = objectsStream_1.return)) yield _b.call(objectsStream_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                try {
                    yield this.client.removeObjects(this.bucketName, objectsList);
                    return;
                }
                catch (_e) {
                    throw new common_1.InternalServerErrorException(`There was an error while deleting the folder at the specified path: ${this.bucketName}/${prefix}.`);
                }
            });
        }
    };
    __setFunctionName(_classThis, "StorageService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StorageService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StorageService = _classThis;
})();
exports.StorageService = StorageService;
