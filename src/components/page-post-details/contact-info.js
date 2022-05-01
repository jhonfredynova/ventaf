import React from 'react';
import ContactButtons from './contact-buttons';
import { BREAKPOINTS } from '../../utils/style-utils';

export default function ContactInfo(props) {
	const { postData, pageTitle, sharingUrl, translations } = props;

	return (
		<div className="contact-info">
			<h2>{translations.sellerInfo}</h2>

			<ContactButtons
				postData={postData}
				pageTitle={pageTitle}
				sharingUrl={sharingUrl}
				translations={translations}
			/>

			<style jsx>{`
				.contact-info {
					h2 {
						display: none;
					}

					:global(.contact-buttons) {
						position: fixed;
						display: flex;
						left: 0;
						right: 0;
						bottom: 0;
						z-index: 2;

						:global(.btn) {
							flex: 1;
							margin: 0;
						}
					}
				}

				:global(body) {
					margin-bottom: 50px;
				}

				@media screen and (min-width: ${BREAKPOINTS.DESKTOP}) {
					.contact-info {
						margin-top: var(--spacer);

						:global(.contact-buttons) {
							position: static;
							display: block;

							:global(.btn) {
								margin-bottom: 5px;
							}
						}
					}

					:global(body) {
						margin-bottom: 0;
					}
				}
			`}</style>
		</div>
	);
}
