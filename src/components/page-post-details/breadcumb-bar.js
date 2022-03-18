import React, { useRef } from 'react';
import ReactGA from 'react-ga';
import { useRouter } from 'next/router';
import { copyToClipboard } from '../../utils/text-utils'; 

export default function BreadcumbBar(props) {
  const { translations, pageTitle, sharingUrl } = props;
  const tooltipCopyClipboard = useRef();
  const router = useRouter();

  const onShareAd = (action, value) => {
    ReactGA.event({
      category: 'Social',
      action,
      value
    });
  };

  const onClickBtnClipboard = () => {
    tooltipCopyClipboard.current.classList.add('show');
    copyToClipboard(sharingUrl);
    setTimeout(() => tooltipCopyClipboard.current.classList.remove('show'), 1500);
  };

  return (
    <section className="breadcumb-bar">
      <button 
        type='button'
        className="btn-back" 
        title={translations.backToList}
        onClick={() => router.back()}>
        <i className="fas fa-arrow-left" /> 
      </button>
      <ul className="share-bar">
        <li>
          {translations.share}: 
        </li>
        <li>
          <a 
            href={`https://facebook.com/sharer.php?u=${sharingUrl}`} 
            rel="noreferrer" 
            target="_blank"
            title={translations.shareViaFacebook}
            onClick={() => onShareAd('Shared ad via facebook', 1)}>
            <i className="fab fa-facebook-f fa-2x" />
          </a>
        </li>
        <li>
          <a 
            href={`https://twitter.com/share?text=${sharingUrl}`} 
            rel="noreferrer" 
            target="_blank"
            title={translations.shareViaTwitter}
            onClick={() => onShareAd('Shared ad via twitter', 1)}>
            <i className="fab fa-twitter fa-2x" />
          </a>
        </li>
        <li>
          <a 
            href={`mailto:?subject=${pageTitle}&body=${sharingUrl}`} 
            rel="noreferrer" 
            target="_blank"
            title={translations.shareViaEmail}
            onClick={() => onShareAd('Shared ad via email', 1)}>
          <i className="fas fa-envelope fa-2x" />
          </a>
        </li>
        <li>
          <button
            className="btn-clipboard btn"
            type="button"
            title={translations.shareViaUrl}
            onClick={() => {
              onClickBtnClipboard();
              onShareAd('Copy ad url to clipboard', 2);
            }}>
            <i className="fas fa-link fa-2x" />
            <span ref={tooltipCopyClipboard} className="copy-clipboard-success">
              {translations.linkWasCopied}
            </span>
          </button>
        </li>
      </ul>
      <style jsx>{`
        .breadcumb-bar {
          display: flex;
          align-items: center;
          margin-bottom: var(--spacer);

          .btn-back {
            background: none;
            border: none;
            color: var(--color-text);
            cursor: pointer;
            padding: var(--spacer);
          }

          ul.share-bar {
            display: flex;
            align-items: center;
            margin-left: auto;
            list-style: none;

            li {
              margin-right: 5px;

              a {
                color: var(--color-text);
                text-decoration: none;
              }

              .btn-clipboard {
                background: none;
                border: none;
                color: var(--color-text);
                cursor: pointer;
                position: relative;

                .copy-clipboard-success {
                  display: none;
                  position: absolute;
                  top: 35px;
                  right: 0;
                  background: black;
                  opacity: 0.8;
                  color: white;
                  padding: 3px 8px;
                  width: max-content;
                  z-index: 2;

                  &.show {
                    display: block;
                    animation: fade 1500ms ease-in-out;
                  }

                  @keyframes fade {
                    0%  {opacity: 1;}
                    9%  {opacity: 0.9;}
                    30%  {opacity: 0.8;}
                    50%  {opacity: 0.6;}
                    70%  {opacity: 0.4;}
                    90%  {opacity: 0.2;}
                    100%  {opacity: 0;}
                  }
                }
              }
            }
          }          
        }
      `}</style>
    </section>
  );

}