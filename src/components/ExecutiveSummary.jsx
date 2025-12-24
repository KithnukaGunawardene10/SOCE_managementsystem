import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
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
    <Box sx={{ mb: 4 }}>
      <Typography variant="h4">Executive Summary</Typography>
      <Paper sx={{ padding: 2, mt: 2 }}>
        <Typography variant="body1">
          <strong>Time:</strong> {executiveSummary.Time}
        </Typography>
        <Typography variant="body1">
          <strong>Batch:</strong> {executiveSummary.Batch}
        </Typography>
        <Typography variant="body1">
          <strong>Combined Batch:</strong> {executiveSummary.CombinedBatch}
        </Typography>
        <Typography variant="body1">
          <strong>Course Director:</strong> {executiveSummary.CourseDirector}
        </Typography>
        <Typography variant="body1">
          <strong>Dates:</strong> {executiveSummary.Date}
        </Typography>
        <Typography variant="body1">
          <strong>Lecture Type:</strong> {executiveSummary.Lecture}
        </Typography>
        <Typography variant="body1">
          <strong>Lecturer:</strong> {executiveSummary.Lecturer}
        </Typography>
        <Typography variant="body1">
          <strong>Subjects:</strong> {executiveSummary.Subject}
        </Typography>
        <Typography variant="body1">
          <strong>Halls:</strong> {executiveSummary.Hall}
        </Typography>
      </Paper>
      <Button
        variant="contained"
        color="primary"
        onClick={handleBooking}
        sx={{ mt: 2 }}
        disabled={!formData.time || !formData.batch || (formData.seats || []).length === 0}
      >
        Book
      </Button>
    </Box>
  );
};

export default ExecutiveSummary;
