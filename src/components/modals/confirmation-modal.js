import React from 'react';

export default function ConfirmationModal(props) {
  const { isLoading, title, message, translations, onCancel, onAccept } = props;

  return (
    <section className="confirmation-modal">
      <h2>{title}</h2>
      <p>{message}</p>
      <div className="buttons-wrapper">
        <button 
          className="btn-cancel" 
          disabled={isLoading}
          onClick={onCancel}>
          {translations.cancel}
        </button>
        <button 
          className="btn-accept"
          disabled={isLoading}
          onClick={onAccept}>
          {isLoading && <i className="fas fa-spinner fa-spin"></i>}
          {translations.ok}
        </button>
      </div>
      <style jsx>{`
        .confirmation-modal {
          background-color: var(--color-background);
          border-radius: var(--spacer);
          text-align: center;
          padding: var(--spacer);
          max-width: 100%;
          width: 400px;

					h2 {
						margin-bottom: var(--spacer);
					} 

          .buttons-wrapper {
						margin-top: calc(var(--spacer) * 2);

						.btn-cancel,
						.btn-accept, {
							border: none;
              border-radius: var(--spacer);
							cursor: pointer;
							padding: var(--spacer);
						}

						.btn-cancel {
							background: var(--color-secondary);
							margin-right: 5px;
						}

						.btn-accept {
							background: var(--color-primary);
              color: white;

							.fa-spin {
								margin-right: 4px;
							}
						}
					}
        }
      `}</style>
    </section>
  );

}