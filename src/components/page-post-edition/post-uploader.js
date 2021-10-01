import React, { useRef, useState } from 'react';
import PostUploaderItem from './post-uploader-item';
import Lightbox from '../lightbox';
import Sortable from '../sortable';
import PostInvalidFiles from './port-invalid-files';
import { resizeImage, validateFiles } from '../../utils/upload-utils';
import { BREAKPOINTS } from '../../utils/style-utils';

export default function PostUploader(props) {
  const [showModalWarning, setShowModalWarning] = useState(false);
  const [warningMsg, setWarningMsg] = useState('');
  const [wrongFiles, setWrongFiles] = useState([]);
  const { translations, error, photos, onChange } = props;
  const fileInput = useRef(null);
  const allowedExtentions = ['jpg', 'jpeg', 'gif', 'png'];
  const maxFileSizeMb = 10;
  const uploadWarningFileExtentionsMessage = (translations['uploadWarningFileExtentionsMessage'] || '')
    .replace(/{allowedExtentions}/g, allowedExtentions.join(', '));
  const uploadWarningFileSizeMessage = (translations['uploadWarningFileSizeMessage'] || '')
    .replace(/{maxFileSizeMb}/g, maxFileSizeMb);

  const onUploadMedia = () => {
    fileInput.current.click();
  };

  const onDeleteMedia = mediaIndex => {
    const updatedPhotos = photos.filter((photo, photoIndex) => photoIndex !== mediaIndex);
    onChange(updatedPhotos);
  };

  const onUpload = async event => {
    setShowModalWarning(false);
    setWarningMsg('');
    const selectedFiles = [...event.target.files];
    const validFiles = validateFiles(selectedFiles, allowedExtentions, maxFileSizeMb);
    const optimizedFiles = await resizeImage(validFiles, 800, 800);    
    const updatedPhotos = [...photos, ...validFiles]
      .filter(photo => photo)
      .slice(0, 6);

    if (selectedFiles.length !== validFiles.length) {
      const warningMsg = translations['wrongUploadedFiles']
        .replace(/{extentions}/g, allowedExtentions.join(', '))
        .replace(/{maxFilesize}/g, maxFileSizeMb);
      const wrongFiles = optimizedFiles.filter(item => !validFiles.find(file => file.name === item.name));
      setShowModalWarning(true);
      setWarningMsg(warningMsg);
      setWrongFiles(wrongFiles);
    }

    onChange(updatedPhotos);
    fileInput.current.value = '';
  };

  return (
    <section className="post-uploader">
      <input 
        ref={fileInput}
        accept={allowedExtentions.map(item => `.${item}`).join(',')}
        className="input-file"
        type="file"
        multiple
        onChange={onUpload}>
      </input>
      <Sortable
        tag="section"
        className="photos"
        handle=".drag"
        value={photos}
        onChange={onChange}>
        {
          [...Array(6).keys()].map((mediaSequence, mediaIndex) =>
            <PostUploaderItem
              key={(photos[mediaIndex] && photos[mediaIndex].name) || mediaSequence}
              allowDeletion={photos.length > 1}
              className={`${photos[mediaIndex] ? 'drag' : ''} media-${mediaSequence}`}
              translations={translations}
              mediaIndex={mediaIndex}
              mediaData={photos[mediaIndex]}              
              onUpload={onUploadMedia}
              onDelete={onDeleteMedia}>
            </PostUploaderItem>
          )
        }
      </Sortable>
      <span className="error-msg">{error}</span>
      <p className="warning-msg">
        <small>{uploadWarningFileExtentionsMessage}</small>
      </p>
      <p className="warning-msg">
        <small>{uploadWarningFileSizeMessage}</small>
      </p>
      <p className="warning-msg">
        <small>{translations.recommendedAspectRatio}</small>
      </p>
      <Lightbox
        isOpen={showModalWarning}
        onToggle={() => setShowModalWarning(!showModalWarning)}>
        <PostInvalidFiles
          warningMsg={warningMsg}
          wrongFiles={wrongFiles}
          translations={translations}
          onClose={() => setShowModalWarning(false)}>
        </PostInvalidFiles>
      </Lightbox>
      <style jsx>{`
        .post-uploader {

          .error-msg {
            color: var(--color-alert);
          }

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
            grid-template: 
              "media-0 media-1"
              "media-2 media-3"
              "media-4 media-5";
            grid-template-columns: 1fr 1fr;
            width: 100%;

            @media screen and (min-width: ${BREAKPOINTS.TABLET}) {
              grid-template: 
                "media-0 media-1 media-2"
                "media-3 media-4 media-5";
              grid-template-columns: 1fr 1fr 1fr;
            }

            :global(.drag) {
              cursor: move;
            }
            :global(.media-0) {
              grid-area: media-0;
            }
            :global(.media-1) {
              grid-area: media-1;
            }
            :global(.media-2) {
              grid-area: media-2;
            }
            :global(.media-3) {
              grid-area: media-3;
            }
            :global(.media-4) {
              grid-area: media-4;
            }
          }
        }
      `}</style>
    </section>
  );

}