import CustomButton from "../components/CustomButton";
import { useEffect, useState } from "react"
import { Stack, Box } from "@mui/material"
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
        <Stack width={"100%"} alignItems={'center'}>
            {groupId ? <>
                <Stack>
                    <TextField
                        placeholder="Enter group code"
                        onChange={(e) => setGroupCode(e.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#DABCDF',
                                    transition: 'border-color 0.3s ease-in-out'
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
                                fontSize: '20px'
                            },
                            '& .MuiInputBase-input': {
                                color: '#7D1945',
                                fontFamily: 'Bubble',
                                fontSize: '20px',
                            }
                        }}
                        InputProps={{
                            style: {
                                borderTopRightRadius: '2em',
                                borderTopLeftRadius: '2em'
                            }
                        }}
                    ></TextField>
                    <CustomButton width="100%" borderTopRightRadius="0" borderTopLeftRadius="0" borderBottomRightRadius="1em" borderBottomLeftRadius="1em"
                        onClick={() => handleClick(groupCode)}>Join Group</CustomButton>
                </Stack>
                <Box sx={{ height: "30px" }} />
                <CustomButton onClick={() => handleCreateGroupClick()}>Create Group</CustomButton></> : "remove"}
        </Stack>
    );
}

export default CreateJoin;