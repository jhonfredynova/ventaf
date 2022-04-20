import React, { useState, useEffect } from 'react';

export default function EditableInput(props) {
	const {
		isUpdating,
		isProfileOwner,
		error,
		elementTag,
		inputType,
		translations,
		placeholder,
		value,
		onUpdate,
	} = props;
	const [isEditing, setIsEditing] = useState(false);
	const [inputValue, setInputValue] = useState(value);

	const onCancelEdition = () => {
		setIsEditing(false);
		onUpdate(value);
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
		setIsEditing(!!error);
	}, [error]);

	return (
		<div className="editable-input">
			<form className="form-editable" onSubmit={onSubmitForm}>
				{!isEditing &&
					(inputValue ? (
						React.createElement(elementTag, {}, inputValue)
					) : (
						<span className="placeholder">{placeholder}</span>
					))}

				{isProfileOwner &&
					(isEditing ? (
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
									onChange={(event) => setInputValue(event.target.value)}
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
									onChange={(event) => setInputValue(event.target.value)}
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
					))}

				<button type="submit" className="sr-only">
					{translations.save}
				</button>
			</form>

			<p className="error-msg">{error}</p>

			<style jsx>{`
				.form-editable {
					display: flex;
					align-items: center;

					:global(h2),
					:global(p) {
						margin: 0;
					}

					.placeholder {
						font-style: italic;
						font-weight: 200;
					}
				}

				.error-msg {
					margin-left: 34px;
				}
			`}</style>
		</div>
	);
}
