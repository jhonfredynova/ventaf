import { getUserProfileData } from '../../../utils/user-utils';

export default async function register(req, res) {
  try {
    const firebaseAdmin = require('../../../firebase-admin').default;
    const firebaseClient = require('../../../firebase-client').default;
    const db = firebaseAdmin.firestore();
    const userData = Object.keys(req.body).reduce((accum, key) => {
      return !['id'].includes(key)
        ? Object.assign(accum, { [key]: req.body[key] })
        : accum;
    }, {});
    const emailUsername = userData.email.split('@')[0];
    let modelData = {
      ...userData,
      createdAt: Date.now(),
      displayName: userData.displayName || emailUsername,
      username: userData.username || emailUsername,
      preferences: {
        currency: req.currency,
        dateFormat: req.dateFormat,
        language: req.language
      }
    };

    // registerig user
    const userRegistered = await firebaseClient
      .auth()
      .createUserWithEmailAndPassword(modelData.email, modelData.password);
    const { uid } = userRegistered.user;

    const userProfile = getUserProfileData(modelData, req);
    await db
      .collection('users')
      .doc(uid)
      .set(userProfile);
    await firebaseAdmin.auth().setCustomUserClaims(uid, { registered: true });

    // loging user to refresh custom claims
    const response = await firebaseClient
      .auth()
      .signInWithEmailAndPassword(modelData.email, modelData.password);
    const token = await response.user.getIdToken();

    res.json({ token });
  } catch (error) {
    res.status(500).json(error);
  }
}
