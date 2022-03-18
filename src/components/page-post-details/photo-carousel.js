import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import PhotoSlide from './photo-slide';

export default function PhotoCarousel(props) { 
  const { autofocus, bgColor, photos } = props;
  
  return (
    <>
      <Carousel 
        autoFocus={autofocus} 
        autoPlay={false}
        className="carousel"
        showArrows
        showThumbs={false}
        useKeyboardArrows>
        {
          photos.map((photoUrl, photoId) => 
            <PhotoSlide
              key={photoUrl}
              bgColor={bgColor}
              photoId={photoId}
              photoUrl={photoUrl} />  
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