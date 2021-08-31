import { getDbDocument } from '../../../utils/database-utils';

export default async function getLocaleById(req, res) {
  try {
    const firebaseAdmin = require('../../../firebase-admin').default;
    const db = firebaseAdmin.firestore();
    const modelDb = await getDbDocument(db, 'locales', req.query.localeId);

    if (!modelDb) {
      res.status(400).json({ message: req.translations['recordNotFound'] });
      return;
    }

    res.json(modelDb);
  } catch (error) {
    res.status(500).json(error);
  }
}
