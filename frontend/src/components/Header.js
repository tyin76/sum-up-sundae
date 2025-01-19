import { Box } from '@mui/material';
import { Stack } from '@mui/material';
import Logo from './Logo'

function Header({ children, height='15vh' }) {
    return (
        <Stack>
            <Stack direction={'row'} width="100%">
                <Box height={height} padding="10px">
                    <Logo height={height} />
                </Box>
            </Stack>
            {children}
        </Stack>
    );
}

export default Header;