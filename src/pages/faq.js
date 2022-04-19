import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import SEO from '../components/seo';
import NavigationBar from '../components/navigation-bar';
import { initializeStore } from '../store/store';
import { getConfiguration } from '../store/actions/config-actions';
import FaqEn from '../components/page-faq/faq-en';
import FaqEs from '../components/page-faq/faq-es';

export const getStaticProps = async ({ locale }) => {
	const store = initializeStore();
	await store.dispatch(getConfiguration(locale));

	return {
		props: {
			initialReduxState: store.getState(),
		},
	};
};

export default function Faq() {
	const { locale } = useRouter();
	const { translations } = useSelector((state) => state.config);

	return (
		<main>
			<SEO title={translations.faqTitle} description={translations.faqDescription} />
			<NavigationBar
				title={translations.faqTitle}
				description={translations.faqDescription}
				showBackBtn
				translations={translations}
			/>
			<article>
				{locale === 'en' && <FaqEn />}
				{locale === 'es' && <FaqEs />}
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
						}
					}
				}
			`}</style>
		</main>
	);
}
