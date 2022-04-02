import { getDbQuery } from '../../../utils/database-utils';
import { getPublicProfileData } from '../../../utils/user-utils';

export default async function getProfileByUsername(req, res) {
	try {
		// eslint-disable-next-line global-require
		const { getFirebaseAdmin } = require('../../../utils/api-utils');
		const firebaseAdmin = getFirebaseAdmin();
		const db = firebaseAdmin.firestore();
		const modelData = { username: req.query.username };
		const userResults = await getDbQuery(db, 'users', {
			where: { username: { '==': modelData.username } },
		});
		const userData = userResults[0] || null;
		const responseData = getPublicProfileData(userData);

		res.json(responseData);
	} catch (error) {
		res.status(500).json(error);
	}
}
