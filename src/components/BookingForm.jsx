///////////////////////////////////////////////
import Header from './Header';
import Footer from './Footer';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import MinimizeIcon from '@mui/icons-material/Remove'; // Import Minimize Icon
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase'; // Import Firestore configuration
import React, { useState, useEffect } from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import { query, where } from "firebase/firestore";
import EditIcon from '@mui/icons-material/Edit';

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



const BookingForm = () => {

  const [subjectsData, setSubjectsData] = useState([]); // State for subjects data
  const [isEditing, setIsEditing] = useState(null); // Track the subject being edited
  const [editedLecturer, setEditedLecturer] = useState(""); // State for edited lecturer

  const [bookedSeats, setBookedSeats] = useState({});
  
  const location = useLocation();
  const { name } = location.state || {}; // Get name from state

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

  useEffect(() => {
    fetchBookedSeats();
  }, []); // Fetch data on component load

  const fetchBatchesByPrefix = async (prefix) => {
    try {
      // Query Firestore to get batches with names starting with the given prefix
      const q = query(collection(db, "batches"), where("batch", ">=", prefix), where("batch", "<", prefix + "\uf8ff"));
      const querySnapshot = await getDocs(q);
      const fetchedBatches = [];
      querySnapshot.forEach((doc) => {
        fetchedBatches.push(doc.data().batch); // Assuming batchName is the field for batch names
      });
      return fetchedBatches;
    } catch (error) {
      console.error("Error fetching batches by prefix:", error);
      return [];
    }
  };
  
  useEffect(() => {
    if (formData.batch) {
      const selectedBatchPrefix = formData.batch.split('_')[0]; // Extract prefix from the selected batch
      fetchBatchesByPrefix(selectedBatchPrefix).then((fetchedBatches) => {
        setBatches(fetchedBatches); // Update batches with the fetched data
      });
    }
  }, [formData.batch]); // Run effect whenever the selected batch changes
  
  const [formData, setFormData] = useState({
    dates: [],
    time: '',
    showType: '',
    seats: [],
    batch: '',
    selectedSubjects: [],
  });
 
 
  // Define state for showing the Lecturer Roster
  const [showLecturerRoster, setShowLecturerRoster] = useState(false);

  const toggleLecturerRoster = () => {
    // This will toggle the visibility of the Lecturer Roster
    setShowLecturerRoster(prevState => !prevState);
  };

  //const [selectedSubject, setSelectedSubject] = useState('');
  const [newBatchName, setNewBatchName] = useState('');
  const [isAddingBatch, setIsAddingBatch] = useState(false);
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const nextMonth = new Date(currentDate.setMonth(currentDate.getMonth() + 1)).toLocaleString('default', { month: 'long' });
 
  const [subjects, setSubjects] = useState({});
  const [selectedSubject, setSelectedSubject] = useState('');
  
  const handleSelectionChange = (key, value) => {
    if (key === 'dates') {
      const isSelected = formData.dates.includes(value);
      setFormData({
        ...formData,
        dates: isSelected ? formData.dates.filter((date) => date !== value) : [...formData.dates, value],
      });
    } else if (key === 'batch') {
      const batchPrefix = value.split(' ')[0];
      setFormData({
        ...formData,
        batch: value,
        selectedSubjects: subjects[batchPrefix] || [],
      });
      setSelectedSubject('');
    } else {
      setFormData({ ...formData, [key]: value });
    }
  };

  const handleSeatSelection = (seat) => {
    if (bookedSeats.hasOwnProperty(seat)) return; // Prevent selection of booked seats
    const isSelected = formData.seats.includes(seat);
    setFormData({
      ...formData,
      seats: isSelected ? formData.seats.filter((s) => s !== seat) : [...formData.seats, seat],
    });
  };

  const handleSubjectSelection = (subject) => {
    setSelectedSubject(subject);
  };

  const floors = [
    { heading: 'Ground Floor', seats: ['LH 01', 'LH 02', 'IT Training', 'Internet Plaza'], seatCounts: ['104 seats', '82 seats', '24 seats', '18 seats'] },
    { heading: '1st Floor', seats: ['LH 18', 'E-hub'], seatCounts: ['155 seats', '12 seats'] },
    { heading: '2nd Floor', seats: ['Auditorium', 'LH 08', 'LH 10', 'PC 05'], seatCounts: ['272 seats', '116 seats', '84 seats', '51 seats'] },
    { heading: '3rd Floor', seats: ['LH 304', 'LH 20', 'LH 305', 'LH 308', 'LH 302', 'LH 307', 'LH 306'], seatCounts: ['21 seats', '45 seats', '56 seats', '32 seats', '28 seats', '28 seats', '23 seats'] },
    { heading: '4th Floor', seats: ['Harison Hall', 'PC 01', 'PC 03', 'Net Engi lab', 'Eng Lab', 'ICT E Lab'], seatCounts: ['140 seats', '47 seats', '38 seats', '35 seats', '26 seats', '24 seats'] },
  ];

  const [batches, setBatches] = useState(['DCSD_23.2FT', 'DCSD_24.1FT', 'DSE_24.1 FT', 'DSE_24.2 FT', 'HNDIS 23.2FT', 'HNDIS 24.1FT']);

  const handleAddBatch = () => {
    if (newBatchName) {
      setBatches([...batches, newBatchName]);
      setNewBatchName('');
      setIsAddingBatch(false);
    }
  };

  const handleRemoveBatch = (batchToRemove) => {
    setBatches(batches.filter(batch => batch !== batchToRemove));
    if (formData.batch === batchToRemove) {
      setFormData({ ...formData, batch: '', selectedSubjects: [] });
    }
  };

  const [nextMonthVisible, setNextMonthVisible] = useState(false);
  const [currentMonthDates, setCurrentMonthDates] = useState([]);
  const [nextMonthDates, setNextMonthDates] = useState([]);

  const handleCurrentMonthSelectionChange = (day) => {
    setCurrentMonthDates((prevDates) =>
      prevDates.includes(day)
        ? prevDates.filter((date) => date !== day)
        : [...prevDates, day]
    );
  };
 
  const handleNextMonthSelectionChange = (day) => {
    setNextMonthDates((prevDates) =>
      prevDates.includes(day)
        ? prevDates.filter((date) => date !== day)
        : [...prevDates, day]
    );
  };

  const fetchSubjectsByBatch = async (batch) => {
  try {
    // Query Firestore to get subjects for the selected batch
    const q = query(collection(db, "subjects"), where("batch", "==", batch)); // Assuming each subject has a "batch" field
    const querySnapshot = await getDocs(q);
    const fetchedSubjects = [];
    querySnapshot.forEach((doc) => {
      fetchedSubjects.push({ id: doc.id, ...doc.data() });
    });
    setSubjectsData(fetchedSubjects);
  } catch (error) {
    console.error("Error fetching subjects by batch:", error);
  }
};

// Trigger fetching subjects when a batch is selected
useEffect(() => {
  if (formData.batch) {
    fetchSubjectsByBatch(formData.batch);
  }
}, [formData.batch]);

const handleEditLecturer = (subjectId) => {
  setIsEditing(subjectId);
  const subject = subjectsData.find((sub) => sub.id === subjectId);
  setEditedLecturer(subject ? subject.lecturer : "");
};

const saveLecturer = async (subjectId) => {
  try {
    await db.collection("subjects").doc(subjectId).update({ lecturer: editedLecturer });
    const updatedSubjects = subjectsData.map((sub) =>
      sub.id === subjectId ? { ...sub, lecturer: editedLecturer } : sub
    );
    setSubjectsData(updatedSubjects);
    setIsEditing(null);
  } catch (error) {
    console.error("Error saving lecturer:", error);
  }
};

  return (
    <>
      <Header /> 
      
    <Container>
    <div style={{ margin: "20px 0", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem" }}>Hi {name}!</h1>
      </div>
  {/* Select Batch Section */}
<Typography variant="h4">Select Batch</Typography>
<Grid container spacing={2} mt={2}>
  {batches.map((batch) => (
    <Grid item key={batch} sx={{ position: 'relative' }}>
      <Tooltip
        title={
          <>
            <Typography variant="body2">Start Date: {new Date().toLocaleDateString()}</Typography>
            <Typography variant="body2">End Date: {new Date(new Date().setDate(new Date().getDate() + 7)).toLocaleDateString()}</Typography>
            <Typography variant="body2">Count: {Math.floor(Math.random() * 100)} </Typography>
          </>
        }
        placement="top"
      >
        <Button
          variant={formData.batch === batch ? 'contained' : 'outlined'}
          onClick={() => {
            handleSelectionChange('batch', batch);
            //setShowLecturerRoster(true); // Show the button when a batch is selected
          }}
        >
          {batch}
        </Button>
      </Tooltip>
      <IconButton
        sx={{ position: 'absolute', right: 0, top: 0 }}
        onClick={() => handleRemoveBatch(batch)}
        size="small"
      >
        <MinimizeIcon fontSize="small" />
      </IconButton>
    </Grid>
  ))}
  <Grid item>
    {isAddingBatch ? (
      <TextField
        value={newBatchName}
        onChange={(e) => setNewBatchName(e.target.value)}
        placeholder="Enter new batch name"
        variant="outlined"
        size="small"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleAddBatch();
          }
        }}
      />
    ) : (
      <IconButton aria-label="Add" onClick={() => setIsAddingBatch(true)}>
        <AddIcon />
      </IconButton>
    )}
    {/* <IconButton aria-label="Minimize" onClick={() => setIsAddingBatch(false)}>
      <MinimizeIcon />
    </IconButton> */}
  </Grid>
</Grid>

{/* View Lecturer Roster Button */}
{showLecturerRoster && (
  <Box sx={{ mt: 2 }}>
    <Button
      variant="outlined"
      onClick={toggleLecturerRoster}
      color="secondary"
    >
      View Lecturer Roster
    </Button>
  </Box>
)}


{formData.batch && (
  <Box sx={{ mt: 2 }}>
    <Typography variant="h6">Combine Batch</Typography>
    <Grid container spacing={2} mt={2}>
      {batches
        .filter((batch) => batch !== formData.batch) // Ensure selected batch isn't included in the UI
        .map((batch) => (
          <Grid item key={batch}>
            <Button
              variant={formData.batch.includes(batch) ? 'contained' : 'outlined'}
              onClick={() =>
                handleSelectionChange('batch', `${formData.batch}, ${batch}`)
              }
            >
              {batch}
            </Button>
          </Grid>
        ))}
    </Grid>
  </Box>
)}

<Box sx={{ mt: 4, mb: 4 }}>
  <Typography variant="h4">Select Subject</Typography>
  <Grid container spacing={2} mt={2}>
    {subjectsData.map((subject) => (
      <Grid item key={subject.id} xs={12} sm={6} md={4}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6">{subject.name}</Typography>
          <Typography variant="body2">Lecturer: {isEditing === subject.id ? (
            <TextField
              value={editedLecturer}
              onChange={(e) => setEditedLecturer(e.target.value)}
              size="small"
            />
          ) : (
            subject.lecturer
          )}</Typography>
          <Typography variant="body2">Hours: {subject.hours}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Button
              variant={selectedSubject === subject.id ? 'contained' : 'outlined'}
              onClick={() => setSelectedSubject(subject.id)}
            >
              Select
            </Button>
            {isEditing === subject.id ? (
              <Button
                variant="contained"
                size="small"
                onClick={() => saveLecturer(subject.id)}
              >
                Save
              </Button>
            ) : (
              <IconButton
                size="small"
                onClick={() => handleEditLecturer(subject.id)}
              >
                <EditIcon />
              </IconButton>
            )}
          </Box>
        </Paper>
      </Grid>
    ))}
  </Grid>
</Box>


            {/* Select Subject Section */}
            {formData.selectedSubjects.length > 0 && (
          <Box sx={{ mb: 4 }}>
          <Typography variant="h4">Select Subject</Typography>
          <Grid container spacing={2} mt={2}>
            {formData.selectedSubjects.map((subject) => (
              <Grid item key={subject}>
                <Button
                  variant={selectedSubject === subject ? 'contained' : 'outlined'}
                  onClick={() => handleSubjectSelection(subject)}
                >
                  {subject}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

     
      {/* Lecture Date Section */}
      {/* Current Month Date Selection */}
        <Box>
          <Typography variant="h4">Lecture Date</Typography>
          <Typography variant="h5">{currentMonth}</Typography>
          <Grid container spacing={1} mt={2} wrap="nowrap" sx={{ overflowX: 'auto' }}>
            {Array.from({ length: 31 }, (_, index) => {
              const day = String(index + 1).padStart(2, '0');
              return (
                <Grid item key={day}>
                  <Button
                    variant={currentMonthDates.includes(day) ? 'contained' : 'outlined'}
                    onClick={() => handleCurrentMonthSelectionChange(day)}
                  >
                    {day}
                  </Button>
                </Grid>
                  );
                })}
              </Grid>
                  </Box>

        {/* Next Month Button */}
        <Button
          variant="outlined"
          onClick={() => setNextMonthVisible((prev) => !prev)}
          sx={{ mt: 2 }}
        >
          Next Month
        </Button>
       
       
        {/* Next Month Date Selection */}
          {nextMonthVisible && (
            <Box>
              <Typography variant="h5">{nextMonth}</Typography>
              <Grid container spacing={1} mt={2} wrap="nowrap" sx={{ overflowX: 'auto' }}>
                {Array.from({ length: 31 }, (_, index) => {
                  const day = String(index + 1).padStart(2, '0');
                  return (
                    <Grid item key={day}>
                      <Button
                        variant={nextMonthDates.includes(day) ? 'contained' : 'outlined'}
                        onClick={() => handleNextMonthSelectionChange(day)}
                      >
                        {day}
                      </Button>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          )}


      {/* Lecture Type Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4">Lecture Type</Typography>
        <Grid container spacing={2} mt={2}>
          {['Lecture', 'Tutorial', 'Course Work', 'Lab Session'].map((type) => (
            <Grid item key={type}>
              <Button
                variant={formData.showType === type ? 'contained' : 'outlined'}
                onClick={() => handleSelectionChange('showType', type)}
              >
                {type}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Select Lecture Halls Section */}
      <Box sx={{ mb: 4 }}>
        {/* <Typography variant="h4">Select Lecture Halls</Typography>
        <Grid container spacing={2} mt={2} wrap="nowrap" sx={{ overflowX: 'auto' }}>
          {floors.map((floor) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={floor.heading}>
              <Typography variant="h5">{floor.heading}</Typography>
              {floor.seats.map((seat, index) => {
                const isBooked = bookedSeats.hasOwnProperty(seat);
                const isSelected = formData.seats.includes(seat);
                return (
                  <Tooltip
                    key={seat}
                    title={isBooked ? (
                      <>
                        <Typography variant="body2">Batch: {bookedSeats[seat].batch}</Typography>
                        <Typography variant="body2">Lecture: {bookedSeats[seat].lecture}</Typography>
                        <Typography variant="body2">Lecturer: {bookedSeats[seat].lecturer}</Typography>
                        <Typography variant="body2">Course Director: {bookedSeats[seat].courseDirector}</Typography>
                      </>
                    ) : ''}
                    placement="top"
                  >
                    <span>
                      <Paper
                        elevation={isSelected ? 3 : 1}
                        onClick={() => !isBooked && handleSeatSelection(seat)}
                        sx={{
                          padding: 2,
                          cursor: isBooked ? 'not-allowed' : 'pointer',
                          border: isSelected ? '2px solid blue' : isBooked ? '2px solid black' : '1px solid grey',
                          backgroundColor: isSelected ? 'blue' : isBooked ? 'black' : 'inherit',
                          color: isSelected || isBooked ? 'white' : 'inherit',
                          mb: 1,
                        }}
                      >
                        <Typography variant="h6">{seat}</Typography>
                        <Typography variant="body2">{floor.seatCounts[index]}</Typography>
                      </Paper>
                    </span>
                  </Tooltip>
                );
              })}
            </Grid>
          ))}
        </Grid> */}



        
         <Typography variant="h4">Select Lecture Halls</Typography>
        <Grid container spacing={2} mt={2} wrap="nowrap" sx={{ overflowX: 'auto' }}>
          {floors.map((floor) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={floor.heading}>
              <Typography variant="h5">{floor.heading}</Typography>
              {floor.seats.map((seat, index) => {
                const isBooked = bookedSeats.hasOwnProperty(seat);
                const isSelected = formData.seats.includes(seat);

                return (
                  <Tooltip
                    key={seat}
                    title={
                      isBooked ? (
                        <>
                          <Typography variant="body2">Batch: {bookedSeats[seat].batch}</Typography>
                          <Typography variant="body2">Lecture: {bookedSeats[seat].lecture}</Typography>
                          <Typography variant="body2">Lecturer: {bookedSeats[seat].lecturer}</Typography>
                          <Typography variant="body2">Course Director: {bookedSeats[seat].courseDirector}</Typography>
                        </>
                      ) : 'Available for booking'
                    }
                    placement="top"
                  >
                    <span>
                      <Paper
                        elevation={isSelected ? 3 : 1}
                        onClick={() => handleSeatSelection(seat)}
                        sx={{
                          padding: 2,
                          cursor: isBooked ? 'not-allowed' : 'pointer',
                          border: isSelected ? '2px solid blue' : isBooked ? '2px solid black' : '1px solid grey',
                          backgroundColor: isSelected ? 'blue' : isBooked ? 'black' : 'inherit',
                          color: isSelected || isBooked ? 'white' : 'inherit',
                          mb: 1,
                        }}
                      >
                        <Typography variant="h6">{seat}</Typography>
                        <Typography variant="body2">{floor.seatCounts[index]}</Typography>
                      </Paper>
                    </span>
                  </Tooltip>
                );
              })}
            </Grid>
          ))}
        </Grid></Box>

      {/* Display Selected Information */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6">Selected Lecture Dates: {formData.dates.join(', ')}</Typography>
        <Typography variant="h6">Selected Lecture Time: {formData.time}</Typography>
        <Typography variant="h6">Selected Lecture Type: {formData.showType}</Typography>
        <Typography variant="h6">Selected Lecture Hall: {formData.seats.join(', ')}</Typography>
      </Box>

      <Button variant="contained" color="primary">
        Reserve Hall
      </Button>
    </Container>
    <Footer />
    </>
  );
};

export default BookingForm;

