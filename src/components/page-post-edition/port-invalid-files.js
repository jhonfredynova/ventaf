import React from 'react';

export default function PostInvalidFiles(props) {
	const { warningMsg, wrongFiles, translations, onClose } = props;

	return (
		<section className="post-invalid-files">
			<h2>
				<i className="fas fa-exclamation-triangle" />{' '}
				{translations.warning}
			</h2>
			<p>{warningMsg}</p>
			<ul>
				{wrongFiles.map(file => (
					<li key={file.name}>- {file.name}</li>
				))}
			</ul>
			<button type="button" className="btn-close" onClick={onClose}>
				{translations.close}
			</button>
			<style jsx>{`
				.post-invalid-files {
					background-color: var(--color-background);
					border-radius: var(--spacer);
					text-align: center;
					padding: var(--spacer);
					max-width: 100%;
					width: 400px;

					h2 {
						margin-bottom: calc(var(--spacer) * 2);
					}

					ul {
						margin-top: var(--spacer);
						list-style: none;
					}

					.btn-close {
						background: var(--color-primary);
						border: none;
						border-radius: var(--spacer);
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
