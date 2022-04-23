import React, { useRef } from 'react';

export default function InputPlacesAutocomplete(props) {
	const inputRef = useRef();
	const { getInputProps, suggestions, getSuggestionItemProps } = props;
	const { id, autoFocus, className, error, placeholder, translations, searchValue, onBlur, onClear } =
		props;
	const inputClassName = ['input']
		.concat(error ? 'alert' : '')
		.concat(className)
		.join(' ');

	return (
		<div className="input-places-autocomplete">
			<div className="btn btn-secondary icon-place">
				<i className="fas fa-location-arrow" />
			</div>

			<input
				className={inputClassName}
				{...getInputProps({
					id,
					ref: inputRef,
					autoFocus,
					placeholder,
					onBlur,
				})}
			/>

			{searchValue && (
				<button className="btn btn-alert" type="button" title={translations.clean} onClick={onClear}>
					<i className="fas fa-times" />
				</button>
			)}

			{suggestions.length > 0 && (
				<ul className="list-suggestions" style={{ zIndex: 2, top: '40px' }}>
					{suggestions.map((suggestion) => (
						<li
							key={suggestion.placeId}
							className={suggestion.active ? 'active' : ''}
							{...getSuggestionItemProps(suggestion, {})}
						>
							{suggestion.description}
						</li>
					))}
				</ul>
			)}

			<style jsx>{`
				.input-places-autocomplete {
					display: flex;
					align-items: center;
					position: relative;

					.icon-place {
						border-right: 0;
						cursor: default;
						min-width: 60px;
					}

					.input {
						flex-grow: 1;
					}

					.list-suggestions {
						position: absolute;
						box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
						background: var(--color-background);
						width: 100%;
						list-style: none;
						margin: 0;
						padding: 0;

						li {
							cursor: pointer;
							padding: var(--spacer);

							&.active,
							&:hover {
								background-color: var(--color-secondary);
							}
						}
					}
				}
			`}</style>
		</div>
	);
}
