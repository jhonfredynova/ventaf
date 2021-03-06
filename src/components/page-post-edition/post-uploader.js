import React, { useRef, useState } from 'react';
import PostUploaderItem from './post-uploader-item';
import Lightbox from '../lightbox';
import Sortable from '../sortable';
import PostInvalidFiles from './port-invalid-files';
import { resizeImage, validateFiles } from '../../utils/upload-utils';
import { BREAKPOINTS } from '../../utils/style-utils';

export default function PostUploader(props) {
	const { translations, error, photos, onChange } = props;

	const [isProcessingPhotos, setIsProcessingPhotos] = useState(false);
	const [showModalWarning, setShowModalWarning] = useState(false);
	const [warningMsg, setWarningMsg] = useState('');
	const [wrongFiles, setWrongFiles] = useState([]);
	const fileInput = useRef(null);
	const allowedExtentions = ['jpg', 'jpeg', 'gif', 'png'];

	const onUploadMedia = () => {
		fileInput.current.click();
	};

	const onDeleteMedia = (mediaIndex) => {
		const updatedPhotos = photos.filter((photo, photoIndex) => photoIndex !== mediaIndex);
		onChange(updatedPhotos);
	};

	const onUpload = async (event) => {
		setShowModalWarning(false);
		setWarningMsg('');

		const selectedFiles = [...event.target.files];
		const validFiles = validateFiles(selectedFiles, allowedExtentions);

		// If there are file errros
		if (selectedFiles.length !== validFiles.length) {
			const warningMsgFormatted = translations.wrongUploadedFiles.replace(
				/{extentions}/g,
				allowedExtentions.join(', ')
			);
			const wrongFilesFormatted = selectedFiles.filter(
				(item) => !validFiles.find((file) => file.name === item.name)
			);
			setShowModalWarning(true);
			setWarningMsg(warningMsgFormatted);
			setWrongFiles(wrongFilesFormatted);
		}

		// optimizing files size
		setIsProcessingPhotos(true);
		const optimizedFiles = await resizeImage(validFiles, 800, 800);
		const updatedPhotos = [...photos, ...optimizedFiles].filter((photo) => photo).slice(0, 6);
		setIsProcessingPhotos(false);

		// trigering on change event
		onChange(updatedPhotos);
		fileInput.current.value = '';
	};

	return (
		<section className="post-uploader">
			<input
				ref={fileInput}
				accept={allowedExtentions.map((item) => `.${item}`).join(',')}
				className="input-file"
				type="file"
				multiple
				onChange={onUpload}
			/>
			<Sortable tag="section" className="photos" handle=".drag" value={photos} onChange={onChange}>
				{[...Array(6).keys()]
					.filter((mediaSequence, mediaIndex) => photos[mediaIndex])
					.map((mediaSequence, mediaIndex) => (
						<PostUploaderItem
							key={`${photos[mediaIndex].name}-${mediaSequence}`}
							isLoading={isProcessingPhotos}
							allowDeletion
							className="drag"
							error={error}
							translations={translations}
							mediaIndex={mediaIndex}
							mediaData={photos[mediaIndex]}
							onUpload={onUploadMedia}
							onDelete={onDeleteMedia}
						/>
					))}
				{photos.length < 6 && (
					<PostUploaderItem
						key="addNewPhoto"
						isLoading={isProcessingPhotos}
						error={error}
						allowDeletion
						translations={translations}
						onUpload={onUploadMedia}
					/>
				)}
			</Sortable>
			<span className="error-msg">{error}</span>
			<Lightbox isOpen={showModalWarning} onToggle={() => setShowModalWarning(!showModalWarning)}>
				<PostInvalidFiles
					warningMsg={warningMsg}
					wrongFiles={wrongFiles}
					translations={translations}
					onClose={() => setShowModalWarning(false)}
				/>
			</Lightbox>
			<style jsx>{`
				.post-uploader {
					.warning-msg {
						margin-top: 2px;
						line-height: 1;
					}

					.input-file {
						display: none;
					}

					:global(section.photos) {
						display: grid;
						grid-gap: 10px;
						grid-template-columns: 1fr 1fr;
						width: 100%;

						:global(.drag) {
							cursor: move;
						}

						@media screen and (min-width: ${BREAKPOINTS.TABLET}) {
							grid-template-columns: 1fr 1fr 1fr;
						}
					}
				}
			`}</style>
		</section>
	);
}
