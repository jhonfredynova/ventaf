import React, { useState, useEffect } from 'react';
import RichEditor from './rich-editor';
import { isHtml } from '../utils/text-utils';

export default function InputMultiLanguage(props) {
  const { languages, value, onChange } = props;
  const [activeLang, setActiveLang] = useState('en');
  const [isHtmlText, setIsHtmlText] = useState(null);

  useEffect(() => {
    setIsHtmlText(isHtml(value[activeLang]));
  }, [value]);

  return (
    <div className="input-multi-language">
      <ul className="tabs">
        {languages.map(lang => (
          <li key={lang}>
            <button 
              type="button"
              className={`btn-tab ${activeLang === lang && 'active'}`}
              onClick={() => setActiveLang(lang)}>
              {lang}
            </button>
          </li>
        ))}
      </ul>
      <div className="editor-wrapper">
        {isHtmlText 
          ? (<RichEditor
              style={{ height: '208px' }}
              value={value[activeLang] || ''}
              onChange={newValue => onChange({ ...value, [activeLang]: newValue })} />
            ) 
          : (<textarea
              style={{ height: '250px' }}
              value={value[activeLang] || ''}
              onChange={event => onChange({ ...value, [activeLang]: event.target.value })} />
            )
        }
      </div>
      <div className="buttons">
        <button
          type="button"
          className={`btn-toggle ${!isHtmlText && 'active'}`}
          onClick={() => setIsHtmlText(false)}>
          Text
        </button>
        <button
          type="button"
          className={`btn-toggle ${isHtmlText && 'active'}`}
          onClick={() => setIsHtmlText(true)}>
          Html
        </button>
      </div>
      <style jsx>{`
        .input-multi-language {

          ul.tabs {
            list-style: none;
            display: flex;

            li > .btn-tab {
              display: block;
              background: var(--color-secondary);
              border: 1px solid var(--color-secondary);
              cursor: pointer;
              padding: var(--spacer);

              &.active {
                background: var(--color-primary);
                color: white;
              }
            }
          }

          .editor-wrapper {
            height: 250px;
            width: 400px;
            overflow: hidden;

            textarea {
              border: 1px solid var(--color-border);
              padding: var(--spacer);
              width: 100%;
            }
          }

          .buttons {
            text-align: right;

            .btn-toggle {
              background: var(--color-secondary);
              border: 1px solid var(--color-secondary);
              cursor: pointer;
              padding: var(--spacer);

              &.active {
                background: var(--color-primary);
                border: 1px solid var(--color-primary);
                color: white;
              }
            }
          }
        }
      `}</style>
    </div>
  );
}
