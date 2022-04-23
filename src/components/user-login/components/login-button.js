import React from 'react';

export default function LoginButton(props) {
	const { className, provider, children, ...buttonProps } = props;

	return (
		<button type="button" className={`btn login-button ${className} ${provider}`} {...buttonProps}>
			<span className="provider">
				{provider === 'email' && <i className="fas fa-envelope" />}
				{provider === 'facebook' && <i className="fab fa-facebook-f" />}
				{provider === 'google' && <i className="fab fa-google" />}
			</span>
			{children}
			<style jsx>{`
				.login-button {
					display: flex;
					align-items: center;
					width: 100%;

					&.facebook {
						background-color: #47629a;
						border-color: #47629a;
						color: white;
					}

					&.google {
						background-color: #c94935;
						border-color: #c94935;
						color: white;
					}

					&:disabled {
						background-color: var(--color-secondary);
						border-color: var(--color-secondary);
						color: var(--color-text);
					}

					.provider {
						border-right: 1px solid currentColor;
						text-align: left;
						margin-right: 10px;
						width: 25px;
					}
				}
			`}</style>
		</button>
	);
}
