import React from 'react';
import UserCard from './user-card';
import ContactButtons from './contact-buttons';

export default function ContactInfo(props) {
  const { postData, pageTitle, translations, userProfile } = props;

  return (
    <div className="contact-info">
      <h3>{translations['sellerInfo']}</h3>
      <UserCard profile={userProfile}>
      </UserCard>
      <ContactButtons 
        postData={postData} 
        pageTitle={pageTitle}
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