import React from 'react';
import PriceInfo from './price-info';
import { formatDate } from '../../utils/intl-utils';

export default function MainInfo(props) {
  const { currencies, preferences, translations, postData } = props;
  const price = (postData.price);

  return (
    <section className="main-info">
      <PriceInfo currencies={currencies} price={price} translations={translations} /> 
      <p>
        <i className="fas fa-map-marker-alt" title={translations['location']}></i>
        {postData.location.description}
      </p>
      <p>
        <i className="far fa-clock" title={translations['date']}></i>
        {formatDate(postData.createdAt, `${preferences.dateFormat} hrs:min:sec`)}
      </p>
      <p>
      <i className="far fa-eye" title={translations['views']}></i>
        {translations['adNumViews'].replace(/{numViews}/g, postData.views)}
      </p>
      <h3>{translations['description']}</h3>
      <article>
        {postData.description}
      </article>
      <style jsx>{`
        .main-info {
          p {
            margin-bottom: var(--spacer);

            i {
              margin-right: 4px;
            }
          }

          h3 {
            margin-top: var(--spacer);
            margin-bottom: calc(var(--spacer) * 2);
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