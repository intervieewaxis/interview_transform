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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("@reactive-resume/dto");
const utils_1 = require("@reactive-resume/utils");
const github_guard_1 = require("./guards/github.guard");
const google_guard_1 = require("./guards/google.guard");
const jwt_guard_1 = require("./guards/jwt.guard");
const local_guard_1 = require("./guards/local.guard");
const openid_guard_1 = require("./guards/openid.guard");
const refresh_guard_1 = require("./guards/refresh.guard");
const two_factor_guard_1 = require("./guards/two-factor.guard");
const cookie_1 = require("./utils/cookie");
const payload_1 = require("./utils/payload");
let AuthController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)("Authentication"), (0, common_1.Controller)("auth")];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _register_decorators;
    let _login_decorators;
    let _getAuthProviders_decorators;
    let _githubLogin_decorators;
    let _githubCallback_decorators;
    let _googleLogin_decorators;
    let _googleCallback_decorators;
    let _openidLogin_decorators;
    let _openidCallback_decorators;
    let _refresh_decorators;
    let _updatePassword_decorators;
    let _logout_decorators;
    let _setup2FASecret_decorators;
    let _enable2FA_decorators;
    let _disable2FA_decorators;
    let _verify2FACode_decorators;
    let _useBackup2FACode_decorators;
    let _forgotPassword_decorators;
    let _resetPassword_decorators;
    let _verifyEmail_decorators;
    let _resendVerificationEmail_decorators;
    var AuthController = _classThis = class {
        constructor(authService, configService) {
            this.authService = (__runInitializers(this, _instanceExtraInitializers), authService);
            this.configService = configService;
        }
        exchangeToken(id_1, email_1) {
            return __awaiter(this, arguments, void 0, function* (id, email, isTwoFactorAuth = false) {
                try {
                    const payload = payload_1.payloadSchema.parse({ id, isTwoFactorAuth });
                    const accessToken = this.authService.generateToken("access", payload);
                    const refreshToken = this.authService.generateToken("refresh", payload);
                    // Set Refresh Token in Database
                    yield this.authService.setRefreshToken(email, refreshToken);
                    return { accessToken, refreshToken };
                }
                catch (error) {
                    throw new common_1.InternalServerErrorException(error, utils_1.ErrorMessage.SomethingWentWrong);
                }
            });
        }
        handleAuthenticationResponse(user_1, response_1) {
            return __awaiter(this, arguments, void 0, function* (user, response, isTwoFactorAuth = false, redirect = false) {
                let status = "authenticated";
                const baseUrl = this.configService.get("PUBLIC_URL");
                const redirectUrl = new URL(`${baseUrl}/auth/callback`);
                const { accessToken, refreshToken } = yield this.exchangeToken(user.id, user.email, isTwoFactorAuth);
                response.cookie("Authentication", accessToken, (0, cookie_1.getCookieOptions)("access"));
                response.cookie("Refresh", refreshToken, (0, cookie_1.getCookieOptions)("refresh"));
                if (user.twoFactorEnabled && !isTwoFactorAuth)
                    status = "2fa_required";
                const responseData = dto_1.authResponseSchema.parse({ status, user });
                redirectUrl.searchParams.set("status", status);
                if (redirect)
                    response.redirect(redirectUrl.toString());
                else
                    response.status(200).send(responseData);
            });
        }
        register(registerDto, response) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = yield this.authService.register(registerDto);
                if (!user) {
                    throw new Error("User registration failed.");
                }
                return this.handleAuthenticationResponse(user, response);
            });
        }
        login(user, response) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.handleAuthenticationResponse(user, response);
            });
        }
        getAuthProviders() {
            return this.authService.getAuthProviders();
        }
        // OAuth Flows
        githubLogin() {
            return;
        }
        githubCallback(user, response) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.handleAuthenticationResponse(user, response, false, true);
            });
        }
        googleLogin() {
            return;
        }
        googleCallback(user, response) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.handleAuthenticationResponse(user, response, false, true);
            });
        }
        openidLogin() {
            return;
        }
        openidCallback(user, response) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.handleAuthenticationResponse(user, response, false, true);
            });
        }
        refresh(user, response) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.handleAuthenticationResponse(user, response, true);
            });
        }
        updatePassword(email_1, _a) {
            return __awaiter(this, arguments, void 0, function* (email, { password }) {
                yield this.authService.updatePassword(email, password);
                return { message: "Your password has been successfully updated." };
            });
        }
        logout(user, response) {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.authService.setRefreshToken(user.email, null);
                response.clearCookie("Authentication");
                response.clearCookie("Refresh");
                const data = dto_1.messageSchema.parse({ message: "You have been logged out, tschüss!" });
                response.status(200).send(data);
            });
        }
        // Two-Factor Authentication Flows
        setup2FASecret(email) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.authService.setup2FASecret(email);
            });
        }
        enable2FA(id_1, email_1, _a, response_1) {
            return __awaiter(this, arguments, void 0, function* (id, email, { code }, response) {
                const { backupCodes } = yield this.authService.enable2FA(email, code);
                const { accessToken, refreshToken } = yield this.exchangeToken(id, email, true);
                response.cookie("Authentication", accessToken, (0, cookie_1.getCookieOptions)("access"));
                response.cookie("Refresh", refreshToken, (0, cookie_1.getCookieOptions)("refresh"));
                const data = dto_1.backupCodesSchema.parse({ backupCodes });
                response.status(200).send(data);
            });
        }
        disable2FA(email) {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.authService.disable2FA(email);
                return { message: "Two-factor authentication has been successfully disabled on your account." };
            });
        }
        verify2FACode(user_1, _a, response_1) {
            return __awaiter(this, arguments, void 0, function* (user, { code }, response) {
                yield this.authService.verify2FACode(user.email, code);
                const { accessToken, refreshToken } = yield this.exchangeToken(user.id, user.email, true);
                response.cookie("Authentication", accessToken, (0, cookie_1.getCookieOptions)("access"));
                response.cookie("Refresh", refreshToken, (0, cookie_1.getCookieOptions)("refresh"));
                response.status(200).send(dto_1.userSchema.parse(user));
            });
        }
        useBackup2FACode(id_1, email_1, _a, response_1) {
            return __awaiter(this, arguments, void 0, function* (id, email, { code }, response) {
                const user = yield this.authService.useBackup2FACode(email, code);
                return this.handleAuthenticationResponse(user, response, true);
            });
        }
        // Password Recovery Flows
        forgotPassword(_a) {
            return __awaiter(this, arguments, void 0, function* ({ email }) {
                try {
                    yield this.authService.forgotPassword(email);
                }
                catch (_b) {
                    // pass
                }
                return {
                    message: "A password reset link should have been sent to your inbox, if an account existed with the email you provided.",
                };
            });
        }
        resetPassword(_a) {
            return __awaiter(this, arguments, void 0, function* ({ token, password }) {
                try {
                    yield this.authService.resetPassword(token, password);
                    return { message: "Your password has been successfully reset." };
                }
                catch (_b) {
                    throw new common_1.BadRequestException(utils_1.ErrorMessage.InvalidResetToken);
                }
            });
        }
        // Email Verification Flows
        verifyEmail(id, emailVerified, token) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!token)
                    throw new common_1.BadRequestException(utils_1.ErrorMessage.InvalidVerificationToken);
                if (emailVerified) {
                    throw new common_1.BadRequestException(utils_1.ErrorMessage.EmailAlreadyVerified);
                }
                yield this.authService.verifyEmail(id, token);
                return { message: "Your email has been successfully verified." };
            });
        }
        resendVerificationEmail(email, emailVerified) {
            return __awaiter(this, void 0, void 0, function* () {
                if (emailVerified) {
                    throw new common_1.BadRequestException(utils_1.ErrorMessage.EmailAlreadyVerified);
                }
                yield this.authService.sendVerificationEmail(email);
                return {
                    message: "You should have received a new email with a link to verify your email address.",
                };
            });
        }
    };
    __setFunctionName(_classThis, "AuthController");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _register_decorators = [(0, common_1.Post)("register")];
        _login_decorators = [(0, common_1.Post)("login"), (0, common_1.UseGuards)(local_guard_1.LocalGuard)];
        _getAuthProviders_decorators = [(0, common_1.Get)("providers")];
        _githubLogin_decorators = [(0, swagger_1.ApiTags)("OAuth", "GitHub"), (0, common_1.Get)("github"), (0, common_1.UseGuards)(github_guard_1.GitHubGuard)];
        _githubCallback_decorators = [(0, swagger_1.ApiTags)("OAuth", "GitHub"), (0, common_1.Get)("github/callback"), (0, common_1.UseGuards)(github_guard_1.GitHubGuard)];
        _googleLogin_decorators = [(0, swagger_1.ApiTags)("OAuth", "Google"), (0, common_1.Get)("google"), (0, common_1.UseGuards)(google_guard_1.GoogleGuard)];
        _googleCallback_decorators = [(0, swagger_1.ApiTags)("OAuth", "Google"), (0, common_1.Get)("google/callback"), (0, common_1.UseGuards)(google_guard_1.GoogleGuard)];
        _openidLogin_decorators = [(0, swagger_1.ApiTags)("OAuth", "OpenID"), (0, common_1.Get)("openid"), (0, common_1.UseGuards)(openid_guard_1.OpenIDGuard)];
        _openidCallback_decorators = [(0, swagger_1.ApiTags)("OAuth", "OpenID"), (0, common_1.Get)("openid/callback"), (0, common_1.UseGuards)(openid_guard_1.OpenIDGuard)];
        _refresh_decorators = [(0, common_1.Post)("refresh"), (0, common_1.UseGuards)(refresh_guard_1.RefreshGuard)];
        _updatePassword_decorators = [(0, common_1.Patch)("password"), (0, common_1.UseGuards)(two_factor_guard_1.TwoFactorGuard)];
        _logout_decorators = [(0, common_1.Post)("logout"), (0, common_1.UseGuards)(two_factor_guard_1.TwoFactorGuard)];
        _setup2FASecret_decorators = [(0, swagger_1.ApiTags)("Two-Factor Auth"), (0, common_1.Post)("2fa/setup"), (0, common_1.UseGuards)(jwt_guard_1.JwtGuard)];
        _enable2FA_decorators = [(0, swagger_1.ApiTags)("Two-Factor Auth"), (0, common_1.HttpCode)(200), (0, common_1.Post)("2fa/enable"), (0, common_1.UseGuards)(jwt_guard_1.JwtGuard)];
        _disable2FA_decorators = [(0, swagger_1.ApiTags)("Two-Factor Auth"), (0, common_1.HttpCode)(200), (0, common_1.Post)("2fa/disable"), (0, common_1.UseGuards)(two_factor_guard_1.TwoFactorGuard)];
        _verify2FACode_decorators = [(0, swagger_1.ApiTags)("Two-Factor Auth"), (0, common_1.HttpCode)(200), (0, common_1.Post)("2fa/verify"), (0, common_1.UseGuards)(jwt_guard_1.JwtGuard)];
        _useBackup2FACode_decorators = [(0, swagger_1.ApiTags)("Two-Factor Auth"), (0, common_1.HttpCode)(200), (0, common_1.Post)("2fa/backup"), (0, common_1.UseGuards)(jwt_guard_1.JwtGuard)];
        _forgotPassword_decorators = [(0, swagger_1.ApiTags)("Password Reset"), (0, common_1.HttpCode)(200), (0, common_1.Post)("forgot-password")];
        _resetPassword_decorators = [(0, swagger_1.ApiTags)("Password Reset"), (0, common_1.HttpCode)(200), (0, common_1.Post)("reset-password")];
        _verifyEmail_decorators = [(0, swagger_1.ApiTags)("Email Verification"), (0, common_1.Post)("verify-email"), (0, common_1.UseGuards)(two_factor_guard_1.TwoFactorGuard)];
        _resendVerificationEmail_decorators = [(0, swagger_1.ApiTags)("Email Verification"), (0, common_1.Post)("verify-email/resend"), (0, common_1.UseGuards)(two_factor_guard_1.TwoFactorGuard)];
        __esDecorate(_classThis, null, _register_decorators, { kind: "method", name: "register", static: false, private: false, access: { has: obj => "register" in obj, get: obj => obj.register }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _login_decorators, { kind: "method", name: "login", static: false, private: false, access: { has: obj => "login" in obj, get: obj => obj.login }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getAuthProviders_decorators, { kind: "method", name: "getAuthProviders", static: false, private: false, access: { has: obj => "getAuthProviders" in obj, get: obj => obj.getAuthProviders }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _githubLogin_decorators, { kind: "method", name: "githubLogin", static: false, private: false, access: { has: obj => "githubLogin" in obj, get: obj => obj.githubLogin }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _githubCallback_decorators, { kind: "method", name: "githubCallback", static: false, private: false, access: { has: obj => "githubCallback" in obj, get: obj => obj.githubCallback }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _googleLogin_decorators, { kind: "method", name: "googleLogin", static: false, private: false, access: { has: obj => "googleLogin" in obj, get: obj => obj.googleLogin }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _googleCallback_decorators, { kind: "method", name: "googleCallback", static: false, private: false, access: { has: obj => "googleCallback" in obj, get: obj => obj.googleCallback }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _openidLogin_decorators, { kind: "method", name: "openidLogin", static: false, private: false, access: { has: obj => "openidLogin" in obj, get: obj => obj.openidLogin }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _openidCallback_decorators, { kind: "method", name: "openidCallback", static: false, private: false, access: { has: obj => "openidCallback" in obj, get: obj => obj.openidCallback }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _refresh_decorators, { kind: "method", name: "refresh", static: false, private: false, access: { has: obj => "refresh" in obj, get: obj => obj.refresh }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updatePassword_decorators, { kind: "method", name: "updatePassword", static: false, private: false, access: { has: obj => "updatePassword" in obj, get: obj => obj.updatePassword }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _logout_decorators, { kind: "method", name: "logout", static: false, private: false, access: { has: obj => "logout" in obj, get: obj => obj.logout }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _setup2FASecret_decorators, { kind: "method", name: "setup2FASecret", static: false, private: false, access: { has: obj => "setup2FASecret" in obj, get: obj => obj.setup2FASecret }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _enable2FA_decorators, { kind: "method", name: "enable2FA", static: false, private: false, access: { has: obj => "enable2FA" in obj, get: obj => obj.enable2FA }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _disable2FA_decorators, { kind: "method", name: "disable2FA", static: false, private: false, access: { has: obj => "disable2FA" in obj, get: obj => obj.disable2FA }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _verify2FACode_decorators, { kind: "method", name: "verify2FACode", static: false, private: false, access: { has: obj => "verify2FACode" in obj, get: obj => obj.verify2FACode }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _useBackup2FACode_decorators, { kind: "method", name: "useBackup2FACode", static: false, private: false, access: { has: obj => "useBackup2FACode" in obj, get: obj => obj.useBackup2FACode }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _forgotPassword_decorators, { kind: "method", name: "forgotPassword", static: false, private: false, access: { has: obj => "forgotPassword" in obj, get: obj => obj.forgotPassword }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _resetPassword_decorators, { kind: "method", name: "resetPassword", static: false, private: false, access: { has: obj => "resetPassword" in obj, get: obj => obj.resetPassword }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _verifyEmail_decorators, { kind: "method", name: "verifyEmail", static: false, private: false, access: { has: obj => "verifyEmail" in obj, get: obj => obj.verifyEmail }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _resendVerificationEmail_decorators, { kind: "method", name: "resendVerificationEmail", static: false, private: false, access: { has: obj => "resendVerificationEmail" in obj, get: obj => obj.resendVerificationEmail }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthController = _classThis;
})();
exports.AuthController = AuthController;
