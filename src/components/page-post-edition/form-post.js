import React from 'react';
import InputLocation from '../input-location/input-location';
import InputPhone from '../input-phone';
import PostPrice from './post-price';
import PostUploader from './post-uploader';
import { BREAKPOINTS } from '../../utils/style-utils';

export default function FormPost(props) {
  const { 
    isPosting, btnLabel, currencies, callingCodes, errors, model, translations, 
    onChangePhotos, onChangeModel, onSavePost 
  } = props;

  return (
    <>
      {
        errors.general && 
        <p className="error-msg">{errors.general}</p>
      }
      <form className="form-post" onSubmit={onSavePost}>
        <div className="form-row-full">
        <label className="sr-only" htmlFor="city">{translations['whatAreYouSelling']} *</label>
          <InputLocation
            id="city"
            placeholder={translations['city']}
            searchOptions={{ types: ['(cities)'] }}
            translations={translations}
            value={model.location}
            onChange={location => onChangeModel({ ...model, location: (location || {}) })}>
          </InputLocation>
          <p className="error-msg">{translations[errors.location?.placeId]}</p>
        </div>
        <div className="form-row">
          <label className="sr-only" htmlFor="price">{translations['price']} *</label>
          <PostPrice
            id="price"
            errors={errors.price}
            required={true}
            suggestions={currencies}
            translations={translations}
            value={model.price}
            onChange={price => onChangeModel({ ...model, price })}>
          </PostPrice>
        </div>
        <div className="form-row">
          <label className="sr-only" htmlFor="phoneNumber">{translations['phone']} *</label>
          <InputPhone
            id="phoneNumber"
            errors={(errors.seller && errors.seller.phone)}
            required={true}
            suggestions={callingCodes}
            translations={translations}
            value={model.seller.phone}
            onChange={phone => onChangeModel({ ...model, seller: { ...model.seller, phone } })}>
          </InputPhone>
        </div>
        <div className="form-row">
          <label className="sr-only" htmlFor="description">{translations['whatAreYouSelling?']} *</label>
          <textarea id="description" rows="6" value={model.description} 
            aria-required="true" placeholder={translations['whatAreYouSelling?']}
            maxLength="" onChange={event => onChangeModel({ ...model, description: event.target.value })}>
          </textarea>
          <p className="error-msg">{translations[errors.description]}</p>
        </div>
        <div className="form-row">
          <label className="sr-only" htmlFor="photos">{translations['photos']} <span>*</span></label>
          <PostUploader
            error={translations[errors.photos]}
            photos={model.photos}
            translations={translations}
            onChange={photos => {
              onChangeModel({ ...model, photos });
              onChangePhotos?.(true);
            }}>
          </PostUploader>
        </div>
        <div className="buttons-wrapper">
          <button 
            className="btn-post" 
            disabled={isPosting}
            onClick={onSavePost}>
            {
              isPosting && 
              <>
                <i className="fas fa-spinner fa-spin" title={translations['saving']}></i>
                {translations['saving']}
              </>
            }
            {
              !isPosting && 
              <>
                <i className="fas fa-solid fa-check" title={btnLabel} />
                {btnLabel}
              </>
            }
          </button>
        </div>
      </form>
      <style jsx>{`
        .error-msg {
          color: var(--color-alert);
        }
        .form-post {
          display: grid;
          grid-template-columns: 1fr;
          column-gap: calc(var(--spacer) * 2);
          row-gap: calc(var(--spacer) * 2);
          margin-top: var(--spacer);

          textarea {
            border: 1px solid var(--color-border);
            padding: var(--spacer);
            height: 100px;
            width: 100%;

            @media screen and (min-width: ${BREAKPOINTS.TABLET}) {
              height: 160px;
            }
          }

          .buttons-wrapper {
            grid-column: span 2;
            margin-top: var(--spacer);

            .btn-post {
              display: flex;
              align-items: center;
              justify-content: center;
              background: var(--color-primary);
              border: 1px solid var(--color-border);
              border-radius: var(--spacer);
              color: white;
              cursor: pointer;
              font-size: 2.0rem;
              padding: var(--spacer);
              margin-left: auto;

              &:disabled {
                background-color: var(--color-secondary);
                color: var(--color-text);
                cursor: default;
              }

              .fas {
                margin-right: 6px;
              }
            }
          }

          @media screen and (min-width: ${BREAKPOINTS.TABLET}) {
            grid-template-columns: 1fr 1fr;

            .form-row-full {
              grid-column: 1/3;
            }
          } 
        }

        @media screen and (max-width: ${BREAKPOINTS.DESKTOP}) {
          .form-post {
            .buttons-wrapper{
              position: fixed;
              left: 0;
              bottom: 0;
              z-index: 2;
              display: flex;
              width: 100%;

              .btn-post {
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
    </>
  );
}