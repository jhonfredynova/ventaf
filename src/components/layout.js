import React from 'react';
import { useSelector } from 'react-redux';
import Header from './header/header';
import Footer from './footer';

export default function Layout(props) {
  const { children } = props;
  const { authData, authLoaded } = useSelector(state => state.auth);
  const { translations } = useSelector(state => state.config);

  return (
    <>         
      <Header
        authData={authData}
        authLoaded={authLoaded}
        translations={translations} />
      {children}
      <Footer translations={translations} />
    </> 
  );

}
