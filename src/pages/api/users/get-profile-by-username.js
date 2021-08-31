import { getDbQuery } from '../../../utils/database-utils';
import { getPublicProfileData } from '../../../utils/user-utils';

export default async function getProfileByUsername(req, res) {
  try {
    const firebaseAdmin = require('../../../firebase-admin').default;
    const db = firebaseAdmin.firestore();
    const modelData = { username: req.query.username };
    const userResults = await getDbQuery(db, 'users', { where: { username: { '==': modelData.username } } });
    const userData = userResults[0] || null;
    const responseData = getPublicProfileData(userData);
    
    res.json(responseData);
  } catch (error) {
    res.status(500).json(error);
  }
}
