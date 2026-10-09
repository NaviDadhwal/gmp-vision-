"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const errorHandler_1 = require("./errorHandler");
const storage = multer_1.default.memoryStorage();
const ALLOWED_MIME_TYPES = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'application/pdf',
];
exports.upload = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 25 * 1024 * 1024, // 25MB max file size (PDF limit; images checked below)
    },
    fileFilter: (_req, file, cb) => {
        if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new errorHandler_1.AppError(`Invalid file format '${file.mimetype}'. Only JPEG, PNG, WebP, and PDF files are permitted.`, 400, 'INVALID_FILE_TYPE'));
        }
    },
});
