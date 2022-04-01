import { getDbDocument } from '../../../utils/database-utils';
import { getPublicProfileData } from '../../../utils/user-utils';

export default async function getUserProfileById(req, res) {
	try {
		// eslint-disable-next-line global-require
		const firebaseAdmin = require('../../../firebase-admin').default;
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
