// import React, { useState, useEffect } from 'react';
// import { useLocation } from "react-router-dom";

// import {
//   Container,
//   Typography,
//   Grid,
//   Paper,
//   Box,
//   Button,
// } from '@mui/material';
// import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
// import { db } from '../firebase';
// import Header from './Header';
// import Footer from './Footer';

// const Programingofficer = () => {
//   const [bookedSeats, setBookedSeats] = useState({});
//   const [selectedSeats, setSelectedSeats] = useState([]);

//   const location = useLocation();
//   const { name } = location.state || { name: "Guest" }; // Fallback to "Guest" if name is undefined

//   console.log("Received Name:", name); // Debugging: Ensure name is received

//   const fetchBookedSeats = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, "bookedSeats"));
//       const seatsData = {};
//       querySnapshot.forEach((doc) => {
//         seatsData[doc.id] = doc.data(); // Map seat IDs to their data
//       });
//       setBookedSeats(seatsData);
//     } catch (error) {
//       console.error("Error fetching booked seats:", error);
//     }
//   };

//   useEffect(() => {
//     fetchBookedSeats();
//   }, []);

//   const handleSeatSelection = (seat) => {
//     if (selectedSeats.includes(seat)) {
//       setSelectedSeats(selectedSeats.filter((s) => s !== seat));
//     } else if (selectedSeats.length < 2) {
//       setSelectedSeats([...selectedSeats, seat]);
//     }
//   };

//   const handleSwitch = async () => {
//     if (selectedSeats.length === 2) {
//       const [seat1, seat2] = selectedSeats;
  
//       const data1 = bookedSeats[seat1] || {}; // Handle non-booked seat
//       const data2 = bookedSeats[seat2] || {}; // Handle non-booked seat
  
//       try {
//         // Get document references
//         const docRef1 = doc(db, "bookedSeats", seat1);
//         const docRef2 = doc(db, "bookedSeats", seat2);
  
//         // Update documents in Firestore
//         if (Object.keys(data1).length > 0) {
//           // If seat1 is booked, update Firestore for seat2
//           await updateDoc(docRef2, data1);
//         } else {
//           // If seat1 is not booked, delete seat2's data
//           await updateDoc(docRef2, {});
//         }
  
//         if (Object.keys(data2).length > 0) {
//           // If seat2 is booked, update Firestore for seat1
//           await updateDoc(docRef1, data2);
//         } else {
//           // If seat2 is not booked, delete seat1's data
//           await updateDoc(docRef1, {});
//         }
  
//         // Update local state
//         setBookedSeats({
//           ...bookedSeats,
//           [seat1]: data2,
//           [seat2]: data1,
//         });
  
//         setSelectedSeats([]);
//         alert('Switched successfully!');
//       } catch (error) {
//         console.error("Error switching seats:", error);
//       }
//     } else {
//       alert("Please select exactly two seats to switch.");
//     }
//   };
  
//   const floors = [
//     { heading: 'Ground Floor', seats: ['LH 01', 'LH 02', 'IT Training', 'Internet Plaza'], seatCounts: ['104 seats', '82 seats', '24 seats', '18 seats'] },
//     { heading: '1st Floor', seats: ['LH 18', 'E-hub'], seatCounts: ['155 seats', '12 seats'] },
//     { heading: '2nd Floor', seats: ['Auditorium', 'LH 08', 'LH 10', 'PC 05'], seatCounts: ['272 seats', '116 seats', '84 seats', '51 seats'] },
//     { heading: '3rd Floor', seats: ['LH 304', 'LH 20', 'LH 305', 'LH 308', 'LH 302', 'LH 307', 'LH 306'], seatCounts: ['21 seats', '45 seats', '56 seats', '32 seats', '28 seats', '28 seats', '23 seats'] },
//     { heading: '4th Floor', seats: ['Harison Hall', 'PC 01', 'PC 03', 'Net Engi lab', 'Eng Lab', 'ICT E Lab'], seatCounts: ['140 seats', '47 seats', '38 seats', '35 seats', '26 seats', '24 seats'] },
//   ];

//    return (
//     <>
      
//       <Header />
//       <Container>
//         <div style={{ margin: "20px 0", textAlign: "center" }}>
//           <h1 style={{ fontSize: "2rem" }}>Hi {name}!</h1>
//         </div>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          
//           <Button variant="contained" color="primary" onClick={handleSwitch}>
//             Switch
//           </Button>
//         </Box>
//         <Grid container spacing={2} mt={2} wrap="nowrap" sx={{ overflowX: 'auto' }}>
//           {floors.map((floor) => (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={floor.heading}>
//               <Typography variant="h5">{floor.heading}</Typography>
//               {floor.seats.map((seat) => {
//                 const seatDetails = bookedSeats[seat];
//                 const isSelected = selectedSeats.includes(seat);
//                 const isBooked = Boolean(seatDetails);

//                 return (
//                   <Paper
//                     key={seat}
//                     elevation={isSelected ? 3 : 1}
//                     onClick={() => handleSeatSelection(seat)}
//                     sx={{
//                       padding: 2,
//                       cursor: 'pointer',
//                       border: isSelected ? '2px solid blue' : isBooked ? '2px solid black' : '1px solid grey',
//                       backgroundColor: isSelected ? 'blue' : isBooked ? 'black' : 'inherit',
//                       color: isSelected || isBooked ? 'white' : 'inherit',
//                       mb: 1,
//                     }}
//                   >
//                     <Typography variant="h6">{seat}</Typography>
//                     {isBooked ? (
//                       <Box>
//                         <Typography variant="body2">Batch: {seatDetails.batch}</Typography>
//                         <Typography variant="body2">Lecture: {seatDetails.lecture}</Typography>
//                         <Typography variant="body2">Lecturer: {seatDetails.lecturer}</Typography>
//                         <Typography variant="body2">Time: {seatDetails.time}</Typography>
//                       </Box>
//                     ) : (
//                       <Typography variant="body2" color="gray">
//                         Available for booking
//                       </Typography>
//                     )}
//                   </Paper>
//                 );
//               })}
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//       <Footer />
//       <Footer />
//     </>
//   );
// };

// export default Programingofficer;

// import React, { useState, useEffect } from 'react';
// import { useLocation } from "react-router-dom";
// import {
//   Container,
//   Typography,
//   Grid,
//   Paper,
//   Box,
//   Button,
//   IconButton,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
// import { db } from '../firebase';
// import Header from './Header';
// import Footer from './Footer';

// const Programingofficer = () => {
//   const [bookedSeats, setBookedSeats] = useState({});
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [editSeat, setEditSeat] = useState(null);
//   const [editData, setEditData] = useState({});
//   const [dialogOpen, setDialogOpen] = useState(false);

//   const location = useLocation();
//   const { name } = location.state || { name: "Guest" };

//   const fetchBookedSeats = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, "bookedSeats"));
//       const seatsData = {};
//       querySnapshot.forEach((doc) => {
//         seatsData[doc.id] = doc.data();
//       });
//       setBookedSeats(seatsData);
//     } catch (error) {
//       console.error("Error fetching booked seats:", error);
//     }
//   };

//   useEffect(() => {
//     fetchBookedSeats();
//   }, []);

//   const handleSeatSelection = (seat) => {
//     if (selectedSeats.includes(seat)) {
//       setSelectedSeats(selectedSeats.filter((s) => s !== seat));
//     } else if (selectedSeats.length < 2) {
//       setSelectedSeats([...selectedSeats, seat]);
//     }
//   };

//   const handleSwitch = async () => {
//     if (selectedSeats.length === 2) {
//       const [seat1, seat2] = selectedSeats;

//       const data1 = bookedSeats[seat1] || {};
//       const data2 = bookedSeats[seat2] || {};

//       try {
//         const docRef1 = doc(db, "bookedSeats", seat1);
//         const docRef2 = doc(db, "bookedSeats", seat2);

//         if (Object.keys(data1).length > 0) {
//           await updateDoc(docRef2, data1);
//         } else {
//           await updateDoc(docRef2, {});
//         }

//         if (Object.keys(data2).length > 0) {
//           await updateDoc(docRef1, data2);
//         } else {
//           await updateDoc(docRef1, {});
//         }

//         setBookedSeats({
//           ...bookedSeats,
//           [seat1]: data2,
//           [seat2]: data1,
//         });

//         setSelectedSeats([]);
//         alert('Switched successfully!');
//       } catch (error) {
//         console.error("Error switching seats:", error);
//       }
//     } else {
//       alert("Please select exactly two seats to switch.");
//     }
//   };

//   const handleEdit = (seat) => {
//     setEditSeat(seat);
//     setEditData(bookedSeats[seat] || {});
//     setDialogOpen(true);
//   };

//   const handleDialogClose = () => {
//     setDialogOpen(false);
//     setEditSeat(null);
//     setEditData({});
//   };

//   const handleSave = async () => {
//     if (editSeat) {
//       try {
//         const updatedData = {
//           ...bookedSeats,
//           [editSeat]: editData, // Update the data for the edited seat
//         };
  
//         // Update the Firestore collection with the updated data for the relevant hall
//         const docRef = doc(db, "bookedSeats", editSeat);
//         await updateDoc(docRef, editData);
  
//         setBookedSeats(updatedData); // Update local state
//         alert('Updated successfully!');
//         handleDialogClose(); // Close the dialog
//       } catch (error) {
//         console.error("Error saving seat details:", error);
//         alert("Failed to save seat details. Please try again.");
//       }
//     }
//   };
  

//   const floors = [
//     { heading: 'Ground Floor', seats: ['LH 01', 'LH 02', 'IT Training', 'Internet Plaza'], seatCounts: ['104 seats', '82 seats', '24 seats', '18 seats'] },
//     { heading: '1st Floor', seats: ['LH 18', 'E-hub'], seatCounts: ['155 seats', '12 seats'] },
//     { heading: '2nd Floor', seats: ['Auditorium', 'LH 08', 'LH 10', 'PC 05'], seatCounts: ['272 seats', '116 seats', '84 seats', '51 seats'] },
//     { heading: '3rd Floor', seats: ['LH 304', 'LH 20', 'LH 305', 'LH 308', 'LH 302', 'LH 307', 'LH 306'], seatCounts: ['21 seats', '45 seats', '56 seats', '32 seats', '28 seats', '28 seats', '23 seats'] },
//     { heading: '4th Floor', seats: ['Harison Hall', 'PC 01', 'PC 03', 'Net Engi lab', 'Eng Lab', 'ICT E Lab'], seatCounts: ['140 seats', '47 seats', '38 seats', '35 seats', '26 seats', '24 seats'] },
//   ];
//   const LectureDateSection = () => {
//     const [currentMonthDates, setCurrentMonthDates] = useState([]); // Selected dates in the current month
//     const [nextMonthDates, setNextMonthDates] = useState([]); // Selected dates in the next month
//     const [datesSelected, setDatesSelected] = useState(false); // To track if any dates are selected
//     const [currentMonth, setCurrentMonth] = useState('');
//     const [nextMonth, setNextMonth] = useState('');
//     const [nextMonthVisible, setNextMonthVisible] = useState(false); // Toggle visibility of the next month
  
//     // Update current and next month names
//     useEffect(() => {
//       const updateMonths = () => {
//         const now = new Date();
//         const currentMonthName = now.toLocaleString('default', { month: 'long' });
//         const nextMonthName = new Date(now.getFullYear(), now.getMonth() + 1).toLocaleString('default', { month: 'long' });
  
//         setCurrentMonth(currentMonthName);
//         setNextMonth(nextMonthName);
//       };
  
//       updateMonths(); // Initial setup
  
//       const intervalId = setInterval(updateMonths, 1000 * 60 * 60); // Update every hour
  
//       return () => clearInterval(intervalId); // Clean up interval on component unmount
//     }, []);
  
//     // Handle date selection for the current month
//     const handleCurrentMonthSelectionChange = (day) => {
//       const selectedDay = `${new Date().getFullYear()}-${String(
//         new Date().getMonth() + 1
//       ).padStart(2, "0")}-${day}`;
  
//       setCurrentMonthDates((prevDates) => {
//         const newDates = prevDates.includes(selectedDay)
//           ? prevDates.filter((date) => date !== selectedDay) // Remove if already selected
//           : [...prevDates, selectedDay]; // Add if not selected
//         setDatesSelected(newDates.length > 0); // Track selection state
//         return newDates;
//       });
//     };
  
//     // Handle date selection for the next month
//     const handleNextMonthSelectionChange = (day) => {
//       const selectedDay = `${new Date().getFullYear()}-${String(
//         new Date().getMonth() + 2
//       ).padStart(2, "0")}-${day}`;
  
//       setNextMonthDates((prevDates) => {
//         const newDates = prevDates.includes(selectedDay)
//           ? prevDates.filter((date) => date !== selectedDay) // Remove if already selected
//           : [...prevDates, selectedDay]; // Add if not selected
//         setDatesSelected(newDates.length > 0); // Track selection state
//         return newDates;
//       });
//     };

//   return (
//     <>
//       <Header />
//       <Container>
//         <div style={{ margin: "20px 0", textAlign: "center" }}>
//           <h1 style={{ fontSize: "2rem" }}>Hi {name}!</h1>
//         </div>
//         <Box>
//       {/* Current Month Section */}
//       <Typography variant="h4" mt={2}>
//         Lecture Date
//       </Typography>
//       <Typography variant="h5" mt={2}>
//         {currentMonth}
//       </Typography>
//       <Grid container spacing={1} mt={2} wrap="nowrap" sx={{ overflowX: "auto" }}>
//         {Array.from({ length: 31 }, (_, index) => {
//           const day = String(index + 1).padStart(2, "0");
//           const date = new Date(new Date().getFullYear(), new Date().getMonth(), index + 1);
//           const dayOfWeek = date.toLocaleString("default", { weekday: "short" }); // Get short weekday name

//           return (
//             <Grid item key={day}>
//               <Box>
//                 <Typography
//                   variant="caption"
//                   sx={{
//                     display: "block",
//                     textAlign: "center",
//                     width: "100%",
//                     marginBottom: "4px",
//                   }}
//                 >
//                   {dayOfWeek}
//                 </Typography>
//                 <Button
//                   variant={currentMonthDates.includes(
//                     `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${day}`
//                   )
//                     ? "contained"
//                     : "outlined"}
//                   onClick={() => handleCurrentMonthSelectionChange(day)}
//                   sx={{ width: "60px" }}
//                 >
//                   {day}
//                 </Button>
//               </Box>
//             </Grid>
//           );
//         })}
//       </Grid>

      

    
//     </Box>
  
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
//           <Button variant="contained" color="primary" onClick={handleSwitch}>
//             Switch
//           </Button>
//         </Box>
//         <Grid container spacing={2} mt={2} wrap="nowrap" sx={{ overflowX: 'auto' }}>
//           {floors.map((floor) => (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={floor.heading}>
//               <Typography variant="h5">{floor.heading}</Typography>
//               {floor.seats.map((seat) => {
//                 const seatDetails = bookedSeats[seat];
//                 const isSelected = selectedSeats.includes(seat);
//                 const isBooked = Boolean(seatDetails);

//                 return (
//                   <Paper
//                     key={seat}
//                     elevation={isSelected ? 3 : 1}
//                     onClick={() => handleSeatSelection(seat)}
//                     sx={{
//                       padding: 2,
//                       cursor: 'pointer',
//                       border: isSelected ? '2px solid blue' : isBooked ? '2px solid black' : '1px solid grey',
//                       backgroundColor: isSelected ? 'blue' : isBooked ? 'black' : 'inherit',
//                       color: isSelected || isBooked ? 'white' : 'inherit',
//                       mb: 1,
//                       position: 'relative',
//                     }}
//                   >
//                     <Typography variant="h6">{seat}</Typography>
//                     {isBooked ? (
//                       <Box>
//                         <Typography variant="body2">Batch: {seatDetails.batch}</Typography>
//                         <Typography variant="body2">Lecture: {seatDetails.lecture}</Typography>
//                         <Typography variant="body2">Lecturer: {seatDetails.lecturer}</Typography>
//                         <Typography variant="body2">Time: {seatDetails.time}</Typography>
//                       </Box>
//                     ) : (
//                       <Typography variant="body2" color="gray">
//                         Available for booking
//                       </Typography>
//                     )}
//                     <IconButton
//                       sx={{ position: 'absolute', top: 8, right: 8 }}
//                       onClick={() => handleEdit(seat)}
//                     >
//                       <EditIcon />
//                     </IconButton>
//                   </Paper>
//                 );
//               })}
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//       <Dialog open={dialogOpen} onClose={handleDialogClose}>
//         <DialogTitle>Edit Seat Details</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Batch"
//             fullWidth
//             value={editData.batch || ''}
//             onChange={(e) => setEditData({ ...editData, batch: e.target.value })}
//             margin="dense"
//           />
//           <TextField
//             label="Lecture"
//             fullWidth
//             value={editData.lecture || ''}
//             onChange={(e) => setEditData({ ...editData, lecture: e.target.value })}
//             margin="dense"
//           />
//           <TextField
//             label="Lecturer"
//             fullWidth
//             value={editData.lecturer || ''}
//             onChange={(e) => setEditData({ ...editData, lecturer: e.target.value })}
//             margin="dense"
//           />
//           <TextField
//             label="Time"
//             fullWidth
//             value={editData.time || ''}
//             onChange={(e) => setEditData({ ...editData, time: e.target.value })}
//             margin="dense"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleDialogClose} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleSave} color="primary">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//       <Footer />
//     </>
//   );
// };

// export default Programingofficer;

// import React, { useState, useEffect } from 'react';
// import { useLocation } from "react-router-dom";
// import {
//   Container,
//   Typography,
//   Grid,
//   Paper,
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from '@mui/material';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from "@mui/material";
// import { onSnapshot, collection, getDocs, doc, setDoc, addDoc } from "firebase/firestore";
// import { db } from '../firebase';
// import Header from './Header';
// import Footer from './Footer';

// const Programingofficer = () => {
//   const [courseSecretaries, setCourseSecretaries] = useState([]);
//   const [selectedCourseSecretary, setSelectedCourseSecretary] = useState("");
//   const [addSecretaryDialogOpen, setAddSecretaryDialogOpen] = useState(false);
//   const [newCourseSecretary, setNewCourseSecretary] = useState("");
//   const [bookedSeats, setBookedSeats] = useState({});
//   const [filteredSeats, setFilteredSeats] = useState({});
//   const [currentMonthDates, setCurrentMonthDates] = useState([]);
//   const [nextMonthDates, setNextMonthDates] = useState([]);
//   const [currentMonth, setCurrentMonth] = useState('');
//   const [nextMonth, setNextMonth] = useState('');
//   const [addCourseDialogOpen, setAddCourseDialogOpen] = useState(false);
//   const [newCourseName, setNewCourseName] = useState("");
//   const location = useLocation();
//   const { name } = location.state || { name: "Guest" };
//   const [batchCountData, setBatchCountData] = useState(null);
//   const [selectedBatch, setSelectedBatch] = useState("");
//   const [bookedHalls, setBookedHalls] = useState([]);

//   const [courses, setCourses] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState("");
//   const [batchCode, setBatchCode] = useState("");
//   const [batchCount, setBatchCount] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [courseDirectors, setCourseDirectors] = useState([]);
//   const [selectedCourseDirector, setSelectedCourseDirector] = useState("");
//   const [addDirectorDialogOpen, setAddDirectorDialogOpen] = useState(false);
//   const [newCourseDirector, setNewCourseDirector] = useState("");

//   const [data, setData] = useState([]);
//   const [openPopup, setOpenPopup] = useState(false);
//   const [addSessionPopup, setAddSessionPopup] = useState(false);
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [selectedHall, setSelectedHall] = useState("");
//   const [newSession, setNewSession] = useState({
//     batch: "",
//     combinedbatch: "",
//     courseDirector: "",
//     date: "",
//     Time: "",
//     subject: "",
//     lecturer: "",
//     SessionType: "",
//     status: "Not Booked",
//     hall: "",
//   });

//   const floors = [
//     {
//       heading: 'Ground Floor',
//       seats: ['LH 01', 'LH 02', 'IT Training', 'Seminar Room', 'Internet Plaza'],
//       seatCounts: { 'LH 01': 104, 'LH 02': 82, 'IT Training': 24, 'Seminar Room': 40, 'Internet Plaza': 18 },
//     },
//     {
//       heading: '1st Floor',
//       seats: ['LH 18', 'LH 17', 'E-hub'],
//       seatCounts: { 'LH 18': 155, 'LH 17': 70, 'E-hub': 12 },
//     },
//     {
//       heading: '2nd Floor',
//       seats: ['Auditorium', 'LH 03', 'LH 04', 'LH 05', 'LH 06', 'LH 07', 'LH 08', 'LH 10', 'PC 05'],
//       seatCounts: {
//         'Auditorium': 272, 'LH 03': 35, 'LH 04': 35, 'LH 05': 40, 'LH 06': 50,
//         'LH 07': 50, 'LH 08': 116, 'LH 10': 84, 'PC 05': 51
//       },
//     },
//     {
//       heading: '3rd Floor',
//       seats: ['LH 301', 'LH 303', 'LH 304', 'LH 20', 'LH 305', 'LH 308', 'LH 302', 'LH 307', 'LH 306'],
//       seatCounts: {
//         'LH 301': 20, 'LH 303': 35, 'LH 304': 21, 'LH 20': 45, 'LH 305': 56,
//         'LH 308': 32, 'LH 302': 28, 'LH 307': 28, 'LH 306': 23
//       },
//     },
//     {
//       heading: '4th Floor',
//       seats: ['Harison Hall', 'PC 01', 'PC 03', 'Net Engi Lab', 'Eng Lab', 'ICT E Lab'],
//       seatCounts: {
//         'Harison Hall': 140, 'PC 01': 47, 'PC 03': 38, 'Net Engi Lab': 35, 'Eng Lab': 26, 'ICT E Lab': 24
//       },
//     }
//   ];

//   // Fetch booked seats
//   const fetchBookedSeats = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, "bookedSeats"));
//       const seatsData = {};
//       querySnapshot.forEach((doc) => {
//         seatsData[doc.id] = doc.data();
//       });
//       setBookedSeats(seatsData);
//     } catch (error) {
//       console.error("Error fetching booked seats:", error);
//     }
//   };

//   const filterSeatsByDate = () => {
//     const selectedDates = [...currentMonthDates, ...nextMonthDates];
//     if (selectedDates.length === 0) {
//       setFilteredSeats(bookedSeats);
//       return;
//     }
//     const filtered = Object.keys(bookedSeats).reduce((acc, seat) => {
//       const seatData = bookedSeats[seat];
//       if (seatData.date && selectedDates.includes(seatData.date)) {
//         acc[seat] = seatData;
//       }
//       return acc;
//     }, {});
//     setFilteredSeats(filtered);
//   };

//   useEffect(() => {
//     fetchBookedSeats();
//   }, []);

//   useEffect(() => {
//     filterSeatsByDate();
//   }, [currentMonthDates, nextMonthDates, bookedSeats]);

//   useEffect(() => {
//     const updateMonths = () => {
//       const now = new Date();
//       setCurrentMonth(now.toLocaleString('default', { month: 'long' }));
//       setNextMonth(new Date(now.getFullYear(), now.getMonth() + 1).toLocaleString('default', { month: 'long' }));
//     };
//     updateMonths();
//     const intervalId = setInterval(updateMonths, 1000 * 60 * 60);
//     return () => clearInterval(intervalId);
//   }, []);

//   const handleCurrentMonthSelectionChange = (day) => {
//     const selectedDay = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${day}`;
//     setCurrentMonthDates((prev) => (prev.includes(selectedDay) ? prev.filter((d) => d !== selectedDay) : [...prev, selectedDay]));
//   };

//   // All other handlers (unchanged)
//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "coursetypes"));
//         const courseData = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           name: doc.data().name,
//         }));
//         setCourses(courseData);
//       } catch (error) {
//         console.error("Error fetching courses:", error);
//       }
//     };
//     fetchCourses();
//   }, []);

//   const handleSaveBatch = async () => {
//     if (!batchCode || !batchCount || !startDate || !endDate || !selectedCourse) {
//       alert("Please fill in all fields.");
//       return;
//     }
//     try {
//       const formattedStartDate = new Date(startDate).toISOString().split('T')[0];
//       const formattedEndDate = new Date(endDate).toISOString().split('T')[0];
//       const batchData = {
//         batchCode,
//         batchCount: parseInt(batchCount, 10),
//         startDate: formattedStartDate,
//         endDate: formattedEndDate,
//         courseDirector: selectedCourseDirector,
//         courseSecretary: selectedCourseSecretary || "N/A",
//         courseName: selectedCourse,
//       };
//       await addDoc(collection(db, "coursebatches"), batchData);
//       alert("Batch saved successfully!");
//       setDialogOpen(false);
//       setBatchCode("");
//       setBatchCount("");
//       setStartDate("");
//       setEndDate("");
//       setSelectedCourseDirector("");
//       setSelectedCourseSecretary("");
//     } catch (error) {
//       console.error("Error saving batch:", error);
//       alert("Failed to save batch. Please try again.");
//     }
//   };

//   const handleAddCourse = async () => {
//     if (!newCourseName.trim()) {
//       alert("Please enter a valid course name.");
//       return;
//     }
//     try {
//       await setDoc(doc(db, "coursetypes", newCourseName), { name: newCourseName });
//       alert("Course added successfully!");
//       setAddCourseDialogOpen(false);
//       setNewCourseName("");
//       const querySnapshot = await getDocs(collection(db, "coursetypes"));
//       const updatedCourses = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         name: doc.data().name,
//       }));
//       setCourses(updatedCourses);
//     } catch (error) {
//       console.error("Error adding course:", error);
//       alert("Failed to add course. Please try again.");
//     }
//   };

//   const handleAddCourseDirector = async () => {
//     if (!newCourseDirector.trim()) {
//       alert("Please enter a valid course director name.");
//       return;
//     }
//     try {
//       await addDoc(collection(db, "Cdirectors"), { name: newCourseDirector });
//       alert("Course director added successfully!");
//       setAddDirectorDialogOpen(false);
//       setNewCourseDirector("");
//       const querySnapshot = await getDocs(collection(db, "Cdirectors"));
//       const updatedDirectors = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         name: doc.data().name,
//       }));
//       setCourseDirectors(updatedDirectors);
//     } catch (error) {
//       console.error("Error adding new course director:", error);
//       alert("Failed to add course director. Please try again.");
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const batchesSnapshot = await getDocs(collection(db, "coursebatches"));
//         const matchingBatches = batchesSnapshot.docs.filter((doc) =>
//           doc.data().courseSecretary?.toLowerCase() === name.toLowerCase()
//         );
//         const batchCodes = matchingBatches.map((doc) => doc.data().batchCode);
//         const scheduledSnapshot = await getDocs(collection(db, "ScheduledSubjects"));
//         const filteredData = scheduledSnapshot.docs
//           .filter((doc) => batchCodes.includes(doc.data().batch))
//           .map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//           }));
//         setData(filteredData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, [name]);

//   const handleBook = async (row) => {
//     setSelectedRow(row);
//     setOpenPopup(true);
//     setSelectedHall("");
//     try {
//       const batchDoc = await getDocs(collection(db, "coursebatches"));
//       const matchingBatch = batchDoc.docs.find((doc) => doc.data().batchCode === row.batch);
//       if (matchingBatch) {
//         setBatchCountData(matchingBatch.data().batchCount);
//       } else {
//         setBatchCountData("No data available for this batch.");
//       }
//       if (row.date) {
//         await fetchBookedSeatsForDate(row.date);
//       }
//     } catch (error) {
//       console.error("Error fetching batch count or booked seats:", error);
//     }
//   };

//   const handleSaveBooking = async () => {
//     if (!selectedRow || !selectedHall) {
//       alert("Please select a hall before saving.");
//       return;
//     }
//     try {
//       await setDoc(doc(db, "ScheduledSubjects", selectedRow.id), {
//         ...selectedRow,
//         hall: selectedHall,
//         status: "Booked",
//       });
//       setData((prev) =>
//         prev.map((row) =>
//           row.id === selectedRow.id
//             ? { ...row, hall: selectedHall, status: "Booked" }
//             : row
//         )
//       );
//       alert("Booking saved successfully!");
//       setOpenPopup(false);
//       setSelectedRow(null);
//       setSelectedHall("");
//     } catch (error) {
//       console.error("Error saving booking:", error);
//       alert("Failed to save booking. Please try again.");
//     }
//   };

//   const handleSaveSession = async () => {
//     const { batch, combinedbatch, courseDirector, date, Time, subject, lecturer, SessionType } = newSession;
//     if (!batch || !combinedbatch || !courseDirector || !date || !Time || !subject || !lecturer || !SessionType) {
//       alert("Please fill in all fields.");
//       return;
//     }
//     try {
//       const docRef = await addDoc(collection(db, "ScheduledSubjects"), newSession);
//       setData((prev) => [...prev, { id: docRef.id, ...newSession }]);
//       alert("New session added successfully!");
//       setAddSessionPopup(false);
//       setNewSession({
//         batch: "",
//         combinedbatch: "",
//         courseDirector: "",
//         date: "",
//         Time: "",
//         subject: "",
//         lecturer: "",
//         SessionType: "",
//         status: "Not Booked",
//         hall: "",
//       });
//     } catch (error) {
//       console.error("Error adding new session:", error);
//       alert("Failed to add new session. Please try again.");
//     }
//   };

//   useEffect(() => {
//     const fetchCourseSecretaries = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "coursesectretary"));
//         const secretaryData = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           name: doc.data().name,
//         }));
//         setCourseSecretaries(secretaryData);
//       } catch (error) {
//         console.error("Error fetching course secretaries:", error);
//       }
//     };
//     fetchCourseSecretaries();
//   }, []);

//   const handleAddCourseSecretary = async () => {
//     if (!newCourseSecretary.trim()) {
//       alert("Please enter a valid course secretary name.");
//       return;
//     }
//     try {
//       await addDoc(collection(db, "coursesectretary"), { name: newCourseSecretary });
//       alert("Course secretary added successfully!");
//       setAddSecretaryDialogOpen(false);
//       setNewCourseSecretary("");
//       const querySnapshot = await getDocs(collection(db, "coursesectretary"));
//       const updatedSecretaries = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         name: doc.data().name,
//       }));
//       setCourseSecretaries(updatedSecretaries);
//     } catch (error) {
//       console.error("Error adding new course secretary:", error);
//       alert("Failed to add course secretary. Please try again.");
//     }
//   };

//   useEffect(() => {
//     const fetchCourseDirectors = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "Cdirectors"));
//         const directorData = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           name: doc.data().name,
//         }));
//         setCourseDirectors(directorData);
//       } catch (error) {
//         console.error("Error fetching course directors:", error);
//       }
//     };
//     fetchCourseDirectors();
//   }, []);

//   const resetAddBatchForm = () => {
//     setBatchCode("");
//     setBatchCount("");
//     setStartDate("");
//     setEndDate("");
//     setSelectedCourseDirector("");
//     setSelectedCourseSecretary("");
//   };

//   const fetchBookedSeatsForDate = async (date) => {
//     try {
//       const querySnapshot = await getDocs(collection(db, "ScheduledSubjects"));
//       const bookedSeats = querySnapshot.docs
//         .filter((doc) => doc.data().date === date && doc.data().status === "Booked")
//         .map((doc) => doc.data());
//       const bookedHallNames = bookedSeats.map((seat) => seat.hall);
//       setBookedHalls(bookedHallNames);
//     } catch (error) {
//       console.error("Error fetching booked seats:", error);
//       setBookedHalls([]);
//     }
//   };

//   useEffect(() => {
//     if (selectedRow?.date) {
//       const unsubscribe = onSnapshot(collection(db, "ScheduledSubjects"), (snapshot) => {
//         const updatedData = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setData(updatedData);
//         const bookedHallNames = updatedData
//           .filter((item) => item.date === selectedRow?.date && item.status === "Booked")
//           .map((item) => item.hall);
//         setBookedHalls(bookedHallNames);
//       });
//       return () => unsubscribe();
//     }
//   }, [selectedRow?.date]);

//   useEffect(() => {
//     const unsubscribe = onSnapshot(collection(db, "Cdirectors"), (snapshot) => {
//       const directorData = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         name: doc.data().name,
//       }));
//       setCourseDirectors(directorData);
//     });
//     return () => unsubscribe();
//   }, []);

//   return (
//     <>
//       <Header />
//       <Box sx={{ minHeight: 'calc(100vh - 128px)', bgcolor: '#f5f5f5', py: { xs: 2, md: 4 } }}>
//         <Container maxWidth="xl">
//           <Typography variant="h4" align="center" gutterBottom sx={{ my: 4, fontWeight: 'bold' }}>
//             Hi {name}!
//           </Typography>

//           {/* Add Batch Section */}
//           <Box sx={{ border: '2px solid #1976d2', borderRadius: '12px', p: { xs: 3, md: 4 }, mb: 5, bgcolor: 'white', boxShadow: 4 }}>
//             <Typography variant="h4" gutterBottom>Add Batch</Typography>
//             <Grid container spacing={2} justifyContent="center">
//               {courses.map((course) => (
//                 <Grid item key={course.id}>
//                   <Button variant="contained" onClick={() => { setSelectedCourse(course.name); setDialogOpen(true); }}>
//                     {course.name}
//                   </Button>
//                 </Grid>
//               ))}
//               <Grid item>
//                 <Button variant="outlined" onClick={() => setAddCourseDialogOpen(true)}>Add Course</Button>
//               </Grid>
//             </Grid>
//           </Box>

//           {/* Batch Schedule Table */}
//           <Box sx={{ border: '2px solid #1976d2', borderRadius: '12px', p: { xs: 3, md: 4 }, mb: 5, bgcolor: 'white', boxShadow: 4 }}>
//             <Typography variant="h4" gutterBottom>Batch Schedule</Typography>
//             <Button variant="contained" onClick={() => setAddSessionPopup(true)} sx={{ mb: 3 }}>
//               Add New Session
//             </Button>
//             <TableContainer component={Paper} elevation={6}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell><strong>Batch</strong></TableCell>
//                     <TableCell><strong>Combined Batch</strong></TableCell>
//                     <TableCell><strong>Course Director</strong></TableCell>
//                     <TableCell><strong>Date</strong></TableCell>
//                     <TableCell><strong>Time</strong></TableCell>
//                     <TableCell><strong>Subject</strong></TableCell>
//                     <TableCell><strong>Lecturer</strong></TableCell>
//                     <TableCell><strong>Session Type</strong></TableCell>
//                     <TableCell><strong>Status</strong></TableCell>
//                     <TableCell><strong>Hall</strong></TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {data.map((row) => (
//                     <TableRow key={row.id}>
//                       <TableCell>{row.batch}</TableCell>
//                       <TableCell>{row.combinedbatch}</TableCell>
//                       <TableCell>{row.courseDirector}</TableCell>
//                       <TableCell>{row.date}</TableCell>
//                       <TableCell>{row.Time}</TableCell>
//                       <TableCell>{row.subject}</TableCell>
//                       <TableCell>{row.lecturer}</TableCell>
//                       <TableCell>{row.SessionType}</TableCell>
//                       <TableCell>
//                         {row.status === "Booked" ? (
//                           <Button variant="contained" color="success" disabled>Booked</Button>
//                         ) : (
//                           <Button variant="outlined" color="error" onClick={() => handleBook(row)}>
//                             Not Booked
//                           </Button>
//                         )}
//                       </TableCell>
//                       <TableCell>{row.hall || "N/A"}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Box>

//           {/* Current Month Date Selector */}
//           <Box sx={{ mb: 5 }}>
//             <Typography variant="h5" gutterBottom>{currentMonth}</Typography>
//             <Grid container spacing={1}>
//               {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
//                 const formattedDay = String(day).padStart(2, "0");
//                 const fullDate = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${formattedDay}`;
//                 return (
//                   <Grid item key={day}>
//                     <Button
//                       variant={currentMonthDates.includes(fullDate) ? "contained" : "outlined"}
//                       onClick={() => handleCurrentMonthSelectionChange(formattedDay)}
//                       size="small"
//                     >
//                       {day}
//                     </Button>
//                   </Grid>
//                 );
//               })}
//             </Grid>
//           </Box>

//           {/* Halls / Seats Grid - Fully Responsive */}
//           <Grid container spacing={3}>
//             {floors.map((floor) => (
//               <Grid item xs={12} sm={6} md={4} lg={3} key={floor.heading}>
//                 <Typography variant="h5" gutterBottom sx={{ color: '#1976d2' }}>{floor.heading}</Typography>
//                 {floor.seats.map((seat) => {
//                   const seatDetails = filteredSeats[seat];
//                   const isBooked = Boolean(seatDetails);
//                   return (
//                     <Paper
//                       key={seat}
//                       elevation={isBooked ? 8 : 3}
//                       sx={{
//                         p: 2,
//                         mb: 2,
//                         cursor: 'pointer',
//                         border: isBooked ? '3px solid #d32f2f' : '1px solid #ccc',
//                         bgcolor: isBooked ? '#ffebee' : 'white',
//                         transition: '0.3s',
//                         '&:hover': { boxShadow: 8, transform: 'translateY(-4px)' },
//                       }}
//                       onClick={() => alert(`Selected ${seat}`)}
//                     >
//                       <Typography variant="h6" gutterBottom>{seat}</Typography>
//                       {isBooked ? (
//                         <>
//                           <Typography><strong>Batch:</strong> {seatDetails.batch}</Typography>
//                           <Typography><strong>Subject:</strong> {seatDetails.subject}</Typography>
//                           <Typography><strong>Lecturer:</strong> {seatDetails.lecturer}</Typography>
//                           <Typography><strong>Time:</strong> {seatDetails.Time}</Typography>
//                         </>
//                       ) : (
//                         <Typography color="text.secondary">Available for booking</Typography>
//                       )}
//                     </Paper>
//                   );
//                 })}
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>

//       {/* All Dialogs */}
//       <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
//         <DialogTitle>Add Batch</DialogTitle>
//         <DialogContent>
//           <TextField label="Course Name" value={selectedCourse} InputProps={{ readOnly: true }} fullWidth sx={{ mb: 2 }} />
//           <TextField label="Batch Code" value={batchCode} onChange={(e) => setBatchCode(e.target.value)} fullWidth sx={{ mb: 2 }} />
//           <FormControl fullWidth sx={{ mb: 2 }}>
//             <InputLabel>Course Director</InputLabel>
//             <Select value={selectedCourseDirector} onChange={(e) => setSelectedCourseDirector(e.target.value)} label="Course Director">
//               <MenuItem value="add-new" onClick={() => setAddDirectorDialogOpen(true)}>Add New Course Director</MenuItem>
//               {courseDirectors.map((director) => (
//                 <MenuItem key={director.id} value={director.name}>{director.name}</MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <FormControl fullWidth sx={{ mb: 2 }}>
//             <InputLabel>Course Secretary</InputLabel>
//             <Select value={selectedCourseSecretary} onChange={(e) => setSelectedCourseSecretary(e.target.value)} label="Course Secretary">
//               <MenuItem value="add-new" onClick={() => setAddSecretaryDialogOpen(true)}>Add New Course Secretary</MenuItem>
//               {courseSecretaries.map((secretary) => (
//                 <MenuItem key={secretary.id} value={secretary.name}>{secretary.name}</MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <TextField label="Batch Count" value={batchCount} onChange={(e) => setBatchCount(e.target.value)} fullWidth sx={{ mb: 2 }} />
//           <Box sx={{ display: 'flex', gap: 2 }}>
//             <TextField label="Start Date" type="date" InputLabelProps={{ shrink: true }} value={startDate} onChange={(e) => setStartDate(e.target.value)} fullWidth />
//             <TextField label="End Date" type="date" InputLabelProps={{ shrink: true }} value={endDate} onChange={(e) => setEndDate(e.target.value)} fullWidth />
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
//           <Button onClick={handleSaveBatch} variant="contained">Save</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Add Course Secretary Dialog */}
//       <Dialog open={addSecretaryDialogOpen} onClose={() => setAddSecretaryDialogOpen(false)}>
//         <DialogTitle>Add New Course Secretary</DialogTitle>
//         <DialogContent>
//           <TextField label="Name" value={newCourseSecretary} onChange={(e) => setNewCourseSecretary(e.target.value)} fullWidth />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setAddSecretaryDialogOpen(false)}>Cancel</Button>
//           <Button onClick={handleAddCourseSecretary} variant="contained">Save</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Add Course Director Dialog */}
//       <Dialog open={addDirectorDialogOpen} onClose={() => setAddDirectorDialogOpen(false)}>
//         <DialogTitle>Add New Course Director</DialogTitle>
//         <DialogContent>
//           <TextField label="Name" value={newCourseDirector} onChange={(e) => setNewCourseDirector(e.target.value)} fullWidth />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setAddDirectorDialogOpen(false)}>Cancel</Button>
//           <Button onClick={handleAddCourseDirector} variant="contained">Save</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Add Course Dialog */}
//       <Dialog open={addCourseDialogOpen} onClose={() => setAddCourseDialogOpen(false)}>
//         <DialogTitle>Add New Course</DialogTitle>
//         <DialogContent>
//           <TextField label="Course Name" value={newCourseName} onChange={(e) => setNewCourseName(e.target.value)} fullWidth />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setAddCourseDialogOpen(false)}>Cancel</Button>
//           <Button onClick={handleAddCourse} variant="contained">Save</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Booking Popup */}
//       <Dialog open={openPopup} onClose={() => setOpenPopup(false)} maxWidth="lg" fullWidth>
//         <DialogTitle>Select Hall</DialogTitle>
//         <DialogContent>
//           <Typography variant="h6">Batch: {selectedRow?.batch}</Typography>
//           <Typography>Batch Count: {batchCountData || "Loading..."}</Typography>
//           <Typography variant="h6" sx={{ mt: 2 }}>Date: {selectedRow?.date}</Typography>
//           <Grid container spacing={3} sx={{ mt: 2 }}>
//             {floors.map((floor) => (
//               <Grid item xs={12} md={6} lg={4} key={floor.heading}>
//                 <Typography variant="h6">{floor.heading}</Typography>
//                 {floor.seats.map((seat) => {
//                   const seatCount = floor.seatCounts[seat] || 'N/A';
//                   const bookedDetails = data.filter(item => item.hall === seat && item.date === selectedRow?.date && item.status === "Booked");
//                   const isBooked = bookedDetails.length > 0;
//                   const isSelected = selectedHall === seat;
//                   return (
//                     <Paper
//                       key={seat}
//                       elevation={isSelected ? 8 : 3}
//                       onClick={() => !isBooked && setSelectedHall(seat)}
//                       sx={{
//                         p: 2,
//                         my: 1,
//                         cursor: isBooked ? 'not-allowed' : 'pointer',
//                         border: isSelected ? '3px solid #1976d2' : isBooked ? '3px solid #000' : '1px solid #ccc',
//                         bgcolor: isSelected ? '#e3f2fd' : isBooked ? '#424242' : 'white',
//                         color: isBooked ? 'white' : 'inherit',
//                       }}
//                     >
//                       <Typography variant="h6">{seat} ({seatCount} seats)</Typography>
//                       {isBooked ? (
//                         <Box>
//                           <Typography><strong>Booked</strong></Typography>
//                           {bookedDetails.map((b, i) => (
//                             <Box key={i} sx={{ mt: 1 }}>
//                               <Typography>Batch: {b.batch}</Typography>
//                               <Typography>Subject: {b.subject}</Typography>
//                             </Box>
//                           ))}
//                         </Box>
//                       ) : (
//                         <Typography color="text.secondary">Available</Typography>
//                       )}
//                     </Paper>
//                   );
//                 })}
//               </Grid>
//             ))}
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenPopup(false)}>Cancel</Button>
//           <Button variant="contained" onClick={handleSaveBooking} disabled={!selectedHall}>Save Booking</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Add Session Dialog */}
//       <Dialog open={addSessionPopup} onClose={() => setAddSessionPopup(false)} maxWidth="sm" fullWidth>
//         <DialogTitle>Add New Session</DialogTitle>
//         <DialogContent>
//           <TextField label="Batch" value={newSession.batch} onChange={(e) => setNewSession(prev => ({ ...prev, batch: e.target.value }))} fullWidth sx={{ mb: 2 }} />
//           <TextField label="Combined Batch" value={newSession.combinedbatch} onChange={(e) => setNewSession(prev => ({ ...prev, combinedbatch: e.target.value }))} fullWidth sx={{ mb: 2 }} />
//           <TextField label="Course Director" value={newSession.courseDirector} onChange={(e) => setNewSession(prev => ({ ...prev, courseDirector: e.target.value }))} fullWidth sx={{ mb: 2 }} />
//           <TextField label="Date" type="date" InputLabelProps={{ shrink: true }} value={newSession.date} onChange={(e) => setNewSession(prev => ({ ...prev, date: e.target.value }))} fullWidth sx={{ mb: 2 }} />
//           <TextField label="Time" value={newSession.Time} onChange={(e) => setNewSession(prev => ({ ...prev, Time: e.target.value }))} fullWidth sx={{ mb: 2 }} />
//           <TextField label="Subject" value={newSession.subject} onChange={(e) => setNewSession(prev => ({ ...prev, subject: e.target.value }))} fullWidth sx={{ mb: 2 }} />
//           <TextField label="Lecturer" value={newSession.lecturer} onChange={(e) => setNewSession(prev => ({ ...prev, lecturer: e.target.value }))} fullWidth sx={{ mb: 2 }} />
//           <TextField label="Session Type" value={newSession.SessionType} onChange={(e) => setNewSession(prev => ({ ...prev, SessionType: e.target.value }))} fullWidth sx={{ mb: 2 }} />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setAddSessionPopup(false)}>Cancel</Button>
//           <Button variant="contained" onClick={handleSaveSession}>Save</Button>
//         </DialogActions>
//       </Dialog>

//       <Footer />
//     </>
//   );
// };

// export default Programingofficer;
import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { onSnapshot, collection, getDocs, doc, setDoc, addDoc } from "firebase/firestore";
import { db } from '../firebase';
import Header from './Header';
import Footer from './Footer';

const Programingofficer = () => {
  const [courseSecretaries, setCourseSecretaries] = useState([]);
  const [selectedCourseSecretary, setSelectedCourseSecretary] = useState("");
  const [addSecretaryDialogOpen, setAddSecretaryDialogOpen] = useState(false);
  const [newCourseSecretary, setNewCourseSecretary] = useState("");
  const [bookedSeats, setBookedSeats] = useState({});
  const [filteredSeats, setFilteredSeats] = useState({});
  const [currentMonthDates, setCurrentMonthDates] = useState([]);
  const [nextMonthDates, setNextMonthDates] = useState([]);
  const [currentMonth, setCurrentMonth] = useState('');
  const [nextMonth, setNextMonth] = useState('');
  const [addCourseDialogOpen, setAddCourseDialogOpen] = useState(false);
  const [newCourseName, setNewCourseName] = useState("");
  const location = useLocation();
  const { name } = location.state || { name: "Guest" };
  const [batchCountData, setBatchCountData] = useState(null);
  const [bookedHalls, setBookedHalls] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [batchCode, setBatchCode] = useState("");
  const [batchCount, setBatchCount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [courseDirectors, setCourseDirectors] = useState([]);
  const [selectedCourseDirector, setSelectedCourseDirector] = useState("");
  const [addDirectorDialogOpen, setAddDirectorDialogOpen] = useState(false);
  const [newCourseDirector, setNewCourseDirector] = useState("");
  const [data, setData] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [addSessionPopup, setAddSessionPopup] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedHall, setSelectedHall] = useState("");
  const [newSession, setNewSession] = useState({
    batch: "",
    combinedbatch: "",
    courseDirector: "",
    date: "",
    Time: "",
    subject: "",
    lecturer: "",
    SessionType: "",
    status: "Not Booked",
    hall: "",
  });

  const floors = [
    {
      heading: 'Ground Floor',
      seats: ['LH 01', 'LH 02', 'IT Training', 'Seminar Room', 'Internet Plaza'],
      seatCounts: { 'LH 01': 104, 'LH 02': 82, 'IT Training': 24, 'Seminar Room': 40, 'Internet Plaza': 18 },
    },
    {
      heading: '1st Floor',
      seats: ['LH 18', 'LH 17', 'E-hub'],
      seatCounts: { 'LH 18': 155, 'LH 17': 70, 'E-hub': 12 },
    },
    {
      heading: '2nd Floor',
      seats: ['Auditorium', 'LH 03', 'LH 04', 'LH 05', 'LH 06', 'LH 07', 'LH 08', 'LH 10', 'PC 05'],
      seatCounts: {
        'Auditorium': 272, 'LH 03': 35, 'LH 04': 35, 'LH 05': 40, 'LH 06': 50,
        'LH 07': 50, 'LH 08': 116, 'LH 10': 84, 'PC 05': 51
      },
    },
    {
      heading: '3rd Floor',
      seats: ['LH 301', 'LH 303', 'LH 304', 'LH 20', 'LH 305', 'LH 308', 'LH 302', 'LH 307', 'LH 306'],
      seatCounts: {
        'LH 301': 20, 'LH 303': 35, 'LH 304': 21, 'LH 20': 45, 'LH 305': 56,
        'LH 308': 32, 'LH 302': 28, 'LH 307': 28, 'LH 306': 23
      },
    },
    {
      heading: '4th Floor',
      seats: ['Harison Hall', 'PC 01', 'PC 03', 'Net Engi Lab', 'Eng Lab', 'ICT E Lab'],
      seatCounts: {
        'Harison Hall': 140, 'PC 01': 47, 'PC 03': 38, 'Net Engi Lab': 35, 'Eng Lab': 26, 'ICT E Lab': 24
      },
    }
  ];

  // Fetch booked seats
  const fetchBookedSeats = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "bookedSeats"));
      const seatsData = {};
      querySnapshot.forEach((doc) => {
        seatsData[doc.id] = doc.data();
      });
      setBookedSeats(seatsData);
    } catch (error) {
      console.error("Error fetching booked seats:", error);
    }
  };

  const filterSeatsByDate = () => {
    const selectedDates = [...currentMonthDates, ...nextMonthDates];
    if (selectedDates.length === 0) {
      setFilteredSeats(bookedSeats);
      return;
    }
    const filtered = Object.keys(bookedSeats).reduce((acc, seat) => {
      const seatData = bookedSeats[seat];
      if (seatData.date && selectedDates.includes(seatData.date)) {
        acc[seat] = seatData;
      }
      return acc;
    }, {});
    setFilteredSeats(filtered);
  };

  useEffect(() => {
    fetchBookedSeats();
  }, []);

  useEffect(() => {
    filterSeatsByDate();
  }, [currentMonthDates, nextMonthDates, bookedSeats]);

  useEffect(() => {
    const updateMonths = () => {
      const now = new Date();
      setCurrentMonth(now.toLocaleString('default', { month: 'long' }));
      setNextMonth(new Date(now.getFullYear(), now.getMonth() + 1).toLocaleString('default', { month: 'long' }));
    };
    updateMonths();
    const intervalId = setInterval(updateMonths, 1000 * 60 * 60);
    return () => clearInterval(intervalId);
  }, []);

  const handleCurrentMonthSelectionChange = (day) => {
    const selectedDay = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${day}`;
    setCurrentMonthDates((prev) => (prev.includes(selectedDay) ? prev.filter((d) => d !== selectedDay) : [...prev, selectedDay]));
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "coursetypes"));
        const courseData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }));
        setCourses(courseData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const handleSaveBatch = async () => {
    if (!batchCode || !batchCount || !startDate || !endDate || !selectedCourse) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      const formattedStartDate = new Date(startDate).toISOString().split('T')[0];
      const formattedEndDate = new Date(endDate).toISOString().split('T')[0];
      const batchData = {
        batchCode,
        batchCount: parseInt(batchCount, 10),
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        courseDirector: selectedCourseDirector,
        courseSecretary: selectedCourseSecretary || "N/A",
        courseName: selectedCourse,
      };
      await addDoc(collection(db, "coursebatches"), batchData);
      alert("Batch saved successfully!");
      setDialogOpen(false);
      setBatchCode("");
      setBatchCount("");
      setStartDate("");
      setEndDate("");
      setSelectedCourseDirector("");
      setSelectedCourseSecretary("");
    } catch (error) {
      console.error("Error saving batch:", error);
      alert("Failed to save batch. Please try again.");
    }
  };

  const handleAddCourse = async () => {
    if (!newCourseName.trim()) {
      alert("Please enter a valid course name.");
      return;
    }
    try {
      await setDoc(doc(db, "coursetypes", newCourseName), { name: newCourseName });
      alert("Course added successfully!");
      setAddCourseDialogOpen(false);
      setNewCourseName("");
      const querySnapshot = await getDocs(collection(db, "coursetypes"));
      const updatedCourses = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));
      setCourses(updatedCourses);
    } catch (error) {
      console.error("Error adding course:", error);
      alert("Failed to add course. Please try again.");
    }
  };

  const handleAddCourseDirector = async () => {
    if (!newCourseDirector.trim()) {
      alert("Please enter a valid course director name.");
      return;
    }
    try {
      await addDoc(collection(db, "Cdirectors"), { name: newCourseDirector });
      alert("Course director added successfully!");
      setAddDirectorDialogOpen(false);
      setNewCourseDirector("");
      const querySnapshot = await getDocs(collection(db, "Cdirectors"));
      const updatedDirectors = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));
      setCourseDirectors(updatedDirectors);
    } catch (error) {
      console.error("Error adding new course director:", error);
      alert("Failed to add course director. Please try again.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const batchesSnapshot = await getDocs(collection(db, "coursebatches"));
        const matchingBatches = batchesSnapshot.docs.filter((doc) =>
          doc.data().courseSecretary?.toLowerCase() === name.toLowerCase()
        );
        const batchCodes = matchingBatches.map((doc) => doc.data().batchCode);
        const scheduledSnapshot = await getDocs(collection(db, "ScheduledSubjects"));
        const filteredData = scheduledSnapshot.docs
          .filter((doc) => batchCodes.includes(doc.data().batch))
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        setData(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [name]);

  const handleBook = async (row) => {
    setSelectedRow(row);
    setOpenPopup(true);
    setSelectedHall("");
    try {
      const batchDoc = await getDocs(collection(db, "coursebatches"));
      const matchingBatch = batchDoc.docs.find((doc) => doc.data().batchCode === row.batch);
      if (matchingBatch) {
        setBatchCountData(matchingBatch.data().batchCount);
      } else {
        setBatchCountData("No data available for this batch.");
      }
      if (row.date) {
        await fetchBookedSeatsForDate(row.date);
      }
    } catch (error) {
      console.error("Error fetching batch count or booked seats:", error);
    }
  };

  const handleSaveBooking = async () => {
    if (!selectedRow || !selectedHall) {
      alert("Please select a hall before saving.");
      return;
    }
    try {
      await setDoc(doc(db, "ScheduledSubjects", selectedRow.id), {
        ...selectedRow,
        hall: selectedHall,
        status: "Booked",
      });
      setData((prev) =>
        prev.map((row) =>
          row.id === selectedRow.id
            ? { ...row, hall: selectedHall, status: "Booked" }
            : row
        )
      );
      alert("Booking saved successfully!");
      setOpenPopup(false);
      setSelectedRow(null);
      setSelectedHall("");
    } catch (error) {
      console.error("Error saving booking:", error);
      alert("Failed to save booking. Please try again.");
    }
  };

  const handleSaveSession = async () => {
    const { batch, combinedbatch, courseDirector, date, Time, subject, lecturer, SessionType } = newSession;
    if (!batch || !combinedbatch || !courseDirector || !date || !Time || !subject || !lecturer || !SessionType) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      const docRef = await addDoc(collection(db, "ScheduledSubjects"), newSession);
      setData((prev) => [...prev, { id: docRef.id, ...newSession }]);
      alert("New session added successfully!");
      setAddSessionPopup(false);
      setNewSession({
        batch: "",
        combinedbatch: "",
        courseDirector: "",
        date: "",
        Time: "",
        subject: "",
        lecturer: "",
        SessionType: "",
        status: "Not Booked",
        hall: "",
      });
    } catch (error) {
      console.error("Error adding new session:", error);
      alert("Failed to add new session. Please try again.");
    }
  };

  useEffect(() => {
    const fetchCourseSecretaries = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "coursesectretary"));
        const secretaryData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }));
        setCourseSecretaries(secretaryData);
      } catch (error) {
        console.error("Error fetching course secretaries:", error);
      }
    };
    fetchCourseSecretaries();
  }, []);

  const handleAddCourseSecretary = async () => {
    if (!newCourseSecretary.trim()) {
      alert("Please enter a valid course secretary name.");
      return;
    }
    try {
      await addDoc(collection(db, "coursesectretary"), { name: newCourseSecretary });
      alert("Course secretary added successfully!");
      setAddSecretaryDialogOpen(false);
      setNewCourseSecretary("");
      const querySnapshot = await getDocs(collection(db, "coursesectretary"));
      const updatedSecretaries = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));
      setCourseSecretaries(updatedSecretaries);
    } catch (error) {
      console.error("Error adding new course secretary:", error);
      alert("Failed to add course secretary. Please try again.");
    }
  };

  useEffect(() => {
    const fetchCourseDirectors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Cdirectors"));
        const directorData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }));
        setCourseDirectors(directorData);
      } catch (error) {
        console.error("Error fetching course directors:", error);
      }
    };
    fetchCourseDirectors();
  }, []);

  const fetchBookedSeatsForDate = async (date) => {
    try {
      const querySnapshot = await getDocs(collection(db, "ScheduledSubjects"));
      const booked = querySnapshot.docs
        .filter((doc) => doc.data().date === date && doc.data().status === "Booked")
        .map((doc) => doc.data().hall);
      setBookedHalls(booked);
    } catch (error) {
      console.error("Error fetching booked halls:", error);
      setBookedHalls([]);
    }
  };

  return (
    <>
      <Header />
      <Box sx={{ minHeight: 'calc(100vh - 128px)', bgcolor: '#f5f5f5', py: { xs: 2, md: 4 } }}>
        <Container maxWidth="xl">
          <Typography variant="h4" align="center" gutterBottom sx={{ my: 4, fontWeight: 'bold', fontSize: { xs: '1.8rem', sm: '2.4rem' } }}>
            Hi {name}!
          </Typography>

          {/* Add Batch Section */}
          <Paper elevation={6} sx={{ p: { xs: 3, md: 4 }, borderRadius: 3, mb: 5 }}>
            <Typography variant="h5" gutterBottom>Add Batch</Typography>
            <Stack direction="row" flexWrap="wrap" gap={2} justifyContent="center" sx={{ mt: 2 }}>
              {courses.map((course) => (
                <Button
                  key={course.id}
                  variant="contained"
                  onClick={() => {
                    setSelectedCourse(course.name);
                    setDialogOpen(true);
                  }}
                >
                  {course.name}
                </Button>
              ))}
              <Button variant="outlined" onClick={() => setAddCourseDialogOpen(true)}>
                Add Course
              </Button>
            </Stack>
          </Paper>

          {/* Batch Schedule Table */}
          <Paper elevation={6} sx={{ p: { xs: 3, md: 4 }, borderRadius: 3, mb: 5, overflowX: 'auto' }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="flex-start" spacing={2} mb={3}>
              <Typography variant="h5">Batch Schedule</Typography>
              <Button variant="contained" onClick={() => setAddSessionPopup(true)}>
                Add New Session
              </Button>
            </Stack>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Batch</strong></TableCell>
                    <TableCell><strong>Combined</strong></TableCell>
                    <TableCell><strong>Director</strong></TableCell>
                    <TableCell><strong>Date</strong></TableCell>
                    <TableCell><strong>Time</strong></TableCell>
                    <TableCell><strong>Subject</strong></TableCell>
                    <TableCell><strong>Lecturer</strong></TableCell>
                    <TableCell><strong>Type</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                    <TableCell><strong>Hall</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.batch}</TableCell>
                      <TableCell>{row.combinedbatch}</TableCell>
                      <TableCell>{row.courseDirector}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.Time}</TableCell>
                      <TableCell>{row.subject}</TableCell>
                      <TableCell>{row.lecturer}</TableCell>
                      <TableCell>{row.SessionType}</TableCell>
                      <TableCell>
                        {row.status === "Booked" ? (
                          <Button variant="contained" color="success" size="small" disabled>Booked</Button>
                        ) : (
                          <Button variant="outlined" color="error" size="small" onClick={() => handleBook(row)}>
                            Not Booked
                          </Button>
                        )}
                      </TableCell>
                      <TableCell>{row.hall || "N/A"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* Date Selector */}
          <Paper elevation={4} sx={{ p: 3, borderRadius: 3, mb: 5 }}>
            <Typography variant="h6" gutterBottom>{currentMonth}</Typography>
            <Grid container spacing={1}>
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                const formatted = String(day).padStart(2, "0");
                const full = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${formatted}`;
                return (
                  <Grid item key={day}>
                    <Button
                      variant={currentMonthDates.includes(full) ? "contained" : "outlined"}
                      onClick={() => handleCurrentMonthSelectionChange(formatted)}
                      size="small"
                    >
                      {day}
                    </Button>
                  </Grid>
                );
              })}
            </Grid>
          </Paper>

          {/* Halls Grid - NOW SHOWS ALL 4 FLOORS AT ONCE ON LARGE SCREENS */}
          <Grid container spacing={3}>
            {floors.map((floor) => (
              <Grid 
                item 
                xs={12}     // 1 column on mobile
                sm={6}      // 2 columns on small tablets
                md={4}      // 3 columns on medium screens
                lg={3}      // 4 columns on large screens → ALL 4 FLOORS VISIBLE!
                xl={3}      // Keep 4 on extra large
                key={floor.heading}
              >
                <Paper elevation={4} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6" color="primary" gutterBottom>{floor.heading}</Typography>
                  <Stack spacing={2} sx={{ flexGrow: 1 }}>
                    {floor.seats.map((seat) => {
                      const details = filteredSeats[seat];
                      const booked = Boolean(details);
                      return (
                        <Paper
                          key={seat}
                          elevation={booked ? 8 : 3}
                          sx={{
                            p: 2.5,
                            border: booked ? '3px solid #d32f2f' : '1px solid #ccc',
                            bgcolor: booked ? '#ffebee' : 'white',
                            cursor: 'pointer',
                            '&:hover': { boxShadow: 6 },
                          }}
                        >
                          <Typography variant="subtitle1" fontWeight="bold">
                            {seat} ({floor.seatCounts[seat]} seats)
                          </Typography>
                          {booked ? (
                            <Box sx={{ mt: 1 }}>
                              <Typography><strong>Batch:</strong> {details.batch}</Typography>
                              <Typography><strong>Subject:</strong> {details.subject}</Typography>
                              <Typography><strong>Lecturer:</strong> {details.lecturer}</Typography>
                              <Typography><strong>Time:</strong> {details.Time}</Typography>
                            </Box>
                          ) : (
                            <Typography color="text.secondary" sx={{ mt: 1 }}>Available</Typography>
                          )}
                        </Paper>
                      );
                    })}
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* All Dialogs */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Batch</DialogTitle>
        <DialogContent>
          <TextField label="Course Name" value={selectedCourse} InputProps={{ readOnly: true }} fullWidth sx={{ mb: 2 }} />
          <TextField label="Batch Code" value={batchCode} onChange={(e) => setBatchCode(e.target.value)} fullWidth sx={{ mb: 2 }} />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Course Director</InputLabel>
            <Select value={selectedCourseDirector} onChange={(e) => setSelectedCourseDirector(e.target.value)}>
              <MenuItem value="" disabled>Select or Add</MenuItem>
              <MenuItem value="add-new" onClick={() => setAddDirectorDialogOpen(true)}>Add New Director</MenuItem>
              {courseDirectors.map((d) => (
                <MenuItem key={d.id} value={d.name}>{d.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Course Secretary</InputLabel>
            <Select value={selectedCourseSecretary} onChange={(e) => setSelectedCourseSecretary(e.target.value)}>
              <MenuItem value="" disabled>Select or Add</MenuItem>
              <MenuItem value="add-new" onClick={() => setAddSecretaryDialogOpen(true)}>Add New Secretary</MenuItem>
              {courseSecretaries.map((s) => (
                <MenuItem key={s.id} value={s.name}>{s.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField label="Batch Count" type="number" value={batchCount} onChange={(e) => setBatchCount(e.target.value)} fullWidth sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField label="Start Date" type="date" InputLabelProps={{ shrink: true }} value={startDate} onChange={(e) => setStartDate(e.target.value)} fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField label="End Date" type="date" InputLabelProps={{ shrink: true }} value={endDate} onChange={(e) => setEndDate(e.target.value)} fullWidth />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveBatch} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={addCourseDialogOpen} onClose={() => setAddCourseDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Add New Course</DialogTitle>
        <DialogContent>
          <TextField label="Course Name" value={newCourseName} onChange={(e) => setNewCourseName(e.target.value)} fullWidth autoFocus />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddCourseDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddCourse} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={addSecretaryDialogOpen} onClose={() => setAddSecretaryDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Add New Course Secretary</DialogTitle>
        <DialogContent>
          <TextField label="Name" value={newCourseSecretary} onChange={(e) => setNewCourseSecretary(e.target.value)} fullWidth autoFocus />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddSecretaryDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddCourseSecretary} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={addDirectorDialogOpen} onClose={() => setAddDirectorDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Add New Course Director</DialogTitle>
        <DialogContent>
          <TextField label="Name" value={newCourseDirector} onChange={(e) => setNewCourseDirector(e.target.value)} fullWidth autoFocus />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDirectorDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddCourseDirector} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openPopup} onClose={() => setOpenPopup(false)} maxWidth="lg" fullWidth>
        <DialogTitle>Select Hall for Booking</DialogTitle>
        <DialogContent dividers>
          <Typography variant="h6">Batch: {selectedRow?.batch}</Typography>
          <Typography>Student Count: {batchCountData || 'Loading...'}</Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>Date: {selectedRow?.date}</Typography>

          <Grid container spacing={3} sx={{ mt: 2 }}>
            {floors.map((floor) => (
              <Grid item xs={12} sm={6} lg={4} key={floor.heading}>
                <Typography variant="subtitle1" gutterBottom>{floor.heading}</Typography>
                {floor.seats.map((seat) => {
                  const count = floor.seatCounts[seat];
                  const booked = bookedHalls.includes(seat);
                  const selected = selectedHall === seat;
                  return (
                    <Paper
                      key={seat}
                      elevation={selected ? 10 : booked ? 6 : 3}
                      onClick={() => !booked && setSelectedHall(seat)}
                      sx={{
                        p: 2.5,
                        mb: 2,
                        cursor: booked ? 'not-allowed' : 'pointer',
                        border: selected ? '3px solid #1976d2' : booked ? '3px solid #000' : '1px solid #ccc',
                        bgcolor: selected ? '#e3f2fd' : booked ? '#424242' : 'white',
                        color: booked ? 'white' : 'inherit',
                      }}
                    >
                      <Typography variant="subtitle1">{seat} ({count} seats)</Typography>
                      {booked ? (
                        <Typography color="inherit" sx={{ mt: 1 }}>Already Booked</Typography>
                      ) : (
                        <Typography color="text.secondary" sx={{ mt: 1 }}>Available</Typography>
                      )}
                    </Paper>
                  );
                })}
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPopup(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveBooking} disabled={!selectedHall}>
            Confirm Booking
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={addSessionPopup} onClose={() => setAddSessionPopup(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Session</DialogTitle>
        <DialogContent>
          <TextField label="Batch" value={newSession.batch} onChange={(e) => setNewSession({ ...newSession, batch: e.target.value })} fullWidth sx={{ mb: 2 }} />
          <TextField label="Combined Batch" value={newSession.combinedbatch} onChange={(e) => setNewSession({ ...newSession, combinedbatch: e.target.value })} fullWidth sx={{ mb: 2 }} />
          <TextField label="Course Director" value={newSession.courseDirector} onChange={(e) => setNewSession({ ...newSession, courseDirector: e.target.value })} fullWidth sx={{ mb: 2 }} />
          <TextField label="Date" type="date" InputLabelProps={{ shrink: true }} value={newSession.date} onChange={(e) => setNewSession({ ...newSession, date: e.target.value })} fullWidth sx={{ mb: 2 }} />
          <TextField label="Time" value={newSession.Time} onChange={(e) => setNewSession({ ...newSession, Time: e.target.value })} fullWidth sx={{ mb: 2 }} />
          <TextField label="Subject" value={newSession.subject} onChange={(e) => setNewSession({ ...newSession, subject: e.target.value })} fullWidth sx={{ mb: 2 }} />
          <TextField label="Lecturer" value={newSession.lecturer} onChange={(e) => setNewSession({ ...newSession, lecturer: e.target.value })} fullWidth sx={{ mb: 2 }} />
          <TextField label="Session Type" value={newSession.SessionType} onChange={(e) => setNewSession({ ...newSession, SessionType: e.target.value })} fullWidth sx={{ mb: 2 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddSessionPopup(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveSession}>Save Session</Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </>
  );
};

export default Programingofficer;