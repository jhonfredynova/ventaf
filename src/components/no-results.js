import React from 'react';
import Link from 'next/link';

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
      <Link href="/post">
        <a className="link-post">
        <i className="fas fa-plus icon"></i>{translations.sell}
        </a>
      </Link>
      <style jsx>{`
        .no-results {
          text-align: center;

          h2 {
            text-align: center;
            font-size: 2rem;
          }

          .link-post {
            background: none;
            border: 3px solid var(--color-primary);
            border-radius: var(--spacer);
            color: var(--color-primary);
            cursor: pointer;
            padding: var(--spacer);
            display: inline-block;
            margin-top: var(--spacer);
            text-decoration: none;

            .icon {
              margin-right: 5px;
            }
          }
        }
      `}</style>
    </div>
  );

}