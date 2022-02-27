import { createJsonWebToken } from '../../../utils/auth-utils';
import { getDbDocument } from '../../../utils/database-utils';
import { getUserProfileData } from '../../../utils/user-utils';
import { uploadToStorage } from '../../../utils/storage-utils';

export default async function loginOAuth(req, res) {
  try {
    const firebaseAdmin = require('../../../firebase-admin').default;
    const userOAuth = req.body;
    const { uid } = userOAuth;

    // register user profile
    const db = firebaseAdmin.firestore();
    const userExist = await getDbDocument(db, 'users', uid);

    if (!userExist) {
      // Init libraries and variables
      const fs = require('fs');
      const os = require('os');
      let responsePhotoUrl = null;

      try {
        // Uploading photo to storage
        const photoDataFromUrl = await fetch(userOAuth.photoURL);
        const buffer = await photoDataFromUrl.buffer();
        const filePath = `${os.tmpdir()}/${uid}.jpg`;
        await new Promise(resolve => {
          fs.writeFile(filePath, buffer, () => {
            resolve();
          });
        });
        const dataToUpload = {
          bucketName: process.env.FIREBASE_STG_PROFILE_UPLOADS,
          filePaths: [filePath]
        };
        const uploadedFiles = await uploadToStorage(dataToUpload);
        responsePhotoUrl = uploadedFiles[0];
      } catch (error) {
        // If any error occurs set the anonymous user photo to the user
        console.error('Error getting ptofile photo url from oauth', error);
        responsePhotoUrl = 'https://storage.googleapis.com/cyt-profile-uploads/anonymous.jpeg';
      }

      // Create user profile in database
      const profileDataOAuth = {
        ...userOAuth,
        photoURL: responsePhotoUrl
      };
      const userProfile = getUserProfileData(profileDataOAuth);
      await db
        .collection('users')
        .doc(uid)
        .set(userProfile);
      await firebaseAdmin.auth().setCustomUserClaims(uid, { registered: true });
    }

    // Create json web token
    const userData = await firebaseAdmin.auth().getUser(uid);
    const jwtToken = createJsonWebToken(userData, process.env.FIREBASE_KEY);

    res.json({ token: jwtToken });
    
  } catch (error) {
    console.error('Error registering user with oauth', error);
    res.status(500).json(error);
  }
}
