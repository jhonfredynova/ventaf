import React from 'react';
import { useSelector } from 'react-redux';
import Header from './header/header';
import Footer from './footer';

export default function Layout(props) {
  const { authData, authLoaded } = useSelector(state => state.auth);
  const { translations } = useSelector(state => state.config);
  const preferences = useSelector(state => state.preferences);

  return (
    <>         
      <Header
        authData={authData}
        authLoaded={authLoaded}
        preferences={preferences}
        translations={translations}>
      </Header>
      {props.children}
      <Footer translations={translations} />
    </> 
  );

}
