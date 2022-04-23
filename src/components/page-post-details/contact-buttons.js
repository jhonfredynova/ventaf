import React from 'react';
import ReactGA from 'react-ga';

export default function ContactButtons(props) {
	const { postData, translations, sharingUrl } = props;
	const { seller } = postData;
	const { phone } = seller;
	const phoneNumber = `${phone.prefix}${phone.number}`;
	const shareMessage = translations.userInterestedInAd.replace(/{adUrl}/g, sharingUrl);
	const onContactSeller = (action, value) => {
		ReactGA.event({
			category: 'Social',
			action,
			value,
		});
	};

	return (
		<div className="contact-buttons">
			<a
				className="btn btn-call"
				href={`tel://${phoneNumber}`}
				rel="noreferrer"
				target="_blank"
				onClick={() => onContactSeller('Contact ad seller via call', 2)}
			>
				<i className="fas fa-phone fa-2x" /> {translations.call}
			</a>
			<a
				className="btn btn-whatsapp"
				href={`https://wa.me/${phoneNumber}?text=${shareMessage}`}
				rel="noreferrer"
				target="_blank"
				onClick={() => onContactSeller('Contact ad seller via whatsapp', 2)}
			>
				<i className="fab fa-whatsapp fa-2x" /> Whatsapp
			</a>
			<style jsx>{`
				.contact-buttons {
					margin-top: 5px;
					width: 100%;

					.btn {
						display: flex;
						align-items: center;
						text-align: left;
						margin-bottom: 5px;

						&.btn-call {
							background-color: var(--color-primary);
							border: 1px solid var(--color-primary);
							color: white;
						}

						&.btn-whatsapp {
							background-color: #36863e;
							border: 1px solid #36863e;
							color: white;
						}

						i {
							margin-right: var(--spacer);
						}
					}
				}
			`}</style>
		</div>
	);
}
