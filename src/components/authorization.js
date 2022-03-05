import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

export default function AuthorizationWrapper(ComposedComponent, requiredClaims = []) {

  return function Authorization(props) {
    const [renderedComponent, setRenderedComponent] = useState(false);
    const { authData, authLoaded } = useSelector(state => state.auth);
    const config = useSelector(state => state.config);
    const { translations } = config;
    const router = useRouter();

    useEffect(() => {
      if (!authLoaded) {
        return;
      }

      if (!authData) {
        router.push(`/login?message=${translations.authNotLogin}`);
        return;
      } 
      if (authData && requiredClaims.length > 0 && !authData.claims.filter(item => requiredClaims.includes(item)).length) {
        router.push(`/login?message=${translations.authNotPriviliges}`);
        return;
      }

      if (!renderedComponent) {
        setRenderedComponent(true);
      }
    }, [authLoaded, authData, renderedComponent, translations, router]);

    return (
      renderedComponent &&
      <ComposedComponent {...props} />
    );

  };

}
