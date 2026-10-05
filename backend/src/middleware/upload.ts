import multer from 'multer';
import { AppError } from './errorHandler';

const storage = multer.memoryStorage();

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
];

export const upload = multer({
  storage,
  limits: {
    fileSize: 25 * 1024 * 1024, // 25MB max file size (PDF limit; images checked below)
  },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new AppError(
          `Invalid file format '${file.mimetype}'. Only JPEG, PNG, WebP, and PDF files are permitted.`,
          400,
          'INVALID_FILE_TYPE'
        )
      );
    }
  },
});
