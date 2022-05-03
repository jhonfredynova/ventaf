import React, { useRef } from 'react';
import { copyToClipboard } from '../utils/text-utils';

export default function ButtonCopyClipboard(props) {
	const { children, className, translations, value, ...btnProps } = props;
	const copyClipboardSucessElem = useRef();
	const btnClassName = ['btn-copy-clipboard', className || 'btn-basic'].join(' ');

	const onClickBtnClipboard = () => {
		copyClipboardSucessElem.current.classList.add('show');
		copyToClipboard(value);
		setTimeout(() => copyClipboardSucessElem.current.classList.remove('show'), 1500);
	};

	return (
		<button {...btnProps} type="button" className={btnClassName} onClick={onClickBtnClipboard}>
			{children}

			<span ref={copyClipboardSucessElem} className="copy-clipboard-success">
				{translations.linkWasCopied}
			</span>

			<style jsx>{`
				.btn-copy-clipboard {
					position: relative;

					.copy-clipboard-success {
						display: none;
						position: absolute;
						top: 100%;
						right: 0;
						background: var(--color-secondary);
						opacity: 0.8;
						color: var(--color-text);
						padding: var(--spacer);
						width: max-content;
						z-index: 2;

						&.show {
							display: block;
							animation: fade 1500ms ease-in-out;
						}

						@keyframes fade {
							0% {
								opacity: 1;
							}
							9% {
								opacity: 0.9;
							}
							30% {
								opacity: 0.8;
							}
							50% {
								opacity: 0.6;
							}
							70% {
								opacity: 0.4;
							}
							90% {
								opacity: 0.2;
							}
							100% {
								opacity: 0;
							}
						}
					}

					&.btn-basic {
						background: none;
						border: none;
						cursor: pointer;
						color: var(--color-text);
						margin: 0;
						padding: 0;
					}
				}
			`}</style>
		</button>
	);
}
