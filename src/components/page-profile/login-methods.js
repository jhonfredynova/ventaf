import React from 'react';

export default function LoginMethods(props) {
  const { identities } = props;

  return (
    <section className="login-methods">      
      {identities.map(provider => (
        <label htmlFor="provider" key={provider.providerId} title={provider.providerId}>
          {provider.providerId === 'email' && <i id="provider" className="fas fa-envelope" />}
          {provider.providerId === 'facebook.com' && <i id="provider" className="fab fa-facebook" />}
          {provider.providerId === 'google.com' && <i id="provider" className="fab fa-google-plus" />}
        </label>
      ))}
      <style jsx>{`
        .login-methods {
          label {
            font-size: 3rem;
            padding: 0;
            padding-right: 8px;
          }
        }  
      `}</style>
    </section>
  );

}