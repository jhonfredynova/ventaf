import { uploadToStorage, renameFile } from '../../../utils/storage-utils';
import { runMiddleware } from '../../../utils/api-utils';
import authorization from '../../../middlewares/authorization';
import files from '../../../middlewares/files';
import cors from '../../../middlewares/cors';

export const config = {
	api: {
		bodyParser: false,
		sizeLimit: '1mb',
	},
};

export default async function uploadPhoto(req, res) {
	try {
		await runMiddleware(req, res, cors);
		await runMiddleware(req, res, authorization('registered'));
		await runMiddleware(req, res, files({ maxFileSize: 5, maxFiles: 1 }));

		// eslint-disable-next-line global-require
		const { getFirebaseAdmin } = require('../../../utils/api-utils');
		const firebaseAdmin = getFirebaseAdmin();
		const db = firebaseAdmin.firestore();
		const { id: userId } = req.body;
		const photo = req.files?.photo?.[0];

		if (!photo) {
			res.status(400).json({ code: 'uploadEmpty' });
			return;
		}

		const filePath = renameFile(photo, `${req.user.uid}.jpg`);
		const dataToUpload = {
			bucketName: process.env.FIREBASE_STG_PROFILE_UPLOADS,
			filePaths: [filePath],
		};
		const uploadedFiles = await uploadToStorage(dataToUpload);
		const photoURL = uploadedFiles[0];

		await db.collection('profiles').doc(userId).update({ photoURL });

		res.json({ photoURL });
	} catch (error) {
		res.status(500).json(error);
	}
}
