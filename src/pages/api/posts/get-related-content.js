import { getDbQuery, getDbDocument } from '../../../utils/database-utils';

export default async function getRelatedPostContent(req, res) {
	try {
		// eslint-disable-next-line global-require
		const firebaseAdmin = require('../../../firebase-admin').default;
		const db = firebaseAdmin.firestore();
		const { postId } = req.query;
		const postInfo = await getDbDocument(db, 'posts', postId);
		const postQuery = {
			limit: 9,
			where: {
				description: { '!=': postInfo.description },
				searchTerms: {
					'array-contains-any': postInfo.searchTerms.slice(0, 10)
				}
			}
		};
		const relatedContent = await getDbQuery(db, 'posts', postQuery);

		res.json(relatedContent);
	} catch (error) {
		res.status(500).json(error);
	}
}
