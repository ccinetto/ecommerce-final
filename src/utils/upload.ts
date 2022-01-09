import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import Config from '../utils/config';

const storage = new GridFsStorage({
  url: Config.atlas_uri!,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return {
      bucketName: 'imagenes',
      filename: `${Date.now()}-ecommerce-${file.originalname}`,
    };
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
) => {
  if (
    file.mimetype == 'image/png' ||
    file.mimetype == 'image/jpg' ||
    file.mimetype == 'image/jpeg'
  ) {
    callback(null, true);
  } else {
    callback(null, false);
    //   cb(null, false);
    //   return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    //   return cb({msg: 'Only .png, .jpg and .jpeg format allowed!'});
  }
};

export const upload = multer({
  storage,
  fileFilter,
});
