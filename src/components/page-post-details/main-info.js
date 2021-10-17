import React from 'react';
import PriceInfo from './price-info';
import { formatDate } from '../../utils/intl-utils';

export default function MainInfo(props) {
  const { currencies, translations, postData } = props;
  const price = (postData.price);

  return (
    <section className="main-info">
      <PriceInfo currencies={currencies} price={price} translations={translations} /> 
      <p>
        <i className="fas fa-location-arrow" title={translations.location}></i>
        {postData.location.description}
      </p>
      <p>
        <i className="far fa-clock" title={translations.date}></i>
        {formatDate(postData.createdAt, 'dd/month/yyyy hrs:min')}
      </p>
      <p>
      <i className="far fa-eye" title={translations.views}></i>
        {postData.views} {translations.visits}
      </p>
      <style jsx>{`
        .main-info {
          p {
            margin-bottom: var(--spacer);

            i {
              margin-right: 4px;
            }
          }

          article {
            max-height: 150px;
            overflow: auto;
            white-space: pre-wrap;
          }
        }  
      `}</style>
    </section>
  );

}