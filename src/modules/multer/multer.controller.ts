import { Controller } from '../../typedefs';
import { s3Upload } from '../s3/s3.service';
import { v4 as uuid } from 'uuid';

export const uploadImage: Controller = async (req, res) => {
  const files = req.files as Express.Multer.File[];

  if (!files || files.length === 0) {
    return res
      .status(400)
      .json({ status: 'error', message: 'No file uploaded' });
  }

  const image = files[0];

  const result = await s3Upload(image, uuid());

  res.json({ status: 'success', result });
};
