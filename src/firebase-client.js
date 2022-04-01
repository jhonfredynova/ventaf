import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';
import firebaseClient from 'firebase/app';

if (firebaseClient.apps.length === 0) {
	firebaseClient.initializeApp({
		apiKey: process.env.FIREBASE_KEY,
		authDomain: process.env.FIREBASE_AUTH_DOMAIN,
		projectId: process.env.FIREBASE_PROJECT_ID
	});
}

export default firebaseClient;
