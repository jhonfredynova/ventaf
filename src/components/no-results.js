import React from 'react';
import Image from 'next/image';

export default function NoResults(props) {
  const { message, translations } = props;
  const defaultMessage = (message || translations.noResults);
  
  return (
    <div className="no-results">
      
      <p>{defaultMessage}</p>
      <Image 
        src="https://storage.googleapis.com/construccionytecnologia-f556c.appspot.com/no-results.svg"
        alt={defaultMessage}
        width="800" 
        height="600" />

      <style jsx>{`
        .no-results {
          text-align: center;

          img {
            width: 100%;
            max-width: 600px;
          }
        }
      `}</style>

    </div>
  );

}