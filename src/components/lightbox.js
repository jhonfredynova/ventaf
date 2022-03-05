import React, { useEffect } from 'react';

export default function Lightbox(props) {
  const { isOpen, onToggle } = props;

  useEffect(() => {
    const onKeyup = event => {
      if (event.keyCode === 27 && isOpen) {
        onToggle();
      }
    };

    document.addEventListener('keyup', onKeyup);

    return () => {
      document.removeEventListener('keyup', onKeyup);
    };
  }, [isOpen, onToggle]);

  return (
    <div className={`lightbox ${isOpen ? 'show' : 'hide'}`}>
      {
        isOpen &&
        <>
          <button 
            aria-label="Close"
            type="button" 
            className="btn-close" 
            data-dismiss="modal" 
            onClick={onToggle}>
            <i className="fas fa-times fa-2x"></i>
          </button>
          <div className="content-wrapper">
            {props.children}
          </div>
        </>
      }
      <style jsx global>{`
        body {
          position: ${isOpen ? 'fixed' : 'inherit'};
          width: 100%;
        }
      `}</style>
      <style jsx>{`
        .lightbox {
          position: fixed;
          top: 0;
          left: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background-color: rgba(0, 0, 0, .65);
          margin: 0;
          padding: calc(var(--spacer) * 2);
          height: 100vh;
          width: 100vw;
          overflow-x: hidden;
          overflow-y: auto;
          transition: transform ease-in-out 200ms, opacity ease-in-out 300ms;
          z-index: 2;

          &.show {
            opacity: 1;
            transform: scale(1);
          }

          &.hide {
            opacity: 0;
            transform: scale(0); 
          }

          .btn-close {
            background: none;
            border: none;
            color: white;
            position: fixed;
            top: 10px;
            right: 10px;
            opacity: 1;
            border-radius: 50%;
            padding: var(--spacer);
            cursor: pointer;
          }

          .content-wrapper {
            border-radius: 10px;
            position: relative;
            margin: 0 auto;
            padding: 0;
            width: auto;
            max-width: 100%;
            max-height: 100%;
          }

        }
      `}</style>
    </div>
  );

}