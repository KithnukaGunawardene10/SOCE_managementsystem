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
        width: '100vw',           // Full viewport width
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
              width: { xs: 140, sm: 180, md: 190 },
              height: { xs: 40, sm: 48, md: 50 },
              borderRadius: '4px',
              overflow: 'hidden',
              backgroundColor: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mr: { xs: 1.5, sm: 2 },
              boxShadow: 1,
            }}
          >
            <img
              src={logo}
              alt="NIBM Logo"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain', // Better than 'cover' for logos
                padding: '4px',
              }}
            />
          </Box>

          {/* Title - Hidden on very small screens if needed */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 'bold',
              color: 'white',
              fontSize: { xs: '0.95rem', sm: '1.1rem', md: '1.25rem' },
              whiteSpace: 'nowrap',
              display: { xs: 'none', sm: 'block' }, // Hide text on xs screens if too cramped
            }}
          >
            SOCE Lecture Hall Reservation System
          </Typography>

          {/* Mobile-friendly short title */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: 'white',
              fontSize: '0.9rem',
              display: { xs: 'block', sm: 'none' },
            }}
          >
            SOCE Hall Reservation
          </Typography>
        </Box>

        {/* Right: Login / Sign Up Buttons */}
        <Box sx={{ display: 'flex', gap: 2 }}>
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
              px: 3,
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