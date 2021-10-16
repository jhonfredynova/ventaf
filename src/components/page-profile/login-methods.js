import React from 'react';

export default function LoginMethods(props) {
  const { identities } = props;
  const providers = Object.keys(identities).sort().reduce((accum, providerName) => {
    accum = accum.concat({ name: providerName, code: identities[providerName] });
    return accum;
  }, []);

  return (
    <section className="login-methods">      
      {providers.map((provider, providerIndex) => (
        <label key={providerIndex} title={provider.name}>
          {provider.name === 'email' && <i className="fas fa-envelope"></i>}
          {provider.name === 'facebook.com' && <i className="fab fa-facebook"></i>}
          {provider.name === 'google.com' && <i className="fab fa-google-plus"></i>}
        </label>
      ))}
      <style jsx>{`
        .login-methods {
          label {
            font-size: 3rem;
            padding: 0 8px;
          }
        }  
      `}</style>
    </section>
  );

}