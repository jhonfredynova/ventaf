import { getUserProfileData } from '../../../utils/user-utils';
import { isEmail } from '../../../utils/validation-utils';

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
    let errors = {};
    const { email, password } = modelData;

    if (!email?.trim()) {
      errors.email = 'fieldRequired';
    } else if (!isEmail(email)) {
      errors.email = 'fieldInvalidEmail';
    }

    if (!password?.trim()) {
      errors.password = 'fieldRequired';
    } else if (password?.length < 6) {
      errors.password = 'fieldPasswordInsecure';
    }

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
    const response = await firebaseClient
      .auth()
      .signInWithEmailAndPassword(modelData.email, modelData.password);
    const token = await response.user.getIdToken();

    res.json({ token });
  } catch (error) {
    res.status(500).json(error);
  }
}
