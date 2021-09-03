import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { geocodeByPlaceId } from 'react-places-autocomplete';
import Logo from './components/logo';
import SearchBar from './components/search-bar';
import SearchLocation from './components/search-location';
import { BREAKPOINTS } from '../../utils/style-utils';

export default function Header(props) {
  const [locationSelected, setLocationSelected] = useState({});
  const { authData, authLoaded, translations } = props;
  const router = useRouter();
  const { query } = router;
  const photoUrl = (authLoaded && authData?.profile?.photoURL) || '/anonymous.png';

  useEffect(() => {
    if (!query.location) {
      setLocationSelected({});
      return;
    }

    geocodeByPlaceId(query.location)
      .then(location => {
        const locationInfo = {
          description: location[0].formatted_address,
          placeId: location[0].place_id
        };
        setLocationSelected(locationInfo);
      });
  }, [query.location]);

  const onClickPost = () => {
    ReactGA.event({
      category: 'Users',
      action: 'Create new post',
      value: 3
    });
  };

  const onSearch = searchTerm => {
    const newQuery = { ...query };

    if (searchTerm.trim()) {
      newQuery.search = searchTerm;
    } else {
      delete newQuery.search;
    }

    router.push({ pathname: '/', query: newQuery });
  };

  const onChangeLocation = newLocation => {
    const newQuery = { ...query };

    if (newLocation) {
      newQuery.location = newLocation;
    } else {
      delete newQuery.location;
    }

    router.push({ pathname: '/', query: newQuery });
  };

  return (
    <header>
      <nav className="navbar">

        <div className="logo-wrapper">
          <Link href="/">
            <a className="link"><Logo translations={translations} /></a>
          </Link>
          <SearchLocation
            locationSelected={locationSelected}
            translations={translations}
            onChange={onChangeLocation}>
          </SearchLocation>
        </div>

        <div className="search-wrapper">
          <label className="sr-only" htmlFor="searchTerms">{translations.search}:</label>
          <SearchBar
            id="searchTerms"
            placeholder={translations.homeSearchInputPlaceholder}
            searchTerm={query.search}
            translations={translations}
            onSubmit={onSearch}>
          </SearchBar>
        </div>

        <div className="menu-wrapper">         
          <Link href="/post" title={translations.postAd} onClick={onClickPost}>
            <a className="btn-post">
              <i className="fas fa-plus" /> {translations.sell}
            </a>
          </Link> 
          <button 
            className="btn-profile" 
            title={translations.profile}
            onClick={() => (authLoaded && authData) ? router.push(`/${authData.profile.username}`) : router.push('/login')}>
            {authLoaded && <img src={photoUrl} alt={translations.profile} />}
            {!authLoaded && <i className="fas fa-spinner fa-spin fa-2x" title={translations.loading}></i>}
          </button>
        </div>

      </nav>
      <style jsx>{`
        header {
          background: rgb(250, 250, 251);
          box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px, rgba(0, 0, 0, 0.05) 0px 1px 4px 0px, rgba(0, 0, 0, 0.05) 0px 2px 8px 0px;
          padding: var(--spacer);
          
          .navbar {
            display: grid; 
            grid-template-columns: 1fr auto;
            gap: var(--spacer);
            margin: 0 auto;
            max-width: var(--container-width);

            .logo-wrapper {
              grid-column: 1/3;
              display: flex;
              flex-flow: column;
              align-items: center;
              margin-right: var(--spacer);
              width: 100%;
              
              :global(.link) {
                text-decoration: none;
              }
            }

            .search-wrapper {
              display: flex; 
              align-items: center;
            }
            
            .menu-wrapper {
              display: flex; 
              align-items: center;

              .btn-post {
                display: flex;
                align-items: center;
                background: none;
                border: none;
                border: 3px solid var(--color-primary);
                border-radius: 10px;
                color: var(--color-primary);
                cursor: pointer;
                padding: var(--spacer);
                text-decoration: none;

                .fa-plus {
                  margin-right: 5px;
                }
              }

              .btn-profile {
                background: none;
                border: none;
                cursor: pointer;
                margin-left: 6px;

                i {
                  pointer-events: none;
                }

                img {
                  border-radius: 50%;
                  height: 38px;
                  width: 38px;
                }
              }
            }

            @media screen and (min-width: ${BREAKPOINTS.TABLET}) {
              grid-template-columns: auto 1fr auto;

              .logo-wrapper {
                grid-column: 1/2;
              }
            }

          }
        }
      `}</style>
    </header>
  );

}