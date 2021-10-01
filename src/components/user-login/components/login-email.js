import React, { useState } from 'react';
import ReactGA from 'react-ga';
import { useSelector, useStore } from 'react-redux';
import LoginButton from './login-button';
import InputPassword from '../../input-password';
import { register, loginEmail, me, setToken } from '../../../store/actions/auth-actions';
import { getProfileByEmail } from '../../../store/actions/profile-actions';

export default function LoginEmail(props) {
  const LOGIN_STEPS = {
    ENTER_EMAIL: 'ENTER_EMAIL',
    REGISTER_USER: 'REGISTER_USER',
    LOGIN_USER: 'LOGIN_USER'
  };
  const { isLoggingIn, translations, onLogginIn, onSuccess } = props;
  const store = useStore();
  const [loginInfo, setLoginInfo] = useState({ email:'', password: '' });
  const [errors, setErrors] = useState({});
  const [currentLoginStep, setLoginStep] = useState(LOGIN_STEPS.ENTER_EMAIL);
  const [isProcessing, setIsProcessing] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const authData = useSelector(state => state.auth.authData);
  const userPhotoUrl = (userInfo && userInfo.photoURL) || '/anonymous.png';
  const userHasEmailProvider = (userInfo?.providers?.includes('password'));

  const onClearEmail = () => {
    setLoginStep(LOGIN_STEPS.ENTER_EMAIL);
    setLoginInfo({ email:'', password: '' });
    setUserInfo(null);
  };

  const onEditEmail = () => {
    setLoginStep(LOGIN_STEPS.ENTER_EMAIL);
    setLoginInfo({ ...loginInfo, password: '' });
    setUserInfo(null);
  };

  const onRegister = async () => {
    try {
      onLogginIn(true);
      setIsProcessing(true);
      setErrors({});
      const registrationData = {
        email: loginInfo.email,
        password: loginInfo.password,
        passwordConfirmation: loginInfo.passwordConfirmation,
        marketer:  'organic'
      };
      await store.dispatch(register(registrationData));
      await store.dispatch(setToken(store.getState().auth.token));
      await store.dispatch(me());

      ReactGA.event({
        category: 'Users',
        action: 'Registered new user with email',
        value: 3
      });

      onSuccess(store.getState().auth.authData);
      setIsProcessing(false);
      onLogginIn(false);
    } catch (error) {
      const { code, errors } = error?.response?.data || {};
      setErrors({ ...errors, general: code });
      setIsProcessing(false);
      onLogginIn(false);
    }
  };

  const onLogin= async () => {
    try {
      onLogginIn(true);
      setIsProcessing(true);
      setErrors({});
      const loginData = {
        email: loginInfo.email,
        password: loginInfo.password
      };
      
      const loginResponse = await store.dispatch(loginEmail(loginData));
      await store.dispatch(setToken(loginResponse.token));
      await store.dispatch(me());

      ReactGA.event({
        category: 'Users',
        action: 'Logged in with email',
        value: 2
      });

      onSuccess(authData);
      setIsProcessing(false);
      onLogginIn(false);
    } catch (error) {
      const { code, errors } = error?.response?.data || {};
      setErrors({ ...errors, general: code });
      setIsProcessing(false);
      onLogginIn(false);
    }
  };

  const onGetUserByEmail = async () => {
    try {
      onLogginIn(true);
      setIsProcessing(true);
      setErrors({});
      const userData = await store.dispatch(getProfileByEmail(loginInfo.email));
      setUserInfo(userData);
      setLoginStep(LOGIN_STEPS.LOGIN_USER);
      
      if (userData) {
        setLoginStep(LOGIN_STEPS.LOGIN_USER);
      } else {
        setLoginStep(LOGIN_STEPS.REGISTER_USER);
      }

      setIsProcessing(false);
      onLogginIn(false);
    } catch (error) {
      const { code, errors } = error?.response?.data || {};
      setErrors({ ...errors, general: code });
      setIsProcessing(false);
      onLogginIn(false);
    }
  };

  const onSubmitForm = event => {
    event.preventDefault();

    switch (currentLoginStep) {
      case LOGIN_STEPS.ENTER_EMAIL:
        onGetUserByEmail();
        return;
      case LOGIN_STEPS.LOGIN_USER:
        onLogin();
        return;
      case LOGIN_STEPS.REGISTER_USER:
        onRegister();
        return;
    }
  };

  return (
    <>
      <form onSubmit={onSubmitForm}>          
        <div className="form-row">
          <label className="sr-only" htmlFor="email">{translations['email']} <span>*</span></label>
          <div className="input-group">
            {userInfo && <img src={userPhotoUrl} alt={userInfo.email} width={40}></img>}
            <input 
              id="email" type="text" value={loginInfo.email} 
              disabled={currentLoginStep !== LOGIN_STEPS.ENTER_EMAIL}
              aria-required="true" placeholder={translations['enterEmail']}
              onChange={event => setLoginInfo({ ...loginInfo, email: event.target.value })} />
            {
              loginInfo.email && currentLoginStep !== LOGIN_STEPS.ENTER_EMAIL &&
              <button
                type="button"
                title={translations['edit']}
                className="btn-edit"
                onClick={onEditEmail}>
                <i className="fas fa-pen" />
              </button>
            }
            {
              loginInfo.email &&
              <button
                type="button"
                title={translations['clean']}
                className="btn-clear"
                onClick={onClearEmail}>
                <i className="fas fa-times" />
              </button>
            }
          </div>
          <p className="error-msg">{translations[errors.email]}</p>
        </div>
        {
          currentLoginStep === LOGIN_STEPS.ENTER_EMAIL &&
          <div className="form-row">
            <LoginButton 
              type="submit"
              disabled={isLoggingIn || isProcessing} 
              provider="email">
              {isProcessing && <i className="btn-login fa fa-spinner fa-spin" />}
              {translations.loginWithEmail}
            </LoginButton>
          </div>
        }
        {
          currentLoginStep === LOGIN_STEPS.LOGIN_USER && userHasEmailProvider &&
          <>
            <div className="form-row">
              <label className="sr-only" htmlFor="password">{translations['password']} <span>*</span></label>
              <InputPassword id="password" value={loginInfo.password} 
                aria-required="true" placeholder={`${translations['password']} *`} autoComplete="off"
                onChange={event => setLoginInfo({ ...loginInfo, password: event.target.value })} />
              <p className="error-msg">{translations[errors.password]}</p>
              <p className="error-msg">{translations[errors.general]}</p>
            </div>
            <div className="form-row">
              <LoginButton 
                type="submit"
                disabled={isLoggingIn || isProcessing} 
                provider="email">
                {isProcessing && <i className="btn-login fa fa-spinner fa-spin" />}
                {translations.login}
              </LoginButton>
            </div>
          </>
        }
        {
          currentLoginStep === LOGIN_STEPS.REGISTER_USER &&
          <>
            <div className="form-row">
              <label className="sr-only" htmlFor="password">{translations['assignPassword']} <span>*</span></label>
              <InputPassword id="password" value={loginInfo.password} 
                aria-required="true" placeholder={`${translations['assignPassword']} *`} autoComplete="off"
                onChange={event => setLoginInfo({ ...loginInfo, password: event.target.value })} />
              <p className="error-msg">{translations[errors.password]}</p>
            </div>
            <div className="form-row">
              <LoginButton 
                type="submit"
                disabled={isLoggingIn || isProcessing} 
                provider="email">
                {isProcessing && <i className="btn-login fa fa-spinner fa-spin" />}
                {translations.register}
              </LoginButton>
            </div>
          </>
        }
      </form>
      <style jsx>{`
        .form-row {
          margin-bottom: 10px;

          .error-msg {
            color: var(--color-alert);
          }

          .input-group {
            display: flex;
            align-items: center;

            input {
              border: 1px solid var(--border-color);
              padding: var(--spacer);
              width: 100%;
            }

            img {
              border: 1px solid #ccc;
              border-right: none;
            }

            .btn-edit,
            .btn-clear {
              border: 1px solid var(--border-color);
              cursor: pointer;
              padding: var(--spacer);
            }
            .btn-edit {
              background: var(--color-secondary);
              border-left: none;
              border-right: none;
            }

            .btn-clear {
              background: var(--color-alert);
              color: white;
            }
          }

          i.btn-login.fa-spin {
            margin-right: 5px;
          }
        }
      `}</style>
    </>
  );

}