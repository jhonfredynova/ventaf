import { runMiddleware } from '../../../utils/api-utils';
import authorization from '../../../middlewares/authorization';

export default async function changePassword(req, res) {
  try {
    await runMiddleware(req, res, authorization('registered'));
    
    const firebaseAdmin = require('../../../firebase-admin').default;
    let errors = {};
    const { password, passwordConfirmation } = req.body;

    if (!password?.trim()) {
      errors.password = 'fieldRequired';
    } else if (password?.length < 6) {
      errors.password = 'fieldPasswordInsecure';
    }

    if (password !== passwordConfirmation) {
      errors.passwordConfirmation = 'passwordsNotMatch';
    }

    if (Object.keys(errors).length > 0) {
      res.status(400).json({ code: 'modelErrors', errors });
      return;
    }

    await firebaseAdmin.auth().updateUser(req.user.uid, { password });

    res.json({ code: 'changePasswordSuccess' });
  } catch (error) {
    res.status(500).json(error);
  }
}
