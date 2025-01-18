import React from 'react';
import { auth, provider, signInWithPopup } from '../auth/firebaseConfig';
import { Button } from '@mui/material';
import GoogleSignInButton from '../components/GoogleSignInButton';

const LoginButton = ({ setUser }) => {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // get Firebase ID token
      const token = await user.getIdToken();
      localStorage.setItem('firebaseToken', token);

      setUser({
        name: user.displayName,
        email: user.email
      });
      console.log('name:', user.displayName)
      console.log('email: ', user.email)
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div>
      <GoogleSignInButton onClick={handleLogin}>Sign in with Google</GoogleSignInButton>
    </div>
  );
};

export default LoginButton;
