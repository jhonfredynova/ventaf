import React, { useState } from 'react';

export default function SearchBar(props) {
	const { id, placeholder, searchTerm, translations, onChange, onSubmit } = props;
	const [newSearchTerm, setNewSearchTerm] = useState(searchTerm || '');

	const onClear = () => {
		setNewSearchTerm('');

		if (onChange) {
			onChange('');
		}

		if (onSubmit) {
			onSubmit('');
		}
	};

	const onSubmitSearch = () => {
		if (onSubmit && newSearchTerm !== searchTerm) {
			onSubmit(newSearchTerm);
		}
	};

	const onInputChange = (event) => {
		setNewSearchTerm(event.target.value);

		if (onChange) {
			onChange(newSearchTerm);
		}
	};

	const onInputKeyDown = (event) => {
		if (event.key === 'Enter') {
			onSubmitSearch();
		}
	};

	return (
		<div className="search-bar">
			<input
				id={id}
				type="text"
				className="input-search"
				placeholder={placeholder || translations.enterSearchTerm}
				value={newSearchTerm}
				onChange={onInputChange}
				onKeyDown={onInputKeyDown}
			/>
			{newSearchTerm && (
				<button type="button" title={translations.clean} className="btn-clean" onClick={onClear}>
					<i className="fas fa-times" />
				</button>
			)}
			<button type="button" className="btn-search" title={translations.search} onClick={onSubmitSearch}>
				<i className="fas fa-search" />
			</button>
			<style jsx>{`
				.search-bar {
					display: flex;
					flex-grow: 1;

					.input-search {
						background-color: var(--color-background);
						color: var(--color-text);
						flex-grow: 1;
						border: 1px solid var(--color-border);
						padding: var(--spacer);
						width: 100%;

						&::placeholder {
							color: #999;
						}
					}

					.btn-clean,
					.btn-search {
						cursor: pointer;
						padding: var(--spacer);
					}

					.btn-clean {
						background: var(--color-alert);
						border: 1px solid var(--color-alert);
						color: white;
					}

					.btn-search {
						background: var(--color-secondary);
						color: var(--color-text);
						border: 1px solid var(--color-border);
						border-left: none;
					}
				}
			`}</style>
		</div>
	);
}
