import React from 'react';
import { useSelector } from 'react-redux';
import FormProfileInfo from '../../components/page-account/form-profile-info';
import FormUploadPhoto from '../../components/page-account//form-upload-photo';
import LoginMethods from '../../components/page-account//login-methods';
import SEO from '../../components/seo';
import Authorization from '../../components/authorization';
import NavigationBar from '../../components/navigation-bar';
import { BREAKPOINTS } from '../../utils/style-utils';
import { initializeStore } from '../../store/store';
import { getConfiguration } from '../../store/actions/config-actions';

export const getServerSideProps = async ({ locale }) => {
  const store = initializeStore();
  await store.dispatch(getConfiguration(locale));
  
  return {
    props: {
      initialReduxState: store.getState() 
    }
  };
};

const UpdateInfo = () => {
  const { authData } = useSelector(state => state.auth);
  const { callingCodes, translations } = useSelector(state => state.config);
  const profile = (authData && authData.profile) || {};
  const identities = (authData && authData.firebase.identities) || {};

  if (!authData) {
    return null;
  }

  return (
    <main>
      <SEO
        title={translations['updateInfo']}
        description={translations['profileDescription']}>
      </SEO>

      <NavigationBar
        title={translations['updateInfo']}
        description={translations['profileDescription']}
        showBackBtn={true}
        translations={translations}>
      </NavigationBar>

      <section className="user-info">
        <div className="logins">
          <FormUploadPhoto
            authData={authData}
            profile={profile}
            translations={translations}>
          </FormUploadPhoto>
          <h2>{translations.login}</h2>
          <LoginMethods
            identities={identities}
            translations={translations}>
          </LoginMethods>
        </div>

        <div className="profile-info">
          <FormProfileInfo
            authData={authData}
            callingCodes={callingCodes}
            profile={profile}
            translations={translations}>
          </FormProfileInfo>
        </div>
      </section>
      <style jsx>{`
        main {
          max-width: var(--container-width);
          margin: 0 auto;
          padding: calc(var(--spacer) * 2);

          h2 {
            margin: var(--spacer) 0px;
          }

          .user-info {
            display: grid;
            grid-template-areas: 
              'logins'
              'profile';
            gap: calc(var(--spacer) * 4);

            .logins {
              grid-area: logins;
            }

            .change-password {
              grid-area: password;
            }

            .profile-info {
              grid-area: profile;
            }
          }
          
          @media screen and (min-width: ${BREAKPOINTS.TABLET}) {
            .user-info {
              grid-template-areas: 'logins profile';
              grid-template-columns: 300px 1fr;
            }
          }

        }  
      `}</style>
    </main>
  );

};

export default Authorization(UpdateInfo, ['registered']);