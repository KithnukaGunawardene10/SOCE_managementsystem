import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box
    sx={{
      mt: { xs: 6, sm: 4 },           // More top margin on mobile to avoid overlap with content/bottom nav
      py: { xs: 3, sm: 2 },            // Slightly taller padding on small screens for better touch spacing
      textAlign: 'center',
      backgroundColor: '#f8f9fa',
      borderTop: '1px solid #ddd',
      width: '100%',                   // Ensure full width on all screens
      boxSizing: 'border-box',         // Include padding/border in width calculation
      position: { xs: 'relative', sm: 'relative' }, // Safe positioning
      bottom: 0,
      left: 0,
      right: 0,
      pb: { xs: 'env(safe-area-inset-bottom)', sm: 0 }, // Extra space on notched phones (iPhone/Android)
    }}
  >
    <Typography
      variant="caption"
      color="textSecondary"
      sx={{
        fontSize: { xs: '0.75rem', sm: '0.875rem' }, // Slightly larger text on bigger screens
        display: 'block',
      }}
    >
      Developed by Kithnuka Gunawardene
    </Typography>
  </Box>
);

export default Footer;