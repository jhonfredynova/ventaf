import fs from 'fs';
import os from 'os';
import path from 'path';
import Busboy from 'busboy';

export default uploadOptions => async (req, res, next) => {
  try {
    // Initialize busboy and variables
    // Init req.body because we disable nextjs parsing
    req.body = {};
    let isErrorFileLimit = false;
    const { allowedExtentions, maxFiles, maxFileSize } = uploadOptions;
    const busboy = new Busboy({
      headers: req.headers,
      limits: {
        files: maxFiles || 1,
        fileSize: (maxFileSize || 5) * 1024 * 1024 
      }
    });

    // On receive a new field
    busboy.on('field', (fieldname, fieldValue) => {
      try {
        req.body[fieldname] = JSON.parse(fieldValue);
      } catch (error) {
        req.body[fieldname] = fieldValue;
      }
    });

    // On receive a new file
    busboy.on('file', async (fieldname, fileData, filename) => {
      const allowedFileExtentions = allowedExtentions || ['jpg', 'jpeg', 'png', 'gif'];

      if (!allowedFileExtentions.find(ext => filename.endsWith('.' + ext))) {
        return res.status(400).json({
          code: 'uploadErrorExtentions',
          message: allowedFileExtentions.join(', ')
        });
      }

      fileData.on('limit', () => {
        isErrorFileLimit = true;
        return res.status(400).json({
          code: 'uploadErrorSize',
          message: maxFileSize
        });
      });

      const tmpFilePath = path.join(os.tmpdir(), filename);
      req.body[fieldname] = (req.body[fieldname] || []).concat(tmpFilePath);
      fileData.pipe(fs.createWriteStream(tmpFilePath));
    });

    // On finish request
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