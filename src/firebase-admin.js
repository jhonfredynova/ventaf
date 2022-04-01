import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import * as firebaseAdmin from "firebase-admin";

if (firebaseAdmin.apps.length === 0) {
	firebaseAdmin.initializeApp();
}

export default firebaseAdmin;
