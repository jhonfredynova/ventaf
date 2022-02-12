import { createJsonWebToken } from '../../../utils/auth-utils';
import { getDbDocument } from '../../../utils/database-utils';
import { getUserProfileData } from '../../../utils/user-utils';

export default async function loginGoogle(req, res) {
  try {
    const firebaseAdmin = require('../../../firebase-admin').default;
    const userOAuth = req.body;
    const { uid } = userOAuth;

    // register user profile
    const db = firebaseAdmin.firestore();
    const userExist = await getDbDocument(db, 'users', uid);

    if (!userExist) {
      const userProfile = getUserProfileData(userOAuth);
      await db
        .collection('users')
        .doc(uid)
        .set(userProfile);
      await firebaseAdmin.auth().setCustomUserClaims(uid, { registered: true });
    }

    // Create json web token
    const userData = await firebaseAdmin.auth().getUser(uid);
    const jwtToken = createJsonWebToken(userData, process.env.FIREBASE_KEY);

    res.json({ token: jwtToken });
    
  } catch (error) {
    res.status(500).json(error);
  }
}
