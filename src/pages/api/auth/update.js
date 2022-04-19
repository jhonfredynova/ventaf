import { getDbDocument, getDbQuery } from '../../../utils/database-utils';
import { runMiddleware } from '../../../utils/api-utils';
import authorization from '../../../middlewares/authorization';
import cors from '../../../middlewares/cors';
import validateProfileInfo from '../../../validations/validate-profile-info';

export default async function updateUser(req, res) {
	try {
		await runMiddleware(req, res, cors);
		await runMiddleware(req, res, authorization('registered'));

		// eslint-disable-next-line global-require
		const { getFirebaseAdmin } = require('../../../utils/api-utils');
		const firebaseAdmin = getFirebaseAdmin();
		const db = firebaseAdmin.firestore();
		const { userId } = req.query;
		const modelDb = await getDbDocument(db, 'users', userId);

		if (!modelDb) {
			res.status(400).json({ code: 'record-not-found' });
			return;
		}

		// validate model
		const modelData = {
			username: req.body.username,
			phone: req.body.phone,
			displayName: req.body.displayName,
			bio: req.body.bio,
			website: req.body.website,
			updatedAt: Date.now(),
		};
		const errors = validateProfileInfo(modelData);

		if (modelData.username) {
			const queryUsername = await getDbQuery(db, 'users', {
				where: {
					email: { '!=': modelDb.email },
					username: { '==': modelData.username },
				},
			});

			if (queryUsername.length > 0) {
				errors.username = 'usernameAlreadyExist';
			}
		}

		if (Object.keys(errors).length > 0) {
			res.status(400).json({ code: 'modelErrors', errors });
			return;
		}

		// update user
		await db.collection('users').doc(userId).update(modelData);

		const response = Object.assign(modelDb, modelData);
		res.json(response);
	} catch (error) {
		res.status(500).json(error);
	}
}
