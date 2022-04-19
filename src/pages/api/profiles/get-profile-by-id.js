import { getDbDocument } from '../../../utils/database-utils';
import { getPublicProfileData } from '../../../utils/user-utils';
import { runMiddleware } from '../../../utils/api-utils';
import cors from '../../../middlewares/cors';

export default async function getUserProfileById(req, res) {
	try {
		await runMiddleware(req, res, cors);

		// eslint-disable-next-line global-require
		const { getFirebaseAdmin } = require('../../../utils/api-utils');
		const firebaseAdmin = getFirebaseAdmin();
		const db = firebaseAdmin.firestore();
		const modelDb = await getDbDocument(db, 'users', req.query.userId);

		if (!modelDb) {
			res.status(400).json({ code: 'recordNotFound' });
			return;
		}

		const responseData = getPublicProfileData(modelDb);
		res.json(responseData);
	} catch (error) {
		res.status(500).json(error);
	}
}
