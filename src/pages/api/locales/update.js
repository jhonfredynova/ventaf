import { getDbDocument } from '../../../utils/database-utils';
import { runMiddleware } from '../../../utils/api-utils';
import cors from '../../../middlewares/cors';

export default async function updateLocale(req, res) {
	try {
		await runMiddleware(req, res, cors);

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

		const modelData = {
			...req.body,
			id: localeId,
			updatedAt: Date.now(),
		};

		// validating data
		const errors = {};

		if (Object.keys(errors).length > 0) {
			res.status(400).json({ errors });
			return;
		}

		// saving data
		await db.collection('locales').doc(localeId).update(modelData);

		// response
		const response = Object.assign(modelDb, modelData);
		res.json(response);
	} catch (error) {
		res.status(500).json(error);
	}
}
