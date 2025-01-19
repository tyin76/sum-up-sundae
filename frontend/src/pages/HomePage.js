import React, { useState, useEffect } from 'react';
import LoginButton from '../auth/LoginButton.js';
import LogoutButton from '../auth/LogoutButton.js';
import { auth } from '../auth/firebaseConfig';
import { Box, Typography } from '@mui/material';
import LogoAndText from '../media/SumUpSundaeTextLogo.svg'

function HomePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const token = await currentUser.getIdToken();
        localStorage.setItem('firebaseToken', token);
        setUser({
          name: currentUser.displayName,
          email: currentUser.email,
        });
      } else {
        localStorage.removeItem('firebaseToken');
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Box
      display="flex"
      height="100vh"
    >
      
      <Box
        flex={1}
        bgcolor="#FBB6BA"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {user && <Typography variant="h1">Welcome, {user.name}!</Typography>}
      </Box>

      
      <Box
        flex={1}
        bgcolor="#FFF5F4"
        display="flex"
        flexDirection='column'
        alignItems="center"
        justifyContent="center"
      >
        <Box>
        <img src={LogoAndText} alt="Logo and Text" style={{ width: "100%", height: "auto" }}></img>
        </Box>
        
        {!user && <LoginButton setUser={setUser} />}
        {user && <LogoutButton setUser={setUser} />}
      </Box>
    </Box>
  );
}

export default HomePage;
