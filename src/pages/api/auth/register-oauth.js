import { getDbDocument } from '../../../utils/database-utils';
import { getUserProfileData } from '../../../utils/user-utils';

export default async function registerOAuth(req, res) {
  try {
    const firebaseAdmin = require('../../../firebase-admin').default;
    const oAuthResponse = req.body;

    const { user } = oAuthResponse;
    const db = firebaseAdmin.firestore();
    const userExist = await getDbDocument(db, 'users', user.uid);

    if (!userExist) {
      const userProfile = getUserProfileData(user);
      await db
        .collection('users')
        .doc(user.uid)
        .set(userProfile);
      await firebaseAdmin.auth().setCustomUserClaims(user.uid, { registered: true });
    }

    res.json({ code: 'register-oauth-success' });
  } catch (error) {
    res.status(500).json(error);
  }
}
