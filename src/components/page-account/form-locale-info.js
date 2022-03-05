import React, { useState } from 'react';
import { useStore } from 'react-redux';
import InputMultilanguage from '../input-multi-language';
import { createLocale, updateLocale } from '../../store/actions/locale-actions';

export default function FormLocaleInfo(props) {
  const { localeData, translations, onCancel, onSave } = props; 
  const store = useStore();
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [model, setModel] = useState({
    id: localeData?.id,
    name: localeData?.name || '',
    value: localeData?.value || {}
  });

  const onSaveLocale = async e => {
    try {
      if (e) {
        e.preventDefault();
      }

      setErrors({});
      setIsSaving(true);

      if (!model.id) {
        await store.dispatch(createLocale(model));
      } else {
        await store.dispatch(updateLocale(model));
      }

      setIsSaving(false);
      onSave();
    } catch (error) {
      const { errors, code } = error?.response?.data || {};
      setErrors({ ...errors, general: code });
      setIsSaving(false);
    }
  };

  return (
    <form className="form-locale" onSubmit={onSaveLocale}>
      <p>{translations[errors.general]}</p>
      <div className="form-row">
        <label>{translations['name']} *</label>
        <input
          type="text"
          value={model.name}
          onChange={e => setModel({ ...model, name: e.target.value })} />
        <p className="error-msg">{errors.name}</p>
      </div>
      <div className="form-row">
        <label>{translations['value']} *</label>
        <InputMultilanguage
          languages={['en', 'es']}
          value={model.value}
          onChange={value => setModel({ ...model, value })}>
        </InputMultilanguage>
        <p className="error-msg">
          {errors?.value?.en}
          {errors?.value?.es}
        </p>
      </div>
      <div className="buttons-wrapper">
        <button 
          className="btn-cancel" 
          disabled={isSaving}
          onClick={onCancel}>
          {translations['cancel']}
        </button>
        <button 
          className="btn-save" 
          disabled={isSaving}
          type="submit">
          {isSaving && <i className="fas fa-spinner fa-spin" title={translations.saving}></i>}
          {translations['save']}
        </button>
      </div>   
      <style jsx>{`
        .form-locale {
          background-color: var(--color-background);
          border-radius: var(--spacer);
          padding: calc(var(--spacer) * 2);
          max-width: 100%;
          width: 500px;

          .form-row {
            margin-bottom: var(--spacer);

            label {
              display: block;
              margin-bottom: 5px;            
            }

            input {
              border: 1px solid var(--color-border);
              padding: var(--spacer);
              width: 100%;
            }

            .error-msg {
              color: var(--color-alert);
            }
          }

          .buttons-wrapper {
            margin-top: calc(var(--spacer) * 2);
            text-align: right;

            .btn-cancel {
              background: var(--color-secondary);
              border: none;
              border-radius: var(--spacer);
              cursor: pointer;
              margin-right: 5px;
              padding: var(--spacer)
            }

            .btn-save {
              background: var(--color-primary);
              border: none;
              border-radius: var(--spacer);
              cursor: pointer;
              color: white;
              padding: var(--spacer);

              .fa-spin {
                margin-right: 5px;
              }
            }
          }
        }  
      `}</style>
    </form>
  );
}