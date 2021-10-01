import React, { useState, useEffect, useRef } from 'react';

export default function Popover(props) {
  const { isOpen, className, children, target, style, onToggle } = props;
  const [screenWidth, setScreenWidth] = useState(0);
  const popover = useRef(null);
  const getPopoverPosition = targetElem => {
    let popoverPositionX = 0;
    let popoverPositionY = 0;

    if (targetElem) {
      const popoverWidth = (style && style.width) || 300;
      const targetWidth = targetElem ? targetElem.clientWidth : 0;
      const targetHeight = targetElem ? targetElem.clientHeight : 0;
      const targetPositionX = targetElem ? targetElem.offsetLeft : 0;
      const targetPositionY = targetElem ? targetElem.offsetTop : 0;
      popoverPositionX = (targetPositionX + targetWidth) - popoverWidth;
      popoverPositionY = targetPositionY + (targetHeight + 10);
    }

    return {
      x: popoverPositionX,
      y: popoverPositionY
    };
  };
  const targetPosition = getPopoverPosition(target);
  const onDocumentClick = event => {
    if (isOpen && popover && !target.contains(event.target) && !popover.current.contains(event.target)) {
      onToggle();
    }
  };
  const onResizeWindow = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    document.addEventListener('click', onDocumentClick);

    return () => {
      document.removeEventListener('click', onDocumentClick);
    };
  }, [onDocumentClick]);
  
  useEffect(() => {
    window.addEventListener('resize', onResizeWindow);
    window.dispatchEvent(new CustomEvent('resize'));

    return () => {
      window.removeEventListener('resize', onResizeWindow);
    };
  }, [onResizeWindow]);

  return (
    <div
      ref={popover}
      aria-expanded={isOpen} 
      className={`popover ${className} ${isOpen && 'show'} ${screenWidth}`}
      style={{ ...style, transform: `translate3d(${targetPosition.x}px, ${targetPosition.y}px, 0px)` }}>
      {children}
      <style jsx>{`
        .popover {
          display: none;
          background: var(--color-background);
          border: 1px solid #ccc;
          border-radius: 6px;
          box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 10px 1px;
          position: absolute;
          top: 0px;
          left: 0px;
          padding: 10px;
          width: 300px;
          z-index: 1000;

          &.show {
            display: block;
          }
        }
      `}</style>
    </div>
  );

}