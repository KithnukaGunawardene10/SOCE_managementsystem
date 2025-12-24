import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box
    sx={{
      mt: 4,
      py: 2,
      textAlign: 'center',
      backgroundColor: '#f8f9fa',
      borderTop: '1px solid #ddd',
    }}
  >
    <Typography variant="caption" color="textSecondary">
      Developed by Kithnuka Gunawardene
    </Typography>
  </Box>
);

export default Footer;
