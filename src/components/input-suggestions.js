import React, { useState, useRef, useEffect } from 'react';

export default function InputSuggestions(props) {
	const {
		autofocus,
		id,
		className,
		translations,
		placeholder,
		customFilterLogic,
		customOption,
		style,
		required,
		suggestions,
		value,
		onBlur,
		onChange,
	} = props;
	const selectedSuggestion = suggestions.find((suggestion) => suggestion.value === value);
	const inputRef = useRef(null);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [searchValue, setSearch] = useState('');

	const filterLogic = (suggestion, newSearchValue) => {
		const { label, value: suggestionValue } = suggestion;
		return `${label} ${suggestionValue}`.toLowerCase().includes(newSearchValue.toLowerCase());
	};

	const filteredSuggestions = suggestions.filter((suggestion) => {
		if (customFilterLogic) {
			return customFilterLogic(suggestion, searchValue);
		}
		return filterLogic(suggestion, searchValue);
	});

	const onKeyDown = (event) => {
		if (['Enter', 13].includes(event.key)) {
			event.preventDefault();
			onChange(selectedSuggestion?.value);
		}
	};

	const onClear = () => {
		setSearch('');
		onChange('');
	};

	const onInputBlur = () => {
		setShowSuggestions(false);
		setSearch('');

		if (onBlur) {
			onBlur();
		}

		if (!value) {
			onChange('');
		}
	};

	const onClickSuggestion = (suggestion) => {
		setSearch('');
		onChange(suggestion?.value);
	};

	const onInputChange = (event) => {
		setSearch(event.target.value);
	};

	useEffect(() => {
		if (autofocus) {
			inputRef.current.focus();
		}
	}, [autofocus]);

	return (
		<div className="input-suggestions">
			<input
				id={id}
				type="text"
				ref={inputRef}
				aria-required={required}
				className={'input '.concat(className)}
				placeholder={selectedSuggestion ? selectedSuggestion.label : placeholder}
				value={searchValue}
				onChange={onInputChange}
				onFocus={() => setShowSuggestions(true)}
				onBlur={onInputBlur}
				onKeyDown={onKeyDown}
			/>
			<ul
				className={!showSuggestions && 'd-none'}
				style={{
					...(style && style.suggestions),
					top: `${inputRef.current ? inputRef.current.offsetHeight : 0}px`,
				}}
			>
				{(searchValue ? filteredSuggestions : suggestions).map((suggestion) => (
					<li key={suggestion.label} className={suggestion.label === value ? 'active' : ''}>
						<button
							type="button"
							className="btn btn-link"
							onMouseDown={() => onClickSuggestion(suggestion)}
						>
							{customOption ? customOption(suggestion) : suggestion.label}
						</button>
					</li>
				))}
			</ul>
			{(searchValue || selectedSuggestion) && (
				<>
					{selectedSuggestion && (
						<button
							className="btn btn-primary"
							type="button"
							title={translations.ok}
							onClick={() => onClickSuggestion(selectedSuggestion)}
						>
							<i className="fas fa-check" />
						</button>
					)}
					<button
						className="btn btn-alert"
						type="button"
						title={translations.clean}
						onClick={onClear}
					>
						<i className="fas fa-times" />
					</button>
				</>
			)}
			<style jsx>{`
				.input-suggestions {
					display: flex;
					align-items: center;
					position: relative;

					.input {
						flex-grow: 1;
					}

					ul {
						background: var(--color-background);
						border: 1px solid #ccc;
						border-top: 0;
						max-height: 250px;
						width: 100%;
						overflow: auto;
						position: absolute;
						margin: 0;
						padding: 0;
						list-style: none;

						li {
							text-align: left;
							padding: 0;
							margin: 0;

							&:hover {
								background: var(--color-secondary);
							}

							&.active {
								background: var(--color-secondary);
							}

							.btn-link {
								text-align: left;
								width: 100%;
							}
						}
					}
				}
			`}</style>
		</div>
	);
}
