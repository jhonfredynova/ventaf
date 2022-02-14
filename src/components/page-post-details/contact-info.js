import React from 'react';
import UserCard from './user-card';
import ContactButtons from './contact-buttons';
import { BREAKPOINTS } from '../../utils/style-utils';

export default function ContactInfo(props) {
  const { postData, pageTitle, sharingUrl, translations, userProfile } = props;

  return (
    <div className="contact-info">
      <h2>{translations['sellerInfo']}</h2>
      <UserCard profile={userProfile}>
      </UserCard>
      <ContactButtons 
        postData={postData} 
        pageTitle={pageTitle}
        sharingUrl={sharingUrl}
        translations={translations}>
      </ContactButtons>
      <style jsx>{`
        .contact-info {
          margin-top: var(--spacer);          
        }

        @media screen and (max-width: ${BREAKPOINTS.DESKTOP}) {
          .contact-info {
            h2,
            :global(.user-card) {
              display: none;
            }

            :global(.contact-buttons) {
              position: fixed;
              left: 0;
              bottom: 0;
              z-index: 2;
              display: flex;

              :global(.link) {
                flex: 1;
                margin: 0;
                border-radius: 0;
              }
            }
          }

          :global(.footer) {
            margin-bottom: 50px;
          }
        }
        
      `}</style>
    </div>
  );
}