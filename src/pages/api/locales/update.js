import { getDbDocument } from '../../../utils/database-utils';

export default async function updateLocale(req, res) {
  try {
    const firebaseAdmin = require('../../../firebase-admin').default;
    const { localeId } = req.query;
    const db = firebaseAdmin.firestore();
    const modelDb = await getDbDocument(db, 'locales', localeId);

    if (!modelDb) {
      res.status(400).json({ message: req.translations['recordNotFound'] });
      return;
    }

    let modelData = {
      ...req.body,
      id: localeId,
      updatedAt: Date.now()
    };

    // validating data
    const errors = {};

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    // saving data
    await db
      .collection('locales')
      .doc(localeId)
      .update(modelData);

    // response
    const response = Object.assign(modelDb, modelData);
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
}
