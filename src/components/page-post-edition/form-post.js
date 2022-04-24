import React from 'react';
import Script from 'next/script';
import InputLocation from '../input-location/input-location';
import InputPhone from '../input-phone';
import PostPrice from './post-price';
import PostUploader from './post-uploader';
import { BREAKPOINTS } from '../../utils/style-utils';

export default function FormPost(props) {
	const {
		isPosting,
		btnLabel,
		currencies,
		callingCodes,
		errors,
		model,
		translations,
		onChangePhotos,
		onChangeModel,
		onSavePost,
	} = props;
	const gPlacesKey = typeof window !== 'undefined' && window.gPlacesKey;

	return (
		<>
			{errors.general && <p className="error-msg">{errors.general}</p>}

			<form className="form-post" onSubmit={onSavePost}>
				<div className="form-row-full">
					<label className="sr-only" htmlFor="city">
						{translations.whatAreYouSelling} *
					</label>
					<InputLocation
						id="city"
						error={errors.location?.placeId}
						placeholder={translations.city}
						searchOptions={{ types: ['(cities)'] }}
						translations={translations}
						value={model.location}
						onChange={(location) =>
							onChangeModel({
								...model,
								location: location || {},
							})
						}
					/>
					<p className="error-msg">{translations[errors.location?.placeId]}</p>
				</div>
				<div className="form-row">
					<label className="sr-only" htmlFor="price">
						{translations.price} *
					</label>
					<PostPrice
						id="price"
						errors={errors.price}
						required
						suggestions={currencies}
						translations={translations}
						value={model.price}
						onChange={(price) => onChangeModel({ ...model, price })}
					/>
				</div>
				<div className="form-row">
					<label className="sr-only" htmlFor="phoneNumber">
						{translations.phone} *
					</label>
					<InputPhone
						id="phoneNumber"
						errors={errors.seller && errors.seller.phone}
						required
						suggestions={callingCodes}
						translations={translations}
						value={model.seller.phone}
						onChange={(phone) =>
							onChangeModel({
								...model,
								seller: { ...model.seller, phone },
							})
						}
					/>
				</div>
				<div className="form-row">
					<label className="sr-only" htmlFor="description">
						{translations['whatAreYouSelling?']} *
					</label>
					<textarea
						id="description"
						rows="6"
						className={`input ${errors.description ? 'alert' : ''}`}
						value={model.description}
						aria-required="true"
						placeholder={translations['whatAreYouSelling?']}
						maxLength=""
						onChange={(event) =>
							onChangeModel({
								...model,
								description: event.target.value,
							})
						}
					/>
					<p className="error-msg">{translations[errors.description]}</p>
				</div>
				<div className="form-row">
					<label className="sr-only" htmlFor="photos">
						{translations.photos} <span>*</span>
					</label>
					<PostUploader
						error={translations[errors.photos]}
						photos={model.photos}
						translations={translations}
						onChange={(photos) => {
							onChangeModel({ ...model, photos });
							onChangePhotos?.(true);
						}}
					/>
				</div>
				<div className="buttons-wrapper">
					<button
						type="button"
						className="btn btn-primary btn-post"
						disabled={isPosting}
						onClick={onSavePost}
					>
						{isPosting && (
							<>
								<i className="fas fa-spinner fa-spin" title={translations.saving} />
								{translations.saving}
							</>
						)}
						{!isPosting && (
							<>
								<i className="fas fa-solid fa-check" title={btnLabel} />
								{btnLabel}
							</>
						)}
					</button>
				</div>
			</form>

			<Script
				src={`https://maps.googleapis.com/maps/api/js?key=${gPlacesKey}&libraries=places&callback=gPlacesCb`}
			/>

			<style jsx>{`
				.form-post {
					display: grid;
					grid-template-columns: 1fr;
					column-gap: calc(var(--spacer) * 2);
					row-gap: calc(var(--spacer) * 2);
					margin-bottom: 30px;

					textarea {
						height: 100px;
						width: 100%;
					}

					.buttons-wrapper {
						position: fixed;
						left: 0;
						right: 0;
						bottom: 0;
						z-index: 1;

						.btn-post {
							flex: 1;
							margin: 0;
							border-radius: 0;
							width: 100%;

							.fas {
								margin-right: 6px;
							}
						}
					}
				}

				@media screen and (min-width: ${BREAKPOINTS.TABLET}) {
					.form-post {
						margin-bottom: 0px;

						.buttons-wrapper {
							position: static;
							grid-column: span 2;
							margin-top: var(--spacer);
							justify-content: end;
							text-align: end;

							.btn-post {
								font-size: 2rem;
								margin-left: auto;
								width: auto;
							}
						}
					}
				}

				@media screen and (min-width: ${BREAKPOINTS.DESKTOP}) {
					.form-post {
						grid-template-columns: 1fr 1fr;

						textarea {
							height: 160px;
						}

						.form-row-full {
							grid-column: 1/3;
						}
					}
				}
			`}</style>
		</>
	);
}
