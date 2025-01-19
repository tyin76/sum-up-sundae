import {Box} from '@mui/material';
import {Stack} from '@mui/material';
import SumUpSundaeTextLogo from '../media/SumUpSundaeTextLogo.svg';

function Header() {
    return (
        <Stack direction={'row'} width="100%">
            <Box height="100%">
                <img src={SumUpSundaeTextLogo} alt="SumUp Sundae Text Logo" />
            </Box>
        </Stack>
    );
}

export default Header;