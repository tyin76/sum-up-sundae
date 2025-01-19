import { Box } from '@mui/material';
import { Stack } from '@mui/material';
import Logo from './Logo'

function Header({ children, height='10vh' }) {
    return (
        <Stack>
            <Stack direction={'row'} width="100%" padding={"10px"}>
                <Box height={height}>
                    <Logo height={height} />
                </Box>
            </Stack>
            {children}
        </Stack>
    );
}

export default Header;