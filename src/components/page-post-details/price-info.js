import React from 'react';
import { formatMoney } from '../../utils/intl-utils';

export default function PriceInfo(props) {
  const { currencies, price, translations } = props;
  const { currency, value } = price;
  const selectedCurrency = currencies.find(item => item.value === currency);

  return (
    <h2 className="price-info">
      {
        price.value === 0 &&
        <div className="value free">
          <span className="icon"><i className="fas fa-gift"></i></span>
          {translations['free']}
        </div>
      }
      {
        price.value > 0 && 
        <>
          <div className="currency">
            <img 
              alt={selectedCurrency.label} 
              src={selectedCurrency.countryFlag} 
              title={selectedCurrency.label} 
              width="30px" />
            <span className="icon">{currency}</span>
          </div>
          <div className="value">${formatMoney(value)}</div>
        </>
      }
      <style jsx>{`
        .price-info {
          display: flex;
          align-items: center;
          margin-bottom: 10px;

          .currency {
            display: flex;
            align-items: center;
            text-transform: uppercase;
            margin-right: 5px;

            .icon {
              margin-left: 4px;
              margin-right: 4px;
            }
          }
        }
      `}</style>
    </h2>
  );
}