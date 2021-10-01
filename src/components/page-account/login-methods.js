import React from 'react';

export default function LoginMethods(props) {
  const { identities } = props;
  const providers = Object.keys(identities).sort().reduce((accum, providerName) => {
    accum = accum.concat({ name: providerName, code: identities[providerName] });
    return accum;
  }, []);

  return (
    <section className="login-methods">      
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
              <label id={`login ${provider.name}`}>{provider.code}</label>
            </div>
          </React.Fragment>
        ))
      }
      <style jsx>{`
        .login-methods {
          .login-group {
            display: flex;
            align-items: center;
            margin-bottom: 5px;

            span {
              padding: 8px;
            }

            label {
              border-bottom: 1px solid var(--border-color);
              width: 100%;
            }
          }
        }  
      `}</style>
    </section>
  );

}