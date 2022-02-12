import 'firebase/auth';
import firebaseClient from 'firebase/app';
import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga';
import { useStore } from 'react-redux';
import { useRouter } from 'next/router';
import LoginButton from './login-button';
import { setToken, me, loginGoogle, loginFacebook } from '../../../store/actions/auth-actions';

export default function LoginSocialNetworks(props) {
  const store = useStore();
  const router = useRouter();
  const [firebaseApp, setFirebaseApp] = useState(null);
  const [isProcessingFacebook, setIsProcessingFacebook] = useState(false);
  const [isProcessingGoogle, setIsProcessingGoogle] = useState(false);
  const [error, setError] = useState('');
  const { isLoggingIn, translations, onLogginIn, onSuccess } = props;

  useEffect(() => {
    let firebaseApp = firebaseClient.apps[0];
    
    if (!firebaseApp) {
      firebaseApp = firebaseClient.initializeApp({
        apiKey: window.fKey,
        authDomain: window.fDomain
      });
    }

    setFirebaseApp(firebaseApp);
  }, []);

  const loginWithFacebook = async () => {
    try {
      onLogginIn(true);
      setIsProcessingFacebook(true);
      setError('');
      
      firebaseApp.auth().languageCode = router.locale;
      const facebookProvider = new firebaseApp.firebase_.auth.FacebookAuthProvider();
      facebookProvider.addScope('email');
      facebookProvider.setCustomParameters({ 'display': 'popup' });
      
      try {
        await firebaseApp.auth().signInWithPopup(facebookProvider);  
      } catch (error) {
        if (error.code === 'auth/account-exists-with-different-credential') {
          firebaseApp.auth().currentUser.linkWithCredential(error.credential);
        } else {
          throw error;
        }
      }
      
      const userOAuth = firebaseApp.auth().currentUser;
      const loginResponse = await store.dispatch(loginFacebook(userOAuth));
      await store.dispatch(setToken(loginResponse.token));
      await store.dispatch(me());

      ReactGA.event({
        category: 'Users',
        action: 'Logged in with facebook',
        value: 2
      });

      onSuccess(store.getState().auth.authData);
      onLogginIn(false);
      setIsProcessingFacebook(false);
    } catch (error) {
      setError(translations[error.code] || error.message);
      onLogginIn(false);
      setIsProcessingFacebook(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      onLogginIn(true);
      setIsProcessingGoogle(true);
      setError('');

      firebaseApp.auth().languageCode = router.locale;
      const googleProvider = new firebaseApp.firebase_.auth.GoogleAuthProvider();
      googleProvider.addScope('email');
      googleProvider.addScope('profile');
      googleProvider.setCustomParameters({ 'display': 'popup' });

      const googleResponse = await firebaseApp.auth().signInWithPopup(googleProvider);
      const { user } = googleResponse;
      const loginResponse = await store.dispatch(loginGoogle(user));
      await store.dispatch(setToken(loginResponse.token));
      await store.dispatch(me());

      ReactGA.event({
        category: 'Users',
        action: 'Logged in with google',
        value: 2
      });

      onSuccess(store.getState().auth.authData);
      onLogginIn(false);
      setIsProcessingGoogle(false);
    } catch (error) {
      setError(translations[error.code] || error.message);
      onLogginIn(false);
      setIsProcessingGoogle(false);
    }
  };

  return (
    <>
      <p className="error-msg">{error}</p>
      <section className="login-social-networks">
        <div className="btn-wrapper">
          <LoginButton 
            type="button"
            disabled={isLoggingIn} 
            provider="facebook"
            onClick={loginWithFacebook}>
            {isProcessingFacebook && <i className="fa fa-spinner fa-spin" />}
            {translations['loginWithFacebook']}
          </LoginButton>
        </div>
        <div className="btn-wrapper">
          <LoginButton 
            type="button"
            disabled={isLoggingIn} 
            provider="google"
            onClick={loginWithGoogle}>
            {isProcessingGoogle && <i className="fa fa-spinner fa-spin" />}
            {translations['loginWithGoogle']}
          </LoginButton>
        </div>
      </section>
      <style jsx>{`
        .error-msg {
          color: var(--color-alert);
        }
        
        .login-social-networks {
          margin-bottom: 10px;

          .btn-wrapper {
            margin-bottom: 10px;

            i {
              margin-right: 4px;
            }
          }
        }  
      `}</style>
    </>
  );

}