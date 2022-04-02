import { getDbDocument } from '../../../utils/database-utils';

export default async function removeLocale(req, res) {
	try {
		// eslint-disable-next-line global-require
		const { getFirebaseAdmin } = require('../../../utils/api-utils');
		const firebaseAdmin = getFirebaseAdmin();
		const { localeId } = req.query;
		const db = firebaseAdmin.firestore();
		const modelDb = await getDbDocument(db, 'locales', localeId);

		if (!modelDb) {
			res.status(400).json({ message: req.translations.recordNotFound });
			return;
		}

		await db.collection('locales').doc(localeId).delete();

		res.json(modelDb);
	} catch (error) {
		res.status(500).json(error);
	}
}
