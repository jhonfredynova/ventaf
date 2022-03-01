import React, { useState } from 'react';
import InputLocation from '../../input-location/input-location';

export default function SearchLocation(props) {
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
            <i className="fas fa-location-arrow"></i> 
            <span className="city">{locationSelected.description || translations.allCities}</span>
          </button>
          {
            locationSelected.description && 
            <button 
              className="btn-clear-city" 
              title={translations.clean} 
              onClick={() => onChange()}>
              <i className="fas fa-times"></i>
            </button>
          }
        </div>
      }
      {
        locationStep === 'location-edition' &&
        <div className="location-edition">
          <label className="sr-only" htmlFor="location">{translations.location}:</label>
          <InputLocation
            id="location"
            autofocus
            translations={translations}
            placeholder={translations.allCities}
            searchOptions={{ types: ['(cities)'] }}
            value={locationSelected}
            onBlur={() => setLocationStep(LOCATION_STEPS.SELECTED)}
            onChange={location => {
              onChange(location.placeId);
              setLocationStep(LOCATION_STEPS.SELECTED);
            }}>
          </InputLocation>
          <button className="btn-ok" onClick={() => setLocationStep(LOCATION_STEPS.SELECTED)}>
            <span className="sr-only">{translations.cancel}</span>
            <i className="fas fa-check"></i>
          </button>
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
          }

          .btn-select-city {
            background: transparent;
            color: var(--color-text);
            padding: 0;
            
            .city {
              margin-left: 6px;
            }
          }

          .btn-clear-city {
            background: transparent;
            color: var(--color-alert);
            margin-left: 8px;
          }
        }

        .location-edition {
          display: flex;
          align-items: center;

          .btn-ok {
            background: var(--color-primary);
            border: 1px solid var(--color-primary);
            cursor: pointer;
            color: white;
            padding: var(--spacer);
          }
        }
      `}</style>
    </>
  );
}