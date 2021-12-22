import firebaseClient from '../firebase-client';
import { isEmail } from './validation-utils';
import valideLoginEmail from '../validations/validate-login-email';
import validateRegister from '../validations/validate-register';

export const getAuthToken = async () => {
  const token = await new Promise(resolve => {
    firebaseClient.auth().onAuthStateChanged(async user => {
      if (user) {
        const authToken = await user.getIdToken(true);
        resolve(authToken);
      } else {
        resolve(null);
      }
    });
  });

  return token;
};

export const loginWithEmail = async modelData => {
  const errors = valideLoginEmail(modelData);

  if (Object.keys(errors).length > 0) {
    return { code: 'modelErrors', errors };
  }

  const response = await firebaseClient
    .auth()
    .signInWithEmailAndPassword(modelData.email, modelData.password);
  const token = await response.user.getIdToken();

  return { token };
};

export const loginWithFacebook = async locale => {
  firebaseClient.auth().languageCode = locale;
  const facebookProvider = new firebaseClient.auth.FacebookAuthProvider();
  facebookProvider.addScope('email');
  facebookProvider.setCustomParameters({ 'display': 'popup' });
  const facebookResponse = await firebaseClient.auth().signInWithPopup(facebookProvider);

  const credential = firebaseClient
    .auth
    .FacebookAuthProvider
    .credential(facebookResponse.credential.oauthAccessToken);
  const loginResponse = await firebaseClient.auth().signInWithCredential(credential);
  const token = await loginResponse.user.getIdToken();

  return { token };
};

export const loginWithGoogle = async locale => {
  firebaseClient.auth().languageCode = locale;
  const googleProvider = new firebaseClient.auth.GoogleAuthProvider();
  googleProvider.addScope('email');
  googleProvider.addScope('profile');
  const googleResponse = await firebaseClient.auth().signInWithPopup(googleProvider);

  const credential = firebaseClient
    .auth
    .GoogleAuthProvider
    .credential(googleResponse.credential.oauthAccessToken);
  const loginResponse = await firebaseClient.auth().signInWithCredential(credential);
  const token = await loginResponse.user.getIdToken();

  return { token };
};

export const registerWithEmail = async data => {
  const emailUsername = data.email.split('@')[0];
  const modelData = {
    ...data,
    createdAt: Date.now(),
    displayName: data.displayName || emailUsername,
    username: data.username || emailUsername
  };

  // validating
  const errors = validateRegister(modelData);

  if (Object.keys(errors).length > 0) {
    return { code: 'modelErrors', errors };
  }


  // registering
  const userRegistered = await firebaseClient
    .auth()
    .createUserWithEmailAndPassword(modelData.email, modelData.password);

  return userRegistered;
};

export const recoverUserPassword = async email => {
  const errors = {};

  if (!email?.trim()) {
    errors.email = 'fieldRequired';
  } else if (!isEmail(email)) {
    errors.email = 'fieldInvalidEmail';
  }

  if (Object.keys(errors).length > 0) {
    return { code: 'modelErrors', errors };
  }

  await firebaseClient.auth().sendPasswordResetEmail(email);
  return { code: 'recoverPasswordSuccess' };
};