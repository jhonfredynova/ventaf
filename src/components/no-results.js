import React from 'react';

export default function NoResults(props) {
  const { translations } = props;
  
  return (
    <div className="no-results">
      
      <img 
        src={
          'https://firebasestorage.googleapis.com/v0/b/construccionytecnologia-f556c.appspot.com/o/'
          .concat('no-results.svg?alt=media&token=c3387719-ba87-4a58-93aa-618229db49d8')
        }
        alt={translations.noResults} />
      <p>{translations.noResults}</p>

      <style jsx>{`
        .no-results {
          text-align: center;

          h2 {
            text-align: center;
            font-size: 2rem;
          }
        }
      `}</style>

    </div>
  );

}