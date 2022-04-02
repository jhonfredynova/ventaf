import { getDbDocument } from '../../../utils/database-utils';
import { runMiddleware } from '../../../utils/api-utils';
import authorization from '../../../middlewares/authorization';

export default async function me(req, res) {
	try {
		await runMiddleware(req, res, authorization('registered'));

		// eslint-disable-next-line global-require
		const { getFirebaseAdmin } = require('../../../utils/api-utils');
		const firebaseAdmin = getFirebaseAdmin();
		const userData = req.user;
		const db = firebaseAdmin.firestore();
		const profile = await getDbDocument(db, 'users', userData.uid);

		// If user does not have a profile token is not valid
		if (!profile) {
			res.status(403).json({ code: 'auth-no-token' });
			return;
		}

		res.json({ ...userData, profile });
	} catch (error) {
		res.status(500).json(error);
	}
}
