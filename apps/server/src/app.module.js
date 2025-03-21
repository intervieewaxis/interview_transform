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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const node_path_1 = __importDefault(require("node:path"));
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const serve_static_1 = require("@nestjs/serve-static");
const nest_raven_1 = require("nest-raven");
const nestjs_zod_1 = require("nestjs-zod");
const auth_module_1 = require("./auth/auth.module");
const config_module_1 = require("./config/config.module");
const contributors_module_1 = require("./contributors/contributors.module");
const database_module_1 = require("./database/database.module");
const feature_module_1 = require("./feature/feature.module");
const health_module_1 = require("./health/health.module");
const mail_module_1 = require("./mail/mail.module");
const printer_module_1 = require("./printer/printer.module");
const resume_module_1 = require("./resume/resume.module");
const storage_module_1 = require("./storage/storage.module");
const translation_module_1 = require("./translation/translation.module");
const user_module_1 = require("./user/user.module");
let AppModule = (() => {
    let _classDecorators = [(0, common_1.Module)({
            imports: [
                // Core Modules
                config_module_1.ConfigModule,
                database_module_1.DatabaseModule,
                mail_module_1.MailModule,
                nest_raven_1.RavenModule,
                health_module_1.HealthModule,
                // Feature Modules
                auth_module_1.AuthModule.register(),
                user_module_1.UserModule,
                resume_module_1.ResumeModule,
                storage_module_1.StorageModule,
                printer_module_1.PrinterModule,
                feature_module_1.FeatureModule,
                translation_module_1.TranslationModule,
                contributors_module_1.ContributorsModule,
                // Static Assets
                serve_static_1.ServeStaticModule.forRoot({
                    serveRoot: "/artboard",
                    // eslint-disable-next-line unicorn/prefer-module
                    rootPath: node_path_1.default.join(__dirname, "..", "artboard"),
                }),
                serve_static_1.ServeStaticModule.forRoot({
                    renderPath: "/*",
                    // eslint-disable-next-line unicorn/prefer-module
                    rootPath: node_path_1.default.join(__dirname, "..", "client"),
                }),
            ],
            providers: [
                {
                    provide: core_1.APP_PIPE,
                    useClass: nestjs_zod_1.ZodValidationPipe,
                },
                {
                    provide: core_1.APP_INTERCEPTOR,
                    useValue: new nest_raven_1.RavenInterceptor({
                        filters: [
                            // Filter all HttpException with status code <= 500
                            {
                                type: common_1.HttpException,
                                filter: (exception) => exception.getStatus() < 500,
                            },
                        ],
                    }),
                },
            ],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AppModule = _classThis = class {
    };
    __setFunctionName(_classThis, "AppModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppModule = _classThis;
})();
exports.AppModule = AppModule;
