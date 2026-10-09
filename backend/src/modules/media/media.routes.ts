import { Request, Response, NextFunction, Router } from 'express';
import { cloudinary } from '../../config/cloudinary';
import { env } from '../../config/env';
import { requireAuth } from '../../middleware/requireAuth';
import { roleGuard } from '../../middleware/roleGuard';
import { upload } from '../../middleware/upload';
import { AppError } from '../../middleware/errorHandler';

export class MediaController {
  static async upload(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.file) {
        throw new AppError('No file provided for upload.', 400, 'FILE_MISSING');
      }

      const file = req.file;
      const isPdf = file.mimetype === 'application/pdf';

      // 10MB check for images per PRD Section 9.3
      if (!isPdf && file.size > 10 * 1024 * 1024) {
        throw new AppError('Image size exceeds 10MB limit.', 400, 'FILE_TOO_LARGE');
      }

      // Check for mock fallback in development
      if (!env.CLOUDINARY_API_KEY || env.CLOUDINARY_API_KEY === 'mock_key') {
        const mockPublicId = `gmp-vision/mock_${Date.now()}_${file.originalname.replace(/\s+/g, '_')}`;
        const mockUrl = `/uploads/${file.originalname}`;
        console.log(`☁️ [Mock Cloudinary] Simulating upload for ${file.originalname}`);

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
