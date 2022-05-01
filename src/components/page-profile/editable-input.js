import React, { useState } from 'react';
import { BREAKPOINTS } from '../../utils/style-utils';

export default function EditableInput(props) {
	const {
		isRequired,
		isUpdating,
		error,
		elementTag,
		inputType,
		translations,
		placeholder,
		prefixValue,
		value,
		onValidateInput,
		onUpdate,
	} = props;
	const [isEditing, setIsEditing] = useState(false);
	const [inputValue, setInputValue] = useState(value);
	const [inputError, setInputError] = useState(error || '');

	const isValidInput = () => {
		setInputError('');

		if (isRequired && !inputValue.trim()) {
			setInputError(translations.fieldIsRequired);
			return false;
		}

		return true;
	};

	const onCancelEdition = () => {
		setInputError('');
		setIsEditing(false);
		setInputValue(value);
	};

	const onInputChange = (event) => {
		let newValue = event.target.value;

		if (onValidateInput) {
			newValue = onValidateInput(newValue);
		}

		setInputValue(newValue);
	};

	const onInputBlur = () => {
		if (!isValidInput()) {
			return;
		}

		setIsEditing(false);
		onUpdate(inputValue);
	};

	const onSubmitForm = (event) => {
		event.preventDefault();

		if (!isValidInput()) {
			return;
		}

		setIsEditing(false);
		onUpdate(inputValue);
	};

	return (
		<div className="editable-input">
			<form className="form-editable" onSubmit={onSubmitForm}>
				{!isEditing &&
					(inputValue ? (
						React.createElement(elementTag, {}, `${prefixValue || ''}${value}`)
					) : (
						<span className="placeholder">{placeholder}</span>
					))}

				{isEditing ? (
					<>
						<button
							type="button"
							className="btn"
							title={translations.goBack}
							onClick={onCancelEdition}
						>
							<i className="fas fa-arrow-left" />
						</button>

						{inputType === 'textbox' && (
							<input
								className="input"
								// eslint-disable-next-line jsx-a11y/no-autofocus
								autoFocus
								type="text"
								placeholder={placeholder}
								value={inputValue}
								onChange={onInputChange}
								onBlur={onInputBlur}
							/>
						)}

						{inputType === 'textarea' && (
							<textarea
								className="input"
								// eslint-disable-next-line jsx-a11y/no-autofocus
								autoFocus
								placeholder={placeholder}
								value={inputValue}
								onChange={onInputChange}
								onBlur={onInputBlur}
							/>
						)}
					</>
				) : (
					<button
						type="button"
						className="btn"
						disabled={isUpdating}
						title={translations.edit}
						onClick={() => setIsEditing(true)}
					>
						<i className="fas fa-solid fa-pen" />
					</button>
				)}

				<button type="submit" className="sr-only">
					{translations.save}
				</button>
			</form>

			<p className="error-msg">{inputError}</p>

			<style jsx>{`
				.form-editable {
					display: flex;
					align-items: center;
					justify-content: center;

					:global(h2),
					:global(p) {
						margin: 0;
						word-break: break-all;
					}

					.input {
						width: 300px;
						max-width: 100%;
					}

					.placeholder {
						font-style: italic;
						font-weight: 200;
					}
				}

				.error-msg {
					margin-left: 34px;
				}

				@media screen and (min-width: ${BREAKPOINTS.TABLET}) {
					.form-editable {
						justify-content: flex-start;
					}
				}
			`}</style>
		</div>
	);
}
