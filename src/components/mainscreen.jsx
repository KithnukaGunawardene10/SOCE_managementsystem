// MainScreen.jsx (Updated for full responsiveness and mobile left-alignment)

import React, { useState, useEffect, useMemo } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import Header from './Header';
import Footer from './Footer';
import { Grid, Typography, Paper, Box, Container } from '@mui/material';
import { format } from "date-fns";

const MainScreen = () => {
  const [bookedSeats, setBookedSeats] = useState({});
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Reordered floors
  const floors = [
    { heading: '4th Floor', seats: ['Harison Hall', 'PC 01', 'PC 03', 'Net Engi lab', 'Eng Lab', 'ICT E Lab'] },
    { heading: '3rd Floor', seats: ['LH 20', 'LH 301', 'LH 302', 'LH 303', 'LH 304', 'LH 305', 'LH 306', 'LH 307', 'LH 308'] },
    { heading: '2nd Floor', seats: ['Auditorium', 'LH 03', 'LH 04', 'LH 05', 'LH 06', 'LH 07', 'LH 08', 'LH 10', 'PC 05'] },
    { heading: '1st Floor', seats: ['LH 18', 'LH 17'] },
    { heading: 'Ground Floor', seats: ['LH 01', 'LH 02', 'IT Training', 'Internet Plaza'] },
  ];

  const getTodayDate = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  };

  const getCurrentTime = () => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  };

  const fetchBookedSeats = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "bookedSeats"));
      const seatsData = {};
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        seatsData[doc.id] = {
          ...data,
          Time: data.Time?.trim() || '',
        };
      });
      setBookedSeats(seatsData);
    } catch (error) {
      console.error("Error fetching booked seats:", error);
    }
  };

  const filteredSeats = useMemo(() => {
    const today = getTodayDate();
    const currentTime = getCurrentTime();
    return Object.keys(bookedSeats).reduce((acc, seat) => {
      const seatData = bookedSeats[seat];
      if (seatData.date === today && (seatData.Time === "Full Day" || seatData.Time >= currentTime)) {
        acc[seat] = seatData;
      }
      return acc;
    }, {});
  }, [bookedSeats]);

  useEffect(() => {
    fetchBookedSeats();
    const refreshInterval = setInterval(fetchBookedSeats, 30 * 1000);
    const clockInterval = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => {
      clearInterval(refreshInterval);
      clearInterval(clockInterval);
    };
  }, []);

  const formatDate = (date) => {
    const day = format(date, "d");
    const suffix = ["th", "st", "nd", "rd"][
      day % 10 > 3 || [11, 12, 13].includes(day % 100) ? 0 : day % 10
    ];
    const dayWithSuffix = day + suffix;
    return `${dayWithSuffix} ${format(date, "EEEE, MMMM, yyyy")}`;
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          width: "100vw",
          bgcolor: "#121212",
          color: "white",
          py: 1.2,
          px: { xs: 2, md: 4 },
          display: "flex",
          justifyContent: { xs: "center", md: "flex-end" },
          alignItems: "center",
          fontWeight: "bold",
          fontSize: { xs: "0.9rem", sm: "1rem" },
          boxShadow: 2,
        }}
      >
        <Typography variant="body1">
          {formatDate(currentDateTime)} | {currentDateTime.toLocaleTimeString()}
        </Typography>
      </Box>

      <Box
        sx={{
          minHeight: "calc(100vh - 128px)",
          bgcolor: "#121212",
          py: { xs: 2, md: 4 },
          overflowY: "auto",
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
          <Grid container spacing={4}>
            {floors.map((floor) => (
              <Grid item xs={12} key={floor.heading}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    color: "#90caf9",
                    fontWeight: "bold",
                    mb: 3,
                    textAlign: { xs: "left", sm: "left" }, // Always left-aligned (including mobile)
                  }}
                >
                  {floor.heading}
                </Typography>
                <Grid container spacing={2} justifyContent="flex-start"> {/* Left-aligned cards */}
                  {floor.seats.map((seat) => {
                    const seatDetails = filteredSeats[seat];
                    const isBooked = Boolean(seatDetails);
                    return (
                      <Grid
                        item
                        key={seat}
                        xs={12}     // Full width on very small screens
                        sm={6}      // 2 columns on small tablets
                        md={4}      // 3 columns on medium
                        lg={3}      // 4 columns on large
                        xl={3}      // 4 columns on extra large (adjusted for better fit)
                      >
                        <Paper
                          elevation={isBooked ? 8 : 3}
                          sx={{
                            p: { xs: 2, sm: 2.5 },
                            border: isBooked ? "2px solid #616161" : "1px solid #424242",
                            bgcolor: isBooked ? "#212121" : "#1E1E1E",
                            color: isBooked ? "#FFFFFF" : "#BDBDBD",
                            borderRadius: 2,
                            boxShadow: isBooked ? "0 8px 20px rgba(0, 0, 0, 0.6)" : "none",
                            transition: "transform 0.2s, box-shadow 0.2s",
                            '&:hover': {
                              transform: isBooked ? "translateY(-4px)" : "none",
                              boxShadow: isBooked ? "0 12px 30px rgba(0, 0, 0, 0.7)" : "none",
                            },
                            textAlign: "center",
                            minHeight: { xs: 140, sm: 160 },
                          }}
                        >
                          <Typography variant="h6" sx={{ color: "#FFFFFF", mb: 1.5 }}>
                            {seat}
                          </Typography>
                          {isBooked ? (
                            <>
                              <Typography variant="body2" sx={{ fontWeight: "bold", color: "#90caf9" }}>
                                Batch: {seatDetails.batch}
                              </Typography>
                              <Typography variant="body2" sx={{ color: "#FFB74D", mt: 0.5 }}>
                                Subject: {seatDetails.subject}
                              </Typography>
                              <Typography variant="body2" sx={{ color: "#66BB6A", mt: 0.5 }}>
                                Time: {seatDetails.Time}
                              </Typography>
                              <Typography variant="body2" sx={{ color: "#FFFFFF", mt: 1, fontSize: "0.9rem" }}>
                                Lecturer: {seatDetails.lecturer}
                              </Typography>
                            </>
                          ) : (
                            <Typography variant="body2" color="#66BB6A" sx={{ mt: 4 }}>
                              Available
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
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default MainScreen;