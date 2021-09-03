import { getDbDocument } from '../../../utils/database-utils';
import { getSearchTerms } from '../../../utils/post-utils';
import { runMiddleware } from '../../../utils/api-utils';
import authorization from '../../../middlewares/authorization';
import files from '../../../middlewares/files';
import validatePost from '../../../validations/validate-post';

export const config = {
  api: {
    bodyParser: false,
    sizeLimit: '1mb',
  },
};

export default async function createPost(req, res) {
  try {
    await runMiddleware(req, res, authorization('registered'));
    await runMiddleware(req, res, files({ maxFileSize: 1, maxFiles: 6 }));

    const firebaseAdmin = require('../../../firebase-admin').default;
    const { uploadToStorage } = require('../../../utils/storage-utils');
    const db = firebaseAdmin.firestore();
    const userInfo = await getDbDocument(db, 'users', req.user.uid);
    const postData = req.body.data;
    const modelData = {
      ...postData,
      createdAt: Date.now(),
      status: 'active',
      photos: req.body.photos || [],
      searchTerms: getSearchTerms(postData),
      likes: 0,
      views: 0,
      user: (userInfo && userInfo.id)
    };

    // validate data
    const errors = validatePost(modelData);

    if (Object.keys(errors).length > 0) {
      res.status(400).json({ code: 'modelErrors', errors });
      return;
    }

    // saving post in a transaction
    let newPostId = null;
    let photoUrls = [];

    await db.runTransaction(async transaction => {
      // saving post
      const newPostRef = db.collection('posts').doc();
      await transaction.create(newPostRef, modelData);
      newPostId = newPostRef.id;

      // uploading photos
      const uploadedPhotos = req.body.photos;
      const storageData = {
        bucketName: process.env.FIREBASE_STG_POST_UPLOADS,
        bucketPath: newPostId,
        filePaths: uploadedPhotos
      };
      photoUrls = await uploadToStorage(storageData);
      const postRef = await db.collection('posts').doc(newPostId);

      transaction.update(postRef, { photos: photoUrls });
    });

    // response
    const postCreated = { 
      ...modelData, 
      id: newPostId, 
      photos: photoUrls 
    };

    res.json(postCreated);
  } catch (error) {
    console.error('Error creating new post', error);
    res.status(500).json(error);
  }
}
