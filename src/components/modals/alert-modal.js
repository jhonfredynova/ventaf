import React from 'react';

export default function AlertModal(props) {
	const { title, message, translations, onClose } = props;

	return (
		<section className="alert-modal">
			<h2>{title}</h2>
			<p>{message}</p>
			<div className="buttons-wrapper">
				<button
					type="button"
					className="btn-ok"
					onClick={() => onClose?.()}
				>
					{translations.ok}
				</button>
			</div>
			<style jsx>{`
				.alert-modal {
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

						.btn-ok {
							background: var(--color-primary);
							border: none;
							border-radius: var(--spacer);
							cursor: pointer;
							color: white;
							padding: var(--spacer);
						}
					}
				}
			`}</style>
		</section>
	);
}
