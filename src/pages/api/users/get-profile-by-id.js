import { getDbDocument } from '../../../utils/database-utils';
import { getPublicProfileData } from '../../../utils/user-utils';

export default async function getUserProfileById(req, res) {
  try {
    const firebaseAdmin = require('../../../firebase-admin').default;
    const db = firebaseAdmin.firestore();
    const modelDb = await getDbDocument(db, 'users', req.query.userId);

    if (!modelDb) {
      res.status(400).json({ code: 'record-not-found' });
      return;
    }

    const responseData = getPublicProfileData(modelDb);
    res.json(responseData);
  } catch (error) {
    res.status(500).json(error);
  }
}
