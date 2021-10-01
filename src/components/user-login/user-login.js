import React, { useState } from 'react';
import LoginEmail from './components/login-email';
import LoginSocialNetworks from './components/login-social-networks';

export default function UserLogin(props) {
  const { translations, onLoginSuccess } = props;
  const [isLoggingIn, setIsLogginIn] = useState(false);
  
  return (
    <div className="user-login">
      <LoginEmail
        isLoggingIn={isLoggingIn}
        translations={translations}
        onLogginIn={setIsLogginIn}
        onSuccess={onLoginSuccess}>
      </LoginEmail>
      <LoginSocialNetworks
        isLoggingIn={isLoggingIn}
        translations={translations}
        onLogginIn={setIsLogginIn}
        onSuccess={onLoginSuccess}>
      </LoginSocialNetworks>
    </div>
  );
  
}