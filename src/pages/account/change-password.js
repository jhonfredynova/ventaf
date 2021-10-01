import React from 'react';
import { useSelector } from 'react-redux';
import FormChangePassword from '../../components/page-account/form-change-password';
import Authorization from '../../components/authorization';
import SEO from '../../components/seo';
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

const ChangePassword = () => {
  const authData = useSelector(state => state.auth.authData);
  const { translations } = useSelector(state => state.config);
  const profile = (authData && authData.profile) || {};

  if (!authData) {
    return null;
  }

  return (
    <main>
      <SEO
        title={translations.changePassword}
        description={translations.changePassswordDescription}>
      </SEO>
      <NavigationBar
        title={translations.changePassword}
        description={translations.changePassswordDescription}
        showBackBtn={true}
        translations={translations}>
      </NavigationBar>
      <section className="form-change-password">
        <FormChangePassword
          translations={translations}
          profile={profile}>
        </FormChangePassword>
      </section>
      <style jsx>{`
        main {
          --container-width: 600px;
          max-width: var(--container-width);
          margin: 0 auto;
          padding: calc(var(--spacer) * 2);

          .form-change-password {
            margin: 0 auto;
          }
        }  
      `}</style>
    </main>
  );

};

export default Authorization(ChangePassword, ['registered']);