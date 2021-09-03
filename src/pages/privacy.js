import React from 'react';
import { useSelector } from 'react-redux';
import SEO from '../components/seo';
import NavigationBar from '../components/navigation-bar';
import { initializeStore } from '../store/store';
import { getConfiguration } from '../store/actions/config-actions';

export const getStaticProps = async ({ locale }) => {
  const store = initializeStore();
  await store.dispatch(getConfiguration(locale));
  
  return {
    props: {
      initialReduxState: store.getState() 
    }
  };
};

export default function Privacy() {
  const { translations } = useSelector(state => state.config);

  return (
    <main>
      <SEO
        title={translations['privacyTitle']}
        description={translations['privacyDescription']}>
      </SEO>
      <NavigationBar
        title={translations['privacyTitle']}
        description={translations['privacyDescription']}
        showBackBtn={true}
        translations={translations}>
      </NavigationBar>
      <article dangerouslySetInnerHTML={{ __html: translations['privacyInfo'] }} />
      <style jsx>{`
        main {
          max-width: var(--container-width);
          margin: 0 auto;
          padding: calc(var(--spacer) * 2);

          article {
            :global(p) {
              margin-bottom: 10px;
            }
          }
        }  
      `}</style>
    </main>
  );

}

