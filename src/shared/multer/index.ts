import { join } from 'path';
import * as moment from 'moment-jalaali';
import { diskStorage } from 'multer';
import * as mkdirp from 'mkdirp';
import { v4 as uuidv4 } from 'uuid';
import { HttpException } from '@nestjs/common';

export default (imgPath: string) => {
  return {
    storage: diskStorage({
      destination: (req, file, cb) => {
        const path = join(
          __dirname,
          '../../..',
          `public/${imgPath}`,
          moment().format('jYYYY-jMM-jDD').toString(),
        );
        mkdirp.sync(path);
        cb(null, path);
      },
      filename: (req, file, cb) => {
        const suffix = file.mimetype === 'image/png' ? '.png' : '.jpg';
        cb(null, uuidv4() + suffix);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (!['image/jpeg', 'image/png'].includes(file.mimetype)) {
        cb(
          new HttpException('only jpg and png images are supported', 400),
          false,
        );
      } else {
        cb(null, true);
      }
    },
    limits: {
      fileSize: 3 * 1024 * 1024,
    },
  };
};
