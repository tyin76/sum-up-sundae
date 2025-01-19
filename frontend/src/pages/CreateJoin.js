import CustomButton from "../components/CustomButton";
import { useEffect } from "react"
import { Stack } from "@mui/material"
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
                <TextField></TextField>
            </CustomButton>
            <CustomButton>Create Group</CustomButton>
        </Stack>
    );
}

export default CreateJoin;