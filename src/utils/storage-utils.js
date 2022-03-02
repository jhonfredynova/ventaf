export const getFileReference = async data => {
  const { Storage } = await require('@google-cloud/storage');
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
  const { Storage } = await require('@google-cloud/storage');
  const { bucketName } = data;
  const gcs = new Storage();
  const bucket = gcs.bucket(bucketName);
  const filesToDelete = Array.isArray(data.fileUrls) ? data.fileUrls : [];
  const foldersToDelete = Array.isArray(data.folderPaths) ? data.folderPaths : [];
  let deletedPaths = [];

  // deleting files
  if (filesToDelete.length > 0) { 
    const deletePromises = filesToDelete.map(fileUrl => {
      return new Promise((resolve, reject) => {
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
      });
    });
    await Promise.all(deletePromises); 
  }

  // deleting folders 
  if (foldersToDelete.length > 0) {
    const deletePromises = foldersToDelete.map(folderPath => {
      return new Promise((resolve, reject) => {
        // removing first slash because issues with storage
        folderPath = (folderPath.startsWith('/') ? folderPath.substring(1) : folderPath);
        bucket.deleteFiles({ prefix: folderPath })
          .then(() => {
            deletedPaths = deletedPaths.concat(folderPath);
          })
          .catch(error => {
            console.error('Error, deleting file', error);
            reject(error);
          })
          .finally(() => {
            resolve();
          });
      });
    });
    await Promise.all(deletePromises);
  }

  return deletedPaths;
};

export const renameFile = (filePath, fileName) => {
  const fs = require('fs');
  const path = require('path');
  const fileDir = path.dirname(filePath);
  const newFilePath = path.join(fileDir, fileName);
  fs.renameSync(filePath, newFilePath);

  return newFilePath;
};

export const uploadToStorage = async data => {
  const path = require('path');
  const { Storage } = await require('@google-cloud/storage');
  const gcs = new Storage();
  const bucket = gcs.bucket(data.bucketName);

  const cleanFileName = uploadedFileName => {
    const fileExtention = uploadedFileName.split('.').pop();
    const fileName = uploadedFileName
      .toLowerCase()
      .replace(`.${fileExtention}`, '')
      .replace(/ /g,'-')
      .replace(/--/g, '-')
      .replace(/[^a-z0-9-]/gi, '')
      .toLowerCase();

    return `${fileName}.${fileExtention}`;
  };

  const uploadFile = async (filePath, storageOptions) => {
    const uploadedFileName = cleanFileName(path.basename(filePath));
    const uploadResponse = await bucket.upload(filePath, {
      destination: (storageOptions.bucketPath ? `${storageOptions.bucketPath}/${uploadedFileName}` : uploadedFileName)
    });
    const uploadedFile = uploadResponse[0];
    await uploadedFile.makePublic();

    return uploadedFile.publicUrl();
  };

  const uploadPromises = data.filePaths.map(filePath => {
    return uploadFile(filePath, data);
  });

  const uploadedFiles = await Promise.all(uploadPromises);

  return uploadedFiles;
};
