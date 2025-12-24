

import Header from './Header';
import Footer from './Footer';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import MinimizeIcon from '@mui/icons-material/Remove'; // Import Minimize Icon
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase'; // Import Firestore configuration
import React, { useState, useEffect } from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
    
    
    MenuItem,

  } from '@mui/material';
  import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
  import Collapse from '@mui/material/Collapse';
  
import {
  Button,
  Grid,
  Typography,
  Box,
  Container,
  Paper,
  Tooltip,
  TextField,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#000000', // Black background
        paper: '#121212', // Slightly lighter for paper components
      },
      text: {
        primary: '#FFFFFF', // White text for readability
        secondary: '#BDBDBD', // Gray text for secondary elements
      },
    },
  });
  
const Test = () => {
  const [bookedSeats, setBookedSeats] = useState({});
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    fetchBookedSeats();

    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []); // Fetch data on component load

  const fetchBookedSeats = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "bookedSeats"));
      const seatsData = {};
      querySnapshot.forEach((doc) => {
        seatsData[doc.id] = doc.data();
      });
      setBookedSeats(seatsData); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching booked seats:", error);
    }
  };

  const [formData, setFormData] = useState({
    dates: [],
    time: '',
    showType: '',
    seats: [],
    batch: '',
    selectedSubjects: [],
  });

  const handleSeatSelection = (seat) => {
    if (bookedSeats.hasOwnProperty(seat)) return; // Prevent selection of booked seats
    const isSelected = formData.seats.includes(seat);
    setFormData({
      ...formData,
      seats: isSelected ? formData.seats.filter((s) => s !== seat) : [...formData.seats, seat],
    });
  };

  const floors = [
    { heading: 'Ground Floor', seats: ['LH 01', 'LH 02', 'IT Training', 'Internet Plaza'], seatCounts: ['104 seats', '82 seats', '24 seats', '18 seats'] },
    { heading: '1st Floor', seats: ['LH 18', 'E-hub'], seatCounts: ['155 seats', '12 seats'] },
    { heading: '2nd Floor', seats: ['Auditorium', 'LH 08', 'LH 10', 'PC 05'], seatCounts: ['272 seats', '116 seats', '84 seats', '51 seats'] },
    { heading: '3rd Floor', seats: ['LH 304', 'LH 20', 'LH 305', 'LH 308', 'LH 302', 'LH 307', 'LH 306'], seatCounts: ['21 seats', '45 seats', '56 seats', '32 seats', '28 seats', '28 seats', '23 seats'] },
    { heading: '4th Floor', seats: ['Harison Hall', 'PC 01', 'PC 03', 'Net Engi lab', 'Eng Lab', 'ICT E Lab'], seatCounts: ['140 seats', '47 seats', '38 seats', '35 seats', '26 seats', '24 seats'] },
  ];

  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <Box sx={{ mb: 4 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                color: 'black',
                textAlign: 'center',
                flex: 1,
              }}
            >
              Today Lectures
            </Typography>
            <Box sx={{ textAlign: 'right' }}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 'bold',
                  color: 'gray',
                }}
              >
                {currentDateTime.toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 'bold',
                  color: 'gray',
                  mt: 1,
                }}
              >
                {currentDateTime.toLocaleTimeString()}
              </Typography>
            </Box>
          </Box>
          <Grid container spacing={2} mt={2} wrap="nowrap" sx={{ overflowX: 'auto' }}>
            {floors.map((floor) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={floor.heading}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'blue' }}>
                  {floor.heading}
                </Typography>
                {floor.seats.map((seat) => {
                  const seatDetails = bookedSeats[seat];
                  const isBooked = Boolean(seatDetails);
                  const isSelected = formData.seats.includes(seat);

                  return (
                    <Paper
                      key={seat}
                      elevation={isSelected ? 3 : 1}
                      onClick={() => handleSeatSelection(seat)}
                      sx={{
                        padding: 2,
                        border: isSelected ? '2px solid blue' : isBooked ? '2px solid black' : '1px solid grey',
                        backgroundColor: isSelected ? 'blue' : isBooked ? 'white' : 'inherit',
                        color: isSelected || isBooked ? 'black' : 'inherit',
                        mb: 1,
                        position: 'relative',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      <Typography variant="h6">{seat}</Typography>
                      {isBooked ? (
                        <>
                          <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'blue' }}>
                            Batch: {seatDetails.batch}
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'orange' }}>
                            Subject: {seatDetails.subject}
                          </Typography>
                          <Typography variant="body2">Lecturer: {seatDetails.lecturer}</Typography>
                          <Typography variant="body2">Time: {seatDetails.Time}</Typography>
                        </>
                      ) : (
                        <Typography variant="body2" color="gray">
                          {/* Available for booking */}
                        </Typography>
                      )}
                    </Paper>
                  );
                })}
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* /// 2nd diagram */}
        <Grid container spacing={2} mt={2}>
  {floors.map((floor) => (
    <Grid container item xs={12} key={floor.heading} spacing={2} alignItems="center">
      <Grid item>
        <Typography
          variant="h6" // Reduced from h5 to h6
          sx={{
            fontWeight: 'bold',
            color: 'blue',
          }}
        >
          {floor.heading}
        </Typography>
      </Grid>
      <Grid item container spacing={1}>
        {floor.seats.map((seat) => {
          const seatDetails = bookedSeats[seat];
          const isBooked = Boolean(seatDetails);
          const isSelected = formData.seats.includes(seat);

          return (
            <Grid item key={seat}>
              <Paper
                elevation={isSelected ? 3 : 1}
                onClick={() => handleSeatSelection(seat)}
                sx={{
                  padding: 2,
                  border: isSelected
                    ? '2px solid blue'
                    : isBooked
                    ? '2px solid black'
                    : '1px solid grey',
                  backgroundColor: isSelected
                    ? 'blue'
                    : isBooked
                    ? 'white'
                    : 'inherit',
                  color: isSelected || isBooked ? 'black' : 'inherit',
                  position: 'relative',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                <Typography variant="subtitle1">{seat}</Typography> {/* Reduced heading size */}
                {isBooked ? (
                  <>
                    <Typography
                      variant="body2" // Reduced description size
                      sx={{ fontWeight: 'bold', color: 'blue' }}
                    >
                      Batch: {seatDetails.batch}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography
                        variant="body2" // Subject and Time in the same row
                        sx={{ fontWeight: 'bold', color: 'orange', marginRight: 1 }}
                      >
                        Subject: {seatDetails.subject}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'green' }}>
                        Time: {seatDetails.Time}
                      </Typography>
                    </Box>
                    <Typography variant="caption"> {/* Further reduced for lecturer */}
                      Lecturer: {seatDetails.lecturer}
                    </Typography>
                  </>
                ) : (
                  <Typography variant="caption" color="gray">
                    {/* Available for booking */}
                  </Typography>
                )}
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  ))}
</Grid>
<Grid
  container
  spacing={1}
  mt={1}
  sx={{
    backgroundColor: '#121212', // Dark background
    minHeight: '100vh',
    padding: 2, // Maintain padding around the entire grid
  }}
>
  {floors.map((floor) => (
    <Grid
      container
      item
      xs={12}
      key={floor.heading}
      spacing={1} // Maintain spacing between elements inside each floor
      alignItems="center"
      sx={{
        mb: 0.5, // Reduced vertical space between rows of floors
      }}
    >
      <Grid item>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            color: '#90caf9', // Accent blue for floor headings
          }}
        >
          {floor.heading}
        </Typography>
      </Grid>
      <Grid item container spacing={1}> {/* Maintain spacing between heading and buttons */}
        {floor.seats.map((seat) => {
          const seatDetails = bookedSeats[seat];
          const isBooked = Boolean(seatDetails);
          const isSelected = formData.seats.includes(seat);

          return (
            <Grid item key={seat}>
              <Paper
                elevation={isSelected ? 4 : 2}
                onClick={() => handleSeatSelection(seat)}
                sx={{
                  padding: 1, // Compact padding inside buttons
                  border: isSelected
                    ? '2px solid #90caf9' // Highlight for selected
                    : isBooked
                    ? '1px solid #616161' // Light border for booked
                    : '1px solid #424242', // Default border
                  backgroundColor: isSelected
                    ? '#1e88e5' // Bright blue for selected
                    : isBooked
                    ? '#212121' // Slightly lighter dark for booked
                    : '#1E1E1E', // Default card color
                  color: isSelected || isBooked ? '#FFFFFF' : '#BDBDBD',
                  position: 'relative',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  boxShadow: isSelected ? '0 4px 10px rgba(0, 0, 0, 0.5)' : 'none', // Subtle shadow for selected
                }}
              >
                <Typography variant="subtitle2" sx={{ color: '#FFFFFF' }}>
                  {seat}
                </Typography>
                {isBooked ? (
                  <>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 'bold',
                        color: '#90caf9', // Accent blue
                      }}
                    >
                      Batch: {seatDetails.batch}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 'bold',
                          color: '#FFB74D', // Accent orange
                          marginRight: 1,
                        }}
                      >
                        Subject: {seatDetails.subject}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 'bold',
                          color: '#66BB6A', // Accent green
                        }}
                      >
                        Time: {seatDetails.Time}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#FFFFFF',
                      }}
                    >
                      Lecturer: {seatDetails.lecturer}
                    </Typography>
                  </>
                ) : (
                  <Typography variant="caption" color="#BDBDBD">
                    {/* Available for booking */}
                  </Typography>
                )}
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  ))}
</Grid>


{/* ///////////////// 3rd diagram  */}
<Box sx={{ mb: 4 }}>
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      mb: 2,
    }}
  >
    <Typography
      variant="h3" // Increased from h4 to h3
      sx={{
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        flex: 1,
      }}
    >
      Today Lectures
    </Typography>
    <Box sx={{ textAlign: 'right' }}>
      <Typography
        variant="h6" // Increased from body1 to h6
        sx={{
          fontWeight: 'bold',
          color: 'gray',
        }}
      >
        {currentDateTime.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </Typography>
      <Typography
        variant="body1" // Increased from body2 to body1
        sx={{
          fontWeight: 'bold',
          color: 'gray',
          mt: 1,
        }}
      >
        {currentDateTime.toLocaleTimeString()}
      </Typography>
    </Box>
  </Box>
  <Grid container spacing={2} mt={2} wrap="nowrap" sx={{ overflowX: 'auto' }}>
    {floors.map((floor) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={floor.heading}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'blue' }}>
          {floor.heading}
        </Typography>
        {floor.seats.map((seat) => {
          const seatDetails = bookedSeats[seat];
          const isBooked = Boolean(seatDetails);
          const isSelected = formData.seats.includes(seat);

          return (
            <Paper
              key={seat}
              elevation={isSelected ? 3 : 1}
              onClick={() => handleSeatSelection(seat)}
              sx={{
                padding: 1,
                border: isSelected
                  ? '2px solid blue'
                  : isBooked
                  ? '2px solid black'
                  : '1px solid grey',
                backgroundColor: isSelected ? 'blue' : isBooked ? 'white' : 'inherit',
                color: isSelected || isBooked ? 'black' : 'inherit',
                mb: 1,
                position: 'relative',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              <Typography variant="h6">{seat}</Typography> {/* Increased from subtitle1 to h6 */}
              {isBooked ? (
                <>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'blue' }}>
                    Batch: {seatDetails.batch}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      variant="body1" // Increased from body2 to body1
                      sx={{ fontWeight: 'bold', color: 'orange', marginRight: 1 }}
                    >
                      Subject: {seatDetails.subject}
                    </Typography>
                    <Typography
                      variant="body1" // Increased from body2 to body1
                      sx={{ fontWeight: 'bold', color: 'green' }}
                    >
                      Time: {seatDetails.Time}
                    </Typography>
                  </Box>
                  <Typography variant="body1"> {/* Increased from body2 */}
                    Lecturer: {seatDetails.lecturer}
                  </Typography>
                </>
              ) : (
                <Typography variant="body1" color="gray">
                  {/* Available for booking */}
                </Typography>
              )}
            </Paper>
          );
        })}
      </Grid>
    ))}
  </Grid>
</Box>



      </Container>
      <Footer />
    </>
  );
};

export default Test;