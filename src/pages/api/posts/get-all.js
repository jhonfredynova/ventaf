import { getDbQuery } from '../../../utils/database-utils';
import { toSearchTerms } from '../../../utils/text-utils';

export default async function getAllPosts(req, res) {
  try {
    const firebaseAdmin = require('../../../firebase-admin').default;
    const db = firebaseAdmin.firestore();
    const searchTerms = toSearchTerms(req.query.search);
    const localeQuery = {
      limit: Number(req.query.limit) || 15,
      sort: { createdAt: 'desc' },
      where: {
        ...(req.query.newerThan && { 'createdAt': { '>': Number(req.query.newerThan) } }),
        ...(req.query.olderThan && { 'createdAt': { '<': Number(req.query.olderThan) } }),
        ...(req.query.location && { 'location.placeId': { '==': req.query.location } }),
        ...(req.query.search && { searchTerms : { 'array-contains-any': searchTerms } }),
        ...(req.query.status && { status: { '==': req.query.status } }),
        // If search terms exist not filter by tags, only a array contains by query is allowed
        // This is because firestore limitations
        ...(!req.query.search && req.query.tags && { tags: { 'array-contains-any': req.query.tags.split(',') } }),
        ...(req.query.user && { user: { '==': req.query.user } }),
      }
    };
    const response = await getDbQuery(db, 'posts', localeQuery);

    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
}
