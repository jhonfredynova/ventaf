import { getDbDocument } from '../../../utils/database-utils';

export default async function getPostById(req, res) {
  try {
    // eslint-disable-next-line global-require
    const firebaseAdmin = require('../../../firebase-admin').default;
    const db = firebaseAdmin.firestore();
    const modelDb = await getDbDocument(db, 'posts', req.query.postId);

    res.json(modelDb);
  } catch (error) {
    res.status(500).json(error);
  }
}
