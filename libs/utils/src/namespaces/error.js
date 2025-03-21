"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMessage = void 0;
var ErrorMessage;
(function (ErrorMessage) {
    ErrorMessage["InvalidCredentials"] = "InvalidCredentials";
    ErrorMessage["UserAlreadyExists"] = "UserAlreadyExists";
    ErrorMessage["SecretsNotFound"] = "SecretsNotFound";
    ErrorMessage["OAuthUser"] = "OAuthUser";
    ErrorMessage["InvalidResetToken"] = "InvalidResetToken";
    ErrorMessage["InvalidVerificationToken"] = "InvalidVerificationToken";
    ErrorMessage["EmailAlreadyVerified"] = "EmailAlreadyVerified";
    ErrorMessage["TwoFactorNotEnabled"] = "TwoFactorNotEnabled";
    ErrorMessage["TwoFactorAlreadyEnabled"] = "TwoFactorAlreadyEnabled";
    ErrorMessage["InvalidTwoFactorCode"] = "InvalidTwoFactorCode";
    ErrorMessage["InvalidTwoFactorBackupCode"] = "InvalidTwoFactorBackupCode";
    ErrorMessage["InvalidBrowserConnection"] = "InvalidBrowserConnection";
    ErrorMessage["ResumeSlugAlreadyExists"] = "ResumeSlugAlreadyExists";
    ErrorMessage["ResumeNotFound"] = "ResumeNotFound";
    ErrorMessage["ResumeLocked"] = "ResumeLocked";
    ErrorMessage["ResumePrinterError"] = "ResumePrinterError";
    ErrorMessage["ResumePreviewError"] = "ResumePreviewError";
    ErrorMessage["SomethingWentWrong"] = "SomethingWentWrong";
})(ErrorMessage || (exports.ErrorMessage = ErrorMessage = {}));
