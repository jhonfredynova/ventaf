import React, { useState } from 'react';
import LoginEmail from './components/login-email';
import LoginSocialNetworks from './components/login-social-networks';

export default function UserLogin(props) {
  const [isLoggingIn, setIsLogginIn] = useState(false);
  const { translations, onLoginSuccess } = props;

  return (
    <div className="user-login">
      <LoginSocialNetworks
        isLoggingIn={isLoggingIn}
        translations={translations}
        onLogginIn={setIsLogginIn}
        onSuccess={onLoginSuccess}>
      </LoginSocialNetworks>
      <LoginEmail
        isLoggingIn={isLoggingIn}
        translations={translations}
        onLogginIn={setIsLogginIn}
        onSuccess={onLoginSuccess}>
      </LoginEmail>
    </div>
  );
  
}