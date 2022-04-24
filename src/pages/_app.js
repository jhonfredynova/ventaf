import '../styles/global.scss';
import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import { initStore } from '../store/store';
import { me, setToken } from '../store/actions/auth-actions';
import { getConfig } from '../services/config-service';

export default function MyApp({ Component, pageProps }) {
	const router = useRouter();
	const { locale } = router;
	const config = getConfig(locale);
	const store = initStore({ config });

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
		</Provider>
	);
}
