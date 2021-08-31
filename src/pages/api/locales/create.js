export default async function createLocale(req, res) {
  try {
    const firebaseAdmin = require('../../../firebase-admin').default;
    const db = firebaseAdmin.firestore();
    let modelData = {
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
