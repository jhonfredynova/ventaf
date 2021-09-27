import React, { useState } from 'react';
import { useStore } from 'react-redux';
import InputPhone from '../input-phone';
import { updateUser } from '../../store/actions/user-actions';

export default function FormProfileInfo(props) {
  const { authData, callingCodes, profile, translations } = props;
  const store = useStore();
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
      setIsUpdatingProfile(false);
    } catch (error) {
      const { errors } = error?.response?.data || {};
      setErrors(errors || {});
      setIsUpdatingProfile(false);
    }
  };

  return (
    <form className="form-profile-info" onSubmit={onUpdateInfo}>
      <div className="form-row">
        <label htmlFor="email">{translations['email']} *</label>
        <div className="input-group">
          <div 
            title={authData.email_verified ? translations['emailConfirmed'] : translations['emailUnconfirmed']} 
            className="email-status">
            <i className={`${(authData && authData.email_verified) ? 'fas fa-check success' : 'fas fa-times error'}`}/>
          </div>
          <span id="email" className="email-data">{profile.email}</span>
          <label className="email-check" htmlFor="email-is-public">
            <input 
              id="email-is-public"
              type="checkbox" 
              title={translations['isEmailPublic']}
              checked={userInfo.isEmailPublic}
              onChange={event => setUserInfo({ ...userInfo, isEmailPublic: event.target.checked })}>
            </input> 
            {translations['public']}
          </label>
        </div>
      </div>
      <div className="form-row">
        <label htmlFor="username">{translations['username']} *</label>
        <div className="input-group">
          <div className="url-placeholder">
            https://ventaexitosa.com/
          </div>
          <input
            id="username"
            type="text"
            placeholder={`${translations['username']} *`}
            value={userInfo.username}
            onChange={e => setUserInfo({ ...userInfo, username: e.target.value.replace(/[^a-z0-9]/gi, '') })}>
          </input>
        </div>
        <p className="error-msg">{errors.username}</p>
      </div>
      <div className="form-row">
        <label htmlFor="phone">{translations['phone']} *</label>
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
        <label htmlFor="displayName">{translations['displayName']} *</label>
        <input
          id="displayName"
          type="text"
          placeholder={`${translations['displayName']} *`}
          value={userInfo.displayName}
          onChange={e => setUserInfo({ ...userInfo, displayName: e.target.value })}
        />
        <p className="error-msg">{errors.displayName}</p>
      </div>
      <div className="form-row">
        <label htmlFor="website">{translations['website']}</label>
        <input
          id="website"
          type="text"
          placeholder={translations['website']}
          value={userInfo.website}
          onChange={e => setUserInfo({ ...userInfo, website: e.target.value })}>
        </input>
        <p className="error-msg">{errors.website}</p>
      </div>
      <div className="form-row">
        <label htmlFor="bio">{translations['bio']}</label>
        <textarea
          id="bio"
          type="text"
          placeholder={translations['bio']}
          value={userInfo.bio}
          onChange={e => setUserInfo({ ...userInfo, bio: e.target.value })}>
        </textarea>
        <p className="error-msg">{errors.bio}</p>
      </div>
      <div className="buttons-wrapper">
        <button type="submit" className="btn-submit" disabled={isUpdatingProfile}>
          {isUpdatingProfile && <i className="fas fa-spinner fa-spin"></i>}
          {translations['save']}
        </button>
      </div>
      <style jsx>{`
        .form-profile-info {
          padding: 15px;

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
              border: 1px solid var(--border-color);
              padding: var(--spacer);
              width: 100%;
            }

            .input-group {
              display: flex;
              align-items: center;

              .email-status,
              .email-data,
              .email-check {
                border: 1px solid #ccc;
                padding: 10px;
              }

              .email-status {
                border-right: 0;

                i.success {
                  color: var(--color-primary);
                }

                i.error {
                  color: var(--color-alert);
                }
              }

              .email-data {
                flex-grow: 1;
              }

              label.email-check {
                display: flex;
                align-items: center;
                border-left: 0;

                input {
                  width: 12px;
                  margin-right: 4px;
                  margin-top: -2px;
                }
              }

              .url-placeholder {
                background-color: var(--color-secondary);
                border: 1px solid var(--border-color);
                border-right: 0;
                padding: 10px;
              }
            }
          }

          .buttons-wrapper {
            text-align: right;

            .btn-submit {
              background: var(--color-primary);
              border: none;
              color: white;
              cursor: pointer;
              padding: var(--spacer);

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