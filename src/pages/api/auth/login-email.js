import jsonwebtoken from 'jsonwebtoken';
import valideLoginEmail from '../../../validations/validate-login-email';

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

    const tokenPayload = {
      uid: userData.uid,
      claims: Object.keys(userData.customClaims),
      displayName: userData.displayName,
      email: userData.email,
      emailVerified: userData.emailVerified,
      providerData: userData.providerData,
    };
    const jwtToken = jsonwebtoken.sign(tokenPayload, process.env.FIREBASE_KEY, { expiresIn: '12m' });

    res.json({ token: jwtToken });
  } catch (error) {
    res.status(500).json(error);
  }
}
