import { runMiddleware } from '../../../utils/api-utils';
import authorization from '../../../middlewares/authorization';

export default async function changePassword(req, res) {
  try {
    await runMiddleware(req, res, authorization('registered'));
    
    const firebaseAdmin = require('../../../firebase-admin').default;
    const { password } = req.body;

    if (!password?.trim()) {
      res.status(400).json({ 
        code: 'model-errors', 
        errors: { password: 'enter-new-password' }
      });
      return;
    }

    await firebaseAdmin.auth().updateUser(req.user.uid, { password });

    res.json({ code: 'change-password-success' });
  } catch (error) {
    res.status(500).json(error);
  }
}
