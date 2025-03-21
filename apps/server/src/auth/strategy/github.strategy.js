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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHubStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const utils_1 = require("@reactive-resume/utils");
const passport_github2_1 = require("passport-github2");
let GitHubStrategy = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = (0, passport_1.PassportStrategy)(passport_github2_1.Strategy, "github");
    var GitHubStrategy = _classThis = class extends _classSuper {
        constructor(clientID, clientSecret, callbackURL, userService) {
            super({ clientID, clientSecret, callbackURL, scope: ["user:email"] });
            this.clientID = clientID;
            this.clientSecret = clientSecret;
            this.callbackURL = callbackURL;
            this.userService = userService;
        }
        validate(_accessToken, _refreshToken, profile, done) {
            return __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                const { displayName, emails, photos, username } = profile;
                const email = (_a = emails === null || emails === void 0 ? void 0 : emails[0].value) !== null && _a !== void 0 ? _a : `${username}@github.com`;
                const picture = photos === null || photos === void 0 ? void 0 : photos[0].value;
                let user = null;
                if (!email)
                    throw new common_1.BadRequestException(utils_1.ErrorMessage.InvalidCredentials);
                try {
                    user =
                        (_b = (yield this.userService.findOneByIdentifier(email))) !== null && _b !== void 0 ? _b : (username ? yield this.userService.findOneByIdentifier(username) : null);
                    if (!user)
                        throw new common_1.BadRequestException(utils_1.ErrorMessage.InvalidCredentials);
                    done(null, user);
                }
                catch (_c) {
                    try {
                        user = yield this.userService.create({
                            email,
                            picture,
                            locale: "en-US",
                            name: displayName,
                            provider: "github",
                            emailVerified: true, // auto-verify emails
                            username: (0, utils_1.processUsername)(username !== null && username !== void 0 ? username : email.split("@")[0]),
                            secrets: { create: {} },
                        });
                        done(null, user);
                    }
                    catch (_d) {
                        // throw new BadRequestException(ErrorMessage.UserAlreadyExists);
                    }
                }
            });
        }
    };
    __setFunctionName(_classThis, "GitHubStrategy");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        GitHubStrategy = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return GitHubStrategy = _classThis;
})();
exports.GitHubStrategy = GitHubStrategy;
