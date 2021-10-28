import React from 'react';
import UserCard from './user-card';
import ContactButtons from './contact-buttons';

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
      `}</style>
    </div>
  );
}