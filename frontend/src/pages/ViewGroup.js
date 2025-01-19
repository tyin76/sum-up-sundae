import React, { useEffect, useState } from "react"
import Header from "../components/Header"
import { getPeopleInGroup, HasPostThisWeek } from "../api/api.js"
import ProfileCard from "../components/ProfileCard.js"
import { Typography, Box, Card, CardContent } from "@mui/material"
import Grid from "@mui/material/Grid2"
import CustomButton from "../components/CustomButton.js"
import { useRef } from "react"
import { useContext } from "react"
import { AuthContext } from "../providers/AuthProvider.js"
import { useNavigate } from "react-router-dom"
function ViewGroup() {
  const [groupUsers, setGroupUsers] = useState(null)
  const [hasUploaded, setHasUploaded] = useState(false)

  const uid = localStorage.getItem("uid")
  const groupId = localStorage.getItem("groups")
  console.log(uid, groupId)

  const fileInputRef = useRef(null)

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const checkUpload = async (uid) => {
    const bool = await HasPostThisWeek(uid)
    console.log("Has Post:", bool)
    if (bool) {
      return setHasUploaded(true)
    }
    return setHasUploaded(false)
  }

  useEffect(() => {
    checkUpload(uid)
  }, [])

  const onSubmitVideo = async (e) => {
    e.preventDefault()
    if (e.target.files.length > 0) {
      const file = e.target.files[0]
      console.log(file)
      // const data = new FormData()
      // data.append("file", file)
      // data.append("upload_preset", "videos_preset")
      try {
        const resUrl = await fetch("http://localhost:5000/api/asset/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Specify file type
          },
          body: JSON.stringify({
            userID: uid,
          }),
        })
        const firstResponse = await resUrl.json()
        const link = firstResponse.uploadUrl
        const response = await fetch(link, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": "video/mp4", // Specify file type
          },
        })
        const json = await response
        checkUpload(uid)
        console.log(json)
      } catch (error) {
        console.error(error)
      }
    }
  }

  const navigate = useNavigate()

  const handleCardClick = (playbackID) => {
    if (hasUploaded) {
      navigate(`/userSumUp/${playbackID}`)
    }
  }

  useEffect(() => {
    const fetchGroupUsers = async () => {
      document.body.style.backgroundColor = "#FFF5F4"
      try {
        console.log("HIEU")
        console.log(groupId)
        const users = await getPeopleInGroup(groupId)
        console.log(users)
        setGroupUsers(users)
      } catch (error) {
        console.error("Error fetching group users:", error)
      }
    }

    fetchGroupUsers()
    return () => {
      document.body.style.backgroundColor = ""
    }
  }, [])

  return (
    <Box
      sx={{
        padding: 4,
        minHeight: "100%",
      }}
    >
      <Grid
        container
        spacing={4}
        sx={{
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        {groupUsers &&
          groupUsers.map((user, index) => (
            <>
              <Grid
                item
                key={index}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className="w-1/4 p-2 flex flex-col rounded-lg items-center gap-2 border-0 border-black ease-in-out hover:scale-110 hover:shadow-[0px_8px_20px_rgba(0,0,0,0.2)] duration-150"
                onClick={() => {
                  handleCardClick(user.playbackID)
                }}
              >
                <img
                  className={`rounded-md h-[400px] object-contain ${
                    hasUploaded ? "" : "blur-xl"
                  }`}
                  src={`https://vod-cdn.lp-playback.studio/raw/jxf4iblf6wlsyor6526t4tcmtmqa/catalyst-vod-com/hls/${user.playbackID}/thumbnails/keyframes_0.png`}
                ></img>
                <CardContent
                  className="flex items-center justify-center gap-4"
                  sx={{
                    padding: 0.5,
                    "&:last-child": {
                      paddingBottom: 1,
                    },
                  }}
                >
                  <img className="rounded-md size-10" src={user.avatar}></img>
                  <Typography
                    className="text-pink-700"
                    variant="h5"
                    sx={{
                      fontFamily: "Bubble",
                      fontSize: "24px",
                    }}
                  >
                    {user.name}
                  </Typography>
                </CardContent>
              </Grid>
            </>
          ))}
      </Grid>
      <Box
        sx={{
          marginTop: "00vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          padding: 2,
        }}
      >
        <CustomButton onClick={handleButtonClick}>Upload Video</CustomButton>
        <input
          ref={fileInputRef}
          type="file"
          style={{ display: "none" }} // Hidden from view but still functional
          onChange={onSubmitVideo}
        />
      </Box>
    </Box>
  )
}

export default ViewGroup
