import React, { useState, useEffect } from 'react';
import RichEditor from './rich-editor';
import { isHtml } from '../utils/text-utils';

export default function InputMultiLanguage(props) {
	const { languages, value, onChange } = props;
	const [isHtmlText, setIsHtmlText] = useState(null);
	const [currentLang, setCurrentLang] = useState('en');

	useEffect(() => {
		if (isHtmlText === null) {
			setIsHtmlText(isHtml(value[currentLang]));
		}
	}, [isHtmlText, currentLang, value]);

	return (
		<div className="input-multi-language">
			<ul className="tabs">
				{languages.map(lang => (
					<li key={lang}>
						<button
							type="button"
							className={`btn-tab ${currentLang === lang &&
								'active'}`}
							onClick={() => setCurrentLang(lang)}
						>
							{lang}
						</button>
					</li>
				))}
			</ul>
			<div className="editor-wrapper">
				{languages.map(lang => (
					<div
						key={lang}
						style={{
							display: currentLang === lang ? 'block' : 'none'
						}}
					>
						<RichEditor
							style={{ display: isHtmlText ? 'block' : 'none' }}
							value={value[lang] || ''}
							onChange={newValue => {
								if (isHtmlText) {
									onChange({ ...value, [lang]: newValue });
								}
							}}
						/>
						<textarea
							style={{
								display: isHtmlText ? 'none' : 'block',
								height: '250px'
							}}
							value={value[lang] || ''}
							onChange={event => {
								if (!isHtmlText) {
									onChange({
										...value,
										[lang]: event.target.value
									});
								}
							}}
						/>
					</div>
				))}
			</div>
			<div className="buttons">
				<button
					type="button"
					className={`btn-toggle ${!isHtmlText && 'active'}`}
					onClick={() => setIsHtmlText(false)}
				>
					Text
				</button>
				<button
					type="button"
					className={`btn-toggle ${isHtmlText && 'active'}`}
					onClick={() => setIsHtmlText(true)}
				>
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
						overflow: hidden;

						:global(.quill .ql-container) {
							height: 208px;
						}

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
