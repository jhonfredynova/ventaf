import { getDbQuery } from '../../../utils/database-utils';
import { getPublicProfileData } from '../../../utils/user-utils';
import { isEmail } from '../../../utils/validation-utils';
import { runMiddleware } from '../../../utils/api-utils';
import cors from '../../../middlewares/cors';

export default async function getProfileByEmail(req, res) {
	try {
		await runMiddleware(req, res, cors);

		// eslint-disable-next-line global-require
		const { getFirebaseAdmin } = require('../../../utils/api-utils');
		const firebaseAdmin = getFirebaseAdmin();
		const db = firebaseAdmin.firestore();
		const modelData = { email: req.query.email };
		const errors = {};

		if (!modelData.email?.trim()) {
			errors.email = 'fieldRequired';
		} else if (!isEmail(modelData.email)) {
			errors.email = 'fieldInvalidEmail';
		}

		if (Object.keys(errors).length > 0) {
			res.status(400).json({ code: 'modelErrors', errors });
			return;
		}

		const userProfile = await getDbQuery(db, 'profiles', {
			where: { email: { '==': modelData.email } },
		});
		const responseData = userProfile[0] ? getPublicProfileData(userProfile[0]) : null;

		if (responseData?.id) {
			const userAccount = await firebaseAdmin.auth().getUser(responseData.id);
			responseData.providers = userAccount.providerData.map((provider) => provider.providerId);
		}

		res.json(responseData);
	} catch (error) {
		res.status(500).json(error);
	}
}
