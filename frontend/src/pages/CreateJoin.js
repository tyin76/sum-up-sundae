import CustomButton from "../components/CustomButton";
import { useEffect, useState } from "react"
import { Stack, Box, Button, Typography } from "@mui/material"
import { TextField } from "@mui/material"
import { joinGroup, createGroup, getGroupId } from '../api/api'
import { create } from "@mui/material/styles/createTransitions";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

function CreateJoin() {
    const [groupCode, setGroupCode] = useState('');

    const { uid, groupId } = useContext(AuthContext);


    useEffect(() => {
        document.body.style.backgroundColor = '#FFF5F4';
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    async function handleClick(groupCode) {
        await joinGroup(groupCode, uid);
    }

    async function handleCreateGroupClick() {
        await createGroup(uid);
    }

    return (
        <>
          {groupId ? (
            <Stack width="100%" alignItems="center">
              <Stack>
                <TextField
                  placeholder="Enter group code"
                  onChange={(e) => setGroupCode(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#DABCDF',
                        transition: 'border-color 0.3s ease-in-out',
                      },
                      '&:hover fieldset': {
                        borderColor: '#FBB6BA',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#FBB6BA',
                      },
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: '#7D1945',
                      fontFamily: 'Bubble',
                      fontSize: '20px',
                    },
                    '& .MuiInputBase-input': {
                      color: '#7D1945',
                      fontFamily: 'Bubble',
                      fontSize: '20px',
                    },
                  }}
                  InputProps={{
                    style: {
                      borderTopRightRadius: '2em',
                      borderTopLeftRadius: '2em',
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
              <CustomButton onClick={() => handleCreateGroupClick()}>Create Group</CustomButton>
              <CustomButton>Leave Current Group</CustomButton>
            </Stack>
          ) : (
            <Box
                sx={{
                    display: 'flex', 
                    flexDirection: 'column',             
                    alignItems: 'center',        
                    justifyContent: 'center',    
                    height: '100vh',             
                    width: '100vw',              
                    backgroundColor: '#f5f5f5',
                    }}
                    >
            <Typography sx={{ fontFamily: 'Bubble', paddingBottom: '40px', fontSize: '40px'}}>You are already in a Group, you cannot join more than one!</Typography>
            <CustomButton>Leave Current Group</CustomButton>
            </Box>

          )}
        </>
      );
      
}

export default CreateJoin;