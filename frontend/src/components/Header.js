import { Box, Stack, useTheme, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import CustomButton from './CustomButton';

function Header({ children, height = '15vh' }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          padding: isSmallScreen ? '10px 15px' : '10px 30px', 
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor:'#FFF5F4',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <Link to='/'>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Logo height={height} />
        </Box>
        </Link>

        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: 'center',
            marginRight: isSmallScreen ? '10px' : '30px',
          }}
        >
          <Link to="/createJoin" style={{ textDecoration: 'none' }}>
            <CustomButton fontSize={isSmallScreen ? '16px' : '20px'}>
              Join/Create Group
            </CustomButton>
          </Link>
          <Link to="/viewGroup" style={{ textDecoration: 'none' }}>
            <CustomButton fontSize={isSmallScreen ? '16px' : '20px'}>
              View Group
            </CustomButton>
          </Link>
        </Stack>
      </Stack>
      {children}
    </Stack>
  );
}

export default Header;
