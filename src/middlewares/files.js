import fs from 'fs';
import os from 'os';
import path from 'path';
import Busboy from 'busboy';

export default options => {
  return async (req, res, next) => {
    try {
      const contentType = req.headers['content-type'];

      if (!contentType || contentType.indexOf('application/json') > -1) {
        return next();
      }

      // initialize req.body empty because we are not using nextjs body parse
      req.body = {};
      const { maxFiles, maxFileSize } = options;
      const busboy = new Busboy({
        headers: req.headers,
        limits: {
          files: maxFiles || 1,
          fileSize: (maxFileSize || 5) * 1024 * 1024
        }
      });

      let isErrorFileLimit = false;
      busboy.on('field', (fieldname, val) => {
        try {
          req.body[fieldname] = JSON.parse(val);
        } catch (error) {
          req.body[fieldname] = val;
        }
      });
      busboy.on('file', (fieldname, file, filename) => {
        const allowedExtentions = options.allowedExtentions || ['jpg', 'jpeg', 'png', 'gif'];

        if (!allowedExtentions.find(ext => filename.endsWith('.' + ext))) {
          res.status(400).json({
            code: 'upload-error-extentions',
            message: allowedExtentions.join(', ')
          });
          return;
        }

        file.on('limit', () => { 
          isErrorFileLimit = true;
          res.status(400).json({
            code: 'upload-error-size',
            message: maxFileSize
          });
        });

        const tmpFilePath = path.join(os.tmpdir(), filename);
        req.body[fieldname] = (req.body[fieldname] || []).concat(tmpFilePath);
        file.pipe(fs.createWriteStream(tmpFilePath));
      });
      busboy.on('finish', () => {
        if (!isErrorFileLimit) {
          next();
        }
      });

      req.pipe(busboy);
    } catch (error) {
      res.status(500).json(error);
    }
  };
};