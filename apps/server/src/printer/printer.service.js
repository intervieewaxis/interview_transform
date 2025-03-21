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
exports.PrinterService = void 0;
const common_1 = require("@nestjs/common");
const fontkit_1 = __importDefault(require("@pdf-lib/fontkit"));
const utils_1 = require("@reactive-resume/utils");
const async_retry_1 = __importDefault(require("async-retry"));
const pdf_lib_1 = require("pdf-lib");
const puppeteer_1 = require("puppeteer");
let PrinterService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PrinterService = _classThis = class {
        constructor(configService, storageService, httpService) {
            this.configService = configService;
            this.storageService = storageService;
            this.httpService = httpService;
            this.logger = new common_1.Logger(PrinterService.name);
            const chromeUrl = this.configService.getOrThrow("CHROME_URL");
            const chromeToken = this.configService.getOrThrow("CHROME_TOKEN");
            this.browserURL = `${chromeUrl}?token=${chromeToken}`;
            this.ignoreHTTPSErrors = this.configService.getOrThrow("CHROME_IGNORE_HTTPS_ERRORS");
        }
        getBrowser() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    return yield (0, puppeteer_1.connect)({
                        browserWSEndpoint: this.browserURL,
                        acceptInsecureCerts: this.ignoreHTTPSErrors,
                    });
                }
                catch (error) {
                    throw new common_1.InternalServerErrorException(utils_1.ErrorMessage.InvalidBrowserConnection, error.message);
                }
            });
        }
        getVersion() {
            return __awaiter(this, void 0, void 0, function* () {
                const browser = yield this.getBrowser();
                const version = yield browser.version();
                yield browser.disconnect();
                return version;
            });
        }
        printResume(resume) {
            return __awaiter(this, void 0, void 0, function* () {
                const start = performance.now();
                const url = yield (0, async_retry_1.default)(() => this.generateResume(resume), {
                    retries: 3,
                    randomize: true,
                    onRetry: (_, attempt) => {
                        this.logger.log(`Retrying to print resume #${resume.id}, attempt #${attempt}`);
                    },
                });
                const duration = Number(performance.now() - start).toFixed(0);
                const numberPages = resume.data.metadata.layout.length;
                this.logger.debug(`Chrome took ${duration}ms to print ${numberPages} page(s)`);
                return url;
            });
        }
        printPreview(resume) {
            return __awaiter(this, void 0, void 0, function* () {
                const start = performance.now();
                const url = yield (0, async_retry_1.default)(() => this.generatePreview(resume), {
                    retries: 3,
                    randomize: true,
                    onRetry: (_, attempt) => {
                        this.logger.log(`Retrying to generate preview of resume #${resume.id}, attempt #${attempt}`);
                    },
                });
                const duration = Number(performance.now() - start).toFixed(0);
                this.logger.debug(`Chrome took ${duration}ms to generate preview`);
                return url;
            });
        }
        generateResume(resume) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const browser = yield this.getBrowser();
                    const page = yield browser.newPage();
                    const publicUrl = this.configService.getOrThrow("PUBLIC_URL");
                    const storageUrl = this.configService.getOrThrow("STORAGE_URL");
                    let url = publicUrl;
                    if ([publicUrl, storageUrl].some((url) => /https?:\/\/localhost(:\d+)?/.test(url))) {
                        // Switch client URL from `http[s]://localhost[:port]` to `http[s]://host.docker.internal[:port]` in development
                        // This is required because the browser is running in a container and the client is running on the host machine.
                        url = url.replace(/localhost(:\d+)?/, (_match, port) => `host.docker.internal${port !== null && port !== void 0 ? port : ""}`);
                        yield page.setRequestInterception(true);
                        // Intercept requests of `localhost` to `host.docker.internal` in development
                        page.on("request", (request) => {
                            if (request.url().startsWith(storageUrl)) {
                                const modifiedUrl = request
                                    .url()
                                    .replace(/localhost(:\d+)?/, (_match, port) => `host.docker.internal${port !== null && port !== void 0 ? port : ""}`);
                                void request.continue({ url: modifiedUrl });
                            }
                            else {
                                void request.continue();
                            }
                        });
                    }
                    // Set the data of the resume to be printed in the browser's session storage
                    const numberPages = resume.data.metadata.layout.length;
                    yield page.evaluateOnNewDocument((data) => {
                        window.localStorage.setItem("resume", JSON.stringify(data));
                    }, resume.data);
                    yield page.goto(`${url}/artboard/preview`, { waitUntil: "networkidle0" });
                    const pagesBuffer = [];
                    const processPage = (index) => __awaiter(this, void 0, void 0, function* () {
                        var _a, _b, _c, _d;
                        const pageElement = yield page.$(`[data-page="${index}"]`);
                        // eslint-disable-next-line unicorn/no-await-expression-member
                        const width = (_b = (yield ((_a = (yield (pageElement === null || pageElement === void 0 ? void 0 : pageElement.getProperty("scrollWidth")))) === null || _a === void 0 ? void 0 : _a.jsonValue()))) !== null && _b !== void 0 ? _b : 0;
                        // eslint-disable-next-line unicorn/no-await-expression-member
                        const height = (_d = (yield ((_c = (yield (pageElement === null || pageElement === void 0 ? void 0 : pageElement.getProperty("scrollHeight")))) === null || _c === void 0 ? void 0 : _c.jsonValue()))) !== null && _d !== void 0 ? _d : 0;
                        const temporaryHtml = yield page.evaluate((element) => {
                            const clonedElement = element.cloneNode(true);
                            const temporaryHtml_ = document.body.innerHTML;
                            document.body.innerHTML = clonedElement.outerHTML;
                            return temporaryHtml_;
                        }, pageElement);
                        // Apply custom CSS if enabled
                        const css = resume.data.metadata.css;
                        if (css.visible) {
                            yield page.evaluate((cssValue) => {
                                const styleTag = document.createElement("style");
                                styleTag.textContent = cssValue;
                                document.head.append(styleTag);
                            }, css.value);
                        }
                        const uint8array = yield page.pdf({ width, height, printBackground: true });
                        const buffer = Buffer.from(uint8array);
                        pagesBuffer.push(buffer);
                        yield page.evaluate((temporaryHtml_) => {
                            document.body.innerHTML = temporaryHtml_;
                        }, temporaryHtml);
                    });
                    // Loop through all the pages and print them, by first displaying them, printing the PDF and then hiding them back
                    for (let index = 1; index <= numberPages; index++) {
                        yield processPage(index);
                    }
                    // Using 'pdf-lib', merge all the pages from their buffers into a single PDF
                    const pdf = yield pdf_lib_1.PDFDocument.create();
                    pdf.registerFontkit(fontkit_1.default);
                    // Get information about fonts used in the resume from the metadata
                    const fontData = resume.data.metadata.typography.font;
                    const fontUrls = (0, utils_1.getFontUrls)(fontData.family, fontData.variants);
                    // Load all the fonts from the URLs using HttpService
                    const responses = yield Promise.all(fontUrls.map((url) => this.httpService.axiosRef.get(url, {
                        responseType: "arraybuffer",
                    })));
                    const fontsBuffer = responses.map((response) => response.data);
                    // Embed all the fonts in the PDF
                    yield Promise.all(fontsBuffer.map((buffer) => pdf.embedFont(buffer)));
                    for (const element of pagesBuffer) {
                        const page = yield pdf_lib_1.PDFDocument.load(element);
                        const [copiedPage] = yield pdf.copyPages(page, [0]);
                        pdf.addPage(copiedPage);
                    }
                    // Save the PDF to storage and return the URL to download the resume
                    // Store the URL in cache for future requests, under the previously generated hash digest
                    const buffer = Buffer.from(yield pdf.save());
                    // This step will also save the resume URL in cache
                    const resumeUrl = yield this.storageService.uploadObject(resume.userId, "resumes", buffer, resume.title);
                    // Close all the pages and disconnect from the browser
                    yield page.close();
                    yield browser.disconnect();
                    return resumeUrl;
                }
                catch (error) {
                    this.logger.error(error);
                    throw new common_1.InternalServerErrorException(utils_1.ErrorMessage.ResumePrinterError, error.message);
                }
            });
        }
        generatePreview(resume) {
            return __awaiter(this, void 0, void 0, function* () {
                const browser = yield this.getBrowser();
                const page = yield browser.newPage();
                const publicUrl = this.configService.getOrThrow("PUBLIC_URL");
                const storageUrl = this.configService.getOrThrow("STORAGE_URL");
                let url = publicUrl;
                if ([publicUrl, storageUrl].some((url) => /https?:\/\/localhost(:\d+)?/.test(url))) {
                    // Switch client URL from `http[s]://localhost[:port]` to `http[s]://host.docker.internal[:port]` in development
                    // This is required because the browser is running in a container and the client is running on the host machine.
                    url = url.replace(/localhost(:\d+)?/, (_match, port) => `host.docker.internal${port !== null && port !== void 0 ? port : ""}`);
                    yield page.setRequestInterception(true);
                    // Intercept requests of `localhost` to `host.docker.internal` in development
                    page.on("request", (request) => {
                        if (request.url().startsWith(storageUrl)) {
                            const modifiedUrl = request
                                .url()
                                .replace(/localhost(:\d+)?/, (_match, port) => `host.docker.internal${port !== null && port !== void 0 ? port : ""}`);
                            void request.continue({ url: modifiedUrl });
                        }
                        else {
                            void request.continue();
                        }
                    });
                }
                // Set the data of the resume to be printed in the browser's session storage
                yield page.evaluateOnNewDocument((data) => {
                    window.localStorage.setItem("resume", JSON.stringify(data));
                }, resume.data);
                yield page.setViewport({ width: 794, height: 1123 });
                yield page.goto(`${url}/artboard/preview`, { waitUntil: "networkidle0" });
                // Save the JPEG to storage and return the URL
                // Store the URL in cache for future requests, under the previously generated hash digest
                const uint8array = yield page.screenshot({ quality: 80, type: "jpeg" });
                const buffer = Buffer.from(uint8array);
                // Generate a hash digest of the resume data, this hash will be used to check if the resume has been updated
                const previewUrl = yield this.storageService.uploadObject(resume.userId, "previews", buffer, resume.id);
                // Close all the pages and disconnect from the browser
                yield page.close();
                yield browser.disconnect();
                return previewUrl;
            });
        }
    };
    __setFunctionName(_classThis, "PrinterService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PrinterService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PrinterService = _classThis;
})();
exports.PrinterService = PrinterService;
