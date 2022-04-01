import jsonwebtoken from 'jsonwebtoken';

export default requiredClaims => async (req, res, next) => {
	try {
		let token = req.headers.authorization || req.query.authorization;

		// checking token
		if (!token || !token.startsWith('Bearer ')) {
			res.status(403).json({ code: 'auth-no-token' });
			return;
		}

		// checking user
		// eslint-disable-next-line prefer-destructuring
		token = token.split('Bearer ')[1];
		req.user = await jsonwebtoken.verify(token, process.env.FIREBASE_KEY);

		// checking claims
		if (
			requiredClaims.length > 0 &&
			!req.user.claims.filter(item => requiredClaims.includes(item))
				.length
		) {
			res.status(403).json({ code: 'auth-no-privileges' });
			return;
		}

		next();
	} catch (error) {
		res.status(403).json(error);
	}
};
