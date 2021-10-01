import React from 'react';

export default function PostInvalidFiles(props) {
  const { warningMsg, wrongFiles, translations, onClose } = props;

  return (
    <section className="post-invalid-files">
      <h2><i className="fas fa-exclamation-triangle" /> {translations.warning}</h2>
      <p>{warningMsg}</p>
      {
        <ul>
          {wrongFiles.map((file, index) => {
            return (
              <li key={index}>
                {file.name} {parseInt(file.size/(1024*1024))}
              </li>
            );
          })}
        </ul>
      }
      <button 
        type="button" 
        className="btn-close" 
        onClick={onClose}>
        {translations.close}
      </button>
      <style jsx>{`
        .post-invalid-files {
          background-color: white;
          border-radius: var(--border-radius);
          text-align: center;
          padding: var(--spacer);
          max-width: 100%;
          width: 400px;

          h2 {
            margin-bottom: calc(var(--spacer) * 2);
          }

          ul {
            margin-top: var(--spacer);
          }

          .btn-close {
            background: var(--color-primary);
            border: none;
            border-radius: var(--border-radius);
            color: white;
            cursor: pointer;
            margin-top: calc(var(--spacer) * 2);
            padding: var(--spacer);
          }
        }
      `}</style>
    </section>
  );

}