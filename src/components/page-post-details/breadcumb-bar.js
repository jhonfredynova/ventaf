import React from 'react';
import ReactGA from 'react-ga';
import { useRouter } from 'next/router';
import { BREAKPOINTS } from '../../utils/style-utils';
import ButtonCopyClipboard from '../button-copy-clipboard';

export default function BreadcumbBar(props) {
	const { translations, pageTitle, sharingUrl } = props;
	const router = useRouter();

	const onShareAd = (action, value) => {
		ReactGA.event({
			category: 'Social',
			action,
			value,
		});
	};

	return (
		<section className="breadcumb-bar">
			<button
				type="button"
				className="btn btn-back"
				title={translations.backToList}
				onClick={() => router.back()}
			>
				<i className="fas fa-arrow-left" /> <span className="text">{translations.backToList}</span>
			</button>

			<ul className="share-bar">
				<li>{translations.share}:</li>
				<li>
					<a
						className="btn"
						href={`https://facebook.com/sharer.php?u=${sharingUrl}`}
						rel="noreferrer"
						target="_blank"
						title={translations.shareViaFacebook}
						onClick={() => onShareAd('Shared ad via facebook', 1)}
					>
						<i className="fab fa-facebook-f fa-2x" />
					</a>
				</li>
				<li>
					<a
						className="btn"
						href={`https://twitter.com/share?text=${sharingUrl}`}
						rel="noreferrer"
						target="_blank"
						title={translations.shareViaTwitter}
						onClick={() => onShareAd('Shared ad via twitter', 1)}
					>
						<i className="fab fa-twitter fa-2x" />
					</a>
				</li>
				<li>
					<a
						className="btn"
						href={`mailto:?subject=${pageTitle}&body=${sharingUrl}`}
						rel="noreferrer"
						target="_blank"
						title={translations.shareViaEmail}
						onClick={() => onShareAd('Shared ad via email', 1)}
					>
						<i className="fas fa-envelope fa-2x" />
					</a>
				</li>
				<li>
					<ButtonCopyClipboard
						className="btn btn-clipboard"
						title={translations.shareViaUrl}
						translations={translations}
						value={sharingUrl}
						onClick={() => onShareAd('Copy ad url to clipboard', 2)}
					>
						<i className="fas fa-link fa-2x" />
					</ButtonCopyClipboard>
				</li>
			</ul>

			<style jsx>{`
				.breadcumb-bar {
					display: flex;
					align-items: center;
					margin-bottom: var(--spacer);

					.btn-back {
						.text {
							display: none;
							margin-left: 5px;
						}
					}

					ul.share-bar {
						display: flex;
						align-items: center;
						margin: 0;
						margin-left: auto;
						list-style: none;

						li {
							margin-right: 5px;

							.btn {
								padding: 5px;
							}
						}
					}

					@media screen and (min-width: ${BREAKPOINTS.TABLET}) {
						.btn-back {
							.text {
								display: inline-block;
							}
						}
					}
				}
			`}</style>
		</section>
	);
}
