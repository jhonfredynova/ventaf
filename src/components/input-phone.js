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
      <img src={suggestion.countryFlag} alt={suggestion.countryName} width="30px" height="20px" />
      <div>{suggestion.countryName} ({suggestion.value})</div>
      <style jsx>{`
        .custom-option {
          display: flex;
          align-items: center;

          img {
            margin-right: 5px;
          }
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
            <>
              <img src={selectedSuggestion.countryFlag} alt={selectedSuggestion.countryName} width="30px" height="20px" />                
              <span style={{ display: 'inline-block', minWidth:'32px' }}>
                {selectedSuggestion.value}
              </span>
            </>
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
      <p className="error-msg">{phoneErrors.prefix && translations['selectAreaCode']}</p>
      <p className="error-msg">{phoneErrors.number}</p>
      <Lightbox
        isOpen={isModalOpen}
        onToggle={() => setModalOpen(!isModalOpen)}>
        <div className="lightbox-phone-number">
          <h2>{translations['selectAreaCode']}</h2>
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
            color: var(--color-error);
          }

          .input-group {
            display: flex;
            align-items: center;

            input {
              flex-grow: 1;
              border: 1px solid var(--border-color);
              padding: var(--spacer);
            }

            .btn-clear,
            .btn-prefix {
              border: 1px solid var(--border-color);
              cursor: pointer;
              padding: var(--spacer);
            }

            .btn-prefix {
              background: var(--color-secondary);
              flex-shrink: 0;
              display: flex;
              align-items: center;
              border-right: 0;
            }

            .btn-clear {
              background: var(--color-error);
              color: white;
            }
          }

          .lightbox-phone-number {
            h2 {
              margin-bottom: var(--spacer);
            }
          }

        }
      `}</style>
    </div>
  );

}