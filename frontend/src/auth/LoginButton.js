import React from "react"
import { auth, provider, signInWithPopup } from "../auth/firebaseConfig"
import { Button } from "@mui/material"
import GoogleSignInButton from "../components/CustomButton"
import { create } from "@mui/material/styles/createTransitions"
import { AuthContext } from "../providers/AuthProvider"
import { useContext } from "react"

const LoginButton = () => {
  const { handleLogin } = useContext(AuthContext)

  return (
    <div>
      <GoogleSignInButton onClick={handleLogin}>
        Sign in with Google
      </GoogleSignInButton>
    </div>
  )
}

export default LoginButton
