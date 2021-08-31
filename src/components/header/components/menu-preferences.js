import React, { useState, useRef } from 'react';
import { useStore } from 'react-redux';
import { useRouter } from 'next/router';
import Popover from '../../popover';
import { setPreferences } from '../../../store/actions/preferences-actions';
import { updateUser } from '../../../store/actions/user-actions';
import { formatDate } from '../../../utils/intl-utils';

export default function MenuPreferences(props) {
  const store = useStore();
  const router = useRouter();
  const { authData } = props;
  const elemPopoverPreferences = useRef(null);
  const [showPopoverPreferences, setPopoverPreferences] = useState(false);
  const { preferences, translations } = props;
  const dateFormats = ['dd/month/yyyy', 'month/dd/yyyy', 'yyyy/month/dd'];
  
  const onChangeDateFormat = async dateFormat => {
    try {  
      localStorage.dateFormat = dateFormat;
      store.dispatch(setPreferences({ dateFormat }));
  
      if (authData) {
        const newPreferences = { ...authData.profile.preferences, dateFormat };
        store.dispatch(updateUser({ id: authData.uid, preferences: newPreferences }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onChangeLanguage = async language => {
    try {
      localStorage.language = language;
      store.dispatch(setPreferences({ language: language }));
  
      if (authData) {
        const newPreferences = { ...authData.profile.preferences, language };
        store.dispatch(updateUser({ id: authData.uid, preferences: newPreferences }));
      }

      router.push(router.pathname, router.pathname, { locale: language });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <button
        ref={elemPopoverPreferences}
        className="btn-preferences"
        title={translations.preferences}
        onClick={() => setPopoverPreferences(!showPopoverPreferences)}>
        <i className="fas fa-cog" />
      </button>
      <Popover
        isOpen={showPopoverPreferences}
        target={elemPopoverPreferences.current}
        style={{ width: 200 }}
        onToggle={() => setPopoverPreferences(!showPopoverPreferences)}>
        <div className="popover-preferences">
          <h3>{translations.preferences}</h3>
          <div className="form-row">
            <label>{translations.dateFormat}</label>
            <select 
              placeholder={translations.select}
              value={preferences.dateFormat.toLowerCase()}
              onChange={event => onChangeDateFormat(event.target.value)}>
              {dateFormats.map(dateFormat => 
                <option key={dateFormat} value={dateFormat}>{formatDate(Date.now(), dateFormat)}</option>
              )}
            </select>
          </div>
          <div className="form-row">
            <label>{translations.language}</label>
            <select 
              placeholder={translations.language}
              value={preferences.language.toLowerCase()}
              onChange={event => onChangeLanguage(event.target.value)}>
              <option value="es">{translations.spanish}</option>
              <option value="en">{translations.english}</option>
            </select>
          </div>
        </div>
      </Popover>
      <style jsx>{`
        .btn-preferences {
          background: none;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          padding: var(--spacer);
        }

        .popover-preferences {
          h3 {
            margin-bottom: 15px;
          }

          .form-row {
            margin-bottom: 10px;

            label {
              display: block;
              margin-bottom: 5px;
            }

            input,
            select {
              border: 1px solid var(--border-color);
              padding: var(--spacer);
              width: 100%;
            }
          }
        }
      `}</style>
    </>
  );

}