import React, { useState } from 'react';
import ReactGA from 'react-ga';
import { useStore } from 'react-redux';
import firebaseApp from './firebase-app';
import LoginButton from './login-button';
import { setToken, me, loginGoogle, loginFacebook } from '../../../store/actions/auth-actions';

export default function LoginSocialNetworks(props) {
  const store = useStore();
  const [isProcessingFacebook, setIsProcessingFacebook] = useState(false);
  const [isProcessingGoogle, setIsProcessingGoogle] = useState(false);
  const [error, setError] = useState('');
  const { isLoggingIn, preferences, translations, onLogginIn, onSuccess } = props;

  const loginWithFacebook = async () => {
    try {
      onLogginIn(true);
      setIsProcessingFacebook(true);
      setError('');
      firebaseApp.auth().languageCode = preferences.language;
      const facebookProvider = new firebaseApp.firebase_.auth.FacebookAuthProvider();
      facebookProvider.addScope('email');
      facebookProvider.setCustomParameters({ 'display': 'popup' });

      const facebookResponse = await firebaseApp.auth().signInWithPopup(facebookProvider);
      const loginResponse = await store.dispatch(loginFacebook(facebookResponse));
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
      firebaseApp.auth().languageCode = preferences.language;
      const googleProvider = new firebaseApp.firebase_.auth.GoogleAuthProvider();
      googleProvider.addScope('email');
      googleProvider.addScope('profile');

      const googleResponse = await firebaseApp.auth().signInWithPopup(googleProvider);
      const loginResponse = await store.dispatch(loginGoogle(googleResponse));
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
          color: var(--color-error);
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