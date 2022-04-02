export const getFirebaseAdmin = () => {
	// eslint-disable-next-line global-require
	const firebaseAdmin = require('firebase-admin');

	if (firebaseAdmin.apps.length === 0) {
		firebaseAdmin.initializeApp();
	}

	return firebaseAdmin;
};

export const runMiddleware = (req, res, fn) =>
	new Promise((resolve, reject) => {
		fn(req, res, (result) => {
			if (result instanceof Error) {
				return reject(result);
			}

			return resolve(result);
		});
	});
