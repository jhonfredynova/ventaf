import React from 'react';

export default function LoginMethods(props) {
  const { identities } = props;

  return (
    <section className="login-methods">      
      {identities.map((provider, providerIndex) => (
        <label key={providerIndex} title={provider.providerId}>
          {provider.providerId === 'email' && <i className="fas fa-envelope"></i>}
          {provider.providerId === 'facebook.com' && <i className="fab fa-facebook"></i>}
          {provider.providerId === 'google.com' && <i className="fab fa-google-plus"></i>}
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