import React from 'react';
import { Button } from '@mui/material';
import GoogleSignInButton from '../components/CustomButton';
import { AuthContext } from '../providers/AuthProvider';
import { useContext } from 'react';

const LogoutButton = () => {

  const { handleLogout } = useContext(AuthContext);

  return (
    <GoogleSignInButton
        variant="outlined"
        onClick={handleLogout}
      >
        Logout
  </GoogleSignInButton>
  );
};

export default LogoutButton;
