import React, { useState, useEffect } from 'react';

export default function PostUploaderItem(props) {
  const { allowDeletion, className, translations, mediaIndex, mediaData, onUpload, onDelete } = props;
  const [mediaUrl, setMediaUrl] = useState(null);

  useEffect(() => {
    // If there is not media data
    if (!mediaData || typeof(mediaData) === 'string') {
      setMediaUrl(null);
      return;
    }

    const mediaReader = new FileReader();
    mediaReader.readAsDataURL(mediaData);
    mediaReader.onload = readerEvent => setMediaUrl(readerEvent.target.result);
  }, [mediaData]);

  return (
    <div className={`media ${className}`}>
      {
        !mediaUrl && 
        <button 
          type="button"
          className="btn-placeholder"
          onClick={() => onUpload(mediaIndex)}>
          <div><i className="fas fa-photo-video"></i></div>
          <div>{translations['photo']}</div>
        </button>
      }
      {
        mediaUrl &&
        <>
          {
            allowDeletion &&
            <button 
              type="button"
              title={translations['delete']}
              className="btn-delete"
              onClick={() => onDelete(mediaIndex)}>
              <i className="fas fa-times"></i>
            </button>
          }
          <img 
            src={mediaUrl} 
            alt={`Media #${mediaIndex}`} />
        </>
      }
      <style jsx>{`
        .media {
          padding-top: 56.25%;
          position: relative;
          width: 100%;

          .btn-placeholder {
            position: absolute;
            background: var(--color-secondary);
            border: 1px solid var(--color-border);
            cursor: pointer;
            left: 0;
            top: 0;
            border-radius: 8px;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
          }

          .btn-delete {
            background: var(--color-background);
            border: 0;
            border-radius: 50%;
            box-shadow: -1px 2px 5px 0px #333;
            margin: 0;
            padding: 0;
            position: absolute;
            top: -9px;
            right: -9px;
            color: #fd5068;
            z-index: 1;
            font-size: 1.2rem;
            line-height: 0;
            height: 23px;
            width: 23px;
          }

          img {
            position: absolute;
            background: black;
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