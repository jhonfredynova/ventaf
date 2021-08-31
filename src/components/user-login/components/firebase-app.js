import 'firebase/auth';
import firebaseClient from 'firebase/app';
let firebaseApp = firebaseClient.apps[0];

if (!firebaseApp) {
  firebaseApp = firebaseClient.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  });
}

export default firebaseApp;

