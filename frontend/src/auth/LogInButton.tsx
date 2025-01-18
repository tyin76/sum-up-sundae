import React from "react";
import { auth, provider, signInWithPopup } from "./firebaseConfig";
import { Button } from "@mui/material";
import GoogleSignInButton from "./GoogleLogInButton";
import { User } from "firebase/auth";

const LogInButton = (setUser: any) => {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user: User = result.user;

      // get Firebase ID token
      const token = await user.getIdToken();
      localStorage.setItem("firebaseToken", token);

      setUser({
        name: user.displayName,
        email: user.email,
      });
      console.log(typeof user.name);
      console.log(typeof user.email);
    } catch (error: any) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div>
      <GoogleSignInButton onClick={handleLogin}>
        Sign in with Google
      </GoogleSignInButton>
    </div>
  );
};

export default LogInButton;
