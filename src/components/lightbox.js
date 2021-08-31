import React, { useEffect } from 'react';

export default function Lightbox(props) {
  const { isOpen, onToggle } = props;
  const closeOnKeyup = event => {
    if (event.keyCode === 27 && isOpen) {
      onToggle();
    }
  };

  useEffect(() => {
    document.addEventListener('keyup', closeOnKeyup);

    return () => {
      document.removeEventListener('keyup', closeOnKeyup);
    };
  }, [closeOnKeyup]);

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
            &times;
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
          background-color: rgba(255, 255, 255, 0.9);
          margin: 0;
          padding: 0;
          height: 100vh;
          width: 100vw;
          overflow-x: hidden;
          overflow-y: auto;
          transition: transform ease-in-out 200ms, opacity ease-in-out 300ms;
          z-index: 1040;

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
            font-size: 5rem;
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
            max-height: 100%;
            padding: 15px;
            width: auto;
            z-index: 1050;
          }

        }
      `}</style>
    </div>
  );

}