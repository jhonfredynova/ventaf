import React from 'react';
import PhoneInfo from './phone-info';
import UserCard from './user-card';
import ContactButtons from './contact-buttons';

export default function ContactInfo(props) {
  const { postData, callingCodes, pageTitle, translations, userProfile } = props;
  const { seller } = postData;

  return (
    <div className="contact-info">
      <h3>{translations['sellerInfo']}</h3>
      {
        (userProfile && userProfile.isEmailPublic) && 
        <p>{seller.email}</p>
      }
      <PhoneInfo 
        callingCodes={callingCodes} 
        phoneData={seller.phone}>
      </PhoneInfo>
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