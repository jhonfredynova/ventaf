export default async function createLocale(req, res) {
  try {
    // eslint-disable-next-line global-require
    const firebaseAdmin = require('../../../firebase-admin').default;
    const db = firebaseAdmin.firestore();
    const modelData = {
      ...req.body,
      createdAt: Date.now(),
    };

    // validating data
    const errors = {};

    if (Object.keys(errors).length > 0) {
      res.status(400).json({ errors });
      return;
    }

    // saving data
    let response = await db
      .collection('locales')
      .add(modelData);

    // response
    response = { ...modelData, id: response.id };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
}
