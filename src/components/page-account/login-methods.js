import React from 'react';

export default function LoginMethods(props) {
  const { identities, translations } = props;
  const providers = Object.keys(identities).sort().reduce((accum, providerName) => {
    accum = accum.concat({ name: providerName, code: identities[providerName] });
    return accum;
  }, []);

  return (
    <div className="login-methods">
      <h2>{translations['login']}</h2>
      {
        providers.map((provider, providerIndex) => (
          <React.Fragment key={providerIndex}>
            <label className="sr-only" htmlFor={`login ${provider.name}`}>{provider.name}</label>
            <div className="login-group">
              <span title={provider.name}>
                {provider.name === 'email' && <i className="fas fa-envelope"></i>}
                {provider.name === 'facebook.com' && <i className="fab fa-facebook"></i>}
                {provider.name === 'google.com' && <i className="fab fa-google-plus"></i>}
              </span>
              <input id={`login ${provider.name}`} disabled type="text" value={provider.code} />
            </div>
          </React.Fragment>
        ))
      }
      <style jsx>{`
        .login-methods {

          h2 {
            margin-bottom: 10px;
          }

          .login-group {
            display: flex;
            align-items: center;
            margin-bottom: 5px;

            span {
              padding: 8px;
            }

            input {
              border: none;
              border-bottom: 1px solid #ccc;
            }
          }
        }  
      `}</style>
    </div>
  );

}