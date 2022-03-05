import React, { useState, useRef, useEffect } from 'react';

export default function InputSuggestions(props) {
  const { 
    autofocus, id, className, translations, placeholder, customFilterLogic, customOption, 
    style, required, suggestions, value, onBlur, onChange 
  } = props;
  const selectedSuggestion = suggestions.find(suggestion => suggestion.value === value);
  const inputRef = useRef(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchValue, setSearch] = useState('');

  const filterLogic = (suggestion, searchValue) => {
    const { label, value } = suggestion;
    return `${label} ${value}`.toLowerCase().includes(searchValue.toLowerCase());
  };

  const filteredSuggestions = suggestions.filter(suggestion => {
    if (customFilterLogic) {
      return customFilterLogic(suggestion, searchValue);
    }
    return filterLogic(suggestion, searchValue);
  });

  const onKeyDown = event => {
    if (['Enter', 13].includes(event.key)) {
      event.preventDefault();
      onChange(selectedSuggestion.value);
    }
  };

  const onClear = () => {
    setSearch('');
    onChange('');
  };

  const onInputBlur = () => {
    setShowSuggestions(false);
    setSearch('');

    if (onBlur) {
      onBlur();
    }

    if (!value) {
      onChange('');
    }
  };

  const onClickSuggestion = suggestion => {
    setSearch('');
    onChange(suggestion.value);
  };

  const onInputChange = event => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    if (autofocus) {
      inputRef.current.focus();
    }
  }, [autofocus]);

  return (
    <div className="input-suggestions">
      <input 
        id={id}
        type="text" 
        ref={inputRef}
        aria-required={required}
        className={className}
        placeholder={selectedSuggestion ? selectedSuggestion.label : placeholder}
        value={searchValue}
        onChange={onInputChange}
        onFocus={() => setShowSuggestions(true)}
        onBlur={onInputBlur}
        onKeyDown={onKeyDown} />
      <ul 
        className={!showSuggestions && 'd-none'}
        style={{ 
          ...(style && style.suggestions),
          top: `${inputRef.current ? inputRef.current.offsetHeight : 0}px`
        }}>
        {(searchValue ? filteredSuggestions : suggestions).map((suggestion, index) => 
          <li
            key={index}
            className={suggestion.label === value ? 'active' : ''}
            onMouseDown={() => onClickSuggestion(suggestion)}>
            {customOption ? customOption(suggestion) : suggestion.label}
          </li>
        )}
      </ul>
      {
        (searchValue || selectedSuggestion) && 
        <>
          {
            selectedSuggestion &&
            <button 
              className="btn-check" 
              type="button"
              title={translations['ok']}
              onClick={() => onClickSuggestion(selectedSuggestion)}>
              <i className="fas fa-check"></i>
            </button>
          }
          <button 
            className="btn-clear" 
            type="button"
            title={translations['clean']}
            onClick={onClear}>
            <i className="fas fa-times"></i>
          </button>
        </>
      }
      <style jsx>{`
        .input-suggestions {
          display: flex;
          align-items: center;
          position: relative;

          input {
            flex-grow: 1;
            border: 1px solid var(--color-border);
            background-color: var(--color-background);
            color: var(--color-text);
            padding: var(--spacer);

            &::placeholder {
              color: var(--color-text);
            }
          }

          .btn-clear,
          .btn-check {
            cursor: pointer;
            padding: var(--spacer);
          }

          .btn-clear {
            background: var(--color-alert);
            border: 1px solid var(--color-alert);
            color: white;
          }

          .btn-check {
            background: var(--color-primary);
            border: 1px solid var(--color-primary);
            color: white;
          }

          ul {
            background: var(--color-background);
            border: 1px solid #ccc;
            border-top: 0;
            max-height: 250px;
            width: 100%;
            overflow: auto;
            position: absolute;
            
            li {
              cursor: pointer;
              padding: var(--spacer);

              &:hover {
                background: var(--color-secondary);
              }

              &.active {
                background: var(--color-secondary)
              }
            }
          }
        }
      `}</style>
    </div>
  );

}