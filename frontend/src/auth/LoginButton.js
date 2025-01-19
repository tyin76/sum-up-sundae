import React from 'react';
import { auth, provider, signInWithPopup } from '../auth/firebaseConfig';
import { Button } from '@mui/material';
import GoogleSignInButton from '../components/CustomButton';
import { createUser } from '../api/api';
import { create } from '@mui/material/styles/createTransitions';
import { AuthContext } from '../providers/AuthProvider';
import { useContext } from 'react';

const LoginButton = () => {

  const { setUid, setUser, setGroupId } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // get Firebase ID token
      const token = await user.getIdToken();
      localStorage.setItem('firebaseToken', token);

      setUser({
        name: user.displayName,
        email: user.email,
        profilePic: user.photoURL
      });
      console.log('photo URL', user.photoURL)
      console.log('name:', user.displayName)
      console.log('email: ', user.email)

      const data = await createUser(user.displayName, user.email, user.photoURL);
      const { groups, _id } = data;
      console.log("Group id: ", groups)
      setUid(_id);
      if (!groups) {
        setGroupId(groups);
      }

      console.log("Group id: ", groups);

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
