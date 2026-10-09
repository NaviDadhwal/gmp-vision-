import { Request, Response, NextFunction, Router } from 'express';
import { cloudinary } from '../../config/cloudinary';
import { env } from '../../config/env';
import { requireAuth } from '../../middleware/requireAuth';
import { roleGuard } from '../../middleware/roleGuard';
import { upload } from '../../middleware/upload';
import { AppError } from '../../middleware/errorHandler';

import path from 'path';

function isValidFileSignature(buffer: Buffer, mimetype: string): boolean {
  if (buffer.length < 4) return false;

  if (mimetype === 'image/jpeg') {
    return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  }
  if (mimetype === 'image/png') {
    return (
      buffer.length >= 8 &&
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x4e &&
      buffer[3] === 0x47 &&
      buffer[4] === 0x0d &&
      buffer[5] === 0x0a &&
      buffer[6] === 0x1a &&
      buffer[7] === 0x0a
    );
  }
  if (mimetype === 'image/webp') {
    return (
      buffer.length >= 12 &&
      buffer.toString('utf-8', 0, 4) === 'RIFF' &&
      buffer.toString('utf-8', 8, 12) === 'WEBP'
    );
  }
  if (mimetype === 'application/pdf') {
    return buffer.length >= 5 && buffer.toString('utf-8', 0, 5) === '%PDF-';
  }
  return false;
}

export class MediaController {
  static async upload(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.file) {
        throw new AppError('No file provided for upload.', 400, 'FILE_MISSING');
      }

      const file = req.file;

      // Verify binary magic numbers / signature to prevent MIME spoofing (CWE-434)
      if (!isValidFileSignature(file.buffer, file.mimetype)) {
        throw new AppError(
          'File content does not match the declared MIME type. Malicious or corrupted file detected.',
          400,
          'INVALID_FILE_SIGNATURE'
        );
      }

      const isPdf = file.mimetype === 'application/pdf';

      // 10MB check for images per PRD Section 9.3
      if (!isPdf && file.size > 10 * 1024 * 1024) {
        throw new AppError('Image size exceeds 10MB limit.', 400, 'FILE_TOO_LARGE');
      }

      // Check for mock fallback in development
      if (!env.CLOUDINARY_API_KEY || env.CLOUDINARY_API_KEY === 'mock_key') {
        const safeBaseName = path.basename(file.originalname).replace(/[^a-zA-Z0-9._-]/g, '_');
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

      const uploadResult = await new Promise<any>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'gmp-vision',
            resource_type: resourceType,
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
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
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const rawPublicId = req.params.publicId;
      const publicId = Array.isArray(rawPublicId) ? rawPublicId.join('/') : (rawPublicId as string);

      if (!env.CLOUDINARY_API_KEY || env.CLOUDINARY_API_KEY === 'mock_key') {
        console.log(`☁️ [Mock Cloudinary] Simulating deletion of ${publicId}`);
        res.status(200).json({
          success: true,
          data: { message: `Asset ${publicId} deleted successfully.` },
        });
        return;
      }

      const result = await cloudinary.uploader.destroy(publicId);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const mediaRouter = Router();

mediaRouter.post(
  '/upload',
  requireAuth,
  roleGuard(['admin', 'superadmin']),
  upload.single('file'),
  MediaController.upload
);

mediaRouter.delete(
  '/{*publicId}',
  requireAuth,
  roleGuard(['admin', 'superadmin']),
  MediaController.delete
);
