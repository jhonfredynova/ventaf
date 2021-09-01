import React from 'react';

export default function LoginButton(props) {
  const { className, provider, ...buttonProps } = props;

  return (
    <button 
      className={`login-button ${className} ${provider}`} 
      {...buttonProps}>
      <span className="provider">
        {provider === 'email' && <i className="fas fa-envelope"></i>}
        {provider === 'facebook' && <i className="fab fa-facebook-f"></i>}
        {provider === 'google' && <i className="fab fa-google"></i>}
      </span>
      {props.children}
      <style jsx>{`
        .login-button {
          border: none;
          cursor: pointer;
          padding: var(--spacer);
          display: flex;
          align-items: center;
          width: 100%;

          &.email {
            background-color: var(--color-primary);
            color: white;

            .provider {
              border-right: 1px solid var(--color-text);
            }
          }

          &.facebook {
            background-color: #47629a;
            color: white;
          }

          &.google {
            background-color: #e0523b;
            color: white;
          }

          &:hover,
          &:focus {
            opacity: 0.9;
          }

          .provider {
            border-right: 1px solid white;
            text-align: left;
            margin-right: 10px;
            width: 25px;
          }
        }
      `}</style>
    </button>
  );

}