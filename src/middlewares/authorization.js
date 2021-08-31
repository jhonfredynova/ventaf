import firebaseAdmin from '../firebase-admin';

export default (requiredClaims) => {
  return async (req, res, next) => {
    try {
      let token = (req.headers['authorization'] || req.query.authorization);

      // checking token
      if (!token || !token.startsWith('Bearer ')) {
        res.status(403).json({ code: 'auth-no-token' });
        return;
      }

      // checking user
      token = token.split('Bearer ')[1];
      req.user = await firebaseAdmin.auth().verifyIdToken(token);
      req.user.claims = Object.keys(req.user);

      // checking claims
      if (requiredClaims.length > 0 && !req.user.claims.filter(item => requiredClaims.includes(item)).length) {
        res.status(403).json({ code: 'auth-no-privileges' });
        return;
      } 

      next();
    } catch (error) {
      res.status(403).json(error);
    }
  };
};