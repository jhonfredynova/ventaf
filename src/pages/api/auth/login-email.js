import valideLoginEmail from '../../../validations/validate-login-email';
import { createJsonWebToken } from '../../../utils/auth-utils';

export default async function loginEmail(req, res) {
  try {
    const firebaseAdmin = require( '../../../firebase-admin').default;
    const firebaseClient = require( '../../../firebase-client').default;
    const modelData = req.body;
    const errors = valideLoginEmail(modelData);

    if (Object.keys(errors).length > 0) {
      res.status(400).json({ code: 'modelErrors', errors });
      return;
    }

    const signInResponse = await firebaseClient
      .auth()
      .signInWithEmailAndPassword(modelData.email, modelData.password);
    const userData = await firebaseAdmin.auth().getUser(signInResponse.user.uid);
    const jwtToken = createJsonWebToken(userData, process.env.FIREBASE_KEY);
    
    res.json({ token: jwtToken });
  } catch (error) {
    res.status(500).json(error);
  }
}
