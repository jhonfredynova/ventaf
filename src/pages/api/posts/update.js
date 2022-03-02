import { getDbDocument } from '../../../utils/database-utils';
import { runMiddleware } from '../../../utils/api-utils';
import authorization from '../../../middlewares/authorization';
import files from '../../../middlewares/files';
import { getSearchTerms, deletePostImages } from '../../../utils/post-utils';
import validatePost from '../../../validations/validate-post';

export const config = {
  api: {
    bodyParser: false,
    sizeLimit: '1mb',
  },
};

export default async function updatePost(req, res) {
  try {
    await runMiddleware(req, res, files({ maxFileSize: 1, maxFiles: 6 }));
    await runMiddleware(req, res, authorization('registered'));
    
    const firebaseAdmin = require('../../../firebase-admin').default;
    const { uploadToStorage } = require('../../../utils/storage-utils');
    const { postId } = req.query;
    const db = firebaseAdmin.firestore();
    const postDb = await getDbDocument(db, 'posts', postId);

    if (!postDb) {
      res.status(400).json({ code: 'recordNotFound' });
      return;
    }

    if (postDb.user !== req.user.uid) {
      res.status(400).json({ code: 'adNotOwn' });
      return;
    }

    const modelData = Object
      .keys(req.body.data)
      .reduce((accum, key) => {
        return !['createdAt', 'likes', 'status', 'user', 'views'].includes(key)
          ? Object.assign(accum, { [key]: req.body.data[key] })
          : accum;
      }, {});
    const postData = {
      ...modelData,
      id: postId,
      searchTerms: getSearchTerms(modelData),
      updatedAt: Date.now()
    };

    // validate data
    const errors = validatePost(modelData);

    if (Object.keys(errors).length > 0) {
      res.status(400).json({ code: 'modelErrors', errors });
      return;
    }

    // updating post in transaction
    await db.runTransaction(async transaction => {
      const uploadedPhotos = req.files.photos || [];
      if (uploadedPhotos.length > 0) {
        // deleting post photos
        await deletePostImages(postDb.photos);

        // uploading photos
        const storageData = {
          bucketName: process.env.FIREBASE_STG_POST_UPLOADS,
          bucketPath: postId,
          filePaths: uploadedPhotos
        };
        postData.photos = await uploadToStorage(storageData);
      }

      // saving post data
      const postRef = await db.collection('posts').doc(postId);
      transaction.update(postRef, postData);
    });

    // response
    const postUpdated = {
      ...postDb, 
      ...postData
    };

    res.json(postUpdated);
  } catch (error) {
    console.error('Error updating post', error);
    res.status(500).json(error);
  }
}
