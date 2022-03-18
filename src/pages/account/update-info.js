import React from 'react';
import { useSelector } from 'react-redux';
import FormProfileInfo from '../../components/page-account/form-profile-info';
import SEO from '../../components/seo';
import Authorization from '../../components/authorization';
import NavigationBar from '../../components/navigation-bar';
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

function UpdateInfo() {
  const { authData } = useSelector(state => state.auth);
  const { callingCodes, translations } = useSelector(state => state.config);
  const profile = (authData && authData.profile) || {};

  if (!authData) {
    return null;
  }

  return (
    <main>
      <SEO
        title={translations.updateInfo}
        description={translations.profileDescription} />

      <NavigationBar
        title={translations.updateInfo}
        description={translations.profileDescription}
        showBackBtn
        translations={translations} />

      <section className="user-info">
        <FormProfileInfo
          authData={authData}
          callingCodes={callingCodes}
          profile={profile}
          translations={translations} />
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
            padding: var(--spacer);
          }
        }  
      `}</style>
    </main>
  );

}

export default Authorization(UpdateInfo, ['registered']);