import { getDbDocument } from '../../../utils/database-utils';
import { runMiddleware } from '../../../utils/api-utils';
import authorization from '../../../middlewares/authorization';

export default async function me(req, res) {
  try {
    await runMiddleware(req, res, authorization('registered'));

    const firebaseAdmin = require('../../../firebase-admin').default;
    let user = req.user;

    if (user) {
      const db = firebaseAdmin.firestore();
      const profile = await getDbDocument(db, 'users', user.uid);
      user = Object.assign(user, { profile });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
}
