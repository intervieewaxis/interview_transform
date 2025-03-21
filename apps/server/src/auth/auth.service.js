"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.AuthService = void 0;
const node_crypto_1 = require("node:crypto");
const common_1 = require("@nestjs/common");
const utils_1 = require("@reactive-resume/utils");
const bcryptjs = __importStar(require("bcryptjs"));
const otplib_1 = require("otplib");
let AuthService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AuthService = _classThis = class {
        constructor(configService, userService, mailService, jwtService) {
            this.configService = configService;
            this.userService = userService;
            this.mailService = mailService;
            this.jwtService = jwtService;
        }
        hash(password) {
            return bcryptjs.hash(password, 10);
        }
        compare(password, hash) {
            return bcryptjs.compare(password, hash);
        }
        validatePassword(password, hashedPassword) {
            return __awaiter(this, void 0, void 0, function* () {
                const isValid = yield this.compare(password, hashedPassword);
                if (!isValid) {
                    throw new common_1.BadRequestException(utils_1.ErrorMessage.InvalidCredentials);
                }
            });
        }
        generateToken(grantType, payload) {
            switch (grantType) {
                case "access": {
                    if (!payload)
                        throw new common_1.InternalServerErrorException("InvalidTokenPayload");
                    return this.jwtService.sign(payload, {
                        secret: this.configService.getOrThrow("ACCESS_TOKEN_SECRET"),
                        expiresIn: "15m", // 15 minutes
                    });
                }
                case "refresh": {
                    if (!payload)
                        throw new common_1.InternalServerErrorException("InvalidTokenPayload");
                    return this.jwtService.sign(payload, {
                        secret: this.configService.getOrThrow("REFRESH_TOKEN_SECRET"),
                        expiresIn: "2d", // 2 days
                    });
                }
                case "reset":
                case "verification": {
                    return (0, node_crypto_1.randomBytes)(32).toString("base64url");
                }
            }
        }
        setLastSignedIn(email) {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.userService.updateByEmail(email, {
                    secrets: { update: { lastSignedIn: new Date() } },
                });
            });
        }
        setRefreshToken(email, token) {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.userService.updateByEmail(email, {
                    secrets: {
                        update: {
                            refreshToken: token,
                            lastSignedIn: token ? new Date() : undefined,
                        },
                    },
                });
            });
        }
        validateRefreshToken(payload, token) {
            return __awaiter(this, void 0, void 0, function* () {
                var _a;
                const user = yield this.userService.findOneById(payload.id);
                const storedRefreshToken = (_a = user.secrets) === null || _a === void 0 ? void 0 : _a.refreshToken;
                if (!storedRefreshToken || storedRefreshToken !== token)
                    throw new common_1.ForbiddenException();
                if (!user.twoFactorEnabled)
                    return user;
                if (payload.isTwoFactorAuth)
                    return user;
            });
        }
        register(registerDto) {
            return __awaiter(this, void 0, void 0, function* () {
                const hashedPassword = yield this.hash(registerDto.password);
                try {
                    const user = yield this.userService.create({
                        name: registerDto.name,
                        email: registerDto.email,
                        username: registerDto.username,
                        locale: registerDto.locale,
                        provider: "email",
                        emailVerified: false, // Set to true if you don't want to verify user's email
                        secrets: { create: { password: hashedPassword } },
                    });
                    // Do not `await` this function, otherwise the user will have to wait for the email to be sent before the response is returned
                    void this.sendVerificationEmail(user.email);
                    return user;
                }
                catch (error) {
                    // if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
                    //   throw new BadRequestException(ErrorMessage.UserAlreadyExists);
                    // }
                    common_1.Logger.error(error);
                    // throw new InternalServerErrorException(error);
                }
            });
        }
        authenticate(_a) {
            return __awaiter(this, arguments, void 0, function* ({ identifier, password }) {
                var _b;
                try {
                    const user = yield this.userService.findOneByIdentifierOrThrow(identifier);
                    if (!((_b = user.secrets) === null || _b === void 0 ? void 0 : _b.password)) {
                        throw new common_1.BadRequestException(utils_1.ErrorMessage.OAuthUser);
                    }
                    yield this.validatePassword(password, user.secrets.password);
                    yield this.setLastSignedIn(user.email);
                    return user;
                }
                catch (_c) {
                    throw new common_1.BadRequestException(utils_1.ErrorMessage.InvalidCredentials);
                }
            });
        }
        // Password Reset Flows
        forgotPassword(email) {
            return __awaiter(this, void 0, void 0, function* () {
                const token = this.generateToken("reset");
                yield this.userService.updateByEmail(email, {
                    secrets: { update: { resetToken: token } },
                });
                const baseUrl = this.configService.get("PUBLIC_URL");
                const url = `${baseUrl}/auth/reset-password?token=${token}`;
                const subject = "Reset your Reactive Resume password";
                const text = `Please click on the link below to reset your password:\n\n${url}`;
                yield this.mailService.sendEmail({ to: email, subject, text });
            });
        }
        updatePassword(email, password) {
            return __awaiter(this, void 0, void 0, function* () {
                const hashedPassword = yield this.hash(password);
                yield this.userService.updateByEmail(email, {
                    secrets: { update: { password: hashedPassword } },
                });
            });
        }
        resetPassword(token, password) {
            return __awaiter(this, void 0, void 0, function* () {
                const hashedPassword = yield this.hash(password);
                yield this.userService.updateByResetToken(token, {
                    resetToken: null,
                    password: hashedPassword,
                });
            });
        }
        getAuthProviders() {
            const providers = [];
            if (!this.configService.get("DISABLE_EMAIL_AUTH")) {
                providers.push("email");
            }
            if (this.configService.get("GITHUB_CLIENT_ID") &&
                this.configService.get("GITHUB_CLIENT_SECRET") &&
                this.configService.get("GITHUB_CALLBACK_URL")) {
                providers.push("github");
            }
            if (this.configService.get("GOOGLE_CLIENT_ID") &&
                this.configService.get("GOOGLE_CLIENT_SECRET") &&
                this.configService.get("GOOGLE_CALLBACK_URL")) {
                providers.push("google");
            }
            if (this.configService.get("OPENID_AUTHORIZATION_URL") &&
                this.configService.get("OPENID_ISSUER") &&
                this.configService.get("OPENID_TOKEN_URL") &&
                this.configService.get("OPENID_USER_INFO_URL") &&
                this.configService.get("OPENID_CLIENT_ID") &&
                this.configService.get("OPENID_CLIENT_SECRET") &&
                this.configService.get("OPENID_CALLBACK_URL")) {
                providers.push("openid");
            }
            return providers;
        }
        // Email Verification Flows
        sendVerificationEmail(email) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const token = this.generateToken("verification");
                    // Set the verification token in the database
                    yield this.userService.updateByEmail(email, {
                        secrets: { update: { verificationToken: token } },
                    });
                    const baseUrl = this.configService.get("PUBLIC_URL");
                    const url = `${baseUrl}/auth/verify-email?token=${token}`;
                    const subject = "Verify your email address";
                    const text = `Please verify your email address by clicking on the link below:\n\n${url}`;
                    yield this.mailService.sendEmail({ to: email, subject, text });
                }
                catch (error) {
                    common_1.Logger.error(error);
                    throw new common_1.InternalServerErrorException(error);
                }
            });
        }
        verifyEmail(id, token) {
            return __awaiter(this, void 0, void 0, function* () {
                var _a;
                const user = yield this.userService.findOneById(id);
                const storedToken = (_a = user.secrets) === null || _a === void 0 ? void 0 : _a.verificationToken;
                if (!storedToken || storedToken !== token) {
                    throw new common_1.BadRequestException(utils_1.ErrorMessage.InvalidVerificationToken);
                }
                yield this.userService.updateByEmail(user.email, {
                    emailVerified: true,
                    secrets: { update: { verificationToken: null } },
                });
            });
        }
        // Two-Factor Authentication Flows
        setup2FASecret(email) {
            return __awaiter(this, void 0, void 0, function* () {
                // If the user already has 2FA enabled, throw an error
                const user = yield this.userService.findOneByIdentifierOrThrow(email);
                if (user.twoFactorEnabled) {
                    throw new common_1.BadRequestException(utils_1.ErrorMessage.TwoFactorAlreadyEnabled);
                }
                const secret = otplib_1.authenticator.generateSecret();
                const uri = otplib_1.authenticator.keyuri(email, "Reactive Resume", secret);
                yield this.userService.updateByEmail(email, {
                    secrets: { update: { twoFactorSecret: secret } },
                });
                return { message: uri };
            });
        }
        enable2FA(email, code) {
            return __awaiter(this, void 0, void 0, function* () {
                var _a;
                const user = yield this.userService.findOneByIdentifierOrThrow(email);
                // If the user already has 2FA enabled, throw an error
                if (user.twoFactorEnabled) {
                    throw new common_1.BadRequestException(utils_1.ErrorMessage.TwoFactorAlreadyEnabled);
                }
                // If the user doesn't have a 2FA secret set, throw an error
                if (!((_a = user.secrets) === null || _a === void 0 ? void 0 : _a.twoFactorSecret)) {
                    throw new common_1.BadRequestException(utils_1.ErrorMessage.TwoFactorNotEnabled);
                }
                const verified = otplib_1.authenticator.verify({
                    secret: user.secrets.twoFactorSecret,
                    token: code,
                });
                if (!verified) {
                    throw new common_1.BadRequestException(utils_1.ErrorMessage.InvalidTwoFactorCode);
                }
                // Create backup codes and store them in the database
                const backupCodes = Array.from({ length: 8 }, () => (0, node_crypto_1.randomBytes)(5).toString("hex"));
                yield this.userService.updateByEmail(email, {
                    twoFactorEnabled: true,
                    secrets: { update: { twoFactorBackupCodes: backupCodes } },
                });
                return { backupCodes };
            });
        }
        disable2FA(email) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = yield this.userService.findOneByIdentifierOrThrow(email);
                // If the user doesn't have 2FA enabled, throw an error
                if (!user.twoFactorEnabled) {
                    throw new common_1.BadRequestException(utils_1.ErrorMessage.TwoFactorNotEnabled);
                }
                yield this.userService.updateByEmail(email, {
                    twoFactorEnabled: false,
                    secrets: { update: { twoFactorSecret: null, twoFactorBackupCodes: [] } },
                });
            });
        }
        verify2FACode(email, code) {
            return __awaiter(this, void 0, void 0, function* () {
                var _a;
                const user = yield this.userService.findOneByIdentifierOrThrow(email);
                // If the user doesn't have 2FA enabled, or does not have a 2FA secret set, throw an error
                if (!user.twoFactorEnabled || !((_a = user.secrets) === null || _a === void 0 ? void 0 : _a.twoFactorSecret)) {
                    throw new common_1.BadRequestException(utils_1.ErrorMessage.TwoFactorNotEnabled);
                }
                const verified = otplib_1.authenticator.verify({
                    secret: user.secrets.twoFactorSecret,
                    token: code,
                });
                if (!verified) {
                    throw new common_1.BadRequestException(utils_1.ErrorMessage.InvalidTwoFactorCode);
                }
                return user;
            });
        }
        useBackup2FACode(email, code) {
            return __awaiter(this, void 0, void 0, function* () {
                var _a;
                const user = yield this.userService.findOneByIdentifierOrThrow(email);
                // If the user doesn't have 2FA enabled, or does not have a 2FA secret set, throw an error
                if (!user.twoFactorEnabled || !((_a = user.secrets) === null || _a === void 0 ? void 0 : _a.twoFactorSecret)) {
                    throw new common_1.BadRequestException(utils_1.ErrorMessage.TwoFactorNotEnabled);
                }
                const verified = user.secrets.twoFactorBackupCodes.includes(code);
                if (!verified) {
                    throw new common_1.BadRequestException(utils_1.ErrorMessage.InvalidTwoFactorBackupCode);
                }
                // Remove the used backup code from the database
                const backupCodes = user.secrets.twoFactorBackupCodes.filter((c) => c !== code);
                yield this.userService.updateByEmail(email, {
                    secrets: { update: { twoFactorBackupCodes: backupCodes } },
                });
                return user;
            });
        }
    };
    __setFunctionName(_classThis, "AuthService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthService = _classThis;
})();
exports.AuthService = AuthService;
