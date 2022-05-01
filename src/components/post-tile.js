import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatMoney } from '../utils/intl-utils';
import { trimTextWithEllipsis } from '../utils/text-utils';
import { getPostTitleSlug } from '../utils/seo-utils';

export default function PostTile(props) {
	const { isLoading, translations, data } = props;
	const { price } = data;
	const featurePhoto = data.photos[0];
	const titleSlug = getPostTitleSlug(data);

	return (
		<article className="post-tile">
			<header>
				<Link href={`/post/${titleSlug}/${data.id}`} passHref>
					<a href="passHref" className={`post-link ${isLoading ? 'disabled' : ''}`}>
						<h2 className="sr-only">{trimTextWithEllipsis(data.description, 160)}</h2>
					</a>
				</Link>
				<div className="thumbnail">
					<Image src={featurePhoto} alt={data.description} layout="fill" />
				</div>
			</header>
			<div className="info">
				<h3 className={price.value === 0 && 'free-price'}>
					{price.value === 0 ? (
						<>
							<i className="fas fa-gift" /> {translations.free}
						</>
					) : (
						<b>
							${formatMoney(price.value)}
							{` ${price.currency.toUpperCase()}`}
						</b>
					)}
				</h3>
				<p className="location">
					<i className="fas fa-location-arrow" title={translations.location} />
					{data.location.description}
				</p>
				<p className="description">{data.description}</p>
			</div>
			<style jsx>{`
				.post-tile {
					background: none;
					border: 0;
					color: var(--color-text);
					display: flex;
					flex-flow: column;
					margin: 0;
					padding: 0;
					height: 100%;
					text-decoration: none;
					width: 100%;

					&:hover,
					&:focus {
						.thumbnail :global(img) {
							transform: scale(1.15);
						}
					}

					header {
						.post-link {
							text-decoration: none;

							&.disabled {
								cursor: default;
							}

							&::after {
								content: '';
								position: absolute;
								left: 0;
								top: 0;
								right: 0;
								bottom: 0;
								z-index: 2;
							}
						}

						.thumbnail {
							position: relative;
							background: black;
							width: 100%;
							padding-top: 75%;
							flex-shrink: 0;
							overflow: hidden;

							:global(img) {
								position: absolute;
								width: 100%;
								height: 100%;
								object-fit: contain;
								top: 0px;
								left: 0px;
								right: 0px;
								bottom: 0px;
								transition: -webkit-transform 0.6s cubic-bezier(0.11, 0, 0.31, 1);
								transition: transform 0.6s cubic-bezier(0.11, 0, 0.31, 1);
								transition: transform 0.6s cubic-bezier(0.11, 0, 0.31, 1),
									-webkit-transform 0.6s cubic-bezier(0.11, 0, 0.31, 1);
							}
						}
					}

					.info {
						text-align: left;
						padding-top: var(--spacer);
						width: 100%;

						h3 {
							font-size: 1.8rem;
							margin: 3px 0;

							&.free-price {
								color: var(--color-alert);
							}
						}

						.location,
						.description {
							margin: 3px 0;
						}

						.location > i {
							margin-right: 3px;
							margin-top: 3px;
						}

						.description {
							color: var(--color-text);
							margin-top: 3px;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
							overflow: hidden;
						}
					}
				}
			`}</style>
		</article>
	);
}
