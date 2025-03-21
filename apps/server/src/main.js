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
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const helmet_1 = __importDefault(require("helmet"));
const nestjs_zod_1 = require("nestjs-zod");
const app_module_1 = require("./app.module");
(0, nestjs_zod_1.patchNestJsSwagger)();
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const app = yield core_1.NestFactory.create(app_module_1.AppModule, {
            logger: process.env.NODE_ENV === "development" ? ["debug"] : ["error", "warn", "log"],
        });
        const configService = app.get((config_1.ConfigService));
        // Cookie Parser
        app.use((0, cookie_parser_1.default)());
        // Session
        app.use((0, express_session_1.default)({
            resave: false,
            saveUninitialized: false,
            secret: configService.getOrThrow("ACCESS_TOKEN_SECRET"),
            cookie: { httpOnly: true, secure: process.env.NODE_ENV === "production" },
        }));
        // CORS
        app.enableCors({
            credentials: true,
            origin: process.env.NODE_ENV === "production",
        });
        // Helmet - enabled only in production
        if (process.env.NODE_ENV === "production") {
            app.use((0, helmet_1.default)({ contentSecurityPolicy: false }));
        }
        // Global Prefix
        const globalPrefix = "api";
        app.setGlobalPrefix(globalPrefix);
        // Enable Shutdown Hooks
        app.enableShutdownHooks();
        // Swagger (OpenAPI Docs)
        // This can be accessed by visiting {SERVER_URL}/api/docs
        const config = new swagger_1.DocumentBuilder()
            .setTitle("Reactive Resume")
            .setDescription("Reactive Resume is a free and open source resume builder that's built to make the mundane tasks of creating, updating and sharing your resume as easy as 1, 2, 3.")
            .addCookieAuth("Authentication", { type: "http", in: "cookie", scheme: "Bearer" })
            .setVersion("4.0.0")
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup("docs", app, document);
        // Port
        const port = (_a = configService.get("PORT")) !== null && _a !== void 0 ? _a : 3000;
        yield app.listen(port);
        common_1.Logger.log(`🚀 Server is up and running on port ${port}`, "Bootstrap");
    });
}
// eslint-disable-next-line unicorn/prefer-top-level-await
void bootstrap();
