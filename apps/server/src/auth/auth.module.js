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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const mail_module_1 = require("../mail/mail.module");
const user_module_1 = require("../user/user.module");
const user_service_1 = require("../user/user.service");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const dummy_strategy_1 = require("./strategy/dummy.strategy");
const github_strategy_1 = require("./strategy/github.strategy");
const google_strategy_1 = require("./strategy/google.strategy");
const jwt_strategy_1 = require("./strategy/jwt.strategy");
const local_strategy_1 = require("./strategy/local.strategy");
const openid_strategy_1 = require("./strategy/openid.strategy");
const refresh_strategy_1 = require("./strategy/refresh.strategy");
const two_factor_strategy_1 = require("./strategy/two-factor.strategy");
let AuthModule = (() => {
    let _classDecorators = [(0, common_1.Module)({})];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AuthModule = _classThis = class {
        static register() {
            return {
                module: AuthModule,
                imports: [passport_1.PassportModule, jwt_1.JwtModule, user_module_1.UserModule, mail_module_1.MailModule],
                controllers: [auth_controller_1.AuthController],
                providers: [
                    auth_service_1.AuthService,
                    local_strategy_1.LocalStrategy,
                    jwt_strategy_1.JwtStrategy,
                    refresh_strategy_1.RefreshStrategy,
                    two_factor_strategy_1.TwoFactorStrategy,
                    // OAuth2 Strategies
                    {
                        provide: github_strategy_1.GitHubStrategy,
                        inject: [config_1.ConfigService, user_service_1.UserService],
                        useFactory: (configService, userService) => {
                            try {
                                const clientID = configService.getOrThrow("GITHUB_CLIENT_ID");
                                const clientSecret = configService.getOrThrow("GITHUB_CLIENT_SECRET");
                                const callbackURL = configService.getOrThrow("GITHUB_CALLBACK_URL");
                                return new github_strategy_1.GitHubStrategy(clientID, clientSecret, callbackURL, userService);
                            }
                            catch (_a) {
                                return new dummy_strategy_1.DummyStrategy();
                            }
                        },
                    },
                    {
                        provide: google_strategy_1.GoogleStrategy,
                        inject: [config_1.ConfigService, user_service_1.UserService],
                        useFactory: (configService, userService) => {
                            try {
                                const clientID = configService.getOrThrow("GOOGLE_CLIENT_ID");
                                const clientSecret = configService.getOrThrow("GOOGLE_CLIENT_SECRET");
                                const callbackURL = configService.getOrThrow("GOOGLE_CALLBACK_URL");
                                return new google_strategy_1.GoogleStrategy(clientID, clientSecret, callbackURL, userService);
                            }
                            catch (_a) {
                                return new dummy_strategy_1.DummyStrategy();
                            }
                        },
                    },
                    {
                        provide: openid_strategy_1.OpenIDStrategy,
                        inject: [config_1.ConfigService, user_service_1.UserService],
                        useFactory: (configService, userService) => {
                            try {
                                const authorizationURL = configService.getOrThrow("OPENID_AUTHORIZATION_URL");
                                const callbackURL = configService.getOrThrow("OPENID_CALLBACK_URL");
                                const clientID = configService.getOrThrow("OPENID_CLIENT_ID");
                                const clientSecret = configService.getOrThrow("OPENID_CLIENT_SECRET");
                                const issuer = configService.getOrThrow("OPENID_ISSUER");
                                const tokenURL = configService.getOrThrow("OPENID_TOKEN_URL");
                                const userInfoURL = configService.getOrThrow("OPENID_USER_INFO_URL");
                                return new openid_strategy_1.OpenIDStrategy(authorizationURL, callbackURL, clientID, clientSecret, issuer, tokenURL, userInfoURL, userService);
                            }
                            catch (_a) {
                                return new dummy_strategy_1.DummyStrategy();
                            }
                        },
                    },
                ],
                exports: [auth_service_1.AuthService],
            };
        }
    };
    __setFunctionName(_classThis, "AuthModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthModule = _classThis;
})();
exports.AuthModule = AuthModule;
