export const getFileReference = async data => {
  // eslint-disable-next-line global-require
  const { Storage } = require('@google-cloud/storage');
  const gcs = new Storage();
  const bucket = gcs.bucket(data.bucketName);
  const getPathStorageFromUrl = fileUrl => {
    const baseUrl = `https://storage.googleapis.com/${data.bucketName}`;
    let imagePath = fileUrl.replace(baseUrl, '');
    const indexOfEndPath = imagePath.indexOf('?');

    // In case url has a query parameters get rid of those to get a clean file path
    if (indexOfEndPath > -1) {
      imagePath = imagePath.substring(0, indexOfEndPath);
      imagePath = imagePath.replace('%2F','/'); 
      imagePath = (imagePath.startsWith('/') ? imagePath.substring(1) : imagePath);
    }
    
    return imagePath; 
  };
  const fileReference = bucket.file(getPathStorageFromUrl(data.fileUrl));

  return fileReference;
};

export const deleteFromStorage = async data => {
  // eslint-disable-next-line global-require
  const { Storage } = require('@google-cloud/storage');
  const { bucketName } = data;
  const gcs = new Storage();
  const bucket = gcs.bucket(bucketName);
  const filesToDelete = Array.isArray(data.fileUrls) ? data.fileUrls : [];
  const foldersToDelete = Array.isArray(data.folderPaths) ? data.folderPaths : [];
  let deletedPaths = [];

  // deleting files
  if (filesToDelete.length > 0) { 
    const deletePromises = filesToDelete.map(fileUrl => new Promise((resolve, reject) => {
        getFileReference({ bucketName, fileUrl })
          .then(fileReference => {
            fileReference.delete();    
            deletedPaths = deletedPaths.concat(fileUrl);
          })
          .catch(error => {
            console.error(`Error deleting ${fileUrl}`, error);  
            reject(error);
          })
          .finally(() => {
            resolve();
          });
      }));
    await Promise.all(deletePromises); 
  }

  // deleting folders 
  if (foldersToDelete.length > 0) {
    let newFolderPath = null;
    const deletePromises = foldersToDelete.map(folderPath => new Promise((resolve, reject) => {
        // removing first slash because issues with storage
        newFolderPath = (folderPath.startsWith('/') ? folderPath.substring(1) : folderPath);
        bucket.deleteFiles({ prefix: newFolderPath })
          .then(() => {
            deletedPaths = deletedPaths.concat(newFolderPath);
          })
          .catch(error => {
            console.error('Error, deleting file', error);
            reject(error);
          })
          .finally(() => {
            resolve();
          });
      }));
    await Promise.all(deletePromises);
  }

  return deletedPaths;
};

export const renameFile = (filePath, fileName) => {
  // eslint-disable-next-line global-require
  const fs = require('fs');
  // eslint-disable-next-line global-require
  const path = require('path');
  const fileDir = path.dirname(filePath);
  const newFilePath = path.join(fileDir, fileName);
  fs.renameSync(filePath, newFilePath);

  return newFilePath;
};

export const uploadToStorage = async data => {
  // eslint-disable-next-line global-require
  const path = require('path');
  // eslint-disable-next-line global-require
  const { Storage } = await require('@google-cloud/storage');
  const gcs = new Storage();
  const bucket = gcs.bucket(data.bucketName);

  const cleanFileName = uploadedFileName => {
    const fileExtention = uploadedFileName
      .toLowerCase()
      .split('.')
      .pop();
    const fileName = uploadedFileName
      .toLowerCase()
      .replace(`.${fileExtention}`, '')
      .replace(/ /g,'-')
      .replace(/--/g, '-')
      .replace(/[^a-z0-9-]/gi, '');

    return `${fileName}.${fileExtention}`;
  };

  const uploadFile = async (filePath, storageOptions) => {
    const uploadedFileName = cleanFileName(path.basename(filePath));
    const fileBucketDestination = (storageOptions.bucketPath ? `${storageOptions.bucketPath}/${uploadedFileName}` : uploadedFileName);
    const uploadResponse = await bucket.upload(filePath, { destination: fileBucketDestination });
    const uploadedFile = uploadResponse[0];
    const uploadedFilePublicUrl = uploadedFile.publicUrl();

    return uploadedFilePublicUrl;
  };

  const uploadPromises = data.filePaths.map(filePath => uploadFile(filePath, data));
  const uploadedFiles = await Promise.all(uploadPromises);

  return uploadedFiles;
};
