import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';
import firebaseClient from 'firebase/app';
let firebaseApp = firebaseClient.apps[0];

if (!firebaseApp) {
  firebaseApp = firebaseClient.initializeApp({
    apiKey: process.env.FIREBASE_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID
  });
}

export default firebaseApp;

 