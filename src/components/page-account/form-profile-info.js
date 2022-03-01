import React, { useState } from 'react';
import { useStore } from 'react-redux';
import { useRouter } from 'next/router';
import InputPhone from '../input-phone';
import { me } from '../../store/actions/auth-actions';
import { updateUser } from '../../store/actions/user-actions';

export default function FormProfileInfo(props) {
  const { authData, callingCodes, profile, translations } = props;
  const store = useStore();
  const router = useRouter();
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [errors, setErrors] = useState({});
  const [userInfo, setUserInfo] = useState({ 
    id: authData.uid, 
    isEmailPublic: profile.isEmailPublic || false,
    displayName: profile.displayName || '', 
    username: profile.username || '', 
    website: profile.website || '', 
    bio: profile.bio || '', 
    phone: profile.phone || { prefix: '', number: '' } 
  });

  const onUpdateInfo = async event => {
    try {
      event.preventDefault();
      setIsUpdatingProfile(true);
      setErrors({});
      await store.dispatch(updateUser(userInfo));
      await store.dispatch(me());
      setIsUpdatingProfile(false);
      router.push(`/${userInfo.username}`);
    } catch (error) {
      const { errors, code } = error?.response?.data || {};
      setErrors({ ...errors, general: code });
      setIsUpdatingProfile(false);
    }
  };

  return (
    <form className="form-profile-info" onSubmit={onUpdateInfo}>

      <div className="form-row">
        <label htmlFor="username">{translations.username} *</label>
        <div className="input-group">
          <div className="url-placeholder">
            https://cytsas.com/
          </div>
          <input
            id="username"
            type="text"
            value={userInfo.username}
            onChange={e => setUserInfo({ ...userInfo, username: e.target.value.toLowerCase().replace(/[^a-z0-9@.]/gi, '') })}>
          </input>
        </div>
        <p className="error-msg">{translations[errors.username]}</p>
      </div>

      <div className="form-row">
        <label htmlFor="phone">{translations.phone} *</label>
        <InputPhone
          id="phone"
          translations={translations}
          errors={errors.phone}
          suggestions={callingCodes}
          value={userInfo.phone}
          onChange={phone => setUserInfo({ ...userInfo, phone })}>
        </InputPhone>
      </div>

      <div className="form-row">
        <label htmlFor="displayName">{translations.displayName}</label>
        <input
          id="displayName"
          type="text"
          value={userInfo.displayName}
          onChange={e => setUserInfo({ ...userInfo, displayName: e.target.value })}
        />
        <p className="error-msg">{translations[errors.displayName]}</p>
      </div>

      <div className="form-row">
        <label htmlFor="website">{translations['website']}</label>
        <input
          id="website"
          type="text"
          value={userInfo.website}
          onChange={e => setUserInfo({ ...userInfo, website: e.target.value })}>
        </input>
        <p className="error-msg">{translations[errors.website]}</p>
      </div>

      <div className="form-row">
        <label htmlFor="bio">{translations.bio}</label>
        <textarea
          id="bio"
          type="text"
          value={userInfo.bio}
          onChange={e => setUserInfo({ ...userInfo, bio: e.target.value })}>
        </textarea>
        <p className="error-msg">{translations[errors.bio]}</p>
      </div>

      <div className="buttons-wrapper">
        <button type="submit" className="btn-submit" disabled={isUpdatingProfile}>
          {isUpdatingProfile && <i className="fas fa-spinner fa-spin"></i>}
          {translations.update}
        </button>
      </div>

      <style jsx>{`
        .form-profile-info {

          .form-row {
            margin-bottom: 10px;

            > label {
              display: block;
              margin-bottom: 5px;
            }

            .error-msg {
              color: var(--color-alert);
            }

            input,
            textarea {
              border: 1px solid var(--color-border);
              padding: var(--spacer);
              width: 100%;
            }

            .input-group {
              display: flex;
              align-items: center;
              
              .url-placeholder {
                background-color: var(--color-secondary);
                border: 1px solid var(--color-border);
                border-right: 0;
                padding: 10px;
              }
            }
          }

          .buttons-wrapper {
            text-align: right;

            .btn-submit {
              background: var(--color-primary);
              border: 1px solid var(--color-border);
              border-radius: var(--spacer);
              color: white;
              cursor: pointer;
              padding: var(--spacer);

              &:disabled {
                background-color: var(--color-secondary);
                color: var(--color-text);
                cursor: default;
              }

              i {
                margin-right: 5px;
              }
            }
          }
        }
      `}</style>
      
    </form>
  );

}