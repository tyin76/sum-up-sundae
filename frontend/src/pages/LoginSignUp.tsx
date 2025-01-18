import React from "react";
import { useState, useEffect } from "react";
import LogInButton from "../auth/LogInButton";
import { auth } from "../auth/firebaseConfig";

function LoginSignUp() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const token = await currentUser.getIdToken();
        localStorage.setItem("firebaseToken", token);
        setUser({
          name: currentUser.displayName,
          email: currentUser.email,
        });
      } else {
        localStorage.removeItem("firebaseToken");
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return <LogInButton setUser={setUser}></LogInButton>;
}

export default LoginSignUp;
