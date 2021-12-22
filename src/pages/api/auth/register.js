import { getUserProfileData } from '../../../utils/user-utils';
import validateRegister from '../../../validations/validate-register';

export default async function register(req, res) {
  try {
    const firebaseAdmin = require('../../../firebase-admin').default;
    const db = firebaseAdmin.firestore();
    const { id: userId }= req.body;
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
    const userProfile = getUserProfileData(modelData);
    await db
      .collection('users')
      .doc(userId)
      .set(userProfile);
    await firebaseAdmin.auth().setCustomUserClaims(userId, { registered: true });

    res.json(userProfile);
  } catch (error) {
    res.status(500).json(error);
  }
}
