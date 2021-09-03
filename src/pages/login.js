import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SEO from '../components/seo';
import NavigationBar from '../components/navigation-bar';
import UserLogin from '../components/user-login/user-login';
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

export default function Login() {
  const authData = useSelector(state => state.auth.authData); 
  const { translations } = useSelector(state => state.config); 
  const router = useRouter();
  const { query } = router;
  const loginMessage = query.message;
  const onLoginSuccess = authData => {
    router.push(query.redirectTo ? query.redirectTo : `/${authData.profile.username}`);
  };

  useEffect(() => {
    if (authData) {
      router.push(`/${authData.profile.username}`);
    }
  }, [authData]);

  return (
    <main>
      <SEO
        title={translations['loginTitle']}
        description={translations['loginDescription']}>
      </SEO>
      <NavigationBar
        title={translations['loginTitle']}
        description={translations['loginDescription']}
        showBackBtn={true}
        translations={translations}>
      </NavigationBar>
      <section className="login-section">
        {loginMessage && <div className="login-message" role="alert">{loginMessage}</div>}
        <p className="link-forgot-password">
          <Link href="/recover-password">{translations['forgotPassword']}</Link>
        </p>
        <UserLogin
          translations={translations}
          onLoginSuccess={onLoginSuccess}>
        </UserLogin>
      </section>
      <style jsx>{`
        main {
          --container-width: 600px;
          max-width: var(--container-width);
          margin: 0 auto;
          padding: calc(var(--spacer) * 2);

          .login-section {
            .link-forgot-password {
              margin-bottom: var(--spacer);
            }

            .login-message {
              background: var(--color-secondary);
              border-radius: var(--border-radius);
              margin-bottom: var(--spacer);
              padding: var(--spacer);
            }
          }
        }  
      `}</style>
    </main>
  );

}
