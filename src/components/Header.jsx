// Header.jsx
import React, { useRef } from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../nibm.png'; // Make sure the path is correct

const Header = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null); // Kept if you plan to use it later

  return (
    <AppBar
      position="static"
      color="primary"
      sx={{
        width: '100vw', // Full viewport width
        left: 0,
        right: 0,
        boxShadow: 3,
        bgcolor: 'primary.main',
      }}
    >
      <Toolbar
        sx={{
          width: '100%',
          maxWidth: '100%',
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 4 }, // Responsive padding
          py: 1,
          minHeight: { xs: 64, sm: 70 }, // Slightly taller on mobile
          justifyContent: 'space-between',
          flexWrap: 'nowrap', // Prevent unwanted wrapping
        }}
      >
        {/* Left: Logo + Title - Clickable */}
        <Box
          onClick={() => navigate('/')}
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            flexGrow: { xs: 1, sm: 0 }, // Takes available space on mobile
          }}
        >
          {/* Logo Container */}
          <Box
            sx={{
              width: { xs: 120, sm: 160, md: 190 }, // Slightly smaller on very small screens
              height: { xs: 36, sm: 44, md: 50 },
              borderRadius: '4px',
              overflow: 'hidden',
              backgroundColor: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mr: { xs: 1.5, sm: 2 },
              boxShadow: 1,
              flexShrink: 0, // Prevent logo from shrinking too much
            }}
          >
            <img
              src={logo}
              alt="NIBM Logo"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                padding: '4px',
              }}
            />
          </Box>

          {/* Full Title - Visible on sm and up */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 'bold',
              color: 'white',
              fontSize: { xs: '0.95rem', sm: '1.1rem', md: '1.25rem' },
              whiteSpace: 'nowrap',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            SOCE Lecture Hall Reservation System
          </Typography>

          {/* Short Mobile Title - Only on xs */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: 'white',
              fontSize: { xs: '0.85rem', sm: '0.95rem' },
              whiteSpace: 'nowrap',
              display: { xs: 'block', sm: 'none' },
            }}
          >
            SOCE Hall Reservation
          </Typography>
        </Box>

        {/* Right: Login / Sign Up Buttons */}
        <Box
          sx={{
            display: 'flex',
            gap: { xs: 1, sm: 2 },
            flexShrink: 0, // Prevent buttons from shrinking
          }}
        >
          <Button
            variant="outlined"
            color="inherit"
            sx={{
              borderColor: 'white',
              color: 'white',
              '&:hover': {
                borderColor: 'white',
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              },
              textTransform: 'none',
              fontWeight: 'medium',
              fontSize: { xs: '0.85rem', sm: '0.9rem' },
              px: { xs: 2, sm: 3 },
              py: { xs: 0.8, sm: 1 },
            }}
            onClick={() => navigate('/login')}
          >
            Log In
          </Button>

          <Button
            variant="contained"
            color="secondary"
            sx={{
              textTransform: 'none',
              fontWeight: 'medium',
              px: { xs: 2.5, sm: 3 },
              py: { xs: 0.8, sm: 1 },
              fontSize: { xs: '0.85rem', sm: '0.9rem' },
            }}
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;