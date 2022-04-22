import React, { useRef } from 'react';

export default function InputPlacesAutocomplete(props) {
	const inputRef = useRef();
	const { getInputProps, suggestions, getSuggestionItemProps } = props;
	const { id, autofocus, className, error, placeholder, translations, searchValue, onBlur, onClear } =
		props;
	const inputClassName = ['input']
		.concat(error ? 'alert' : '')
		.concat(className)
		.join(' ');

	return (
		<div className="input-places-autocomplete">
			<div className="icon-place">
				<i className="fas fa-location-arrow" />
			</div>

			<input
				{...getInputProps({
					id,
					ref: inputRef,
					class: inputClassName,
					autofocus,
					placeholder,
					onBlur,
				})}
			/>

			{searchValue && (
				<button className="btn alert" type="button" title={translations.clean} onClick={onClear}>
					<i className="fas fa-times" />
				</button>
			)}

			{suggestions.length > 0 && (
				<ul className="list-suggestions" style={{ zIndex: 2, top: '40px' }}>
					{suggestions.map((suggestion) => (
						<li
							key={suggestion.placeId}
							{...getSuggestionItemProps(suggestion, {
								class: suggestion.active ? 'active' : '',
							})}
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
						background-color: var(--color-secondary);
						border: 1px solid var(--color-border);
						border-right: 0;
						color: var(--color-text);
						padding: var(--spacer);
						text-align: center;
						min-width: 60px;
					}

					:global(.input) {
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

						:global(li) {
							cursor: pointer;
							padding: var(--spacer);
						}

						:global(li:hover),
						:global(li.active) {
							background-color: var(--color-secondary);
						}
					}
				}
			`}</style>
		</div>
	);
}
