"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaRouter = exports.MediaController = void 0;
const express_1 = require("express");
const cloudinary_1 = require("../../config/cloudinary");
const env_1 = require("../../config/env");
const requireAuth_1 = require("../../middleware/requireAuth");
const roleGuard_1 = require("../../middleware/roleGuard");
const upload_1 = require("../../middleware/upload");
const errorHandler_1 = require("../../middleware/errorHandler");
const path_1 = __importDefault(require("path"));
function isValidFileSignature(buffer, mimetype) {
    if (buffer.length < 4)
        return false;
    if (mimetype === 'image/jpeg') {
        return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
    }
    if (mimetype === 'image/png') {
        return (buffer.length >= 8 &&
            buffer[0] === 0x89 &&
            buffer[1] === 0x50 &&
            buffer[2] === 0x4e &&
            buffer[3] === 0x47 &&
            buffer[4] === 0x0d &&
            buffer[5] === 0x0a &&
            buffer[6] === 0x1a &&
            buffer[7] === 0x0a);
    }
    if (mimetype === 'image/webp') {
        return (buffer.length >= 12 &&
            buffer.toString('utf-8', 0, 4) === 'RIFF' &&
            buffer.toString('utf-8', 8, 12) === 'WEBP');
    }
    if (mimetype === 'application/pdf') {
        return buffer.length >= 5 && buffer.toString('utf-8', 0, 5) === '%PDF-';
    }
    return false;
}
class MediaController {
    static async upload(req, res, next) {
        try {
            if (!req.file) {
                throw new errorHandler_1.AppError('No file provided for upload.', 400, 'FILE_MISSING');
            }
            const file = req.file;
            // Verify binary magic numbers / signature to prevent MIME spoofing (CWE-434)
            if (!isValidFileSignature(file.buffer, file.mimetype)) {
                throw new errorHandler_1.AppError('File content does not match the declared MIME type. Malicious or corrupted file detected.', 400, 'INVALID_FILE_SIGNATURE');
            }
            const isPdf = file.mimetype === 'application/pdf';
            // 10MB check for images per PRD Section 9.3
            if (!isPdf && file.size > 10 * 1024 * 1024) {
                throw new errorHandler_1.AppError('Image size exceeds 10MB limit.', 400, 'FILE_TOO_LARGE');
            }
            // Check for mock fallback in development
            if (!env_1.env.CLOUDINARY_API_KEY || env_1.env.CLOUDINARY_API_KEY === 'mock_key') {
                const safeBaseName = path_1.default.basename(file.originalname).replace(/[^a-zA-Z0-9._-]/g, '_');
                const mockPublicId = `gmp-vision/mock_${Date.now()}_${safeBaseName}`;
                const mockUrl = `/uploads/${safeBaseName}`;
                console.log(`☁️ [Mock Cloudinary] Simulating upload for ${safeBaseName}`);
                res.status(200).json({
                    success: true,
                    data: {
                        url: mockUrl,
                        publicId: mockPublicId,
                        format: file.mimetype,
                        bytes: file.size,
                    },
                });
                return;
            }
            // Stream upload to Cloudinary
            const resourceType = isPdf ? 'raw' : 'image';
            const uploadResult = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary_1.cloudinary.uploader.upload_stream({
                    folder: 'gmp-vision',
                    resource_type: resourceType,
                }, (error, result) => {
                    if (error)
                        return reject(error);
                    resolve(result);
                });
                uploadStream.end(file.buffer);
            });
            res.status(200).json({
                success: true,
                data: {
                    url: uploadResult.secure_url,
                    publicId: uploadResult.public_id,
                    format: uploadResult.format,
                    bytes: uploadResult.bytes,
                },
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async delete(req, res, next) {
        try {
            const rawPublicId = req.params.publicId;
            const publicId = Array.isArray(rawPublicId) ? rawPublicId.join('/') : rawPublicId;
            if (!env_1.env.CLOUDINARY_API_KEY || env_1.env.CLOUDINARY_API_KEY === 'mock_key') {
                console.log(`☁️ [Mock Cloudinary] Simulating deletion of ${publicId}`);
                res.status(200).json({
                    success: true,
                    data: { message: `Asset ${publicId} deleted successfully.` },
                });
                return;
            }
            const result = await cloudinary_1.cloudinary.uploader.destroy(publicId);
            res.status(200).json({
                success: true,
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.MediaController = MediaController;
exports.mediaRouter = (0, express_1.Router)();
exports.mediaRouter.post('/upload', requireAuth_1.requireAuth, (0, roleGuard_1.roleGuard)(['admin', 'superadmin']), upload_1.upload.single('file'), MediaController.upload);
exports.mediaRouter.delete('/{*publicId}', requireAuth_1.requireAuth, (0, roleGuard_1.roleGuard)(['admin', 'superadmin']), MediaController.delete);
