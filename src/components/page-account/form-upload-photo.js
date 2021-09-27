import React, { useRef, useState } from 'react';
import { useStore } from 'react-redux';
import { uploadProfilePhoto } from '../../store/actions/auth-actions';

export default function FormUploadPhoto(props) {
  const { authData, translations, profile } = props;

  const store = useStore();
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [errors, setErrors] = useState({});
  const inputPhoto = useRef(null);
  const photoUrl = profile.photoURL
    ? profile.photoURL 
    : new String()
      .concat('https://firebasestorage.googleapis.com/v0/b/construccionytecnologia-f556c.appspot.com/o/default-upload.svg')
      .concat('?alt=media&token=149a913b-3288-48a5-8c28-52426e580912');

  const onUploadPhoto = async event => {
    try {
      setIsUploadingPhoto(true);
      setErrors({});
      let formData = new FormData();
      formData.append('id', authData.uid);
      formData.append('photo', event.target.files[0]);
      await store.dispatch(uploadProfilePhoto(formData));
      setIsUploadingPhoto(false);
    } catch (error) {
      const { errors, message } = error?.response?.data || {};
      setErrors({ ...errors, general: message });
      setIsUploadingPhoto(false);
    }
  };

  return (
    <div className="form-upload-photo">
      <img src={`${photoUrl}&refresh=${Date.now()}`} alt={profile.email} width="200" height="200" />
      <input
        ref={inputPhoto}
        type="file"
        hidden
        onChange={onUploadPhoto}>
      </input>
      <button
        type="button"
        className="btn-upload"
        disabled={isUploadingPhoto}
        onClick={() => inputPhoto.current.click()}>
        {translations['uploadPhoto']}
      </button>
      <p className="error-msg">{errors.general}</p>
      <p className="error-msg">{errors.logoURL}</p>
      <style jsx>{`
        .form-upload-photo {
          text-align: center;
          margin-bottom: var(--spacer);

          img {
            border-radius: 50%;
          }

          .error-msg {
            color: var(--color-alert);
          }

          .btn-upload {
            background: var(--color-primary);
            border: 1px solid var(--color-primary);
            border-radius: var(--border-radius);
            color: white;
            cursor: pointer;
            padding: var(--spacer);
            display: block;
            margin: var(--spacer) auto;
          }
        }  
      `}</style>
    </div>
  );
  
}