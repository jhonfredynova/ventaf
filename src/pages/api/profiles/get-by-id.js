import { getDbDocument } from '../../../utils/database-utils';
import { runMiddleware } from '../../../utils/api-utils';
import authorization from '../../../middlewares/authorization';
import cors from '../../../middlewares/cors';

export default async function getProfileById(req, res) {
	try {
		await runMiddleware(req, res, cors);
		await runMiddleware(req, res, authorization('admin'));

		// eslint-disable-next-line global-require
		const { getFirebaseAdmin } = require('../../../utils/api-utils');
		const firebaseAdmin = getFirebaseAdmin();
		const db = firebaseAdmin.firestore();
		const modelDb = await getDbDocument(db, 'profiles', req.query.userId);

		if (!modelDb) {
			res.status(400).json({ code: 'record-not-found' });
			return;
		}

		res.json(modelDb);
	} catch (error) {
		res.status(500).json(error);
	}
}
