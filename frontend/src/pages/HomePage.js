import React, { useState, useEffect } from 'react';
import LoginButton from '../auth/LoginButton.js';
import LogoutButton from '../auth/LogoutButton.js';
import { auth } from '../auth/firebaseConfig';
import { Box, Typography } from '@mui/material';
import LogoAndText from '../media/SumUpSundaeTextLogo.svg'
import Logo from '../components/Logo.js';

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
          profilePic: currentUser.photoURL
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
        <Typography sx={{ fontFamily: 'Bubble', color: 'white', fontSize: '40px' }}>Keep in touch with your friends!</Typography>
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
        <Logo height='190px' marginBottom='25px'></Logo>
        {user && <img src={user.profilePic} style={{ borderRadius: '50px'}}></img>}
        </Box>
        
        {!user && <LoginButton setUser={setUser} />}
        {user && <LogoutButton setUser={setUser} />}
      </Box>

      
    </Box>
  );
}

export default HomePage;
