import valideLoginEmail from '../../../validations/validate-login-email';

export default async function loginEmail(req, res) {
  try {
    const firebaseClient = require( '../../../firebase-client').default;
    const modelData = req.body;
    const errors = valideLoginEmail(modelData);

    if (Object.keys(errors).length > 0) {
      res.status(400).json({ code: 'modelErrors', errors });
      return;
    }

    const response = await firebaseClient
      .auth()
      .signInWithEmailAndPassword(modelData.email, modelData.password);
    const token = await response.user.getIdToken();

    res.json({ token });
  } catch (error) {
    res.status(500).json(error);
  }
}
