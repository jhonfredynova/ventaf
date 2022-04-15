import { getDbQuery, getDbDocument } from '../../../utils/database-utils';
import { runMiddleware } from '../../../utils/api-utils';
import cors from '../../../middlewares/cors';

export default async function getRelatedPostContent(req, res) {
	try {
		await runMiddleware(req, res, cors);

		// eslint-disable-next-line global-require
		const { getFirebaseAdmin } = require('../../../utils/api-utils');
		const firebaseAdmin = getFirebaseAdmin();
		const db = firebaseAdmin.firestore();
		const { postId } = req.query;
		const postInfo = await getDbDocument(db, 'posts', postId);
		const postQuery = {
			limit: 8,
			where: {
				description: { '!=': postInfo.description },
				searchTerms: {
					'array-contains-any': postInfo.searchTerms.slice(0, 10),
				},
			},
		};
		const relatedContent = await getDbQuery(db, 'posts', postQuery);

		res.json(relatedContent);
	} catch (error) {
		res.status(500).json(error);
	}
}
