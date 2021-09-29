import fs from 'fs';
import os from 'os';
import path from 'path';
import Busboy from 'busboy';

export default uploadOptions => async (req, res, next) => {
  try {
    // Initialize busboy and variables
    // Initialize req.body because we disable nextjs parsing
    req.body = {};
    let isErrorFileLimit = false;
    const { allowedExtentions, maxFiles, maxFileSize } = uploadOptions;
    const busboy = new Busboy({
      headers: req.headers,
      limits: {
        files: maxFiles || 1,
        fileSize: (maxFileSize || 1) * 1024 * 1024 
      }
    });
    const tmpdir = os.tmpdir();
    const fields = {};
    const files = {};

    // On receive a new field
    busboy.on('field', (fieldname, fieldValue) => {
      try {
        fields[fieldname] = JSON.parse(fieldValue);
      } catch (error) {
        fields[fieldname] = fieldValue;
      }
    });

    // On receive a new file
    busboy.on('file', async (fieldname, file, filename) => {
      try {
        const allowedFileExtentions = allowedExtentions || ['jpg', 'jpeg', 'png', 'gif'];

        if (!allowedFileExtentions.find(ext => filename.endsWith('.' + ext))) {
          throw {
            code: 'uploadErrorExtentions',
            message: allowedFileExtentions.join(', ')
          };
        }

        file.on('limit', () => {
          isErrorFileLimit = true;
        });

        const filepath = path.join(tmpdir, filename);
        files[fieldname] = (files[fieldname] || []).concat(filepath);

        const writeStream = fs.createWriteStream(filepath);
        file.pipe(writeStream);

      } catch (error) {
        res.status(400).json(error);
      }
    });

    // On finish request
    busboy.on('finish', () => {
      if (isErrorFileLimit) {
        return res.status(400).json({
          code: 'uploadErrorSize',
          message: maxFileSize
        });
      }

      req.body = fields;
      req.files = files;
      next();
    });

    // Process files in request
    if (process.env.NODE_ENV === 'development') {
      req.pipe(busboy);
    } else {
      busboy.end(req.rawBody);
    }

  } catch (error) {
    res.status(500).json(error);
  }
};