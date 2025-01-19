import React from 'react';
import { auth, signOut } from '../auth/firebaseConfig';
import { Button } from '@mui/material';
import GoogleSignInButton from '../components/GoogleSignInButton';

const LogoutButton = ({ setUser }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  return (
    <GoogleSignInButton>Logout</GoogleSignInButton>
  );
};

export default LogoutButton;
