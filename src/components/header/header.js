import React from 'react';
import ReactGA from 'react-ga';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Logo from './components/logo';
import SearchBar from './components/search-bar';
import { BREAKPOINTS } from '../../utils/style-utils';

export default function Header(props) {
  const { authData, authLoaded, translations } = props;
  const router = useRouter();
  const { query } = router;
  const photoUrl = (authLoaded && authData?.profile?.photoURL) || '/anonymous.png';

  const onClickPost = () => {
    ReactGA.event({
      category: 'Users',
      action: 'Create new post',
      value: 3
    });
  };

  const onSearch = searchTerm => {
    let newQuery = { ...query };

    if (searchTerm.trim()) {
      newQuery.search = searchTerm;
    } else {
      delete newQuery.search;
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
            grid-template-columns: 1fr 120px;
            gap: var(--spacer);
            margin: 0 auto;
            max-width: var(--container-width);

            .logo-wrapper {
              grid-column: 1/3;
              text-align: center;
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
              grid-template-columns: 290px 1fr 120px;

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