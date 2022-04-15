import { getDbQuery } from '../../../utils/database-utils';
import { runMiddleware } from '../../../utils/api-utils';
import cors from '../../../middlewares/cors';

export default async function getAllLocales(req, res) {
	try {
		await runMiddleware(req, res, cors);

		// eslint-disable-next-line global-require
		const { getFirebaseAdmin } = require('../../../utils/api-utils');
		const firebaseAdmin = getFirebaseAdmin();
		const db = firebaseAdmin.firestore();
		const localeQuery = {
			sort: { name: 'asc' },
		};
		const response = await getDbQuery(db, 'locales', localeQuery);

		res.json(response);
	} catch (error) {
		res.status(500).json(error);
	}
}
