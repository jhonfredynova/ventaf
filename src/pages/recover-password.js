import React, { useState } from 'react';
import { useSelector, useStore } from 'react-redux';
import { useRouter } from 'next/router';
import SEO from '../components/seo';
import NavigationBar from '../components/navigation-bar';
import { recoverPassword } from '../store/actions/auth-actions';
import { initializeStore } from '../store/store';
import { getConfiguration } from '../store/actions/config-actions';

export const getStaticProps = async ({ locale }) => {
  const store = initializeStore();
  await store.dispatch(getConfiguration(locale));
  
  return {
    props: {
      initialReduxState: store.getState() 
    }
  };
};

export default function RecoverPassword() {
  const store = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [model, setModel] = useState({ email: '' });
  const { translations } = useSelector(state => state.config);
  const router = useRouter();
  const { query } = router;
  const forgotPassword = async e => {
    try {
      e.preventDefault();
      setIsLoading(true);
      setErrors({});
      setModel({ ...model, token: query.token });
      const response = await store.dispatch(recoverPassword(model));
      const successMessage = translations[response.code];
      router.push(`/login?message=${successMessage}`);
      setIsLoading(false);
    } catch (error) {
      const { errors, code } = error?.response?.data || {};
      setErrors({ ...errors, general: code });
      setIsLoading(false);
    }
  };

  return (
    <main>
      <SEO
        title={translations['recoverPasswordTitle']}
        description={translations['recoverPasswordDescription']}>
      </SEO>
      <NavigationBar
        title={translations['recoverPasswordTitle']}
        description={translations['recoverPasswordDescription']}
        showBackBtn={true}
        translations={translations}>
      </NavigationBar>
      <form onSubmit={forgotPassword}>
        <div className="form-row">
          <label className="sr-only">{translations['email']} *</label>
          <input
            type="text"
            placeholder={`${translations['email']} *`}
            onChange={e => setModel({ ...model, email: e.target.value })}
          />
          <p className="error-msg">{translations[errors.general]}</p>
          <p className="error-msg">{translations[errors.email]}</p>
        </div>
        <div className="buttons-section">
          <button type="submit" className="btn-submit" disabled={isLoading}>
            {isLoading && <i className="fas fa-spinner fa-spin"></i>}
            {translations['recoverPassword']}
          </button>
        </div>
      </form>
      <style jsx>{`
        main {
          --container-width: 600px;
          max-width: var(--container-width);
          margin: 0 auto;
          padding: calc(var(--spacer) * 2);

          .form-row {
            input {
              padding: var(--spacer);
              width: 100%;
            }

            .error-msg {
              color: var(--color-alert);
            }
          }

          .buttons-section {
            margin-top: 10px;
            text-align: right;

            .btn-submit {
              background: var(--color-primary);
              border: none;
              border-radius: var(--border-radius);
              color: white;
              cursor: pointer;
              padding: var(--spacer);
              
              i {
                margin-right: 5px;
              }
            }
          }
        }  
      `}</style>
    </main>
  );

}