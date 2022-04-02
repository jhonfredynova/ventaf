import { runMiddleware } from '../../../../utils/api-utils';
import authorization from '../../../../middlewares/authorization';

export default async function createUserClaim(req, res) {
	try {
		await runMiddleware(req, res, authorization('admin'));

		// eslint-disable-next-line global-require
		const { getFirebaseAdmin } = require('../../../../utils/api-utils');
		const firebaseAdmin = getFirebaseAdmin();
		const { userId } = req.params;
		const { claim } = req.body;
		const user = await firebaseAdmin.auth().getUser(userId);
		const claims = { ...user.customClaims, [claim]: true };
		await firebaseAdmin.auth().setCustomUserClaims(userId, claims);

		res.json(claim);
	} catch (error) {
		res.status(500).json(error);
	}
}
