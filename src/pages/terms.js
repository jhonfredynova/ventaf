import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import SEO from '../components/seo';
import NavigationBar from '../components/navigation-bar';
import { initializeStore } from '../store/store';
import { getConfiguration } from '../store/actions/config-actions';
import TermsEn from '../components/page-terms/terms-en';
import TermsEs from '../components/page-terms/terms-es';

export const getStaticProps = async ({ locale }) => {
	const store = initializeStore();
	await store.dispatch(getConfiguration(locale));

	return {
		props: {
			initialReduxState: store.getState(),
		},
	};
};

export default function Terms() {
	const { locale } = useRouter();
	const { translations } = useSelector((state) => state.config);

	return (
		<main>
			<SEO title={translations.termsTitle} description={translations.termsDescription} />
			<NavigationBar
				title={translations.termsTitle}
				description={translations.termsDescription}
				showBackBtn
				translations={translations}
			/>
			<article>
				{locale === 'en' && <TermsEn />}
				{locale === 'es' && <TermsEs />}
			</article>
			<style jsx>{`
				main {
					max-width: var(--container-width);
					margin: 0 auto;
					padding: calc(var(--spacer) * 2);

					article {
						:global(h3) {
							margin-bottom: 15px;
						}

						:global(p) {
							margin-bottom: 10px;
							text-align: justify;
						}

						:global(ol) {
							margin-left: 30px;

							:global(li) {
								margin-bottom: 5px;
							}
						}
					}
				}
			`}</style>
		</main>
	);
}
