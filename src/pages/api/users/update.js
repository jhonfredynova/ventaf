import { getDbDocument, getDbQuery } from '../../../utils/database-utils';
import { runMiddleware } from '../../../utils/api-utils';
import authorization from '../../../middlewares/authorization';

export default async function updateUser(req, res) {
  try {
    await runMiddleware(req, res, authorization('registered'));
    
    const firebaseAdmin = require('../../../firebase-admin').default;
    const firebaseClient = require('../../../firebase-client').default;
    const db = firebaseAdmin.firestore();
    const modelDb = await getDbDocument(db, 'users', req.query.userId);

    if (!modelDb) {
      res.status(400).json({ code: 'record-not-found' });
      return;
    }

    // validate model
    const modelData = {
      ...req.body,
      ...(req.body.active ? { active: req.body.active } : null),
      ...(req.body.nextPlan ? { nextPlan: req.body.nextPlan } : null),
      updatedAt: Date.now()
    };

    if (modelData.username) {
      const dbClient = firebaseClient.firestore();
      const queryUsername = await getDbQuery(dbClient, 'users', {
        where: {
          email: { '!=': modelDb.email },
          username: { '==': modelData.username }
        }
      });

      if (queryUsername.length > 0) {
        res.status(400).json({ code: 'userAreadyExist' });
      }
    }

    // update user
    await db
      .collection('users')
      .doc(req.params.id)
      .update(modelData);

    const response = Object.assign(modelDb, modelData);
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
}
