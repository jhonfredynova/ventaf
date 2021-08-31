import React, { useState } from 'react';
import { useStore } from 'react-redux';
import { useRouter } from 'next/router';
import InputPassword from '../input-password';
import { changeUserPassword } from '../../store/actions/auth-actions';

export default function FormChangePassword(props) {
  const store = useStore();  
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [userInfo, setUserInfo] = useState({ password: '', passwordConfirmation: '' });
  const { translations, profile } = props;

  const onChangePassword = async event => {
    try {
      event.preventDefault();
      setIsProcessing(true);
      setErrors({});
      await store.dispatch(changeUserPassword(userInfo));
      setUserInfo({ password: '', passwordConfirmation: '' });
      router.push(`/${profile.username}`);
      setIsProcessing(false);
    } catch (error) {
      const { code, errors } = error?.response?.data || {};
      setErrors({ ...errors, general: code });
      setIsProcessing(false);
    }
  };

  return (
    <form className="form-change-password" onSubmit={onChangePassword}>
      <p className="error-msg">{translations[errors.general]}</p>
      <div className="form-row">
        <label className="sr-only" htmlFor="password">{translations['password']} *</label>
        <InputPassword
          id="password"
          autoComplete="off"
          placeholder={`${translations['password']} *`}
          value={userInfo.password}
          onChange={e => setUserInfo({ ...userInfo, password: e.target.value })}>
        </InputPassword>
        <p className="error-msg">{translations[errors.password]}</p>
      </div>
      <div className="form-row">
        <label className="sr-only" htmlFor="passwordConfirm">{translations['passwordConfirm']} *</label>
        <InputPassword
          id="passwordConfirm"
          autoComplete="off"
          placeholder={`${translations['passwordConfirm']} *`}
          value={userInfo.passwordConfirmation}
          onChange={e => setUserInfo({ ...userInfo, passwordConfirmation: e.target.value })}>
        </InputPassword>
        <p className="error-msg">{translations[errors.passwordConfirmation]}</p>
      </div>
      <div className="buttons-wrapper">
        <button type="submit" className="btn-submit" disabled={isProcessing}>
          {isProcessing && <i className="fas fa-spinner fa-spin"></i>}
          {translations['changePassword']}
        </button>
      </div>
      <style jsx>{`
        .form-change-password {
          .form-row {
            margin-bottom: 10px;

            .error-msg {
              color: var(--color-error);
            }
          }

          .buttons-wrapper {
            text-align: right;

            .btn-submit {
              background: var(--color-primary);
              border: none;
              border-radius: var(--border-radius);
              cursor: pointer;
              padding: var(--spacer);
            }
          }
        }  
      `}</style>
    </form>
  );

}