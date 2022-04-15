import React, { useState } from 'react';
import Lightbox from '../lightbox';
import InputSuggestions from '../input-suggestions';
import InputNumeric from '../input-numeric';

export default function PostPrice(props) {
	const { id, errors, required, suggestions, translations, value: priceValue, onChange } = props;
	const [isModalOpen, setModalOpen] = useState(false);
	const selectedSuggestion = suggestions.find((item) => item.value === priceValue.currency);

	const customValue = (newSelectedSuggestion) => {
		const formattedValue = newSelectedSuggestion.label;
		return formattedValue;
	};

	const customOption = (suggestion) => (
		<div className="custom-option">
			<div>{suggestion.label}</div>
			<style jsx>{`
				.custom-option {
					display: flex;
					align-items: center;
				}
			`}</style>
		</div>
	);

	const onChangeValue = (value) => {
		onChange({ ...priceValue, value });
	};

	const onClearValue = () => {
		onChange({ ...priceValue, value: '' });
	};

	return (
		<div className="post-price">
			<div className="input-group">
				<button
					type="button"
					className="btn-indicative"
					title={translations.currency}
					onClick={() => setModalOpen(!isModalOpen)}
				>
					{selectedSuggestion && (
						<span
							style={{
								display: 'inline-block',
								minWidth: '32px',
							}}
						>
							{selectedSuggestion.value}
						</span>
					)}
					{!selectedSuggestion && <i className="font-icon fas fa-dollar-sign" />}
				</button>
				<InputNumeric
					id={id}
					autocomplete="off"
					inputType="tel"
					className="input-price"
					decimalScale={2}
					placeholder={translations.price}
					value={priceValue.value}
					onChange={onChangeValue}
				/>
				{!['', undefined, null].includes(priceValue.value) && (
					<button
						className="btn-clear"
						type="button"
						title={translations.clean}
						onClick={onClearValue}
					>
						<i className="fas fa-times" />
					</button>
				)}
			</div>
			<p className="error-msg">{translations[errors?.currency] && translations.selectCurrency}</p>
			<p className="error-msg">{translations[errors?.value]}</p>
			<Lightbox isOpen={isModalOpen} onToggle={() => setModalOpen(!isModalOpen)}>
				<section className="lightbox-post-price">
					<h2>{translations.selectCurrency}</h2>
					<InputSuggestions
						autofocus
						isInputLg
						customOption={customOption}
						customValue={customValue}
						placeholder={translations.currency}
						required={required}
						suggestions={suggestions}
						translations={translations}
						value={priceValue.currency}
						onChange={(currency) => {
							onChange({ ...priceValue, currency });
							setModalOpen(false);
						}}
					/>
				</section>
			</Lightbox>
			<style jsx>{`
				.post-price {
					.error-msg {
						color: var(--color-alert);
						margin: 0;
						margin-top: 5px;

						&:empty {
							margin-top: 0;
						}
					}

					.input-group {
						display: flex;
						align-items: center;

						:global(.input-price),
						.btn-clear,
						.btn-indicative {
							min-height: 40px;
						}

						:global(.input-price) {
							flex-grow: 1;
							border: 1px solid ${errors?.value ? 'var(--color-alert)' : 'var(--color-border)'};
							background-color: var(--color-background);
							color: var(--color-text);
							padding: var(--spacer);
							width: 100%;
						}

						.btn-indicative {
							display: flex;
							background: var(--color-secondary);
							border: 1px solid
								${errors?.currency ? 'var(--color-alert)' : 'var(--color-border)'};
							border-right: ${errors?.currency && !errors?.value
								? '1px solid var(--color-alert)'
								: '0'};
							color: var(--color-text);
							cursor: pointer;
							align-items: center;
							justify-content: center;
							padding: var(--spacer);
							text-transform: uppercase;
							min-width: 60px;

							img {
								margin-right: 4px;
							}
						}

						.btn-clear {
							background: var(--color-alert);
							border: none;
							cursor: pointer;
							color: white;
							padding: var(--spacer);
						}
					}

					.lightbox-post-price {
						background-color: var(--color-background);
						border-radius: var(--spacer);
						text-align: center;
						max-width: 100%;
						width: 400px;
						padding: var(--spacer);
						h2 {
							margin-bottom: var(--spacer);
						}
					}
				}
			`}</style>
		</div>
	);
}
