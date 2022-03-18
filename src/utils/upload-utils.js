import Resizer from 'react-image-file-resizer';

export const getFilesFromUrls = async fileUrls => {
  let filename = null;
  const filesPromises = fileUrls.map(fileUrl => new Promise(resolve => {
      fetch(fileUrl)
        .then(res => res.blob())
        .then(blob => {
          filename = fileUrl.split('?')[0].split('/').pop();
          resolve(new File([blob], filename));
        })
        .catch(error => console.error(error));
    }));

  return Promise.all(filesPromises);
};

export const resizeImage = async (files, width = 200, height = 200) => {
  const optimizedPromises = files.map(file => new Promise(resolve => {
      Resizer.imageFileResizer(file, width, height, 'WEBP', 80, 0, uri => resolve(uri), 'file');
    }));
  const optimizedFiles = await Promise.all(optimizedPromises);

  return optimizedFiles;
};

export const validateFiles = (files, allowedExtentions, maxSize) => {
  const getFileExtention = filename => filename.split('.').pop();
  const allowedFiles = files.filter(file => {
    if (maxSize && file.size > (1024 * 1024 * maxSize)) {
      return false;
    } if (!allowedExtentions.includes(getFileExtention(file.name))) {
      return false;
    } 
      return true;
    
  });

  return allowedFiles;
};