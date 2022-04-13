import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import SEO from '../components/seo';
import NavigationBar from '../components/navigation-bar';
import UserLogin from '../components/user-login/user-login';
import { initializeStore } from '../store/store';
import { getConfiguration } from '../store/actions/config-actions';
import Footer from '../components/footer';

export const getStaticProps = async ({ locale }) => {
	const store = initializeStore();
	await store.dispatch(getConfiguration(locale));

	return {
		props: {
			initialReduxState: store.getState(),
		},
	};
};

export default function Login() {
	const authData = useSelector((state) => state.auth.authData);
	const { translations } = useSelector((state) => state.config);
	const router = useRouter();
	const { query } = router;
	const loginMessage = query.message;
	const onLoginSuccess = (authDetails) => {
		router.push(query.redirectTo ? query.redirectTo : `/${authDetails.profile.username}`);
	};

	useEffect(() => {
		if (authData) {
			router.push(`/${authData.profile.username}`);
		}
	}, [authData, router]);

	return (
		<main>
			<SEO title={translations.loginTitle} description={translations.loginDescription} />
			<NavigationBar
				title={translations.loginTitle}
				description={translations.loginDescription}
				showBackBtn
				translations={translations}
			/>
			<section className="login-section">
				{loginMessage && (
					<div className="login-message" role="alert">
						{loginMessage}
					</div>
				)}
				<UserLogin translations={translations} onLoginSuccess={onLoginSuccess} />
			</section>
			<Footer translations={translations} />
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
							border-radius: var(--spacer);
							margin-bottom: var(--spacer);
							padding: var(--spacer);
						}
					}
				}
			`}</style>
		</main>
	);
}
