import '../styles/global.scss';
import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import store from '../store/store';
import { me, setToken } from '../store/actions/auth-actions';
import { getConfig } from '../services/config-service';
import { getConfiguration } from '../store/actions/config-actions';

export default function MyApp({ Component, pageProps }) {
	const router = useRouter();
	const { locale } = router;
	const config = getConfig(locale);

	useEffect(() => {
		const colorSchemeMatchMedia = window.matchMedia('(prefers-color-scheme: dark)');
		const onChangeColorScheme = (event) => {
			if (event.matches) {
				document.body.classList.add('dark');
			} else {
				document.body.classList.remove('dark');
			}
		};

		colorSchemeMatchMedia.addEventListener('change', onChangeColorScheme);
		onChangeColorScheme(colorSchemeMatchMedia);

		return () => {
			window
				.matchMedia('(prefers-color-scheme: dark)')
				.removeEventListener('change', onChangeColorScheme);
		};
	}, []);

	useEffect(() => {
		ReactGA.initialize(window.gAnalyticsKey, {});
		store.dispatch(getConfiguration(locale));
		store.dispatch(setToken(localStorage.token)).finally(() => {
			store.dispatch(me());
		});
	}, [locale]);

	useEffect(() => {
		ReactGA.pageview(`${window.location.pathname}${window.location.search}`);
	}, [router.pathname, router.query]);

	return (
		<Provider store={store} serverState={{ ...store.getState(), config }}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
}
