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
    ReactGA.initialize(window.gAnalyticsKey, {});
    
    if (localStorage.token) {
      await store.dispatch(setToken(localStorage.token));
    }

    store.dispatch(me());
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
          --color-background: #fff;
          --color-border: #ccc;
          --color-primary: #0076a3;
          --color-secondary: #e4e6eb;
          --color-alert: #dc3545;
          --color-text: #333;

          --container-width: 900px;
          --spacer: 10px;
        }

        /* General styles */
        html {
          font-size: 62.5%;

          body {
            background-color: var(--color-background);
            font-family: Helvetica, Arial, sans-serif;
            font-size: 1.6rem;

            &, * {
              box-sizing: border-box;
              color: var(--color-text);
              margin: 0;
              padding: 0;
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