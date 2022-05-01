import React, { useState, useEffect } from 'react';
import { BREAKPOINTS } from '../../utils/style-utils';

export default function EditableInput(props) {
	const {
		isUpdating,
		error,
		elementTag,
		inputType,
		translations,
		placeholder,
		prefixValue,
		value,
		onValidateInput,
		onCancel,
		onUpdate,
	} = props;
	const [isEditing, setIsEditing] = useState(false);
	const [inputValue, setInputValue] = useState(value);

	const onCancelEdition = () => {
		setIsEditing(false);
		setInputValue(value);
		onCancel();
	};

	const onInputChange = (event) => {
		let newValue = event.target.value;

		if (onValidateInput) {
			newValue = onValidateInput(newValue);
		}

		setInputValue(newValue);
	};

	const onInputBlur = () => {
		setIsEditing(false);
		onUpdate(inputValue);
	};

	const onSubmitForm = (event) => {
		event.preventDefault();
		setIsEditing(false);
		onUpdate(inputValue);
	};

	useEffect(() => {
		if (error?.trim()) {
			setIsEditing(true);
		} else {
			setIsEditing(false);
		}
	}, [error]);

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
							onMouseDown={onCancelEdition}
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

			{isEditing && <p className="error-msg">{error}</p>}

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
					margin-bottom: 10px;
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
