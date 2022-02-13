import React, { useEffect, useRef } from 'react';

export default function InputPlacesAutocomplete(props) {
  const inputRef = useRef();
  const { getInputProps, suggestions, getSuggestionItemProps } = props;
  const { id, autofocus, className, placeholder, translations, searchValue, onBlur, onClear } = props;

  useEffect(() => {
    if (autofocus) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 50); 
    }
  }, []);

  return (
    <div className="input-places-autocomplete">
      <div className="icon-place">
        <i className="fas fa-location-arrow"></i>
      </div>
      <input
        {...getInputProps({
          id,
          className,
          placeholder,
          onBlur,
          ref: inputRef
        })}
      />
      {
        searchValue &&
        <button 
          className="btn-clear" 
          type="button"
          title={translations['clean']}
          onClick={onClear}>
          <i className="fas fa-times"></i>
        </button>
      }
      {
        suggestions.length > 0 &&
        <ul 
          className="list-suggestions"
          style={{ zIndex: 1, top: '40px' }}>
          {suggestions
            .map(suggestion => {
              return (
                <li
                  key={suggestion.placeId}
                  {...getSuggestionItemProps(suggestion, { 
                    className: suggestion.active ? 'active' : ''
                  })}>
                  {suggestion.description}
                </li>
              );
            })
          }
        </ul>
      }
      <style jsx>{`
        .input-places-autocomplete {
          display: flex;
          align-items: center;
          position: relative;

          .icon-place {
            background-color: var(--color-secondary);
            border: 1px solid var(--color-border);
            border-right: 0;
            color: var(--color-text);
            padding: var(--spacer);
            text-align: center;
            min-width: 60px;
          }

          input {
            border: 1px solid var(--color-border);
            padding: var(--spacer);
            width: 100%;
          }

          .btn-clear {
            background: var(--color-alert);
            border: 1px solid var(--color-alert);
            color: white;
            cursor: pointer;
            padding: var(--spacer);
          }

          .list-suggestions {
            position: absolute;
            box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
            background: var(--color-background);
            width: 100%;
            list-style: none;

            li {
              cursor: pointer;
              padding: 10px;
              
              &:hover,
              &.active {
                background-color: var(--color-secondary);
              }
            }
          }
        }  
      `}</style>
    </div>
  );
}