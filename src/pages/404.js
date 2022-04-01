import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import NavigationBar from '../components/navigation-bar';
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

export default function Custom404() {
	const { translations } = useSelector(state => state.config);
	const redirectLink = '/';
	const redirectText = translations.goHomePage;

	return (
		<main>
			<NavigationBar
				title={translations.notFoundTitle}
				description={translations.notFoundDescription}
				translations={translations}
			/>
			<section className="content-wrapper">
				<Image
					src="https://storage.googleapis.com/construccionytecnologia-f556c.appspot.com/404.svg"
					alt={translations.notFoundDescription}
					width="1000"
					height="480"
				/>
				<p>{translations.notFoundDescription}</p>
				<p>
					<Link href={redirectLink}>{redirectText}</Link>
				</p>
			</section>
			<style jsx>{`
				main {
					max-width: var(--container-width);
					margin: 0 auto;
					padding: calc(var(--spacer) * 2);

					.content-wrapper {
						text-align: center;
					}
				}
			`}</style>
		</main>
	);
}
