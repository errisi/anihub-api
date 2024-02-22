import { Request } from 'express';
import multer, { MulterError } from 'multer';

const storage = multer.memoryStorage();

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  if (file.mimetype.split('/')[0] === 'image') {
    cb(null, true);
  } else {
    const error = new MulterError('LIMIT_UNEXPECTED_FILE');
    cb(error);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 128000000 },
});
