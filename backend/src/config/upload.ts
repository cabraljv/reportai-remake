import Multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export default {
  storage: Multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: function (req, file, cb) {
      const filename = crypto.randomBytes(18).toString('hex');
      const fileExtension = file.originalname.split('.')[1];
      cb(null, filename + '.' + fileExtension);
    },
  }),
};
