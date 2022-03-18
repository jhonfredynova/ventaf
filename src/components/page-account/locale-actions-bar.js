import React from 'react';

export default function LocaleActionsBar(props) {
  const { 
    isSyncingConfig, searchTerm, translations, 
    onChangeSearchTerm, onSyncConfig, onAddNewLocale 
  } = props;

  return (
    <div className="locale-actions-bar">
      <div className="input-group">
        <input 
          type="text" 
          placeholder={translations.search}
          value={searchTerm} 
          onChange={event => onChangeSearchTerm(event.target.value)} />
        {
          searchTerm && 
          <button className="btn-clear" type="button" title={translations.clean} onClick={() => onChangeSearchTerm('')}>
            <i className="fas fa-times" />
          </button>
        }
      </div>
      <div className="buttons-wrapper">
        <button 
          type="button"
          disabled={isSyncingConfig}
          onClick={onSyncConfig}>
          {translations.sync}
        </button>
        <button 
          type="button"
          onClick={onAddNewLocale}>
          {translations.add}
        </button>
      </div>
      <style jsx>{`
        .locale-actions-bar {
          margin-bottom: 10px;

          .input-group {
            display: flex;
            margin-bottom: 10px;

            input {
              flex-grow: 1;
              border: 1px solid var(--color-border);
              padding: var(--spacer);
            }

            button {
              background: var(--color-alert);
              color: white;
              border: none;
              cursor: pointer;
              padding: var(--spacer);
            }
          }

          .buttons-wrapper {
            text-align: right;

            button {
              background: var(--color-primary);
              border: none;
              border-radius: var(--spacer);
              cursor: pointer;
              color: white;
              padding: var(--spacer);

              &:first-child {
                margin-right: 5px;
              }
            }
          }

        }  
      `}</style>
    </div>
  );
}