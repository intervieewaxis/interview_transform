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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const two_factor_guard_1 = require("../auth/guards/two-factor.guard");
let UserController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)("User"), (0, common_1.Controller)("user")];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _fetch_decorators;
    let _update_decorators;
    let _delete_decorators;
    var UserController = _classThis = class {
        constructor(authService, userService) {
            this.authService = (__runInitializers(this, _instanceExtraInitializers), authService);
            this.userService = userService;
        }
        fetch(user) {
            return user;
        }
        update(email, updateUserDto) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    // If user is updating their email, send a verification email
                    if (updateUserDto.email && updateUserDto.email !== email) {
                        yield this.userService.updateByEmail(email, {
                            emailVerified: false,
                            email: updateUserDto.email,
                        });
                        yield this.authService.sendVerificationEmail(updateUserDto.email);
                        email = updateUserDto.email;
                    }
                    return yield this.userService.updateByEmail(email, {
                        name: updateUserDto.name,
                        picture: updateUserDto.picture,
                        username: updateUserDto.username,
                        locale: updateUserDto.locale,
                    });
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
        delete(id, response) {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.userService.deleteOneById(id);
                response.clearCookie("Authentication");
                response.clearCookie("Refresh");
                response.status(200).send({ message: "Sorry to see you go, goodbye!" });
            });
        }
    };
    __setFunctionName(_classThis, "UserController");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _fetch_decorators = [(0, common_1.Get)("me"), (0, common_1.UseGuards)(two_factor_guard_1.TwoFactorGuard)];
        _update_decorators = [(0, common_1.Patch)("me"), (0, common_1.UseGuards)(two_factor_guard_1.TwoFactorGuard)];
        _delete_decorators = [(0, common_1.Delete)("me"), (0, common_1.UseGuards)(two_factor_guard_1.TwoFactorGuard)];
        __esDecorate(_classThis, null, _fetch_decorators, { kind: "method", name: "fetch", static: false, private: false, access: { has: obj => "fetch" in obj, get: obj => obj.fetch }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: obj => "update" in obj, get: obj => obj.update }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _delete_decorators, { kind: "method", name: "delete", static: false, private: false, access: { has: obj => "delete" in obj, get: obj => obj.delete }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UserController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UserController = _classThis;
})();
exports.UserController = UserController;
