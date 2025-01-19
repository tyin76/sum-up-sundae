import CustomButton from "../components/CustomButton";
import { useEffect } from "react"
import { Stack, Box } from "@mui/material"
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
            <Stack>
                <TextField
                    placeholder="Enter group code"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#DABCDF', // Default border color
                                transition: 'border-color 0.3s ease-in-out'
                            },
                            '&:hover fieldset': {
                                borderColor: '#FBB6BA', // Border color on hover
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#FBB6BA', // Border color when focused
                            },
                        },
                        '& .MuiInputBase-input::placeholder': {
                            color: '#7D1945',
                            fontFamily: 'Bubble',
                            fontSize: '20px'
                        },
                        '& .MuiInputBase-input': {  // Target the input text itself
                            color: '#7D1945',        // Set the text color
                            fontFamily: 'Bubble',     // Set the font family
                            fontSize: '20px',       // Adjust the font size as needed 
                        }
                    }}
                    InputProps={{
                        style: {
                            borderTopRightRadius: '2em',
                            borderTopLeftRadius: '2em'
                        }
                    }}
                ></TextField>
                <CustomButton width="100%" borderTopRightRadius="0" borderTopLeftRadius="0" borderBottomRightRadius="1em" borderBottomLeftRadius="1em">Join Group</CustomButton>
            </Stack>
            <Box sx={{height: "30px"}}/>
            <CustomButton>Create Group</CustomButton>
        </Stack>
    );
}

export default CreateJoin;