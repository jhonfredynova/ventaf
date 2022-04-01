import { runMiddleware } from '../../../../utils/api-utils';
import authorization from '../../../../middlewares/authorization';

export default async function getAllUserClaims(req, res) {
	try {
		await runMiddleware(req, res, authorization('admin'));

		// eslint-disable-next-line global-require
		const firebaseAdmin = require('../../../../firebase-admin').default;
		const { userId } = req.params;
		const user = await firebaseAdmin.auth().getUser(userId);
		let response = [];

		if (user.customClaims) {
			response = Object.keys(user.customClaims);
		}

		res.send(response);
	} catch (error) {
		res.status(500).json(error);
	}
}
