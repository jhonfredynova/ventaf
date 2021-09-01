import React, { useState } from 'react';
import InputLocation from '../input-location/input-location';

export default function HomeLocation(props) {
  const LOCATION_STEPS = {
    EDITION: 'location-edition',
    SELECTED: 'location-selected'
  };
  const [locationStep, setLocationStep] = useState(LOCATION_STEPS.SELECTED);
  const { locationSelected, translations, onChange } = props;

  return (
    <>
      {
        locationStep === 'location-selected' &&
        <div className="location-selected">
          <button className="btn-select-city" onClick={() => setLocationStep(LOCATION_STEPS.EDITION)}>
            <i className="fas fa-map-marker-alt"></i> 
            <span className="city">{locationSelected.description || translations['allTheWorld']}</span>
          </button>
          {
            locationSelected.description && 
            <button 
              className="btn-clear-city" 
              title={translations['clean']} 
              onClick={() => onChange()}>
              <i className="fas fa-times"></i>
            </button>
          }
        </div>
      }
      {
        locationStep === 'location-edition' &&
        <div className="location-edition">
          <button className="btn-back" onClick={() => setLocationStep(LOCATION_STEPS.SELECTED)}>
            <span className="sr-only">{translations['cancel']}</span>
            <i className="fas fa-arrow-left"></i>
          </button>
          <label className="sr-only" htmlFor="location">{translations['location']}:</label>
          <InputLocation
            id="location"
            autofocus
            translations={translations}
            placeholder={translations['allTheWorld']}
            searchOptions={{ types: ['(cities)'] }}
            value={locationSelected}
            onChange={location => {
              onChange(location.placeId);
              setLocationStep(LOCATION_STEPS.SELECTED);
            }}>
          </InputLocation>
        </div>
      }
      <style jsx>{`
        .location-selected {
          display: flex;
          align-items: center;

          .btn-select-city,
          .btn-clear-city {
            border: none;
            cursor: pointer;
            padding: var(--spacer);
          }

          .btn-select-city {
            background: transparent;
            
            .city {
              margin-left: 6px;
            }
          }

          .btn-clear-city {
            background: transparent;
            color: var(--color-error);
          }
        }

        .location-edition {
          display: flex;
          align-items: center;

          .btn-back {
            background: var(--color-primary);
            border: none;
            cursor: pointer;
            color: white;
            padding: var(--spacer);
          }
        }
      `}</style>
    </>
  );
}