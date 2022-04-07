import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithPopup,
	FacebookAuthProvider,
	GoogleAuthProvider,
	linkWithCredential,
} from 'firebase/auth';
import React, { useState } from 'react';
import ReactGA from 'react-ga';
import { useStore } from 'react-redux';
import { useRouter } from 'next/router';
import LoginButton from './login-button';
import { setToken, me, loginGoogle, loginFacebook } from '../../../store/actions/auth-actions';

export default function LoginSocialNetworks(props) {
	const store = useStore();
	const router = useRouter();
	const [isProcessingFacebook, setIsProcessingFacebook] = useState(false);
	const [isProcessingGoogle, setIsProcessingGoogle] = useState(false);
	const [error, setError] = useState('');
	const { isLoggingIn, translations, onLogginIn, onSuccess } = props;

	const signInWithPopupSocialNetwork = async (provider) => {
		const app = initializeApp({
			apiKey: window.fKey,
			authDomain: window.fDomain,
		});
		const firebaseAuth = getAuth(app);
		firebaseAuth.languageCode = router.locale;
		let providerAuth = null;

		if (provider === 'facebook') {
			providerAuth = new FacebookAuthProvider();
		} else if (provider === 'google') {
			providerAuth = new GoogleAuthProvider();
		}

		providerAuth.addScope('email');
		providerAuth.setCustomParameters({ display: 'popup' });

		try {
			await signInWithPopup(firebaseAuth, providerAuth);
		} catch (errorDetails) {
			if (errorDetails.code === 'auth/account-exists-with-different-credential') {
				const facebookCredential = FacebookAuthProvider.credentialFromError(errorDetails);
				linkWithCredential(firebaseAuth.currentUser, facebookCredential);
			} else {
				throw errorDetails;
			}
		}

		const user = firebaseAuth.currentUser;

		return user;
	};

	const loginWithFacebook = async () => {
		try {
			onLogginIn(true);
			setIsProcessingFacebook(true);
			setError('');

			const userOAuth = await signInWithPopupSocialNetwork('facebook');
			const loginResponse = await store.dispatch(loginFacebook(userOAuth));
			await store.dispatch(setToken(loginResponse.token));
			await store.dispatch(me());

			ReactGA.event({
				category: 'Users',
				action: 'Logged in with facebook',
				value: 2,
			});

			onSuccess(store.getState().auth.authData);
			onLogginIn(false);
			setIsProcessingFacebook(false);
		} catch (errorDetails) {
			setError(translations[errorDetails.code] || errorDetails.message);
			onLogginIn(false);
			setIsProcessingFacebook(false);
		}
	};

	const loginWithGoogle = async () => {
		try {
			onLogginIn(true);
			setIsProcessingGoogle(true);
			setError('');

			const userOAuth = await signInWithPopupSocialNetwork('google');
			const loginResponse = await store.dispatch(loginGoogle(userOAuth));
			await store.dispatch(setToken(loginResponse.token));
			await store.dispatch(me());

			ReactGA.event({
				category: 'Users',
				action: 'Logged in with google',
				value: 2,
			});

			onSuccess(store.getState().auth.authData);
			onLogginIn(false);
			setIsProcessingGoogle(false);
		} catch (errorDetails) {
			setError(translations[errorDetails.code] || errorDetails.message);
			onLogginIn(false);
			setIsProcessingGoogle(false);
		}
	};

	return (
		<>
			<p className="error-msg">{error}</p>
			<section className="login-social-networks">
				<div className="btn-wrapper">
					<LoginButton
						type="button"
						disabled={isLoggingIn}
						provider="facebook"
						onClick={loginWithFacebook}
					>
						{isProcessingFacebook && <i className="fa fa-spinner fa-spin" />}
						{translations.loginWithFacebook}
					</LoginButton>
				</div>
				<div className="btn-wrapper">
					<LoginButton
						type="button"
						disabled={isLoggingIn}
						provider="google"
						onClick={loginWithGoogle}
					>
						{isProcessingGoogle && <i className="fa fa-spinner fa-spin" />}
						{translations.loginWithGoogle}
					</LoginButton>
				</div>
			</section>
			<style jsx>{`
				.error-msg {
					color: var(--color-alert);
				}

				.login-social-networks {
					margin-bottom: 10px;

					.btn-wrapper {
						margin-bottom: 10px;

						i {
							margin-right: 4px;
						}
					}
				}
			`}</style>
		</>
	);
}
