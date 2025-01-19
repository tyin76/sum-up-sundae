import React, { useEffect, useState } from "react"
import Header from "../components/Header"
import { getPeopleInGroup } from "../api/api.js"
import ProfileCard from "../components/ProfileCard.js"
import { Typography, Box, Card, CardContent } from "@mui/material"
import Grid from "@mui/material/Grid2"
import CustomButton from "../components/CustomButton.js"
import { useRef } from "react"

function ViewGroup() {
  const [groupUsers, setGroupUsers] = useState(null)

  const fileInputRef = useRef(null)

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

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
            userID: "678c715de7fc42df93f014c3",
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
        console.log(json)
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    const fetchGroupUsers = async () => {
      document.body.style.backgroundColor = "#FFF5F4"
      try {
        const users = await getPeopleInGroup("678cc74f813155e31daa3a7b")
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
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  padding: 2,
                  backgroundColor: "#FCB5BA",
                  borderRadius: 4,
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
                  },
                  minWidth: 200,
                  height: 200,
                  display: "flex",
                  flexDirection: "collumn",
                  justifyContent: "center",
                  alignItems: "center",
                  transition: "transform 0.2s ease-in-out",
                }}
              >
                <CardContent
                  sx={{
                    padding: 0.5,
                    "&:last-child": {
                      paddingBottom: 1,
                    },
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "Bubble",
                      fontSize: "24px",
                      color: "white",
                    }}
                  >
                    {user.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
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
