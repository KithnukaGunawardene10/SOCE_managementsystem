import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, Stack } from '@mui/material';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const ExecutiveSummary = ({ formData = {}, name = 'Unknown', subjects = [] }) => {
  const [executiveSummary, setExecutiveSummary] = useState({
    Time: formData.time || 'Not selected',
    Batch: formData.batch || 'Not selected',
    CombinedBatch: formData.selectedCombinedBatch || 'None',
    CourseDirector: name || 'Unknown',
    Date: formData.dates?.join(', ') || 'Not selected',
    Lecture: formData.showType || 'Not selected',
    Lecturer: extractLecturer(formData.selectedSubjects || [], subjects),
    Subject: formData.selectedSubjects?.join(', ') || 'Not selected',
    Hall: formData.seats?.join(', ') || 'Not selected',
  });

  // Helper function to extract lecturer names from selected subjects
  const extractLecturer = (selectedSubjects, allSubjects) => {
    const lecturers = selectedSubjects
      .map((subject) =>
        allSubjects.find((item) => item.subject === subject)?.lecturer || 'Unknown'
      )
      .filter((lecturer, index, self) => self.indexOf(lecturer) === index); // Remove duplicates
    return lecturers.join(', ');
  };

  // Update the executive summary whenever formData or other props change
  useEffect(() => {
    setExecutiveSummary({
      Time: formData.time || 'Not selected',
      Batch: formData.batch || 'Not selected',
      CombinedBatch: formData.selectedCombinedBatch || 'None',
      CourseDirector: name || 'Unknown',
      Date: formData.dates?.join(', ') || 'Not selected',
      Lecture: formData.showType || 'Not selected',
      Lecturer: extractLecturer(formData.selectedSubjects || [], subjects),
      Subject: formData.selectedSubjects?.join(', ') || 'Not selected',
      Hall: formData.seats?.join(', ') || 'Not selected',
    });
  }, [formData, name, subjects]);

  // Function to save data to Firestore
  const handleBooking = async () => {
    try {
      for (const hall of formData.seats || []) {
        await setDoc(doc(db, 'bookedSeats', hall), {
          Time: executiveSummary.Time,
          Batch: executiveSummary.Batch,
          CombinedBatch: executiveSummary.CombinedBatch,
          CourseDirector: executiveSummary.CourseDirector,
          Date: executiveSummary.Date,
          Lecture: executiveSummary.Lecture,
          Lecturer: executiveSummary.Lecturer,
          Subject: executiveSummary.Subject,
        });
      }
      alert('Booking saved successfully!');
    } catch (error) {
      console.error('Error saving booking:', error);
      alert('Failed to save booking. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        mb: { xs: 8, sm: 6 }, // Extra bottom margin on mobile to avoid overlap with fixed elements
        px: { xs: 1, sm: 0 }, // Slight side padding on small screens
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
          textAlign: { xs: 'center', sm: 'left' },
        }}
      >
        Executive Summary
      </Typography>

      <Paper
        elevation={4}
        sx={{
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
          bgcolor: 'background.paper',
          boxShadow: 3,
        }}
      >
        <Stack spacing={{ xs: 2, sm: 2.5 }}>
          <Typography variant="body1" sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}>
            <strong>Time:</strong> {executiveSummary.Time}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}>
            <strong>Batch:</strong> {executiveSummary.Batch}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}>
            <strong>Combined Batch:</strong> {executiveSummary.CombinedBatch}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}>
            <strong>Course Director:</strong> {executiveSummary.CourseDirector}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}>
            <strong>Dates:</strong> {executiveSummary.Date}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}>
            <strong>Lecture Type:</strong> {executiveSummary.Lecture}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}>
            <strong>Lecturer:</strong> {executiveSummary.Lecturer}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}>
            <strong>Subjects:</strong> {executiveSummary.Subject}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}>
            <strong>Halls:</strong> {executiveSummary.Hall}
          </Typography>
        </Stack>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          onClick={handleBooking}
          disabled={!formData.time || !formData.batch || (formData.seats || []).length === 0}
          sx={{
            mt: { xs: 4, sm: 5 },
            py: { xs: 1.8, sm: 2 },
            fontSize: { xs: '1.1rem', sm: '1.2rem' },
            borderRadius: 2,
            textTransform: 'none',
            boxShadow: 3,
            '&:hover': {
              boxShadow: 6,
            },
          }}
        >
          Book Halls
        </Button>
      </Paper>
    </Box>
  );
};

export default ExecutiveSummary;