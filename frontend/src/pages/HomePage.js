import React, { useState, useEffect } from "react"
import LoginButton from "../auth/LoginButton.js"
import LogoutButton from "../auth/LogoutButton.js"
import { auth } from "../auth/firebaseConfig"
import { Box, Typography } from "@mui/material"
import LogoAndText from "../media/SumUpSundaeTextLogo.svg"
import Logo from "../components/Logo.js"
import { useNavigate, Link, useNavigation } from "react-router-dom"
import { Button, Stack } from "@mui/material"
import Header from "../components/Header.js"
import CustomButton from "../components/CustomButton.js"
import { AuthContext } from "../providers/AuthProvider"
import { useContext } from "react"
import PervCat from "../components/PervCat.js"
import OrangeCat from "../components/OrangeCat.js"

function HomePage() {
  const { user, setUser } = useContext(AuthContext)
  // {user && <img src={user.profilePic} style={{ borderRadius: '50px'}}></img>}

  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const token = await currentUser.getIdToken()
        localStorage.setItem("firebaseToken", token)
        setUser({
          name: currentUser.displayName,
          email: currentUser.email,
          profilePic: currentUser.photoURL,
        })
      } else {
        localStorage.removeItem("firebaseToken")
        setUser(null)
      }
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (user != null) {
      navigate("/createJoin")
    }
  }, [user])

  return (
    <>
      <Box display="flex" height="100vh" position="relative">
        {user && (
          <Box position="absolute" top={20} right={20} display="flex" gap={2}>
            <Link to="/createJoin" style={{ textDecoration: "none" }}>
              <CustomButton fontSize="18px">Join/Create Group</CustomButton>
            </Link>
            <Link to="/viewGroup" style={{ textDecoration: "none" }}>
              <CustomButton fontSize="18px">View Group</CustomButton>
            </Link>
          </Box>
        )}

        <Box
          flex={1}
          bgcolor="#FBB6BA"
          className="pt-20 flex flex-col items-center justify-center gap-20"
        >
          <Typography
            sx={{ fontFamily: "Bubble", color: "white", fontSize: "60px" }}
            className="[text-wrap:balance] text-center"
          >
            Keep in touch with your friends!
          </Typography>
          <div className="flex">
            <PervCat height="200px" />
            <OrangeCat height="200px" />
          </div>
        </Box>

        <Box
          flex={1}
          bgcolor="#FFF5F4"
          className="-mt-10 flex flex-col items-center justify-center gap-20"
        >
          <Box className="">
            <Logo height="200px" marginBottom="" />
          </Box>

          {!user && <LoginButton />}
          {user && <LogoutButton />}
        </Box>
      </Box>
    </>
  )
}

export default HomePage
