import React from 'react';

export default function NoResults(props) {
  const { message, translations } = props;
  const defaultMessage = (message || translations.noResults);
  
  return (
    <div className="no-results">
      
      <p>{defaultMessage}</p>
      <img 
        src={
          'https://firebasestorage.googleapis.com/v0/b/construccionytecnologia-f556c.appspot.com/o/'
          .concat('no-results.svg?alt=media&token=c3387719-ba87-4a58-93aa-618229db49d8')
        }
        alt={defaultMessage} />

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