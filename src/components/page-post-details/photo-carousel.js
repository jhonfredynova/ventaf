import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import PhotoSlide from './photo-slide';

export default function PhotoCarousel(props) { 
  const { autofocus, bgColor, photos } = props;
  
  return (
    <>
      <Carousel 
        autoFocus={autofocus} 
        className="carousel"
        showArrows={true}
        showThumbs={false}
        useKeyboardArrows={true}>
        {
          photos.map((photoUrl, photoId) => 
            <PhotoSlide
              key={photoId}
              bgColor={bgColor}
              photoId={photoId}
              photoUrl={photoUrl}>
            </PhotoSlide>  
          )  
        }
      </Carousel> 
      <style jsx>{`
        :global(.carousel) { 
          border: 6px;

          :global(.slide) {
            background: transparent;
          }
        }  
      `}</style>
    </>
  );

}