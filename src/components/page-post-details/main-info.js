import React from 'react';
import PriceInfo from './price-info';
import UserCard from './user-card';
import { formatDate } from '../../utils/intl-utils';

export default function MainInfo(props) {
	const { currencies, translations, postData, userProfile } = props;
	const { price } = postData;

	return (
		<section className="main-info">
			<PriceInfo currencies={currencies} price={price} translations={translations} />
			<p>
				<i className="fas fa-location-arrow" title={translations.location} />
				{postData.location.description}
			</p>
			<p>
				<i className="far fa-clock" title={translations.date} />
				{formatDate(postData.createdAt, 'dd/month/yyyy hrs:min')}
			</p>
			<p>
				<i className="far fa-eye" title={translations.views} />
				{postData.views} {translations.visits}
			</p>
			<p className="description">{postData.description}</p>
			<UserCard profile={userProfile} />
			<style jsx>{`
				.main-info {
					:global(h2),
					p {
						margin: 0;
						margin-bottom: var(--spacer);
					}

					p {
						i {
							margin-right: 4px;
						}

						&.description {
							font-size: 2rem;
						}
					}
				}
			`}</style>
		</section>
	);
}
