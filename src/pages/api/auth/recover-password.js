import { isEmail } from '../../../utils/validation-utils';

export default async function recoverPassword(req, res) {
  try {
    const firebaseClient = require('../../../firebase-client').default;
    const { email } = req.body;
    const errors = {};

    if (!email?.trim()) {
      errors.email = 'enter-your-email';
    } else if (!isEmail(email)) {
      errors.email = 'email-invalid';
    }

    if (Object.keys(errors).length > 0) {
      res.status(400).json({ code: 'model-errors', errors });
      return;
    }

    await firebaseClient.auth().sendPasswordResetEmail(email);
    res.json({ code: 'recover-password-success' });
  } catch (error) {
    res.status(500).json(error);
  }
}
