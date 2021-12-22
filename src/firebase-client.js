import 'firebase/auth';
import firebaseClient from 'firebase/app';

if (firebaseClient.apps.length === 0) {
  firebaseClient.initializeApp({
    apiKey: 'AIzaSyByveqP60-11qxt6wBsuKoXRh65hSj8QB8',
    authDomain: 'construccionytecnologia-f556c.firebaseapp.com'
  });
}

export default firebaseClient;

 