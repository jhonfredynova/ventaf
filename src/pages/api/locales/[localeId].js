import { getDbDocument } from '../../../utils/database-utils';
import { runMiddleware } from '../../../utils/api-utils';
import cors from '../../../middlewares/cors';

export default async function getLocaleById(req, res) {
	try {
		await runMiddleware(req, res, cors);

		// eslint-disable-next-line global-require
		const { getFirebaseAdmin } = require('../../../utils/api-utils');
		const firebaseAdmin = getFirebaseAdmin();
		const db = firebaseAdmin.firestore();
		const modelDb = await getDbDocument(db, 'locales', req.query.localeId);

		if (!modelDb) {
			res.status(400).json({ message: req.translations.recordNotFound });
			return;
		}

		res.json(modelDb);
	} catch (error) {
		res.status(500).json(error);
	}
}
