import { getDbQuery } from '../../../utils/database-utils';

export default async function getAllLocales(req, res) {
  try {
    // eslint-disable-next-line global-require
    const firebaseAdmin = require('../../../firebase-admin').default;
    const db = firebaseAdmin.firestore();
    const localeQuery = {
      sort: { name: 'asc' }
    };
    const response = await getDbQuery(db, 'locales', localeQuery);

    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
}
