import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
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

export default function Custom404() {
  const { translations } = useSelector(state => state.config);
  const redirectLink = '/';
  const redirectText = translations['goHomePage'];

  return (
    <main>
      <NavigationBar
        title={translations['notFoundTitle']}
        description={translations['notFoundDescription']}
        translations={translations}>
      </NavigationBar>
      <section className="content-wrapper">
        <img 
          src={
            'https://firebasestorage.googleapis.com/v0/b/construccionytecnologia-f556c.appspot.com/o/404.svg'
            .concat('?alt=media&token=b5f27d44-8598-490c-a40d-9e5fdd088652')
          }
          alt={translations['notFoundDescription']}>
        </img>
        <p>{translations['notFoundDescription']}</p>
        <p><Link href={redirectLink}>{redirectText}</Link></p>
      </section>
      <style jsx>{`
        main {
          max-width: var(--container-width);
          margin: 0 auto;
          padding: calc(var(--spacer) * 2);

          .content-wrapper {
            margin-top: var(--spacer);
            text-align: center;
          }
        }  
      `}</style>
    </main>
  );
}