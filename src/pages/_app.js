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

  useEffect(() => {
    ReactGA.initialize(window.gAnalyticsKey, {});
    store.dispatch(setToken(localStorage.token)).finally(() => {
      store.dispatch(me());
    });
  }, [store]);

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
          --color-background: #fff;
          --color-border: #ccc;
          --color-primary: #00709a;
          --color-secondary: #e4e6eb;
          --color-alert: #bc2c39;
          --color-links: #00709a;
          --color-text: #333;

          --container-width: 1200px;
          --spacer: 10px;
        }

        @media (prefers-color-scheme: dark) {
          :root {
            --color-background: #333;
            --color-border: #ccc;
            --color-primary: #007aaa;
            --color-secondary: #555;
            --color-alert: #ff6a8c;
            --color-links: #00a9eb;
            --color-text: #fff;
          }
        }

        /* General styles */
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

            a {
              color: var(--color-links);
            }

            input,
            textarea {
              &::placeholder {
                color: var(--color-text);
              }
            }

            .sr-only {
              display: none;
            }
          }
        }
      `}</style>
    </Provider>
  );
}