import React from 'react';

export default function PhoneInfo(props) {
  const { callingCodes, phoneData } = props;
  const { prefix, number } = phoneData;
  const selectedPrefix = callingCodes.find(item => item.value === prefix);

  return (
    <a href="tel://+573123019329" className="phone-info">
      <div className="prefix">
        <img 
          alt={selectedPrefix.countryName}
          src={selectedPrefix.countryFlag}  
          title={selectedPrefix.countryName}
          width="30px" />
        <span>{prefix}</span>
      </div>
      <div className="number">{number}</div>
      <style jsx>{`
        .phone-info {
          display: flex;
          align-items: center;
          font-weight: bold;
          margin-top: 10px;
          text-decoration: none;

          .prefix {
            display: flex;
            align-items: center;
            margin-right: 4px;

            img {
              margin-right: 2px;
            }
          }
        }
      `}</style>
    </a>
  );
}