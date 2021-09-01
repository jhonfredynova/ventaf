import React, { useState } from 'react';
import Lightbox from '../lightbox';
import InputSuggestions from '../input-suggestions';
import InputNumeric from '../input-numeric';

export default function PostPrice(props) {
  const { id, errors, required, suggestions, translations, value: priceValue, onChange } = props;
  const [isFree, setIsFree] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const selectedSuggestion = suggestions.find(item => item.value === priceValue.currency);
  const priceErrors = errors || {};
  const customValue = selectedSuggestion => {
    const formattedValue = selectedSuggestion.label;
    return formattedValue;
  };
  const customOption = suggestion => (
    <div className="custom-option">
      <img src={suggestion.countryFlag} alt={suggestion.countryName} width="30px" height="20px" />
      <div>{suggestion.label} ({suggestion.value.toUpperCase()})</div>
      <style jsx>{`
        .custom-option {
          display: flex;
          align-items: center;

          img {
            margin-right: 4px;
          }
        }  
      `}</style>
    </div>
  );
  const onChangeValue = value => {
    setIsFree(value === 0);
    onChange({ ...priceValue, value });
  };
  const onClearValue = () => {
    setIsFree(false);
    onChange({ ...priceValue, value: '' });
  };
  const onToggleFree = event => {
    const isFree = event.target.checked;
    setIsFree(event.target.checked);
    onChange({ ...priceValue, value: (isFree ? 0 : '') });
  };

  return (
    <div className="post-price">
      <div className="input-group">
        {
          !isFree &&
          <button 
            type="button"
            className="btn-indicative" 
            title={translations['currency']}
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
              <i className="font-icon fas fa-dollar-sign"></i>
            } 
          </button>
        }
        <label htmlFor="price-free" className="price-free">
          <input id="price-free" type="checkbox" checked={isFree} onChange={onToggleFree} />
          <i className="fas fa-gift"></i> {translations['free']}
        </label>
        <InputNumeric
          id={id}
          autocomplete="off"
          inputType="tel"
          className="input-price"
          decimalScale={2}
          placeholder={translations['price']}
          value={priceValue.value}
          onChange={onChangeValue}>
        </InputNumeric>
        {
          !['', undefined, null].includes(priceValue.value) && 
          <button 
            className="btn-clear" 
            type="button"
            title={translations['clean']}
            onClick={onClearValue}>
            <i className="fas fa-times"></i>
          </button>
        }
      </div>
      <p className="error-msg">{priceErrors.currency && translations['selectCurrency']}</p>
      <p className="error-msg">{priceErrors.value}</p>
      <Lightbox
        isOpen={isModalOpen}
        onToggle={() => setModalOpen(!isModalOpen)}>
        <section className="lightbox-post-price">
          <h2>{translations['selectCurrency']}</h2>
          <InputSuggestions
            autofocus
            isInputLg
            customOption={customOption} 
            customValue={customValue}
            placeholder={translations['currency']}
            required={required}
            suggestions={suggestions}
            translations={translations}
            value={priceValue.currency}
            onChange={currency => {
              onChange({ ...priceValue, currency });
              setModalOpen(false);
            }}>
          </InputSuggestions>
        </section>
      </Lightbox>
      <style jsx>{`
        .post-price {

          .error-msg {
            color: var(--color-error);
          }
          
          .input-group {
            display: flex;
            align-items: center;

            :global(.input-price) {
              flex-grow: 1;
              border: 1px solid var(--border-color);
              padding: var(--spacer);
              width: 100%;
            }

            .btn-indicative {
              display: flex;
              background: var(--color-secondary);
              border: 1px solid var(--border-color);
              cursor: pointer;
              align-items: center;
              padding: 9px;
              text-transform: uppercase;

              img {
                margin-right: 4px;
              }
            }

            .price-free {
              display: flex;
              align-items: center;
              background-color: var(--color-secondary);
              border: 1px solid var(--border-color);
              border-left: 0;
              border-right: 0;
              padding: 10px;

              input {
                width: 14px;
                margin-right: 4px;;
              }

              i {
                color: var(--color-primary);
                margin-right: 4px;
              }
            }

            .btn-clear {
              background: var(--color-error);
              border: none;
              cursor: pointer;
              color: white;
              padding: var(--spacer);
            }
          }

          .lightbox-post-price {
            h2 {
              margin-bottom: var(--spacer);
            }
          }

        }
      `}</style>
    </div>
  );
}