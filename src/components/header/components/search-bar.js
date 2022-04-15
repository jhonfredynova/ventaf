import React, { useState, useEffect, useRef } from 'react';

export default function SearchBar(props) {
	const { id, autofocus, placeholder, searchTerm, translations, onClose, onSubmit } = props;
	const inputRef = useRef(null);
	const [keyword, setKeyword] = useState('');

	const onClear = () => {
		setKeyword('');

		if (onSubmit) {
			onSubmit('');
		}
	};

	const onInputChange = (event) => {
		setKeyword(event.target.value);
	};

	const onSubmitSearch = (event) => {
		event.preventDefault();

		if (onSubmit && keyword !== searchTerm) {
			onSubmit(keyword);
		}
	};

	useEffect(() => {
		if (autofocus) {
			inputRef.current.focus();
		}
	}, [autofocus]);

	useEffect(() => {
		setKeyword(searchTerm || '');
	}, [searchTerm]);

	return (
		<form className="search-bar" onSubmit={onSubmitSearch}>
			{onClose && (
				<button type="button" className="btn-back" title={translations.close} onClick={onClose}>
					<i className="fas fa-arrow-left" />
				</button>
			)}

			<input
				ref={inputRef}
				id={id}
				type="text"
				className="input-search"
				placeholder={placeholder || translations.enterSearchTerm}
				value={keyword}
				onChange={onInputChange}
			/>

			{keyword && (
				<button type="button" title={translations.clean} className="btn-clean" onClick={onClear}>
					<i className="fas fa-times" />
				</button>
			)}

			<button type="submit" className="btn-search" title={translations.search}>
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

					.btn-back,
					.btn-clean,
					.btn-search {
						background: none;
						border: none;
						cursor: pointer;
						color: var(--color-text);
						padding: var(--spacer);
					}
				}
			`}</style>
		</form>
	);
}
