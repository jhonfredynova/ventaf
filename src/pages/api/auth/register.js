import { getUserProfileData } from '../../../utils/user-utils';
import { createJsonWebToken } from '../../../utils/auth-utils';
import validateRegister from '../../../validations/validate-register';

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
    const modelData = {
      ...userData,
      createdAt: Date.now(),
      displayName: userData.displayName || emailUsername,
      username: userData.username || emailUsername
    };

    // validating
    const errors = validateRegister(modelData);

    if (Object.keys(errors).length > 0) {
      res.status(400).json({ code: 'modelErrors', errors });
      return;
    }


    // registering
    const userRegistered = await firebaseClient
      .auth()
      .createUserWithEmailAndPassword(modelData.email, modelData.password);
    const { uid } = userRegistered.user;

    const userProfile = getUserProfileData(modelData);
    await db
      .collection('users')
      .doc(uid)
      .set(userProfile);
    await firebaseAdmin.auth().setCustomUserClaims(uid, { registered: true });

    // loging user to refresh custom claims
    const userDataPayload = await firebaseAdmin.auth().getUser(uid);
    const jwtToken = createJsonWebToken(userDataPayload, process.env.FIREBASE_KEY);

    res.json({ token: jwtToken });
  } catch (error) {
    res.status(500).json(error);
  }
}
