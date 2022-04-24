import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import SEO from '../components/seo';
import NavigationBar from '../components/navigation-bar';
import PrivacyEn from '../components/page-privacy/privacy-en';
import PrivacyEs from '../components/page-privacy/privacy-es';

export default function Privacy() {
	const { locale } = useRouter();
	const { translations } = useSelector((state) => state.config);

	return (
		<main>
			<SEO title={translations.privacyTitle} description={translations.privacyDescription} />
			<NavigationBar
				title={translations.privacyTitle}
				description={translations.privacyDescription}
				showBackBtn
				translations={translations}
			/>

			<article>
				{locale === 'en' && <PrivacyEn />}
				{locale === 'es' && <PrivacyEs />}
			</article>

			<style jsx>{`
				main {
					max-width: var(--container-width);
					margin: 0 auto;
					padding: calc(var(--spacer) * 2);

					article {
						:global(p) {
							margin-bottom: 10px;
							text-align: justify;
						}
					}
				}
			`}</style>
		</main>
	);
}
