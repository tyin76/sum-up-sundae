import CustomButton from "../components/CustomButton";
import { useEffect } from "react"
import { Stack, Typography } from "@mui/material"
import { TextField } from "@mui/material"

function CreateJoin() {

    useEffect(() => {
        document.body.style.backgroundColor = '#FFF5F4';
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    return (
        <Stack width={"100%"} alignItems={'center'}>
            <CustomButton>
                <TextField
                    placeholder="Enter group code"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#DABCDF', // Default border color
                                transition: 'border-color 0.3s ease-in-out'
                            },
                            '&:hover fieldset': {
                                borderColor: '#FFF5F4', // Border color on hover
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#FFF5F4', // Border color when focused
                            },
                        },
                        '& .MuiInputBase-input::placeholder': {
                            color: '#FFF5F4',
                            fontFamily: 'Bubble',
                            fontSize: '16px'
                        }
                    }}
                    InputProps={{
                        style: {
                            borderRadius: '100em'
                        }
                    }}
                ></TextField>
                <Typography sx={{ fontFamily: 'Bubble', }}>Join Group</Typography>
            </CustomButton>
            <CustomButton>Create Group</CustomButton>
        </Stack>
    );
}

export default CreateJoin;