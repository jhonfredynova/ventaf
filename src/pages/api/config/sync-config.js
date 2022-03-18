import fs from 'fs';
import { getIntlData } from '../../../utils/intl-utils';
import { runMiddleware } from '../../../utils/api-utils';
import authorization from '../../../middlewares/authorization';

export default async function syncConfig(req, res) {
  try {
    await runMiddleware(req, res, authorization('admin')); 

    // eslint-disable-next-line global-require
    const axios = require('axios');
    // eslint-disable-next-line global-require
    const firebaseAdmin = require('../../../firebase-admin').default;
    const db = firebaseAdmin.firestore();

    // validating data
    const configIntl = {
      appLanguages: ['en', 'es'],
      url: process.env.REST_COUNTRIES_URL
    };
    const intlData = await getIntlData(configIntl, axios, db);
    const configData = {
      appLastSync: Date.now(),
      callingCodes: intlData.callingCodes,
      countries: intlData.countries,
      currencies: intlData.currencies,
      languages: intlData.languages,
      translations: intlData.translations,
    };

    // updating data
    fs.writeFileSync('config.json', JSON.stringify(configData, null, 2));

    // response
    res.json(configData);
    
  } catch (error) {
    res.status(500).json(error);
  }
}
