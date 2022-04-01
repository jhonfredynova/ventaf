import React from 'react';
import Image from 'next/image';

export default function PhotoSlide(props) {
	const { bgColor, photoId, photoUrl } = props;

	return (
		<div className="photo-slide user-select-none">
			<Image src={photoUrl} alt={`Photo #${photoId}`} layout="fill" />
			<style jsx>{`
				.photo-slide {
					position: relative;
					width: 100%;
					padding-top: 75%;
					flex-shrink: 0;
					overflow: hidden;

					:global(img) {
						position: absolute;
						background: ${bgColor};
						width: 100%;
						height: 100%;
						object-fit: contain;
						object-position: center;
						top: 0px;
						left: 0px;
						right: 0px;
						bottom: 0px;
					}
				}
			`}</style>
		</div>
	);
}
