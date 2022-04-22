import React, { useState, useEffect, useRef } from 'react';

export default function SearchBar(props) {
	const {
		id,
		autofocus,
		placeholder,
		searchTerm,
		translations,
		hideSearchBtn,
		onFocus,
		onClose,
		onSubmit,
	} = props;
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

	const onInputBlur = () => {
		if (onClose) {
			onClose();
		}
	};

	const onInputFocus = () => {
		if (onFocus) {
			onFocus();
		}
	};

	const onSubmitSearch = (event) => {
		event?.preventDefault();

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
				<button type="button" className="btn" title={translations.close} onClick={onClose}>
					<i className="fas fa-arrow-left" />
				</button>
			)}

			<input
				ref={inputRef}
				id={id}
				type="text"
				className="input input-search"
				placeholder={placeholder || translations.enterSearchTerm}
				value={keyword}
				onBlur={onInputBlur}
				onFocus={onInputFocus}
				onChange={onInputChange}
			/>

			{keyword && (
				<button type="button" title={translations.clean} className="btn" onMouseDown={onClear}>
					<i className="fas fa-times" />
				</button>
			)}

			{!hideSearchBtn && (
				<button
					type="submit"
					className="btn"
					title={translations.search}
					onMouseDown={onSubmitSearch}
				>
					<i className="fas fa-search" />
				</button>
			)}

			<style jsx>{`
				.search-bar {
					display: flex;
					flex-grow: 1;

					.input-search {
						flex-grow: 1;
						width: 100%;
					}
				}
			`}</style>
		</form>
	);
}
