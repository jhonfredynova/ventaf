import React, { useState } from 'react';
import LoginSocialNetworks from './components/login-social-networks';

export default function UserLogin(props) {
  const { translations, onLoginSuccess } = props;
  const [isLoggingIn, setIsLogginIn] = useState(false);
  
  return (
    <div className="user-login">
      <LoginSocialNetworks
        isLoggingIn={isLoggingIn}
        translations={translations}
        onLogginIn={setIsLogginIn}
        onSuccess={onLoginSuccess}>
      </LoginSocialNetworks>
    </div>
  );
  
}