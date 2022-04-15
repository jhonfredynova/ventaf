import { runMiddleware } from '../../../../utils/api-utils';
import authorization from '../../../../middlewares/authorization';
import cors from '../../../../middlewares/cors';

export default async function updateUserClaim(req, res) {
	try {
		await runMiddleware(req, res, cors);
		await runMiddleware(req, res, authorization('admin'));

		// eslint-disable-next-line global-require
		const { getFirebaseAdmin } = require('../../../../utils/api-utils');
		const firebaseAdmin = getFirebaseAdmin();
		const { userId } = req.params;
		const { claim } = req.body;
		const user = await firebaseAdmin.auth().getUser(userId);

		if (!user) {
			res.status(400).json({ code: 'record-not-found' });
			return;
		}

		delete user.customClaims[claim];
		await firebaseAdmin.auth().setCustomUserClaims(userId, user.customClaims);

		res.json(claim);
	} catch (error) {
		res.status(500).json(error);
	}
}
