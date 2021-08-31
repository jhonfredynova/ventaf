import React, { useState } from 'react';

export default function InputPassword(props) {
  const [inputType, setInputType] = useState('password');

  return (
    <div className="input-group">
      <input {...props} type={inputType} />
      <button 
        title={inputType === 'password' ? 'Show password' : 'hide password'}
        type="button"
        onClick={() => setInputType(inputType === 'password' ? 'text' : 'password')}>
        {inputType === 'text' && <i className="far fa-eye"></i>}
        {inputType === 'password' && <i className="far fa-eye-slash"></i>}
      </button>
      <style jsx>{`
        .input-group {
          display: flex;
          align-items: center;

          input {
            flex-grow: 1;
            border: 1px solid var(--border-color);
            padding: var(--spacer);
          }

          button {
            background: var(--color-secondary);
            border: none;
            cursor: pointer;  
            border-left: none;
            padding: var(--spacer);
          }
        }  
      `}</style>
    </div>
  ); 
}