import CustomButton from "../components/CustomButton"
import { useEffect, useState } from "react"
import { Stack, Box, Button, Typography } from "@mui/material"
import { TextField } from "@mui/material"
import {
  joinGroup,
  createGroup,
  getGroupId,
  removeUserFromGroup,
} from "../api/api"
import { create } from "@mui/material/styles/createTransitions"
import { useContext } from "react"
import { AuthContext } from "../providers/AuthProvider"
import LogoutButton from "../auth/LogoutButton"

function CreateJoin() {
  const [groupCode, setGroupCode] = useState("")

  const { groupId, setGroupId } = useContext(AuthContext)
  const [initialized, setInitialized] = useState(false)

  const uid = localStorage.getItem("uid")
  // const groupId = localStorage.getItem("groups")
  // console.log("Uid: ", uid)
  // console.log("groupID: ", groupId)

  useEffect(() => {
    setGroupId(localStorage.getItem("groups"))
    console.log(groupId)
    setInitialized(true) // Mark as initialized

    document.body.style.backgroundColor = "#FFF5F4"
    return () => {
      document.body.style.backgroundColor = ""
    }
  }, [])

  async function handleClick(groupCode) {
    try {
      const data = await joinGroup(groupCode, uid)
      console.log(data)
      setGroupId(data._id)
      localStorage.setItem("groups", data._id)
    } catch (error) {
      console.error(error)
    }
  }

  async function handleCreateGroupClick(uid) {
    try {
      const data = await createGroup(uid)
      console.log(data)
      setGroupId(data._id)
      localStorage.setItem("groups", data._id)
    } catch (error) {}
  }

  async function handleLeaveGroupClick(groupId, uid) {
    try {
      const data = await removeUserFromGroup(groupId, uid)
      console.log(data)
      setGroupId(null)
      console.log("HIEU TEACK", groupId)
      localStorage.setItem("groups", null)
    } catch (error) {
      console.error(error)
    }
  }
  if (!initialized) {
    return null
  }
  return (
    <>
      {groupId == null ? (
        <Stack width="100%" alignItems="center">
          <Stack>
            <TextField
              placeholder="Enter group code"
              onChange={(e) => setGroupCode(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#DABCDF",
                    transition: "border-color 0.3s ease-in-out",
                  },
                  "&:hover fieldset": {
                    borderColor: "#FBB6BA",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#FBB6BA",
                  },
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "#7D1945",
                  fontFamily: "Bubble",
                  fontSize: "20px",
                },
                "& .MuiInputBase-input": {
                  color: "#7D1945",
                  fontFamily: "Bubble",
                  fontSize: "20px",
                },
              }}
              InputProps={{
                style: {
                  borderTopRightRadius: "2em",
                  borderTopLeftRadius: "2em",
                },
              }}
            />
            <CustomButton
              width="100%"
              borderTopRightRadius="0"
              borderTopLeftRadius="0"
              borderBottomRightRadius="1em"
              borderBottomLeftRadius="1em"
              onClick={() => handleClick(groupCode)}
            >
              Join Group
            </CustomButton>
          </Stack>
          <Box sx={{ height: "30px" }} />
          <CustomButton onClick={() => handleCreateGroupClick(uid)}>
            Create Group
          </CustomButton>
          <LogoutButton></LogoutButton>
        </Stack>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100vw",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Bubble",
              paddingBottom: "40px",
              fontSize: "40px",
            }}
          >
            You are already in a Group, you cannot join more than one!
          </Typography>
          <CustomButton
            onClick={() => {
              handleLeaveGroupClick(groupId, uid)
            }}
          >
            Leave Current Group
          </CustomButton>
          <LogoutButton></LogoutButton>
        </Box>
      )}
    </>
  )
}

export default CreateJoin
