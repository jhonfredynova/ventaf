import { getDbQuery } from '../../../utils/database-utils';
import { runMiddleware } from '../../../utils/api-utils';
import authorization from '../../../middlewares/authorization';

export default async function getAllUsers(req, res) {
	try {
		await runMiddleware(req, res, authorization('admin'));

		// eslint-disable-next-line global-require
		const firebaseAdmin = require('../../../firebase-admin').default;
		const db = firebaseAdmin.firestore();
		const userQuery = {
			sort: { createdAt: 'desc' },
			limit: Number(req.query.limit) || 10,
			where: {
				...(req.query.marketer && {
					marketer: { '==': req.query.marketer }
				}),
				...(req.query.plan && { plan: { '==': req.query.plan } })
			}
		};
		const response = await getDbQuery(db, 'users', userQuery);

		res.json(response);
	} catch (error) {
		res.status(500).json(error);
	}
}
