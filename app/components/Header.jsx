import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#3f51b5', padding: '0.5rem 0' }}>
      <Toolbar>
        {/* Home Icon */}
        <IconButton edge="start" color="inherit" aria-label="home">
          <Link href="/" passHref>
            <HomeIcon sx={{ color: '#fff' }} />
          </Link>
        </IconButton>

        {/* Links Container */}
        <Box sx={{ display: 'flex', gap: '1rem', ml: 2 }}>
          <Typography variant="h6">
            <Link href="/playlists" passHref>
              <Typography component="span" sx={{ color: '#fff', cursor: 'pointer' }}>
                Playlists
              </Typography>
            </Link>
          </Typography>
          <Typography variant="h6">
            <Link href="/artists" passHref>
              <Typography component="span" sx={{ color: '#fff', cursor: 'pointer' }}>
                Artists
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;