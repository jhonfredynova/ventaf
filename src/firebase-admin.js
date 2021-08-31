import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import * as firebaseAdmin from 'firebase-admin';
let firebaseApp = firebaseAdmin.apps[0];

if (!firebaseApp) {
  firebaseApp = firebaseAdmin.initializeApp();
}

export default firebaseApp;
