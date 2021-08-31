import React from 'react';
import HomeLocation from './home-location';
import { BREAKPOINTS } from '../../utils/style-utils';

export default function HomeFilters(props) {
  const { locationSelected, translations, filters, onChange } = props;

  const onChangeLocation = location => {
    const newFilters = { ...filters };

    if (location) {
      newFilters.location = location;
    } else {
      delete newFilters.location;
    }

    onChange(newFilters);
  };

  return (
    <div className="home-filters">
      <section className="location">
        <HomeLocation
          filters={filters}
          locationSelected={locationSelected}
          translations={translations}
          onChange={onChangeLocation}>
        </HomeLocation>
      </section>
      <style jsx>{`
        .home-filters {
          display: flex;
          flex-flow: column;
          align-items: center;
          margin-bottom: 15px;

          @media screen and (min-width: ${BREAKPOINTS.TABLET}) {
            flex-flow: row;
          }
          .location {
            padding: 8px;
            margin-left: 0;

            @media screen and (min-width: ${BREAKPOINTS.TABLET}) {
              margin-left: auto;
            }
          }
        }
      `}</style>
    </div>
  );
  
}
