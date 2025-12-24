import Header from './Header';
import Footer from './Footer';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import MinimizeIcon from '@mui/icons-material/Remove';
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
  Stack,
  Chip,
} from '@mui/material';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../firebase';
import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

const BookingForm = () => {
  const location = useLocation();
  const { name } = location.state || {};

  const [bookedSeats, setBookedSeats] = useState({});
  const [formData, setFormData] = useState({
    dates: [],
    time: '',
    showType: '',
    seats: [],
    batch: '',
  });
  const [subjectsData, setSubjectsData] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [isEditing, setIsEditing] = useState(null);
  const [editedLecturer, setEditedLecturer] = useState("");

  const [batches, setBatches] = useState([
    'DCSD_23.2FT', 'DCSD_24.1FT', 'DSE_24.1 FT', 'DSE_24.2 FT',
    'HNDIS 23.2FT', 'HNDIS 24.1FT'
  ]);
  const [newBatchName, setNewBatchName] = useState('');
  const [isAddingBatch, setIsAddingBatch] = useState(false);

  const [currentMonthDates, setCurrentMonthDates] = useState([]);
  const [nextMonthDates, setNextMonthDates] = useState([]);
  const [nextMonthVisible, setNextMonthVisible] = useState(false);

  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
  const nextMonth = nextMonthDate.toLocaleString('default', { month: 'long' });

  const floors = [
    { heading: 'Ground Floor', seats: ['LH 01', 'LH 02', 'IT Training', 'Internet Plaza'], seatCounts: ['104 seats', '82 seats', '24 seats', '18 seats'] },
    { heading: '1st Floor', seats: ['LH 18', 'E-hub'], seatCounts: ['155 seats', '12 seats'] },
    { heading: '2nd Floor', seats: ['Auditorium', 'LH 08', 'LH 10', 'PC 05'], seatCounts: ['272 seats', '116 seats', '84 seats', '51 seats'] },
    { heading: '3rd Floor', seats: ['LH 304', 'LH 20', 'LH 305', 'LH 308', 'LH 302', 'LH 307', 'LH 306'], seatCounts: ['21 seats', '45 seats', '56 seats', '32 seats', '28 seats', '28 seats', '23 seats'] },
    { heading: '4th Floor', seats: ['Harison Hall', 'PC 01', 'PC 03', 'Net Engi lab', 'Eng Lab', 'ICT E Lab'], seatCounts: ['140 seats', '47 seats', '38 seats', '35 seats', '26 seats', '24 seats'] },
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

  useEffect(() => {
    fetchBookedSeats();
  }, []);

  // Fetch subjects when batch is selected
  const fetchSubjectsByBatch = async (batch) => {
    try {
      const q = query(collection(db, "subjects"), where("batch", "==", batch));
      const querySnapshot = await getDocs(q);
      const fetchedSubjects = [];
      querySnapshot.forEach((doc) => {
        fetchedSubjects.push({ id: doc.id, ...doc.data() });
      });
      setSubjectsData(fetchedSubjects);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  useEffect(() => {
    if (formData.batch) {
      fetchSubjectsByBatch(formData.batch);
    } else {
      setSubjectsData([]);
      setSelectedSubject('');
    }
  }, [formData.batch]);

  const handleSelectionChange = (key, value) => {
    if (key === 'batch') {
      setFormData({ ...formData, batch: value, seats: [], dates: [] });
      setSelectedSubject('');
    } else {
      setFormData({ ...formData, [key]: value });
    }
  };

  const handleSeatSelection = (seat) => {
    if (bookedSeats[seat]) return; // Prevent selecting booked seat
    setFormData(prev => ({
      ...prev,
      seats: prev.seats.includes(seat)
        ? prev.seats.filter(s => s !== seat)
        : [...prev.seats, seat]
    }));
  };

  const handleAddBatch = () => {
    if (newBatchName.trim()) {
      setBatches([...batches, newBatchName.trim()]);
      setNewBatchName('');
      setIsAddingBatch(false);
    }
  };

  const handleRemoveBatch = (batchToRemove) => {
    setBatches(batches.filter(b => b !== batchToRemove));
    if (formData.batch === batchToRemove) {
      setFormData({ ...formData, batch: '', seats: [] });
    }
  };

  const handleEditLecturer = (subjectId) => {
    const subject = subjectsData.find(s => s.id === subjectId);
    setEditedLecturer(subject?.lecturer || "");
    setIsEditing(subjectId);
  };

  return (
    <>
      <Header />

      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
        {/* Greeting */}
        <Typography variant="h4" align="center" gutterBottom sx={{ fontSize: { xs: '1.8rem', sm: '2.2rem' } }}>
          Hi {name || 'User'}!
        </Typography>

        {/* Select Batch */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" gutterBottom>Select Batch</Typography>
          <Stack direction="row" flexWrap="wrap" gap={1.5} sx={{ mt: 2 }}>
            {batches.map((batch) => (
              <Box key={batch} sx={{ position: 'relative' }}>
                <Tooltip
                  title={
                    <Box>
                      <Typography variant="body2">Active Period: Ongoing</Typography>
                      <Typography variant="body2">Students: ~80-120</Typography>
                    </Box>
                  }
                  placement="top"
                >
                  <Button
                    variant={formData.batch === batch ? 'contained' : 'outlined'}
                    onClick={() => handleSelectionChange('batch', batch)}
                    sx={{ minWidth: 120, py: 1.2 }}
                  >
                    {batch}
                  </Button>
                </Tooltip>
                <IconButton
                  size="small"
                  onClick={() => handleRemoveBatch(batch)}
                  sx={{ position: 'absolute', top: -8, right: -8, bgcolor: 'background.paper' }}
                >
                  <MinimizeIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}

            {isAddingBatch ? (
              <TextField
                autoFocus
                size="small"
                value={newBatchName}
                onChange={(e) => setNewBatchName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddBatch()}
                onBlur={handleAddBatch}
                placeholder="New batch..."
                sx={{ width: 140 }}
              />
            ) : (
              <IconButton onClick={() => setIsAddingBatch(true)} color="primary">
                <AddIcon />
              </IconButton>
            )}
          </Stack>
        </Box>

        {/* Subjects (Only if batch selected) */}
        {formData.batch && subjectsData.length > 0 && (
          <Box sx={{ mb: 5 }}>
            <Typography variant="h5" gutterBottom>Select Subject</Typography>
            <Grid container spacing={2}>
              {subjectsData.map((subject) => (
                <Grid item xs={12} sm={6} md={4} key={subject.id}>
                  <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6">{subject.name}</Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Lecturer:{' '}
                      {isEditing === subject.id ? (
                        <TextField
                          size="small"
                          value={editedLecturer}
                          onChange={(e) => setEditedLecturer(e.target.value)}
                          sx={{ width: 120 }}
                        />
                      ) : (
                        subject.lecturer || 'Not assigned'
                      )}
                    </Typography>
                    <Typography variant="body2">Hours: {subject.hours || 'N/A'}</Typography>

                    <Box sx={{ mt: 'auto', pt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Button
                        size="small"
                        variant={selectedSubject === subject.id ? 'contained' : 'outlined'}
                        onClick={() => setSelectedSubject(subject.id)}
                      >
                        Select
                      </Button>
                      {isEditing === subject.id ? (
                        <Button size="small" variant="contained" color="success">
                          Save
                        </Button>
                      ) : (
                        <IconButton size="small" onClick={() => handleEditLecturer(subject.id)}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      )}
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Lecture Date */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" gutterBottom>Lecture Date</Typography>

          {/* Current Month */}
          <Typography variant="h6" sx={{ mt: 2 }}>{currentMonth}</Typography>
          <Grid container spacing={1} sx={{ mt: 1, overflowX: 'auto', flexWrap: 'nowrap', pb: 1 }}>
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
              <Grid item key={day}>
                <Button
                  variant={currentMonthDates.includes(String(day).padStart(2, '0')) ? 'contained' : 'outlined'}
                  onClick={() => {
                    const formatted = String(day).padStart(2, '0');
                    setCurrentMonthDates(prev =>
                      prev.includes(formatted)
                        ? prev.filter(d => d !== formatted)
                        : [...prev, formatted]
                    );
                  }}
                  sx={{ minWidth: 48 }}
                >
                  {day}
                </Button>
              </Grid>
            ))}
          </Grid>

          {/* Toggle Next Month */}
          <Button
            variant="text"
            onClick={() => setNextMonthVisible(!nextMonthVisible)}
            sx={{ mt: 2 }}
          >
            {nextMonthVisible ? 'Hide' : 'Show'} {nextMonth}
          </Button>

          {/* Next Month */}
          {nextMonthVisible && (
            <>
              <Typography variant="h6" sx={{ mt: 2 }}>{nextMonth}</Typography>
              <Grid container spacing={1} sx={{ mt: 1, overflowX: 'auto', flexWrap: 'nowrap', pb: 1 }}>
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <Grid item key={day}>
                    <Button
                      variant={nextMonthDates.includes(String(day).padStart(2, '0')) ? 'contained' : 'outlined'}
                      onClick={() => {
                        const formatted = String(day).padStart(2, '0');
                        setNextMonthDates(prev =>
                          prev.includes(formatted)
                            ? prev.filter(d => d !== formatted)
                            : [...prev, formatted]
                        );
                      }}
                      sx={{ minWidth: 48 }}
                    >
                      {day}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Box>

        {/* Lecture Type */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" gutterBottom>Lecture Type</Typography>
          <Stack direction="row" flexWrap="wrap" gap={2} sx={{ mt: 2 }}>
            {['Lecture', 'Tutorial', 'Course Work', 'Lab Session'].map((type) => (
              <Button
                key={type}
                variant={formData.showType === type ? 'contained' : 'outlined'}
                onClick={() => handleSelectionChange('showType', type)}
                sx={{ minWidth: 120 }}
              >
                {type}
              </Button>
            ))}
          </Stack>
        </Box>

        {/* Select Lecture Halls */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" gutterBottom>Select Lecture Hall</Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {floors.map((floor) => (
              <Grid item xs={12} md={6} lg={4} key={floor.heading}>
                <Typography variant="h6" color="primary" gutterBottom>
                  {floor.heading}
                </Typography>
                <Stack spacing={2}>
                  {floor.seats.map((seat, index) => {
                    const isBooked = bookedSeats[seat];
                    const isSelected = formData.seats.includes(seat);

                    return (
                      <Tooltip
                        key={seat}
                        title={
                          isBooked ? (
                            <Box>
                              <Typography variant="body2">Batch: {isBooked.batch}</Typography>
                              <Typography variant="body2">Subject: {isBooked.subject}</Typography>
                              <Typography variant="body2">Lecturer: {isBooked.lecturer}</Typography>
                            </Box>
                          ) : 'Available'
                        }
                        placement="top"
                      >
                        <Paper
                          onClick={() => !isBooked && handleSeatSelection(seat)}
                          sx={{
                            p: 2.5,
                            textAlign: 'center',
                            cursor: isBooked ? 'not-allowed' : 'pointer',
                            bgcolor: isSelected ? 'primary.main' : isBooked ? 'grey.800' : 'background.paper',
                            color: isSelected || isBooked ? 'white' : 'text.primary',
                            border: isSelected ? '3px solid #1976d2' : '1px solid',
                            borderColor: isBooked ? 'grey.600' : 'grey.300',
                            opacity: isBooked ? 0.7 : 1,
                            transition: 'all 0.2s',
                            '&:hover': !isBooked && !isSelected && { bgcolor: 'action.hover' }
                          }}
                        >
                          <Typography variant="subtitle1" fontWeight="bold">
                            {seat}
                          </Typography>
                          <Typography variant="body2">
                            {floor.seatCounts[index]}
                          </Typography>
                        </Paper>
                      </Tooltip>
                    );
                  })}
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Summary */}
        <Paper sx={{ p: 3, bgcolor: 'grey.100', mb: 4 }}>
          <Typography variant="h6" gutterBottom>Booking Summary</Typography>
          <Typography><strong>Batch:</strong> {formData.batch || 'Not selected'}</Typography>
          <Typography><strong>Subject:</strong> {selectedSubject ? subjectsData.find(s => s.id === selectedSubject)?.name : 'Not selected'}</Typography>
          <Typography><strong>Dates:</strong> {[...currentMonthDates, ...nextMonthDates].join(', ') || 'None'}</Typography>
          <Typography><strong>Type:</strong> {formData.showType || 'Not selected'}</Typography>
          <Typography><strong>Hall(s):</strong> {formData.seats.join(', ') || 'None'}</Typography>
        </Paper>

        <Box textAlign="center">
          <Button
            variant="contained"
            size="large"
            color="success"
            sx={{ px: 6, py: 1.5, fontSize: '1.1rem' }}
            disabled={!formData.batch || formData.seats.length === 0}
          >
            Reserve Hall
          </Button>
        </Box>
      </Container>

      <Footer />
    </>
  );
}; 

export default BookingForm;