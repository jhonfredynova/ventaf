import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function PostUploaderItem(props) {
	const {
		isLoading,
		allowDeletion,
		className,
		error,
		translations,
		mediaIndex,
		mediaData,
		onUpload,
		onDelete,
	} = props;
	const [mediaUrl, setMediaUrl] = useState(null);

	useEffect(() => {
		// If there is not media data
		if (!mediaData || typeof mediaData === 'string') {
			setMediaUrl(null);
			return;
		}

		const mediaReader = new FileReader();
		mediaReader.readAsDataURL(mediaData);
		mediaReader.onload = (readerEvent) => {
			setMediaUrl(readerEvent.target.result);
		};
	}, [mediaData]);

	return (
		<div className={`media ${className}`}>
			{!mediaUrl && (
				<button
					type="button"
					className={`btn btn-secondary btn-placeholder ${error ? 'alert' : ''}`}
					onClick={() => onUpload(mediaIndex)}
				>
					{isLoading && (
						<div className="loader">
							<i className="fas fa-spinner fa-spin fa-2x" title={translations.loading} />
						</div>
					)}
					{!isLoading && (
						<>
							<div className="icon-add">
								<i className="fas fa-plus fa-2x" />
							</div>
							<div>{translations.addPhoto}</div>
						</>
					)}
				</button>
			)}
			{mediaUrl && (
				<>
					{allowDeletion && (
						<button
							type="button"
							title={translations.delete}
							className="btn-delete"
							onClick={() => onDelete(mediaIndex)}
						>
							<i className="fas fa-times" />
						</button>
					)}
					<Image src={mediaUrl} alt={`Media #${mediaIndex}`} layout="fill" />
				</>
			)}
			<style jsx>{`
				.media {
					padding-top: 56.25%;
					position: relative;
					width: 100%;

					.loader {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 150px;
						height: 150px;
					}

					.btn-placeholder {
						position: absolute;
						border-radius: 8px;
						left: 0;
						top: 0;
						padding: 0;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						width: 100%;
						height: 100%;

						.icon-add {
							margin-bottom: 5px;
						}
					}

					.btn-delete {
						background: white;
						border: 0;
						border-radius: 50%;
						box-shadow: -1px 2px 5px 0px #333;
						cursor: pointer;
						margin: 0;
						padding: 0;
						position: absolute;
						top: -9px;
						right: -9px;
						color: var(--color-alert);
						z-index: 1;
						line-height: 0;
						height: 23px;
						width: 23px;
					}

					:global(img) {
						position: absolute;
						background: black;
						border: 1px solid var(--color-border) !important;
						border-radius: 8px;
						width: 100%;
						height: 100%;
						object-fit: contain;
						object-position: center;
						top: 0px;
						left: 0px;
						right: 0px;
						bottom: 0px;
						transition: transform 0.6s cubic-bezier(0.11, 0, 0.31, 1);
						pointer-events: none;
					}

					:global(.processing) {
						position: absolute;
						top: 0px;
						left: 0px;
					}
				}
			`}</style>
		</div>
	);
}
