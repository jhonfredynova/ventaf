import { runMiddleware } from '../../../utils/api-utils';
import authorization from '../../../middlewares/authorization';
import { deleteFromStorage } from '../../../utils/storage-utils';
import { getDbDocument } from '../../../utils/database-utils';
import cors from '../../../middlewares/cors';

export default async function removePost(req, res) {
	try {
		await runMiddleware(req, res, cors);
		await runMiddleware(req, res, authorization('registered'));

		// eslint-disable-next-line global-require
		const { getFirebaseAdmin } = require('../../../utils/api-utils');
		const firebaseAdmin = getFirebaseAdmin();
		const { postId } = req.query;
		const db = firebaseAdmin.firestore();
		const modelDb = await getDbDocument(db, 'posts', postId);

		if (!modelDb) {
			res.status(400).json({ code: 'record-not-found' });
			return;
		}

		if (modelDb.user !== req.user.uid) {
			res.status(400).json({ code: 'not-own-ad' });
			return;
		}

		// deleting post data
		await db.collection('posts').doc(postId).delete();

		// deleting post folder with all photos
		const dataToDelete = {
			bucketName: process.env.FIREBASE_STG_POST_UPLOADS,
			folderPaths: [`/${postId}`],
		};
		await deleteFromStorage(dataToDelete);

		res.json(modelDb);
	} catch (error) {
		res.status(500).json(error);
	}
}
