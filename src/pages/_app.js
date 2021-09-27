import 'normalize.css/normalize.css';
import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import { useStore } from '../store/store';
import { me, setToken } from '../store/actions/auth-actions';

export default function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  const router = useRouter();

  useEffect(async () => {
    ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALITYCS_KEY, {});
    await store.dispatch(setToken(localStorage.token));
    store.dispatch(me()).catch(() => localStorage.removeItem('token'));
  }, []);


  useEffect(() => {
    ReactGA.pageview(`${window.location.pathname}${window.location.search}`);
  }, [router.pathname, router.query]);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <style global jsx>{`
        /* Font awesome */
        $fa-font-path: '/webfonts';
        @import '@fortawesome/fontawesome-free/scss/fontawesome.scss';
        @import '@fortawesome/fontawesome-free/scss/brands.scss';
        @import '@fortawesome/fontawesome-free/scss/solid.scss';
        @import '@fortawesome/fontawesome-free/scss/regular.scss';

        /* Global styles */
        :root {
          --border-color: #ccc;
          --border-radius: 8px;

          --color-background: #f0f2f5;
          --color-primary: #0076a3;
          --color-secondary: #e4e6eb;
          --color-error: #dc3545;
          --color-text: #333;

          --container-width: 1200px;
          --spacer: 10px;
        }

        html {
          font-size: 62.5%;

          body {
            background-color: var(--color-background);
            color: var(--color-text);
            font-family: Helvetica, Arial, sans-serif;
            font-size: 1.6rem;

            &, * {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
            }

            .sr-only {
              display: none;
            }

            a, button {
              &:disabled {
                opacity: 0.8;
                cursor: not-allowed;
              }

              &:active,
              &:focus,
              &:visited {
                color: var(--color-primary);
              }
            }
          }
        }
      `}</style>
    </Provider>
  );
}