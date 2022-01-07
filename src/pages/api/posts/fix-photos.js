import { getFileReference } from '../../../utils/storage-utils';
import { getDbQuery } from '../../../utils/database-utils';

export default async function FixPhotos(req, res) {
  try {
    const firebaseAdmin = require('../../../firebase-admin').default;
    const db = firebaseAdmin.firestore();

    const bucketName = 'cyt-post-uploads';
    const posts = await getDbQuery(db, 'posts', {});

    let postPhotosSigned = [];
    let postPhotoSigned = null;
    let response = [];
    
    for (const post of posts) {
      postPhotosSigned = [];

      for (const photoUrl of post.photos) {
        postPhotoSigned = await fetch(photoUrl);

        // If photo url is not available get a new photo url
        if (postPhotoSigned.status !== 200) {
          postPhotoSigned = await (await getFileReference({ bucketName, fileUrl: photoUrl })).getSignedUrl({
            action: 'read',
            expires: '01-01-3000'
          });
          postPhotosSigned = postPhotosSigned.concat(postPhotoSigned);
        }
      }

      // Update only the new photos url signed
      if (postPhotosSigned.length > 0) {
        await db.collection('posts').doc(post.id).update({ photos: postPhotosSigned });
        response = response.concat(postPhotosSigned);
      }
    }

    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
}