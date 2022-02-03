import { getDbDocument } from '../../../utils/database-utils';
import { getUserProfileData } from '../../../utils/user-utils';

export default async function loginFacebook(req, res) {
  try {
    const firebaseAdmin = require('../../../firebase-admin').default;
    const firebaseClient = require('../../../firebase-client').default;
    const facebookResponse = req.body;

    // get firebase token
    const credential = firebaseClient
      .auth
      .FacebookAuthProvider
      .credential(facebookResponse.credential.oauthAccessToken);
    let loginResponse = await firebaseClient.auth().signInWithCredential(credential);
    let loginToken = await loginResponse.user.getIdToken();

    // register user profile
    const { user } = facebookResponse;
    const db = firebaseAdmin.firestore();
    const userExist = await getDbDocument(db, 'users', user.uid);

    if (!userExist) {
      const userProfile = getUserProfileData(user);
      await db
        .collection('users')
        .doc(user.uid)
        .set(userProfile);
      await firebaseAdmin.auth().setCustomUserClaims(user.uid, { registered: true });

      // loging user to refresh custom claims
      loginResponse = await firebaseClient.auth().signInWithCredential(credential);
      loginToken = await loginResponse.user.getIdToken();
    }

    res.json({ token: loginToken });
  } catch (error) {
    res.status(500).json(error);
  }
}
