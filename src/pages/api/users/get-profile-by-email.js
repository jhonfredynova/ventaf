import { getDbQuery } from '../../../utils/database-utils';
import { getPublicProfileData } from '../../../utils/user-utils';
import { isEmail } from '../../../utils/validation-utils';

export default async function getUserProfileByEmail(req, res) {
  try {
    const firebaseAdmin = require('../../../firebase-admin').default;
    const db = firebaseAdmin.firestore();
    const modelData = { email: req.query.email };
    const errors = {};

    if (!modelData.email?.trim()) {
      errors.email = 'field-required';
    } else if (!isEmail(modelData.email)) {
      errors.email = 'field-invalid-email';
    }

    if (Object.keys(errors).length > 0) {
      res.status(400).json({ code: 'model-errors', errors });
      return;
    }

    const userResults = await getDbQuery(db, 'users', { where: { email: { '==': modelData.email } } });
    const responseData = userResults[0] ? getPublicProfileData(userResults[0]) : null;
    
    res.json(responseData);
  } catch (error) {
    res.status(500).json(error);
  }
}
