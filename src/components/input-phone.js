import React, { useState } from 'react';
import Lightbox from './lightbox';
import InputSuggestions from './input-suggestions';

export default function InputPhone(props) {
  const { id, translations, errors, required, suggestions, value: phoneValue, onChange } = props;
  const [isModalOpen, setModalOpen] = useState(false);
  const selectedSuggestion = suggestions.find(item => item.value === phoneValue.prefix);
  const phoneErrors = errors || {};
  const customFilterLogic = (suggestion, searchValue) => {
    const { countryName, label, value } = suggestion;
    return `${countryName} ${label} ${value}`.toLowerCase().includes(searchValue.toLowerCase());
  };
  const customOption = suggestion => (
    <div className="custom-option">
      <div>{suggestion.countryName} ({suggestion.value})</div>
      <style jsx>{`
        .custom-option {
          display: flex;
          align-items: center;
        }
      `}</style>
    </div>
  );

  return (
    <div className="input-phone">
      <div className="input-group">
        <button 
          type="button"
          className="btn-prefix" 
          title={translations['areaCode']}
          onClick={() => setModalOpen(!isModalOpen)}>   
          {
            selectedSuggestion &&
            <span style={{ display: 'inline-block', marginLeft: '3px', minWidth:'32px' }}>
              {selectedSuggestion.value}
            </span>
          }
          {
            !selectedSuggestion &&
            <i className="font-icon fas fa-mobile-alt"></i>
          }            
        </button>
        <input
          id={id}
          type="tel"
          placeholder={translations['phoneNumber']}
          value={phoneValue.number}
          onChange={event => onChange({ ...phoneValue, number: event.target.value.replace(/[^0-9]/gi, '') })}>
        </input>
        {
          phoneValue.number && 
          <button 
            className="btn-clear" 
            type="button"
            title={translations['clean']}
            onClick={() => onChange({ ...phoneValue, number: '' })}>
            <i className="fas fa-times"></i>
          </button>
        }
      </div>
      <p className="error-msg">{phoneErrors.prefix && translations.selectAreaCode}</p>
      <p className="error-msg">{translations[phoneErrors.number]}</p>
      <Lightbox
        isOpen={isModalOpen}
        onToggle={() => setModalOpen(!isModalOpen)}>
        <div className="lightbox-phone-number">
          <h2>{translations.selectAreaCode}</h2>
          <InputSuggestions
            autofocus
            translations={translations}
            customFilterLogic={customFilterLogic}
            customOption={customOption}
            placeholder={translations['areaCode']}
            required={required}
            suggestions={suggestions}
            value={phoneValue.prefix}
            onChange={prefix => {
              onChange({ ...phoneValue, prefix });
              setModalOpen(false);
            }}>
          </InputSuggestions>
        </div>
      </Lightbox>
      <style jsx>{`
        .input-phone {

          .error-msg {
            color: var(--color-alert);
          }

          .input-group {
            display: flex;
            align-items: center;

            input,
            .btn-clear,
            .btn-prefix {
              min-height: 40px;
            }

            input {
              flex-grow: 1;
              border: 1px solid ${errors?.number ? 'var(--color-alert)' : 'var(--color-border)'};
              padding: var(--spacer);
              width: 100%;
            }

            .btn-clear,
            .btn-prefix {
              border: 1px solid var(--color-border);
              cursor: pointer;
              padding: var(--spacer);
            }

            .btn-prefix {
              background: var(--color-secondary);
              border-color: ${errors?.prefix ? 'var(--color-alert)' : 'var(--color-border)'};
              color: var(--color-text);
              flex-shrink: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              border-right: ${(errors?.prefix && !errors?.number) ? '1px solid var(--color-alert)' : '0'};
              min-width: 60px;
            }

            .btn-clear {
              background: var(--color-alert);
              color: white;
            }
          }

          .lightbox-phone-number {
            background-color: var(--color-background);
            border-radius: var(--spacer);
            text-align: center;
            max-width: 100%;
            width: 400px;
            padding: var(--spacer);
            
            h2 {
              margin-bottom: var(--spacer);
            }
          }

        }
      `}</style>
    </div>
  );

}