import React from 'react';

export default function AlertModal(props) {
  const { title, message, translations, onClose } = props;

  return (
    <section className="alert-modal">
      <h2>{title}</h2>
      <p>{message}</p>
      <div className="buttons-wrapper">
        <button 
          className="btn-ok"
          onClick={() => onClose?.()}>
          {translations.ok}
        </button>
      </div>
      <style jsx>{`
        .alert-modal {
          text-align: center;

          h2 {
						margin-bottom: var(--spacer);
					} 

          .buttons-wrapper {
						margin-top: calc(var(--spacer) * 2);

            .btn-ok {
							background: var(--color-primary);
              border: none;
							border-radius: var(--border-radius);
							cursor: pointer;
							padding: var(--spacer);
						}
          }
        }
      `}</style>
    </section>
  );

}