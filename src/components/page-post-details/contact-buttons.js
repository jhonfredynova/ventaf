import React from 'react';
import ReactGA from 'react-ga';

export default function ContactButtons(props) {
  const { postData, translations, pageTitle } = props;
  const { seller } = postData;
  const { phone } = seller;
  const phoneNumber = `${phone.prefix}${phone.number}`;
  const sharingUrl = (typeof(window) !== 'undefined' && window.location.href);
  const shareMessage = translations.userInterestedInAd.replace(/{adUrl}/g, sharingUrl);
  const onContactSeller = (action, value) => {
    ReactGA.event({
      category: 'Social',
      action,
      value
    });
  };

  return (
    <div className="contact-buttons">
      <a 
        className="link btn btn-call"
        href={`tel://${phoneNumber}`}
        rel="noreferrer"
        target="_blank"
        onClick={() => onContactSeller('Contact ad seller via call', 2)}>
        <i className="fas fa-phone fa-2x"></i> {translations['call']}
      </a>
      <a 
        className="link btn btn-whatsapp"
        href={`https://wa.me/${phoneNumber}?text=${shareMessage}`}
        rel="noreferrer"
        target="_blank"
        onClick={() => onContactSeller('Contact ad seller via whatsapp', 2)}>
        <i className="fab fa-whatsapp fa-2x"></i> Whatsapp
      </a>
      <a 
        className="link btn btn-email"
        href={`mailto:${postData.seller.email}?subject=Construccion y Tecnologia SAS - ${pageTitle}&body=${shareMessage}`}
        rel="noreferrer"
        target="_blank"
        onClick={() => onContactSeller('Contact ad seller via email', 2)}>
        <i className="fas fa-envelope fa-2x"></i> {translations['email']}
      </a>
      <style jsx>{`
        .contact-buttons {
          margin-top: 5px;
          width: 100%;

          .link {
            display: flex;
            align-items: center;
            border: 1px solid var(--border-color);
            text-align: left;
            padding: var(--spacer);
            margin-bottom: 5px;
            text-decoration: none;

            &.btn-call {
              background-color: #13577b;
              color: white;
            }

            &.btn-whatsapp {
              background-color: rgb(61, 150, 70);
              color: white;
            }

            &.btn-email {
              background-color: #d48815;
              color: white;
            }

            i {
              margin-right: 5px;
            }
          }
        }
      `}</style>
    </div>
  );
}