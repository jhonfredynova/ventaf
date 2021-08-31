import { getDbDocument } from '../../../utils/database-utils';

export default async function updatePostViews(req, res) {
  try {
    const firebaseAdmin = require('../../../firebase-admin').default;
    const { postId } = req.query;
    const db = firebaseAdmin.firestore();
    const postInfo = await getDbDocument(db, 'posts', postId);

    if (!postInfo) {
      res.status(400).json({ code: 'record-not-found' });
      return;
    }
    
    const updatePost = {
      ...postInfo,
      views: (postInfo.views || 0) + 1
    };
    await db.collection('posts').doc(postId);

    await db.runTransaction(async transaction => {
      const postRef = await db.collection('posts').doc(postId);
      transaction.update(postRef, { views: updatePost.views });
    });

    res.json(updatePost);
  } catch (error) {
    res.status(500).json(error);
  }
}
