import { getDbQuery } from '../../../utils/database-utils';
import { runMiddleware } from '../../../utils/api-utils';
import cors from '../../../middlewares/cors';

export default async function getAllUsers(req, res) {
	try {
		await runMiddleware(req, res, cors);

		// eslint-disable-next-line global-require
		const { getFirebaseAdmin } = require('../../../utils/api-utils');
		const firebaseAdmin = getFirebaseAdmin();
		const db = firebaseAdmin.firestore();
		const userQuery = {
			sort: { createdAt: 'desc' },
			limit: Number(req.query.limit) || 10,
			where: {
				...(req.query.marketer && {
					marketer: { '==': req.query.marketer },
				}),
				...(req.query.plan && { plan: { '==': req.query.plan } }),
			},
		};
		const response = await getDbQuery(db, 'users', userQuery);

		res.json(response);
	} catch (error) {
		res.status(500).json(error);
	}
}
