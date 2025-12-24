
// //////////////////////////////////////////////////

// import React, { useState, useEffect } from 'react';
// import {
//   Button,
//   Grid,
//   Typography,
//   Box,
//   Paper,
//   Container,
//   Tooltip,
//   TextField,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   BottomNavigation,
//   BottomNavigationAction,
// } from '@mui/material';

// import {
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import Collapse from "@mui/material/Collapse";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ExpandLessIcon from "@mui/icons-material/ExpandLess";
// import SaveIcon from '@mui/icons-material/Save';
// import EditIcon from '@mui/icons-material/Edit';
// import AddIcon from '@mui/icons-material/Add';
// import MinimizeIcon from '@mui/icons-material/Remove';
// import { updateDoc, doc,collection, query, where, getDocs, addDoc, setDoc } from "firebase/firestore";
// import { Home, Search, AddBox, Favorite, Person } from "@mui/icons-material";

// import { db } from '../firebase'; // Import Firestore configuration
// import { useLocation } from "react-router-dom"; // To retrieve the name from login
// import Header from './Header';
// import Footer from './Footer';
// import ExecutiveSummary from './ExecutiveSummary';


// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
// import Brightness4Icon from "@mui/icons-material/Brightness4";
// import Brightness7Icon from "@mui/icons-material/Brightness7";
// import Switch from "@mui/material/Switch";
// import FormControlLabel from "@mui/material/FormControlLabel";

// import { useNavigate } from "react-router-dom";


// const CoursedirectorBooking = () => {

//   const [bookedSeats, setBookedSeats] = useState({}); // Initially empty
// const [currentMonthDates, setCurrentMonthDates] = useState([]); // Initially no selected dates
// const [nextMonthDates, setNextMonthDates] = useState([]); // Initially no selected dates
// const [datesSelected, setDatesSelected] = useState(false); // Track if any dates are selected

//   const location = useLocation();
//   const { name } = location.state || {}; // Get name from state
//   const [batches, setBatches] = useState([]);
//   const [formData, setFormData] = useState({
//     dates: [],
//     time: '',
//     showType: '',
//     seats: [],
//     batch: '',
//     selectedSubjects: [],
//   });

//   const [darkMode, setDarkMode] = useState(false);
//   const theme = createTheme({
//     palette: {
//       mode: darkMode ? "dark" : "light",
//     },
//     typography: {
//       fontFamily: "Trebuchet MS, sans-serif",
//     },
//   });

//   const toggleDarkMode = () => {
//     setDarkMode((prevMode) => !prevMode);
//   };
  
//   const [value, setValue] = useState(0);
//   const navigate = useNavigate();

//   const [open, setOpen] = useState(false);
//   const [newBatchData, setNewBatchData] = useState({
//     batch: '',
//     courseDirector: '',
//     count: '',
//     startDate: '',
//     endDate: '',
//     subjects: [],
//   });

//   const [combinedBatches, setCombinedBatches] = useState([]); // State for combined batches
// // Combine selected dates from both months
// const allSelectedDates = [...currentMonthDates, ...nextMonthDates]; 

// useEffect(() => {
//   setFormData((prev) => ({
//     ...prev,
//     dates: allSelectedDates, // Update formData.dates with the combined dates
//   }));
// }, [currentMonthDates, nextMonthDates]); // Runs whenever either changes

//   const fetchBookedSeats = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, "bookedSeats"));
//       const seatsData = {};
//       querySnapshot.forEach((doc) => {
//         seatsData[doc.id] = doc.data();
//       });
//       setBookedSeats(seatsData); // Update state with fetched data
//     } catch (error) {
//       console.error("Error fetching booked seats:", error);
//     }
//   };

  

//   useEffect(() => {
//     const fetchBatchData = async () => {
//       if (!name) return; // Skip if no name is provided
//       try {
//         const batchQuery = query(
//           collection(db, "batches"),
//           where("courseDirector", "==", name.toLowerCase())
//         );
//         const querySnapshot = await getDocs(batchQuery);
//         const batchesData = [];
//         querySnapshot.forEach((doc) => {
//           const data = doc.data();
//           batchesData.push({
//             id: doc.id,
//             batch: data.batch,
//             courseDirector: data.courseDirector,
//             count: data.count,
//             startDate: data.startDate.toDate(),
//             endDate: data.endDate.toDate(),
//             subjects: data.subjects || [],
//           });
//         });
//         setBatches(batchesData);
//       } catch (error) {
//         console.error("Error fetching batch data:", error);
//       }
//     };

//     fetchBatchData();
//   }, [name]);

//   const currentDate = new Date();
//    const [nextMonthVisible, setNextMonthVisible] = useState(false);
  

//   // Handlers to manage selected dates
//   const handleCurrentMonthSelectionChange = (day) => {
//     const selectedDay = `${new Date().getFullYear()}-${String(
//       new Date().getMonth() + 1
//     ).padStart(2, "0")}-${day}`;
  
//     setCurrentMonthDates((prevDates) => {
//       const newDates = prevDates.includes(selectedDay)
//         ? prevDates.filter((date) => date !== selectedDay)
//         : [...prevDates, selectedDay];
//       setDatesSelected(newDates.length > 0); // Set flag based on whether dates exist
//       return newDates;
//     });
//   };
  
//   const handleNextMonthSelectionChange = (day) => {
//     const selectedDay = `${new Date().getFullYear()}-${String(
//       new Date().getMonth() + 2
//     ).padStart(2, "0")}-${day}`;
  
//     setNextMonthDates((prevDates) => {
//       const newDates = prevDates.includes(selectedDay)
//         ? prevDates.filter((date) => date !== selectedDay)
//         : [...prevDates, selectedDay];
//       setDatesSelected(newDates.length > 0); // Set flag based on whether dates exist
//       return newDates;
//     });
//   };
  

// // useEffect to fetch booked seats only when dates are selected
// useEffect(() => {
//   const allSelectedDates = [...currentMonthDates, ...nextMonthDates];

//   // Exit early if no dates are selected
//   if (!datesSelected || allSelectedDates.length === 0) {
//     setBookedSeats({}); // Ensure bookedSeats is empty
//     return; // Do not fetch data
//   }

//   const fetchBookedSeatsForDates = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, "bookedSeats"));
//       const seatsData = {};

//       querySnapshot.forEach((doc) => {
//         const data = doc.data();

//         // Check if the booking date matches any selected date
//         if (allSelectedDates.includes(data.date)) {
//           if (!seatsData[doc.id]) {
//             seatsData[doc.id] = {
//               ...data,
//               dates: [data.date], // Initialize with the first date
//             };
//           } else {
//             seatsData[doc.id].dates.push(data.date); // Add additional dates for the same seat
//           }
//         }
//       });

//       setBookedSeats(seatsData); // Update bookedSeats with filtered data
//     } catch (error) {
//       console.error("Error fetching booked seats for selected dates:", error);
//     }
//   };

//   fetchBookedSeatsForDates();
// }, [currentMonthDates, nextMonthDates, datesSelected]); // Trigger only when these change



//   const handleSelectionChange = (key, value) => {
//     if (key === 'batch') {
//       setFormData({ ...formData, batch: value });
//       //fetchCombinedBatches(value); // Fetch combined batches for selected batch
//       //fetchSubjects(value); // Fetch subjects for selected batc
//       fetchSubjectsForBatch(value);
//       fetchCombinedBatches(value); // Fetch combined batches for the selected batch
//       setFormData((prev) => ({ ...prev, batch: value }));
//     }
//   };


//   const fetchCombinedBatches = async (selectedBatch) => {
//     if (!selectedBatch) return;
  
//     // Extract prefix: Everything before the first space or number
//     const prefixMatch = selectedBatch.match(/^[^\s\d]+/); // Match everything before the first space or digit
//     const prefix = prefixMatch ? prefixMatch[0] : ''; // Fallback to empty string if no match
  
//     if (!prefix) return; // Skip if no valid prefix is found
  
//     try {
//       // Query Firestore for batches with the same prefix
//       const combinedQuery = query(
//         collection(db, "batches"),
//         where("batch", ">=", prefix), // Start of the prefix range
//         where("batch", "<", prefix + "\uf8ff") // End of the prefix range
//       );
  
//       const querySnapshot = await getDocs(combinedQuery);
  
//       // Map Firestore documents to combinedData
//       const combinedData = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//         startDate: doc.data().startDate?.toDate(), // Convert Firestore timestamps to Date
//         endDate: doc.data().endDate?.toDate(),
//       }));
  
//       console.log("Extracted Prefix:", prefix); // Debugging: Check the extracted prefix
//       console.log("Fetched Combined Batches:", combinedData); // Debugging: Check fetched data
  
//       setCombinedBatches(combinedData); // Update state with fetched data
//     } catch (error) {
//       console.error("Error fetching combined batches:", error);
//       setCombinedBatches([]); // Clear state on error
//     }
//   };
  
  
  
  
  
  

//   const handleRemoveBatch = (batchToRemove) => {
//     setBatches(batches.filter(batch => batch.batch !== batchToRemove));
//     if (formData.batch === batchToRemove) {
//       setFormData({ ...formData, batch: '', selectedSubjects: [] });
//     }
//   };

//   const handleAddSubjectGroup = () => {
//     setNewBatchData((prev) => ({
//       ...prev,
//       subjects: [...prev.subjects, { subject: '', lecturer: '', hours: '' }],
//     }));
//   };

//   const handleSaveBatch = async () => {
//     const { batch, courseDirector, count, startDate, endDate, subjects } = newBatchData;
  
//     // Validation
//     if (!batch || !courseDirector || !count || !startDate || !endDate) {
//       alert("Please fill in all the fields.");
//       return;
//     }
  
//     try {
//       await addDoc(collection(db, "batches"), {
//         batch,
//         courseDirector: courseDirector.toLowerCase(),
//         count,
//         startDate: new Date(startDate),
//         endDate: new Date(endDate),
//         subjects,
//       });
//       alert("Batch added successfully!");
//       setOpen(false);
//       setNewBatchData({
//         batch: '',
//         courseDirector: '',
//         count: '',
//         startDate: '',
//         endDate: '',
//         subjects: [],
//       });
//       // Refresh batch data
//       const querySnapshot = await getDocs(
//         query(
//           collection(db, "batches"),
//           where("courseDirector", "==", name.toLowerCase())
//         )
//       );
//       const updatedBatches = [];
//       querySnapshot.forEach((doc) => {
//         const data = doc.data();
//         updatedBatches.push({
//           id: doc.id,
//           ...data,
//           startDate: data.startDate.toDate(),
//           endDate: data.endDate.toDate(),
//         });
//       });
//       setBatches(updatedBatches);
//     } catch (error) {
//       console.error("Error saving batch:", error);
//       alert("Failed to save batch. Please try again.");
//     }
//   };

//   const handleInputChange = (key, value, index = null) => {
//     if (index !== null) {
//       setNewBatchData((prev) => {
//         const updatedSubjects = [...prev.subjects];
//         updatedSubjects[index][key] = value;
//         return { ...prev, subjects: updatedSubjects };
//       });
//     } else {
//       setNewBatchData((prev) => ({ ...prev, [key]: value }));
//     }
//   };

//   const floors = [
//     { heading: 'Ground Floor', seats: ['LH 01', 'LH 02', 'IT Training', 'Internet Plaza'], seatCounts: ['104 seats', '82 seats', '24 seats', '18 seats'] },
//     { heading: '1st Floor', seats: ['LH 18', 'E-hub'], seatCounts: ['155 seats', '12 seats'] },
//     { heading: '2nd Floor', seats: ['Auditorium', 'LH 08', 'LH 10', 'PC 05'], seatCounts: ['272 seats', '116 seats', '84 seats', '51 seats'] },
//     { heading: '3rd Floor', seats: ['LH 304', 'LH 20', 'LH 305', 'LH 308', 'LH 302', 'LH 307', 'LH 306'], seatCounts: ['21 seats', '45 seats', '56 seats', '32 seats', '28 seats', '28 seats', '23 seats'] },
//     { heading: '4th Floor', seats: ['Harison Hall', 'PC 01', 'PC 03', 'Net Engi lab', 'Eng Lab', 'ICT E Lab'], seatCounts: ['140 seats', '47 seats', '38 seats', '35 seats', '26 seats', '24 seats'] },
//   ];

//   // const floors = [
//   //   { heading: 'Ground Floor', seats: ['LH 01', 'LH 02', 'IT Training', 'Internet Plaza'] },
//   //   { heading: '1st Floor', seats: ['LH 18', 'LH 17'] },
//   //   { heading: '2nd Floor', seats: ['Auditorium', 'LH 03','LH 04','LH 05','LH 06','LH 07','LH 08', 'LH 10', 'PC 05'] },
//   //   { heading: '3rd Floor', seats: ['LH 20','LH 301','LH 302','LH 303','LH 304','LH 305','LH 306','LH 307','LH 308'] },
//   //   { heading: '4th Floor', seats: ['Harison Hall', 'PC 01', 'PC 03', 'Net Engi lab', 'Eng Lab', 'ICT E Lab'] },
//   // ];

//   const handleSeatSelection = (seat) => {
//     if (bookedSeats.hasOwnProperty(seat)) return; // Prevent selection of booked seats
//     const isSelected = formData.seats.includes(seat);
//     setFormData({
//       ...formData,
//       seats: isSelected ? formData.seats.filter((s) => s !== seat) : [...formData.seats, seat],
//     });
//   };

//   const [subjects, setSubjects] = useState([]); // State for subjects of the selected batch

//   const fetchSubjects = async (batch) => {
//     try {
//       const batchQuery = query(
//         collection(db, "batches"),
//         where("batch", "==", batch)
//       );
//       const querySnapshot = await getDocs(batchQuery);
//       const batchSubjects = [];
//       querySnapshot.forEach((doc) => {
//         const data = doc.data();
//         if (data.subjects) {
//           batchSubjects.push(...data.subjects);
//         }
//       });
//       setSubjects(batchSubjects);
//     } catch (error) {
//       console.error("Error fetching subjects:", error);
//     }
//   };

//   const handleToggleEdit = (subjectIndex, action) => {
//     setSubjects((prevSubjects) =>
//       prevSubjects.map((subject, index) =>
//         index === subjectIndex
//           ? {
//               ...subject,
//               isEditing: action === 'edit',
//             }
//           : subject
//       )
//     );
  
//     if (action === 'save') {
//       const updatedSubject = subjects[subjectIndex];
//       saveSubjectToDatabase(updatedSubject);
//     }
//   };

//   const handleSubjectEdit = (subjectIndex, key, value) => {
//     setSubjects((prevSubjects) =>
//       prevSubjects.map((subject, index) =>
//         index === subjectIndex
//           ? {
//               ...subject,
//               [key]: value,
//             }
//           : subject
//       )
//     );
//   };
//   //import { updateDoc, doc } from 'firebase/firestore';

//   const saveSubjectToDatabase = async (subjectIndex) => {
//     try {
//       const batchRef = collection(db, 'batches');
//       const batchQuery = query(batchRef, where('batch', '==', formData.batch));
//       const batchSnapshot = await getDocs(batchQuery);
  
//       batchSnapshot.forEach(async (docSnapshot) => {
//         const batchData = docSnapshot.data();
//         const updatedSubjects = batchData.subjects.map((subject, index) =>
//           index === subjectIndex ? subjects[subjectIndex] : subject
//         );
  
//         const docRef = doc(db, 'batches', docSnapshot.id); // Get document reference
//         await updateDoc(docRef, { subjects: updatedSubjects }); // Update Firestore
  
//         alert('Subject updated successfully!');
//       });
  
//       handleCancelEdit(subjectIndex); // Exit edit mode
//     } catch (error) {
//       console.error('Error updating subject:', error);
//       alert('Failed to update subject.');
//     }
//   };
  
// const handleEditClick = (subjectIndex) => {
//   setSubjects((prevSubjects) =>
//     prevSubjects.map((subject, index) =>
//       index === subjectIndex
//         ? {
//             ...subject,
//             isEditing: true,
//           }
//         : {
//             ...subject,
//             isEditing: false, // Ensure only one subject is in edit mode
//           }
//     )
//   );
// };

// const handleFieldChange = (subjectIndex, field, value) => {
//   setSubjects((prevSubjects) =>
//     prevSubjects.map((subject, index) =>
//       index === subjectIndex
//         ? {
//             ...subject,
//             [field]: value,
//           }
//         : subject
//     )
//   );
// };

// const handleCancelEdit = (subjectIndex) => {
//   setSubjects((prevSubjects) =>
//     prevSubjects.map((subject, index) =>
//       index === subjectIndex
//         ? {
//             ...subject,
//             isEditing: false,
//           }
//         : subject
//     )
//   );
// };

// const fetchSubjectsForBatch = async (batchCode) => {
//   if (!batchCode) return;

//   try {
//     const batchQuery = query(
//       collection(db, 'coursebatches'),
//       where('batchCode', '==', batchCode)
//     );
//     const querySnapshot = await getDocs(batchQuery);

//     if (!querySnapshot.empty) {
//       const batchDoc = querySnapshot.docs[0];
//       const subjectsData = batchDoc.data().subjects || [];
//       setSubjects(subjectsData); // Update the subjects state with fetched data
//     } else {
//       setSubjects([]); // No subjects found for this batch
//     }
//   } catch (error) {
//     console.error('Error fetching subjects for batch:', error);
//   }
// };

// useEffect(() => {
//   if (formData.batch) {
//     fetchSubjectsForBatch(formData.batch); // Fetch subjects when a batch is selected
//   }
// }, [formData.batch]);

// const filterBookedSeatsByDate = async (selectedDate) => {
//   try {
//     const querySnapshot = await getDocs(collection(db, "bookedSeats"));
//     const seatsData = {};
//     querySnapshot.forEach((doc) => {
//       const data = doc.data();
//       if (data.date === selectedDate) {
//         seatsData[doc.id] = data;
//       }
//     });
//     setBookedSeats(seatsData); // Update the state with filtered data
//   } catch (error) {
//     console.error("Error filtering booked seats by date:", error);
//   }
// };

// const filterBookedSeatsByDates = async (selectedDates) => {
//   if (selectedDates.length === 0) {
//     setBookedSeats({}); // Clear booked seats if no dates are selected
//     return;
//   }

//   try {
//     const querySnapshot = await getDocs(collection(db, "bookedSeats"));
//     const seatsData = {};

//     querySnapshot.forEach((doc) => {
//       const data = doc.data();
//       if (selectedDates.includes(data.date)) {
//         if (!seatsData[doc.id]) {
//           seatsData[doc.id] = {
//             ...data,
//             dates: [data.date], // Initialize with the first date
//           };
//         } else {
//           seatsData[doc.id].dates.push(data.date); // Add additional dates for the same seat
//         }
//       }
//     });

//     setBookedSeats(seatsData); // Update state with filtered data
//   } catch (error) {
//     console.error("Error filtering booked seats by dates:", error);
//   }
// };

// const [currentMonth, setCurrentMonth] = useState('');
// const [nextMonth, setNextMonth] = useState('');

// useEffect(() => {
//   const updateMonths = () => {
//     const now = new Date();
//     const currentMonthName = now.toLocaleString('default', { month: 'long' });
//     const nextMonthName = new Date(now.getFullYear(), now.getMonth() + 1).toLocaleString('default', { month: 'long' });

//     setCurrentMonth(currentMonthName);
//     setNextMonth(nextMonthName);
//   };

//   updateMonths(); // Initial setup

//   const intervalId = setInterval(updateMonths, 1000 * 60 * 60); // Check every hour

//   return () => clearInterval(intervalId); // Clean up interval on component unmount
// }, []);

// const [courses, setCourses] = useState([]);
// const [selectedCourse, setSelectedCourse] = useState("");
// const [batchNumber, setBatchNumber] = useState("");
// const [newCourse, setNewCourse] = useState("");
// const [showAddBatch, setShowAddBatch] = useState(false); 


//   // Fetch courses from the database in real-time
//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "courses"));
//         const coursesData = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           name: doc.data().name,
//         }));
//         setCourses(coursesData);
//       } catch (error) {
//         console.error("Error fetching courses:", error);
//       }
//     };

//     fetchCourses();
//   }, []);

//   const handleAddCourse = async () => {
//     try {
//       await addDoc(collection(db, "courses"), { name: newCourse });
//       alert("New course added successfully!");
//       setOpen(false);
//       setNewCourse("");

//       // Refetch courses to update the dropdown in real-time
//       const querySnapshot = await getDocs(collection(db, "courses"));
//       const updatedCourses = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         name: doc.data().name,
//       }));
//       setCourses(updatedCourses);
//     } catch (error) {
//       console.error("Error adding new course:", error);
//       alert("Failed to add new course. Please try again.");
//     }
//   };
//   useEffect(() => {
//     const fetchBatchesRealtime = async () => {
//       if (!name) return; // Skip fetching if name is not available
  
//       try {
//         const querySnapshot = await getDocs(collection(db, "coursebatches"));
//         const filteredBatches = querySnapshot.docs
//           .filter((doc) =>
//             doc.data().courseDirector?.toLowerCase() === name.toLowerCase()
//           ) // Match courseDirector (case-insensitive)
//           .map((doc) => ({
//             id: doc.id,
//             batchCode: doc.data().batchCode,
//             batchCount: doc.data().batchCount,
//             startDate: new Date(doc.data().startDate), // Convert Firestore timestamp to Date
//             endDate: new Date(doc.data().endDate),
//           }));
  
//         setBatches(filteredBatches); // Update state with filtered batches
//       } catch (error) {
//         console.error("Error fetching batches:", error);
//       }
//     };
  
//     fetchBatchesRealtime();
//   }, [name]); // Re-run when name change

//   const [allCombinedBatches, setAllCombinedBatches] = useState([]); // State for all combined batches

// useEffect(() => {
//   const fetchAllCombinedBatches = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, "coursebatches"));
//       const combinedBatchesData = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         courseDirector: doc.data().courseDirector || "Unknown", // Default to 'Unknown' if missing
//         batchCode: doc.data().batchCode,
//         batchCount: doc.data().batchCount,
//         startDate: new Date(doc.data().startDate), // Convert Firestore timestamp to Date
//         endDate: new Date(doc.data().endDate),
//       }));
//       setAllCombinedBatches(combinedBatchesData); // Store all combined batches
//     } catch (error) {
//       console.error("Error fetching all combined batches:", error);
//     }
//   };

//   fetchAllCombinedBatches();
// }, []); // Runs once on component mount
 
  
// const [openAddSubject, setOpenAddSubject] = useState(false); // State for "Add Subject" dialog
// const [openEditSubject, setOpenEditSubject] = useState(false); // Edit Subject Dialog State
// const [editSubjectData, setEditSubjectData] = useState({
//   subject: '',
//   lecturer: '',
//   hours: '',
//   index: null, // Index of the subject being edited
// });
// const [newSubjectData, setNewSubjectData] = useState({
//   subject: '',
//   lecturer: '',
//   hours: '',
// });

// const handleEditSubject = (subject, index) => {
//   setEditSubjectData({ ...subject, index }); // Set the selected subject's data for editing
//   setOpenEditSubject(true);
// };

// const handleUpdateSubject = async () => {
//   if (!formData.batch) {
//     alert('Please select a batch before editing a subject.');
//     return;
//   }

//   const { subject, lecturer, hours, index } = editSubjectData;

//   // Validation
//   if (!subject || !lecturer || !hours) {
//     alert('Please fill in all fields.');
//     return;
//   }

//   try {
//     // Get the reference to the selected batch
//     const batchQuery = query(
//       collection(db, 'coursebatches'),
//       where('batchCode', '==', formData.batch)
//     );
//     const batchSnapshot = await getDocs(batchQuery);

//     if (!batchSnapshot.empty) {
//       const batchDoc = batchSnapshot.docs[0];
//       const batchRef = doc(db, 'coursebatches', batchDoc.id);

//       // Update the specific subject in the subjects array
//       const updatedSubjects = [...subjects];
//       updatedSubjects[index] = { subject, lecturer, hours };

//       await updateDoc(batchRef, { subjects: updatedSubjects });

//       // Close dialog and reset the form
//       setOpenEditSubject(false);
//       setEditSubjectData({ subject: '', lecturer: '', hours: '', index: null });

//       // Fetch updated subjects in real time
//       fetchSubjectsForBatch(formData.batch);
//       alert('Subject updated successfully!');
//     } else {
//       alert('Batch not found.');
//     }
//   } catch (error) {
//     console.error('Error updating subject:', error);
//     alert('Failed to update subject. Please try again.');
//   }
// };

// useEffect(() => {
//   if (formData.batch) {
//     fetchSubjectsForBatch(formData.batch);
//   }
// }, [formData.batch]);

// const handleSaveSubject = async () => {
//   if (!formData.batch) {
//     alert('Please select a batch before adding a subject.');
//     return;
//   }

//   const { subject, lecturer, hours } = newSubjectData;

//   if (!subject || !lecturer || !hours) {
//     alert('Please fill in all fields.');
//     return;
//   }

//   try {
//     const batchQuery = query(
//       collection(db, 'coursebatches'),
//       where('batchCode', '==', formData.batch)
//     );
//     const batchSnapshot = await getDocs(batchQuery);

//     if (!batchSnapshot.empty) {
//       const batchDoc = batchSnapshot.docs[0];
//       const batchRef = doc(db, 'coursebatches', batchDoc.id);

//       const updatedSubjects = [
//         ...(batchDoc.data().subjects || []),
//         { subject, lecturer, hours },
//       ];

//       await updateDoc(batchRef, { subjects: updatedSubjects });

//       setOpenAddSubject(false);
//       setNewSubjectData({ subject: '', lecturer: '', hours: '' });

//       // Refresh subjects in real-time
//       fetchSubjectsForBatch(formData.batch);
//       alert('Subject added successfully!');
//     } else {
//       alert('Batch not found.');
//     }
//   } catch (error) {
//     console.error('Error saving subject:', error);
//     alert('Failed to save subject. Please try again.');
//   }
// };

// const handleSubjectSelection = (subject) => {
//   setFormData((prev) => {
//     const isSelected = prev.selectedSubjects.includes(subject.subject);

//     const updatedSubjects = isSelected
//       ? prev.selectedSubjects.filter((s) => s !== subject.subject) // Deselect
//       : [...prev.selectedSubjects, subject.subject]; // Select

//     const updatedLecturers = updatedSubjects
//       .map((selected) => {
//         const matched = subjects.find((item) => item.subject === selected);
//         return matched ? matched.lecturer : null;
//       })
//       .filter((lecturer, index, self) => lecturer && self.indexOf(lecturer) === index); // Remove duplicates

//     return {
//       ...prev,
//       selectedSubjects: updatedSubjects,
//       lecturers: updatedLecturers,
//     };
//   });
// };

// useEffect(() => {
//   const fetchReservedDates = async () => {
//     if (!formData.batch) return;

//     try {
//       const agendaQuery = query(
//         collection(db, "Agenda"),
//         where("batch", "==", formData.batch)
//       );
//       const querySnapshot = await getDocs(agendaQuery);

//       const reservedDates = {};
//       querySnapshot.forEach((doc) => {
//         const data = doc.data();
//         reservedDates[data.date] = {
//           subject: data.subject,
//           time: data.time,
//           lecturer: data.lecturer,
//         };
//       });

//       setBookedSeats(reservedDates); // Reserved dates for current and next month
//     } catch (error) {
//       console.error("Error fetching reserved dates:", error);
//     }
//   };

//   fetchReservedDates();
// }, [formData.batch]);


// const [loadedMonths, setLoadedMonths] = useState([
//   { month: new Date().getMonth(), year: new Date().getFullYear() },
// ]); // Tracks months loaded
// const [dates, setDates] = useState([]); // List of all dates to display

// useEffect(() => {
//   const initialMonth = new Date();
//   loadMonth(initialMonth.getMonth(), initialMonth.getFullYear());
// }, []);

// const loadMonth = (month, year) => {
//   const daysInMonth = new Date(year, month + 1, 0).getDate(); // Number of days in the month
//   const newDates = Array.from({ length: daysInMonth }, (_, dayIndex) => {
//     const day = String(dayIndex + 1).padStart(2, "0");
//     const date = new Date(year, month, dayIndex + 1);
//     return {
//       formattedDate: `${date.getFullYear()}-${String(month + 1).padStart(2, "0")}-${day}`,
//       day,
//       weekday: date.toLocaleString("default", { weekday: "short" }), // Short weekday name
//       isReserved: false, // Default to not reserved; update later
//     };
//   });

//   setDates((prevDates) => [...prevDates, ...newDates]); // Append to the existing dates
// };

// const BottomNavigationBar = () => {
//   const [value, setValue] = useState(0);
//   const navigate = useNavigate();
// }
//   return (
    
//     <ThemeProvider theme={theme}>
//     <CssBaseline /> {/* Applies the theme globally */}
//       <Header />
      
//       <Container>


//         <div style={{ margin: "20px 0", textAlign: "center" }}>
//           <h1 style={{ fontSize: "2rem" }}>Hi {name || "Guest"}! </h1>
          
//         </div>
//              <Typography variant="h4">Select Batch</Typography>
// <Grid container spacing={1} mt={1}>
//   {batches.map((batch) => (
//     <Grid item key={batch.id} sx={{ position: "relative" }}>
//       <Tooltip
//         title={
//           <>
//             <Typography variant="body2">
//               <strong>Batch Count:</strong> {batch.batchCount}
//             </Typography>
//             <Typography variant="body2">
//               <strong>Start Date:</strong> {batch.startDate.toLocaleDateString()}
//             </Typography>
//             <Typography variant="body2">
//               <strong>End Date:</strong> {batch.endDate.toLocaleDateString()}
//             </Typography>
//           </>
//         }
//         placement="top"
//       >
//         <Button
//           variant={formData.batch === batch.batchCode ? "contained" : "outlined"}
//           onClick={() => handleSelectionChange("batch", batch.batchCode)}
//         >
//           {batch.batchCode}
//         </Button>
//       </Tooltip>
//       {/* Remove Batch Button */}
//       <IconButton
//         sx={{ position: "absolute", right: 0, top: 0 }}
//         onClick={() => handleRemoveBatch(batch.batchCode)}
//         size="small"
//       >
//         <MinimizeIcon fontSize="small" />
//       </IconButton>
//     </Grid>
//   ))}
//   {/* Add New Batch Button */}
//   <Grid item>
//     <IconButton onClick={() => setOpen(true)}>
//       <AddIcon />
//     </IconButton>
//   </Grid>
// </Grid>
//             {/* Combined Batch Section */}
// {/* Combined Batch Section */}
// {formData.batch && (
//   <>
//     <Typography variant="h4" mt={4}>
//       Combined Batch
//     </Typography>
//     <Grid container spacing={2} mt={2}>
//       {allCombinedBatches.length > 0 ? (
//         allCombinedBatches.map((batchData) => (
//           <Grid item key={batchData.id} sx={{ position: 'relative' }}>
//             <Tooltip
//               title={
//                 <>
//                   <Typography variant="body2">
//                     <strong>Batch Count:</strong> {batchData.batchCount}
//                   </Typography>
//                   <Typography variant="body2">
//                     <strong>Start Date:</strong> {batchData.startDate.toLocaleDateString()}
//                   </Typography>
//                   <Typography variant="body2">
//                     <strong>End Date:</strong> {batchData.endDate.toLocaleDateString()}
//                   </Typography>
//                   <Typography variant="body2">
//                     <strong>Course Director:</strong> {batchData.courseDirector || 'Unknown'}
//                   </Typography>
//                 </>
//               }
//               placement="top"
//             >
//               <Button
//                 variant={formData.selectedCombinedBatch === batchData.batchCode ? 'contained' : 'outlined'}
//                 onClick={() =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     selectedCombinedBatch:
//                       prev.selectedCombinedBatch === batchData.batchCode
//                         ? null // Deselect if already selected
//                         : batchData.batchCode, // Select the clicked batch
//                   }))
//                 }
//               >
//                 {batchData.batchCode}
//               </Button>
//             </Tooltip>
//           </Grid>
//         ))
//       ) : (
//         <Typography variant="body2" color="textSecondary">
//           No combined batches found.
//         </Typography>
//       )}
//     </Grid>
//   </>
// )}


                
//                 <Dialog open={open} onClose={() => setOpen(false)}>
//                   <DialogTitle>Add New Batch</DialogTitle>
//                   <DialogContent>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Batch Name"
//                   fullWidth
//                   value={newBatchData.batch}
//                   onChange={(e) => handleInputChange('batch', e.target.value)}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Course Director"
//                   fullWidth
//                   value={newBatchData.courseDirector}
//                   onChange={(e) => handleInputChange('courseDirector', e.target.value)}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Count"
//                   fullWidth
//                   type="number"
//                   value={newBatchData.count}
//                   onChange={(e) => handleInputChange('count', e.target.value)}
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   label="Start Date"
//                   fullWidth
//                   type="date"
//                   InputLabelProps={{ shrink: true }}
//                   value={newBatchData.startDate}
//                   onChange={(e) => handleInputChange('startDate', e.target.value)}
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   label="End Date"
//                   fullWidth
//                   type="date"
//                   InputLabelProps={{ shrink: true }}
//                   value={newBatchData.endDate}
//                   onChange={(e) => handleInputChange('endDate', e.target.value)}
//                 />
//               </Grid>
//             </Grid>
//             <Typography variant="h6" mt={3}>
//               Batch Content
//             </Typography>
//             {newBatchData.subjects.map((subject, index) => (
//               <Box key={index} display="flex" gap={2} mt={2}>
//                 <TextField
//                   label="Subject Name"
//                   value={subject.subject}
//                   onChange={(e) => handleInputChange('subject', e.target.value, index)}
//                 />
//                 <TextField
//                   label="Lecturer"
//                   value={subject.lecturer}
//                   onChange={(e) => handleInputChange('lecturer', e.target.value, index)}
//                 />
//                 <TextField
//                   label="No of Hours"
//                   value={subject.hours}
//                   onChange={(e) => handleInputChange('hours', e.target.value, index)}
//                 />
//               </Box>
//             ))}
//             <Button
//               startIcon={<AddIcon />}
//               onClick={handleAddSubjectGroup}
//               sx={{ mt: 2 }}
//             >
//               Add Subject Group
//             </Button>
//           </DialogContent>

//                   <DialogActions>
//                     <Button onClick={() => setOpen(false)}>Cancel</Button>
//                     <Button onClick={handleSaveBatch}>Save</Button>
//                   </DialogActions>
//                 </Dialog>




//                  {/* Subjects Section */}
//                  {/* Subjects Section */}
// <>
//   <Typography variant="h4" mt={4}>
//     Subjects
//   </Typography>
//   <Grid container spacing={2} mt={2}>
//     {/* Display Existing Subjects */}
//     {subjects.length > 0 &&
//       subjects.map((subject, index) => (
//         <Grid item key={index} sx={{ position: 'relative', width: 'auto' }}>
//           <Button
//             variant={
//               formData.selectedSubjects.includes(subject.subject)
//                 ? 'contained'
//                 : 'outlined'
//             }
//             onClick={() => handleSubjectSelection(subject)}
//             sx={{
//               textAlign: 'left',
//               justifyContent: 'flex-start',
//               display: 'flex',
//               flexDirection: 'column',
//               padding: 2,
//               width: '200px',
//               border: '1px solid #ccc',
//               alignItems: 'flex-start', // Align all text to the left
//               backgroundColor: formData.selectedSubjects.includes(subject.subject)
//                 ? 'primary.main'
//                 : 'inherit',
//               color: formData.selectedSubjects.includes(subject.subject)
//                 ? 'white'
//                 : 'inherit',
//             }}
//           >
//             <Typography
//               variant="h6"
//               sx={{
//                 fontWeight: 'bold',
//                 marginBottom: '4px',
//                 color: formData.selectedSubjects.includes(subject.subject)
//                   ? 'white'
//                   : 'inherit',
//               }}
//             >
//               {subject.subject}
//             </Typography>
//             <Typography
//               variant="body2"
//               sx={{
//                 color: formData.selectedSubjects.includes(subject.subject)
//                   ? 'white'
//                   : 'gray',
//                 marginBottom: '4px',
//               }}
//             >
//               Lecturer: {subject.lecturer}
//             </Typography>
//             <Typography
//               variant="body2"
//               sx={{
//                 color: formData.selectedSubjects.includes(subject.subject)
//                   ? 'white'
//                   : 'gray',
//               }}
//             >
//               Hours: {subject.hours}
//             </Typography>
//           </Button>
//         </Grid>
//       ))}

//     {/* Add Subject Button */}
//     <Grid item key="add-subject">
//       <IconButton
//         onClick={() => setOpenAddSubject(true)}
//         sx={{
//           width: 50,
//           height: 50,
//           borderRadius: '50%',
//           backgroundColor: 'primary.main',
//           color: 'white',
//           '&:hover': { backgroundColor: 'primary.dark' },
//         }}
//       >
//         <AddIcon />
//       </IconButton>
//     </Grid>
//   </Grid>

//   {/* Add Subject Dialog */}
//   <Dialog open={openAddSubject} onClose={() => setOpenAddSubject(false)}>
//     <DialogTitle>Add Subject</DialogTitle>
//     <DialogContent>
//       <TextField
//         label="Subject"
//         fullWidth
//         value={newSubjectData.subject}
//         onChange={(e) =>
//           setNewSubjectData((prev) => ({ ...prev, subject: e.target.value }))
//         }
//         sx={{ mb: 2 }}
//       />
//       <TextField
//         label="Lecturer"
//         fullWidth
//         value={newSubjectData.lecturer}
//         onChange={(e) =>
//           setNewSubjectData((prev) => ({ ...prev, lecturer: e.target.value }))
//         }
//         sx={{ mb: 2 }}
//       />
//       <TextField
//         label="Hours"
//         fullWidth
//         type="number"
//         value={newSubjectData.hours}
//         onChange={(e) =>
//           setNewSubjectData((prev) => ({ ...prev, hours: e.target.value }))
//         }
//         sx={{ mb: 2 }}
//       />
//     </DialogContent>
//     <DialogActions>
//       <Button onClick={() => setOpenAddSubject(false)}>Cancel</Button>
//       <Button onClick={handleSaveSubject} variant="contained" color="primary">
//         Save
//       </Button>
//     </DialogActions>
//   </Dialog>
// </>


// {/* Lecture Date Section */}
// <Box>
//   <Typography variant="h4" container spacing={2} mt={2}>
//     Lecture Date
//   </Typography>
//   <Typography variant="h5" container spacing={2} mt={2}>
//     {currentMonth}
//   </Typography>
//   <Grid container spacing={1} mt={2} wrap="nowrap" sx={{ overflowX: "auto" }}>
//     {Array.from({ length: 31 }, (_, index) => {
//       const day = String(index + 1).padStart(2, "0");
//       const date = new Date(new Date().getFullYear(), new Date().getMonth(), index + 1);
//       const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${day}`;
//       const isReserved = bookedSeats[formattedDate]; // Check if the date is reserved

//       return (
//         <Grid item key={formattedDate}>
//           <Box>
//             <Typography
//               variant="caption"
//               sx={{
//                 display: "block",
//                 textAlign: "center",
//                 width: "100%",
//                 marginBottom: "4px",
//               }}
//             >
//               {date.toLocaleString("default", { weekday: "short" })} {/* Short weekday name */}
//             </Typography>
//             <Tooltip
//               title={
//                 isReserved ? (
//                   <>
//                     <Typography variant="body2">
//                       <strong>Subject:</strong> {bookedSeats[formattedDate].subject || "N/A"}
//                     </Typography>
//                     <Typography variant="body2">
//                       <strong>Time:</strong> {bookedSeats[formattedDate].time || "N/A"}
//                     </Typography>
//                     <Typography variant="body2">
//                       <strong>Lecturer:</strong> {bookedSeats[formattedDate].lecturer || "N/A"}
//                     </Typography>
//                   </>
//                 ) : (
//                   ""
//                 )
//               }
//               placement="top"
//             >
//               <span>
//                 <Button
//                   variant={
//                     currentMonthDates.includes(formattedDate)
//                       ? "contained"
//                       : isReserved
//                       ? "outlined"
//                       : "outlined"
//                   }
//                   onClick={() =>
//                     !isReserved && handleCurrentMonthSelectionChange(day)
//                   }
//                   sx={{
//                     width: "60px",
//                     cursor: isReserved ? "not-allowed" : "pointer",
//                     backgroundColor: isReserved ? "gray" : undefined,
//                     color: isReserved ? "white" : undefined,
//                   }}
//                   disabled={isReserved} // Disable if reserved
//                 >
//                   {day}
//                 </Button>
//               </span>
//             </Tooltip>
//           </Box>
//         </Grid>
//       );
//     })}
//   </Grid>
// </Box>

// {/* Next Month Button */}
// <Button
//   variant="outlined"
//   onClick={() => setNextMonthVisible((prev) => !prev)}
//   sx={{ mt: 2 }}
// >
//   {nextMonthVisible ? "Hide Next Month" : "Next Month"}
// </Button>

// {/* Next Month Date Selection */}
// {nextMonthVisible && (
//   <Box>
//     <Typography variant="h5" container spacing={2} mt={2}>
//       {nextMonth}
//     </Typography>
//     <Grid container spacing={2} mt={2} wrap="nowrap" sx={{ overflowX: "auto" }}>
//       {Array.from(
//         { length: new Date(new Date().getFullYear(), new Date().getMonth() + 2, 0).getDate() }, // Number of days in next month
//         (_, index) => {
//           const day = String(index + 1).padStart(2, "0");
//           const date = new Date(new Date().getFullYear(), new Date().getMonth() + 1, index + 1);
//           const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${day}`;
//           const isReserved = bookedSeats[formattedDate]; // Check if the date is reserved

//           return (
//             <Grid item key={formattedDate}>
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
//                   {date.toLocaleString("default", { weekday: "short" })} {/* Short weekday name */}
//                 </Typography>
//                 <Tooltip
//                   title={
//                     isReserved ? (
//                       <>
//                         <Typography variant="body2">
//                           <strong>Subject:</strong> {bookedSeats[formattedDate].subject || "N/A"}
//                         </Typography>
//                         <Typography variant="body2">
//                           <strong>Time:</strong> {bookedSeats[formattedDate].time || "N/A"}
//                         </Typography>
//                         <Typography variant="body2">
//                           <strong>Lecturer:</strong> {bookedSeats[formattedDate].lecturer || "N/A"}
//                         </Typography>
//                       </>
//                     ) : (
//                       ""
//                     )
//                   }
//                   placement="top"
//                 >
//                   <span>
//                     <Button
//                       variant={
//                         nextMonthDates.includes(formattedDate)
//                           ? "contained"
//                           : isReserved
//                           ? "outlined"
//                           : "outlined"
//                       }
//                       onClick={() =>
//                         !isReserved && handleNextMonthSelectionChange(day)
//                       }
//                       sx={{
//                         width: "60px",
//                         cursor: isReserved ? "not-allowed" : "pointer",
//                         backgroundColor: isReserved ? "gray" : undefined,
//                         color: isReserved ? "white" : undefined,
//                       }}
//                       disabled={isReserved} // Disable if reserved
//                     >
//                       {day}
//                     </Button>
//                   </span>
//                 </Tooltip>
//               </Box>
//             </Grid>
//           );
//         }
//       )}
//     </Grid>
//   </Box>
// )}


//                {/* Lecture Type Section */}
//                <Box sx={{ mb: 4 }}>
//   <Typography variant="h4" container spacing={2} mt={2}>Session Type</Typography>
//   <Grid container spacing={2} mt={2}>
//     {['Lecture', 'Coursework', 'Tutorial', 'Lab Session'].map((type) => (
//       <Grid item key={type}>
//         <Button
//           variant={formData.sessionType === type ? 'contained' : 'outlined'}
//           onClick={() =>
//             setFormData((prev) => ({
//               ...prev,
//               sessionType: type, // Update the sessionType in formData
//             }))
//           }
//         >
//           {type}
//         </Button>
//       </Grid>
//     ))}
//   </Grid>
// </Box>



//            {/* Select Time Range Section */}
// <Box sx={{ mb: 4 }}>
//   <Typography variant="h4">Select Time </Typography>
//   <Grid container spacing={2} mt={2}>
//     {[
//       "Full Day ",
//       "8.30am to 11.30am",
//       "12.30pm to 3.30pm",
//       "5.30pm to 8.30pm",
//     ].map((timeRange) => (
//       <Grid item key={timeRange}>
//         <Button
//           variant={formData.time === timeRange ? "contained" : "outlined"}
//           onClick={() =>
//             setFormData((prev) => ({
//               ...prev,
//               time: timeRange,
//             }))
//           }
//         >
//           {timeRange}
//         </Button>
//       </Grid>
//     ))}
//   </Grid>
// </Box>


//                 {/* Select Lecture Halls Section */}
//                 <Box sx={{ mb: 4 }}>
//                   {/* <Typography variant="h4">Select Lecture Halls</Typography>
//                   <Grid container spacing={2} mt={2} wrap="nowrap" sx={{ overflowX: 'auto' }}>
//                     {floors.map((floor) => (
//                       <Grid item xs={12} sm={6} md={4} lg={3} key={floor.heading}>
//                         <Typography variant="h5">{floor.heading}</Typography>
//                         {floor.seats.map((seat, index) => {
//                           const isBooked = bookedSeats.hasOwnProperty(seat);
//                           const isSelected = formData.seats.includes(seat);
//                           return (
//                             <Tooltip
//                               key={seat}
//                               title={isBooked ? (
//                                 <>
//                                   <Typography variant="body2">Batch: {bookedSeats[seat].batch}</Typography>
//                                   <Typography variant="body2">Lecture: {bookedSeats[seat].lecture}</Typography>
//                                   <Typography variant="body2">Lecturer: {bookedSeats[seat].lecturer}</Typography>
//                                   <Typography variant="body2">Course Director: {bookedSeats[seat].courseDirector}</Typography>
//                                 </>
//                               ) : ''}
//                               placement="top"
//                             >
//                               <span>
//                                 <Paper
//                                   elevation={isSelected ? 3 : 1}
//                                   onClick={() => !isBooked && handleSeatSelection(seat)}
//                                   sx={{
//                                     padding: 2,
//                                     cursor: isBooked ? 'not-allowed' : 'pointer',
//                                     border: isSelected ? '2px solid blue' : isBooked ? '2px solid black' : '1px solid grey',
//                                     backgroundColor: isSelected ? 'blue' : isBooked ? 'black' : 'inherit',
//                                     color: isSelected || isBooked ? 'white' : 'inherit',
//                                     mb: 1,
//                                   }}
//                                 >
//                                   <Typography variant="h6">{seat}</Typography>
//                                   <Typography variant="body2">{floor.seatCounts[index]}</Typography>
//                                 </Paper>
//                               </span>
//                             </Tooltip>
//                           );
//                         })}
//                       </Grid>
//                     ))}
//                   </Grid> */}



// {/*                   
//                   <Typography variant="h4">Select Lecture Halls</Typography>
//                   <Grid container spacing={2} mt={2} wrap="nowrap" sx={{ overflowX: 'auto' }}>
//                     {floors.map((floor) => (
//                       <Grid item xs={12} sm={6} md={4} lg={3} key={floor.heading}>
//                         <Typography variant="h5">{floor.heading}</Typography>
//                         {floor.seats.map((seat, index) => {
//                           const isBooked = bookedSeats.hasOwnProperty(seat);
//                           const isSelected = formData.seats.includes(seat);

//                           return (
//                             <Tooltip
//                             key={seat}
//                             title={
//                               isBooked ? (
//                                 <>
//                                   <Typography variant="body2">Batch: {bookedSeats[seat].batch}</Typography>
//                                   <Typography variant="body2">Lecture: {bookedSeats[seat].subject}</Typography>
//                                   <Typography variant="body2">Lecturer: {bookedSeats[seat].lecturer}</Typography>
//                                   <Typography variant="body2">Course Director: {bookedSeats[seat].courseDirector}</Typography>
//                                   <Typography variant="body2">
//                                     Booked Dates: {bookedSeats[seat].dates ? bookedSeats[seat].dates.join(", ") : "No dates available"}
//                                   </Typography>
//                                 </>
//                               ) : (
//                                 "Available for booking"
//                               )
//                             }
//                             placement="top"
//                           >
//                             <span>
//                               <Paper
//                                 elevation={isSelected ? 3 : 1}
//                                 onClick={() => handleSeatSelection(seat)}
//                                 sx={{
//                                   padding: 2,
//                                   cursor: isBooked ? "not-allowed" : "pointer",
//                                   border: isSelected
//                                     ? "2px solid blue"
//                                     : isBooked
//                                     ? "2px solid black"
//                                     : "1px solid grey",
//                                   backgroundColor: isSelected ? "blue" : isBooked ? "black" : "inherit",
//                                   color: isSelected || isBooked ? "white" : "inherit",
//                                   mb: 1,
//                                 }}
//                               >
//                                 <Typography variant="h6">{seat}</Typography>
//                                 <Typography variant="body2">{floor.seatCounts[index]}</Typography>
//                               </Paper>
//                             </span>
//                           </Tooltip>

//                           );
//                         })}
//                       </Grid>
//                     ))}
//                   </Grid></Box>
//                   <Box sx={{ mb: 4 }}> */}



//   <Typography variant="h4">Executive Summary</Typography>
//   <Paper sx={{ padding: 2, mt: 2 }}>
//     <Typography variant="body1">
//       <strong>Time:</strong> {formData?.time || 'Not selected'}
//     </Typography>
//     <Typography variant="body1">
//       <strong>Batch:</strong> {formData?.batch || 'Not selected'}
//     </Typography>
//     <Typography variant="body1">
//   <strong>Combined Batch:</strong> {formData?.selectedCombinedBatch || 'None'}
// </Typography>
//     <Typography variant="body1">
//       <strong>Course Director:</strong> {name || 'Unknown'}
//     </Typography>
//     <Typography variant="body1">
//       <strong>Dates:</strong>{' '}
//       {(formData?.dates || []).length > 0
//         ? formData.dates
//             .map((date) => {
//               const [year, month, day] = date.split('-');
//               return `${day}-${month}-${year}`; // Display in DD-MM-YYYY format
//             })
//             .join(', ')
//         : 'Not selected'}
//     </Typography>
//     <Typography variant="body1">
//   <strong>Session Type:</strong> {formData?.sessionType || 'Not selected'}
// </Typography>
//     <Typography variant="body1">
//       <strong>Lecturer:</strong>{' '}
//       {formData?.lecturers?.join(', ') || 'Not assigned'}
//     </Typography>
//     <Typography variant="body1">
//       <strong>Subjects:</strong> {(formData?.selectedSubjects || []).join(', ') || 'Not selected'}
//     </Typography>
//   </Paper>
//   <Button
//   variant="contained"
//   color="primary"
//   onClick={async () => {
//     try {
//       // Step 1: Combine selected batches
//       const combinedBatches = [
//         formData.batch,
//         ...(formData.selectedCombinedBatch ? [formData.selectedCombinedBatch] : []),
//       ];

//       // Ensure there are batches to save
//       if (!combinedBatches.length) {
//         alert("No batches selected.");
//         return;
//       }

//       // Step 2: Save a record in "Agenda" for each batch (existing and combined)
//       for (const batch of combinedBatches) {
//         await addDoc(collection(db, "Agenda"), {
//           SessionType: formData.sessionType || "Not selected",
//           Time: formData.time || "Not selected",
//           batch: batch,
//           combinedbatch: combinedBatches.join(", "), // Include all selected batches in the combinedbatch field
//           courseDirector: name || "Unknown",
//           date: (formData.dates || []).join(", ") || "Not selected",
//           lecturer: formData?.selectedSubjects
//             ?.map((subject) =>
//               subjects.find((item) => item.subject === subject)?.lecturer ||
//               "Unknown"
//             )
//             .filter(
//               (lecturer, index, self) =>
//                 lecturer && self.indexOf(lecturer) === index
//             )
//             .join(", ") || "Not assigned",
//           subject: (formData?.selectedSubjects || []).join(", ") || "Not selected",
//         });
//       }

//       console.log("New records added to Agenda collection.");

//       // Step 3: Save a record in "ScheduledSubjects" collection (existing logic)
//       await addDoc(collection(db, "ScheduledSubjects"), {
//         SessionType: formData.sessionType || "Not selected",
//         Time: formData.time || "Not selected",
//         batch: formData.batch || "Not selected",
//         combinedbatch: combinedBatches.join(", "), // Include all selected batches
//         courseDirector: name || "Unknown",
//         date: (formData.dates || []).join(", ") || "Not selected",
//         hall: "", // Blank hall field
//         lecturer: formData?.selectedSubjects
//           ?.map((subject) =>
//             subjects.find((item) => item.subject === subject)?.lecturer ||
//             "Unknown"
//           )
//           .filter(
//             (lecturer, index, self) =>
//               lecturer && self.indexOf(lecturer) === index
//           )
//           .join(", ") || "Not assigned",
//         status: "Not Booked", // New status field
//         subject: (formData?.selectedSubjects || []).join(", ") || "Not selected",
//       });

//       console.log("New record added to ScheduledSubjects collection.");

//       // Step 4: Reset the UI by resetting all state variables (existing logic)
//       setFormData({
//         dates: [],
//         time: "",
//         sessionType: "",
//         seats: [],
//         batch: "",
//         selectedSubjects: [],
//         selectedCombinedBatch: "",
//       });
//       setCurrentMonthDates([]);
//       setNextMonthDates([]);
//       setDatesSelected(false);
//       setSubjects([]);

//       alert("Session scheduled successfully!");
//     } catch (error) {
//       console.error("Error scheduling session:", error);
//       alert("Failed to schedule session. Please try again.");
//     }
//   }}
//   sx={{ mt: 2 }}
//   disabled={
//     !formData?.time ||
//     !formData?.batch ||
//     (formData?.dates || []).length === 0
//   }
// >
//   Schedule
// </Button>







// </Box>



                
// </Container>
// <Paper
//         sx={{
//           position: "fixed",
//           bottom: 0,
//           left: 0,
//           right: 0,
//           zIndex: 1000,
//           boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)",
//         }}
//         elevation={3}
//       >
//         <BottomNavigation
//           showLabels
//           value={value}
//           onChange={(event, newValue) => {
//             setValue(newValue);
//             switch (newValue) {
//               case 0:
//                 navigate("/mainscreen", { state: { name } });
//                 break;
//               case 1:
            
//                 navigate("/Coursedirectorbooking", { state: { name } });
//                 break;
//               case 2:
//                 navigate("/Calender", { state: { name } });
//                 break;
//               case 3:
//                 navigate("/Calendar", { state: { name } });
//                 break;
              
//               default:
//                 break;
//             }
//           }}
//           sx={{ backgroundColor: "white" }}
//         >
//           <BottomNavigationAction label="Main Display" icon={<Home sx={{ color: value === 0 ? "black" : "gray" }} />} />
          
//           <BottomNavigationAction label="Schedule"
//             icon={<AddBox sx={{ bgcolor: "#ddd", borderRadius: "10px", padding: "5px" }} />}
//           />
//           <BottomNavigationAction label="Schedule and Halls" icon={<Search sx={{ color: value === 1 ? "black" : "gray" }} />} />
//          </BottomNavigation>
//       </Paper>

// <Footer/>
// </ThemeProvider>
//   );
// };

// export default CoursedirectorBooking;


import React, { useState, useEffect } from 'react';
import {
  Button,
  Grid,
  Typography,
  Box,
  Paper,
  Container,
  Tooltip,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import MinimizeIcon from '@mui/icons-material/Remove';
import { updateDoc, doc, collection, query, where, getDocs, addDoc, setDoc } from "firebase/firestore";
import { Home, Search, AddBox, Favorite, Person } from "@mui/icons-material";
import { db } from '../firebase'; // Import Firestore configuration
import { useLocation } from "react-router-dom"; // To retrieve the name from login
import Header from './Header';
import Footer from './Footer';
import ExecutiveSummary from './ExecutiveSummary';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNavigate } from "react-router-dom";

const CoursedirectorBooking = () => {
  const [bookedSeats, setBookedSeats] = useState({}); // Initially empty
  const [currentMonthDates, setCurrentMonthDates] = useState([]); // Initially no selected dates
  const [nextMonthDates, setNextMonthDates] = useState([]); // Initially no selected dates
  const [datesSelected, setDatesSelected] = useState(false); // Track if any dates are selected
  const location = useLocation();
  const { name } = location.state || {}; // Get name from state
  const [batches, setBatches] = useState([]);
  const [formData, setFormData] = useState({
    dates: [],
    time: '',
    showType: '',
    seats: [],
    batch: '',
    selectedSubjects: [],
    sessionType: '',
    selectedCombinedBatch: null,
    lecturers: [],
  });
  const [darkMode, setDarkMode] = useState(false);
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
    typography: {
      fontFamily: "Trebuchet MS, sans-serif",
    },
  });
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [newBatchData, setNewBatchData] = useState({
    batch: '',
    courseDirector: '',
    count: '',
    startDate: '',
    endDate: '',
    subjects: [],
  });
  const [combinedBatches, setCombinedBatches] = useState([]); // State for combined batches

  // Combine selected dates from both months
  const allSelectedDates = [...currentMonthDates, ...nextMonthDates];
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      dates: allSelectedDates, // Update formData.dates with the combined dates
    }));
  }, [currentMonthDates, nextMonthDates]); // Runs whenever either changes

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
    const fetchBatchData = async () => {
      if (!name) return; // Skip if no name is provided
      try {
        const batchQuery = query(
          collection(db, "batches"),
          where("courseDirector", "==", name.toLowerCase())
        );
        const querySnapshot = await getDocs(batchQuery);
        const batchesData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          batchesData.push({
            id: doc.id,
            batch: data.batch,
            courseDirector: data.courseDirector,
            count: data.count,
            startDate: data.startDate.toDate(),
            endDate: data.endDate.toDate(),
            subjects: data.subjects || [],
          });
        });
        setBatches(batchesData);
      } catch (error) {
        console.error("Error fetching batch data:", error);
      }
    };
    fetchBatchData();
  }, [name]);

  const currentDate = new Date();
  const [nextMonthVisible, setNextMonthVisible] = useState(false);

  // Handlers to manage selected dates
  const handleCurrentMonthSelectionChange = (day) => {
    const selectedDay = `${new Date().getFullYear()}-${String(
      new Date().getMonth() + 1
    ).padStart(2, "0")}-${day}`;
    setCurrentMonthDates((prevDates) => {
      const newDates = prevDates.includes(selectedDay)
        ? prevDates.filter((date) => date !== selectedDay)
        : [...prevDates, selectedDay];
      setDatesSelected(newDates.length > 0); // Set flag based on whether dates exist
      return newDates;
    });
  };

  const handleNextMonthSelectionChange = (day) => {
    const selectedDay = `${new Date().getFullYear()}-${String(
      new Date().getMonth() + 2
    ).padStart(2, "0")}-${day}`;
    setNextMonthDates((prevDates) => {
      const newDates = prevDates.includes(selectedDay)
        ? prevDates.filter((date) => date !== selectedDay)
        : [...prevDates, selectedDay];
      setDatesSelected(newDates.length > 0); // Set flag based on whether dates exist
      return newDates;
    });
  };

  // useEffect to fetch booked seats only when dates are selected
  useEffect(() => {
    const allSelectedDates = [...currentMonthDates, ...nextMonthDates];
    // Exit early if no dates are selected
    if (!datesSelected || allSelectedDates.length === 0) {
      setBookedSeats({}); // Ensure bookedSeats is empty
      return; // Do not fetch data
    }
    const fetchBookedSeatsForDates = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "bookedSeats"));
        const seatsData = {};
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // Check if the booking date matches any selected date
          if (allSelectedDates.includes(data.date)) {
            if (!seatsData[doc.id]) {
              seatsData[doc.id] = {
                ...data,
                dates: [data.date], // Initialize with the first date
              };
            } else {
              seatsData[doc.id].dates.push(data.date); // Add additional dates for the same seat
            }
          }
        });
        setBookedSeats(seatsData); // Update bookedSeats with filtered data
      } catch (error) {
        console.error("Error fetching booked seats for selected dates:", error);
      }
    };
    fetchBookedSeatsForDates();
  }, [currentMonthDates, nextMonthDates, datesSelected]); // Trigger only when these change

  const handleSelectionChange = (key, value) => {
    if (key === 'batch') {
      setFormData({ ...formData, batch: value });
      fetchSubjectsForBatch(value);
      fetchCombinedBatches(value);
      setFormData((prev) => ({ ...prev, batch: value }));
    }
  };

  const fetchCombinedBatches = async (selectedBatch) => {
    if (!selectedBatch) return;
    const prefixMatch = selectedBatch.match(/^[^\s\d]+/);
    const prefix = prefixMatch ? prefixMatch[0] : '';
    if (!prefix) return;
    try {
      const combinedQuery = query(
        collection(db, "batches"),
        where("batch", ">=", prefix),
        where("batch", "<", prefix + "\uf8ff")
      );
      const querySnapshot = await getDocs(combinedQuery);
      const combinedData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        startDate: doc.data().startDate?.toDate(),
        endDate: doc.data().endDate?.toDate(),
      }));
      console.log("Extracted Prefix:", prefix);
      console.log("Fetched Combined Batches:", combinedData);
      setCombinedBatches(combinedData);
    } catch (error) {
      console.error("Error fetching combined batches:", error);
      setCombinedBatches([]);
    }
  };

  const handleRemoveBatch = (batchToRemove) => {
    setBatches(batches.filter(batch => batch.batch !== batchToRemove));
    if (formData.batch === batchToRemove) {
      setFormData({ ...formData, batch: '', selectedSubjects: [] });
    }
  };

  const handleAddSubjectGroup = () => {
    setNewBatchData((prev) => ({
      ...prev,
      subjects: [...prev.subjects, { subject: '', lecturer: '', hours: '' }],
    }));
  };

  const handleSaveBatch = async () => {
    const { batch, courseDirector, count, startDate, endDate, subjects } = newBatchData;
    if (!batch || !courseDirector || !count || !startDate || !endDate) {
      alert("Please fill in all the fields.");
      return;
    }
    try {
      await addDoc(collection(db, "batches"), {
        batch,
        courseDirector: courseDirector.toLowerCase(),
        count,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        subjects,
      });
      alert("Batch added successfully!");
      setOpen(false);
      setNewBatchData({
        batch: '',
        courseDirector: '',
        count: '',
        startDate: '',
        endDate: '',
        subjects: [],
      });
      const querySnapshot = await getDocs(
        query(
          collection(db, "batches"),
          where("courseDirector", "==", name.toLowerCase())
        )
      );
      const updatedBatches = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        updatedBatches.push({
          id: doc.id,
          ...data,
          startDate: data.startDate.toDate(),
          endDate: data.endDate.toDate(),
        });
      });
      setBatches(updatedBatches);
    } catch (error) {
      console.error("Error saving batch:", error);
      alert("Failed to save batch. Please try again.");
    }
  };

  const handleInputChange = (key, value, index = null) => {
    if (index !== null) {
      setNewBatchData((prev) => {
        const updatedSubjects = [...prev.subjects];
        updatedSubjects[index][key] = value;
        return { ...prev, subjects: updatedSubjects };
      });
    } else {
      setNewBatchData((prev) => ({ ...prev, [key]: value }));
    }
  };

  const floors = [
    { heading: 'Ground Floor', seats: ['LH 01', 'LH 02', 'IT Training', 'Internet Plaza'], seatCounts: ['104 seats', '82 seats', '24 seats', '18 seats'] },
    { heading: '1st Floor', seats: ['LH 18', 'E-hub'], seatCounts: ['155 seats', '12 seats'] },
    { heading: '2nd Floor', seats: ['Auditorium', 'LH 08', 'LH 10', 'PC 05'], seatCounts: ['272 seats', '116 seats', '84 seats', '51 seats'] },
    { heading: '3rd Floor', seats: ['LH 304', 'LH 20', 'LH 305', 'LH 308', 'LH 302', 'LH 307', 'LH 306'], seatCounts: ['21 seats', '45 seats', '56 seats', '32 seats', '28 seats', '28 seats', '23 seats'] },
    { heading: '4th Floor', seats: ['Harison Hall', 'PC 01', 'PC 03', 'Net Engi lab', 'Eng Lab', 'ICT E Lab'], seatCounts: ['140 seats', '47 seats', '38 seats', '35 seats', '26 seats', '24 seats'] },
  ];

  const handleSeatSelection = (seat) => {
    if (bookedSeats.hasOwnProperty(seat)) return;
    const isSelected = formData.seats.includes(seat);
    setFormData({
      ...formData,
      seats: isSelected ? formData.seats.filter((s) => s !== seat) : [...formData.seats, seat],
    });
  };

  const [subjects, setSubjects] = useState([]);

  const fetchSubjectsForBatch = async (batchCode) => {
    if (!batchCode) return;
    try {
      const batchQuery = query(
        collection(db, 'coursebatches'),
        where('batchCode', '==', batchCode)
      );
      const querySnapshot = await getDocs(batchQuery);
      if (!querySnapshot.empty) {
        const batchDoc = querySnapshot.docs[0];
        const subjectsData = batchDoc.data().subjects || [];
        setSubjects(subjectsData);
      } else {
        setSubjects([]);
      }
    } catch (error) {
      console.error('Error fetching subjects for batch:', error);
    }
  };

  useEffect(() => {
    if (formData.batch) {
      fetchSubjectsForBatch(formData.batch);
    }
  }, [formData.batch]);

  const [currentMonth, setCurrentMonth] = useState('');
  const [nextMonth, setNextMonth] = useState('');
  useEffect(() => {
    const updateMonths = () => {
      const now = new Date();
      const currentMonthName = now.toLocaleString('default', { month: 'long' });
      const nextMonthName = new Date(now.getFullYear(), now.getMonth() + 1).toLocaleString('default', { month: 'long' });
      setCurrentMonth(currentMonthName);
      setNextMonth(nextMonthName);
    };
    updateMonths();
    const intervalId = setInterval(updateMonths, 1000 * 60 * 60);
    return () => clearInterval(intervalId);
  }, []);

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [newCourse, setNewCourse] = useState("");
  const [showAddBatch, setShowAddBatch] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const coursesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }));
        setCourses(coursesData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const handleAddCourse = async () => {
    try {
      await addDoc(collection(db, "courses"), { name: newCourse });
      alert("New course added successfully!");
      setOpen(false);
      setNewCourse("");
      const querySnapshot = await getDocs(collection(db, "courses"));
      const updatedCourses = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));
      setCourses(updatedCourses);
    } catch (error) {
      console.error("Error adding new course:", error);
      alert("Failed to add new course. Please try again.");
    }
  };

  useEffect(() => {
    const fetchBatchesRealtime = async () => {
      if (!name) return;
      try {
        const querySnapshot = await getDocs(collection(db, "coursebatches"));
        const filteredBatches = querySnapshot.docs
          .filter((doc) =>
            doc.data().courseDirector?.toLowerCase() === name.toLowerCase()
          )
          .map((doc) => ({
            id: doc.id,
            batchCode: doc.data().batchCode,
            batchCount: doc.data().batchCount,
            startDate: new Date(doc.data().startDate),
            endDate: new Date(doc.data().endDate),
          }));
        setBatches(filteredBatches);
      } catch (error) {
        console.error("Error fetching batches:", error);
      }
    };
    fetchBatchesRealtime();
  }, [name]);

  const [allCombinedBatches, setAllCombinedBatches] = useState([]);

  useEffect(() => {
    const fetchAllCombinedBatches = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "coursebatches"));
        const combinedBatchesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          courseDirector: doc.data().courseDirector || "Unknown",
          batchCode: doc.data().batchCode,
          batchCount: doc.data().batchCount,
          startDate: new Date(doc.data().startDate),
          endDate: new Date(doc.data().endDate),
        }));
        setAllCombinedBatches(combinedBatchesData);
      } catch (error) {
        console.error("Error fetching all combined batches:", error);
      }
    };
    fetchAllCombinedBatches();
  }, []);

  const [openAddSubject, setOpenAddSubject] = useState(false);
  const [openEditSubject, setOpenEditSubject] = useState(false);
  const [editSubjectData, setEditSubjectData] = useState({
    subject: '',
    lecturer: '',
    hours: '',
    index: null,
  });
  const [newSubjectData, setNewSubjectData] = useState({
    subject: '',
    lecturer: '',
    hours: '',
  });

  const handleEditSubject = (subject, index) => {
    setEditSubjectData({ ...subject, index });
    setOpenEditSubject(true);
  };

  const handleUpdateSubject = async () => {
    if (!formData.batch) {
      alert('Please select a batch before editing a subject.');
      return;
    }
    const { subject, lecturer, hours, index } = editSubjectData;
    if (!subject || !lecturer || !hours) {
      alert('Please fill in all fields.');
      return;
    }
    try {
      const batchQuery = query(
        collection(db, 'coursebatches'),
        where('batchCode', '==', formData.batch)
      );
      const batchSnapshot = await getDocs(batchQuery);
      if (!batchSnapshot.empty) {
        const batchDoc = batchSnapshot.docs[0];
        const batchRef = doc(db, 'coursebatches', batchDoc.id);
        const updatedSubjects = [...subjects];
        updatedSubjects[index] = { subject, lecturer, hours };
        await updateDoc(batchRef, { subjects: updatedSubjects });
        setOpenEditSubject(false);
        setEditSubjectData({ subject: '', lecturer: '', hours: '', index: null });
        fetchSubjectsForBatch(formData.batch);
        alert('Subject updated successfully!');
      } else {
        alert('Batch not found.');
      }
    } catch (error) {
      console.error('Error updating subject:', error);
      alert('Failed to update subject. Please try again.');
    }
  };

  const handleSaveSubject = async () => {
    if (!formData.batch) {
      alert('Please select a batch before adding a subject.');
      return;
    }
    const { subject, lecturer, hours } = newSubjectData;
    if (!subject || !lecturer || !hours) {
      alert('Please fill in all fields.');
      return;
    }
    try {
      const batchQuery = query(
        collection(db, 'coursebatches'),
        where('batchCode', '==', formData.batch)
      );
      const batchSnapshot = await getDocs(batchQuery);
      if (!batchSnapshot.empty) {
        const batchDoc = batchSnapshot.docs[0];
        const batchRef = doc(db, 'coursebatches', batchDoc.id);
        const updatedSubjects = [
          ...(batchDoc.data().subjects || []),
          { subject, lecturer, hours },
        ];
        await updateDoc(batchRef, { subjects: updatedSubjects });
        setOpenAddSubject(false);
        setNewSubjectData({ subject: '', lecturer: '', hours: '' });
        fetchSubjectsForBatch(formData.batch);
        alert('Subject added successfully!');
      } else {
        alert('Batch not found.');
      }
    } catch (error) {
      console.error('Error saving subject:', error);
      alert('Failed to save subject. Please try again.');
    }
  };

  const handleSubjectSelection = (subject) => {
    setFormData((prev) => {
      const isSelected = prev.selectedSubjects.includes(subject.subject);
      const updatedSubjects = isSelected
        ? prev.selectedSubjects.filter((s) => s !== subject.subject)
        : [...prev.selectedSubjects, subject.subject];
      const updatedLecturers = updatedSubjects
        .map((selected) => {
          const matched = subjects.find((item) => item.subject === selected);
          return matched ? matched.lecturer : null;
        })
        .filter((lecturer, index, self) => lecturer && self.indexOf(lecturer) === index);
      return {
        ...prev,
        selectedSubjects: updatedSubjects,
        lecturers: updatedLecturers,
      };
    });
  };

  useEffect(() => {
    const fetchReservedDates = async () => {
      if (!formData.batch) return;
      try {
        const agendaQuery = query(
          collection(db, "Agenda"),
          where("batch", "==", formData.batch)
        );
        const querySnapshot = await getDocs(agendaQuery);
        const reservedDates = {};
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          reservedDates[data.date] = {
            subject: data.subject,
            time: data.time,
            lecturer: data.lecturer,
          };
        });
        setBookedSeats(reservedDates);
      } catch (error) {
        console.error("Error fetching reserved dates:", error);
      }
    };
    fetchReservedDates();
  }, [formData.batch]);

  const [loadedMonths, setLoadedMonths] = useState([
    { month: new Date().getMonth(), year: new Date().getFullYear() },
  ]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const initialMonth = new Date();
    loadMonth(initialMonth.getMonth(), initialMonth.getFullYear());
  }, []);

  const loadMonth = (month, year) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const newDates = Array.from({ length: daysInMonth }, (_, dayIndex) => {
      const day = String(dayIndex + 1).padStart(2, "0");
      const date = new Date(year, month, dayIndex + 1);
      return {
        formattedDate: `${date.getFullYear()}-${String(month + 1).padStart(2, "0")}-${day}`,
        day,
        weekday: date.toLocaleString("default", { weekday: "short" }),
        isReserved: false,
      };
    });
    setDates((prevDates) => [...prevDates, ...newDates]);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container>
        <div style={{ margin: "20px 0", textAlign: "center" }}>
          <h1 style={{ fontSize: "2rem" }}>Hi {name || "Guest"}! </h1>
        </div>
        <Typography variant="h4">Select Batch</Typography>
        <Grid container spacing={1} mt={1}>
          {batches.map((batch) => (
            <Grid item key={batch.id} sx={{ position: "relative" }}>
              <Tooltip
                title={
                  <>
                    <Typography variant="body2">
                      <strong>Batch Count:</strong> {batch.batchCount}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Start Date:</strong> {batch.startDate.toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2">
                      <strong>End Date:</strong> {batch.endDate.toLocaleDateString()}
                    </Typography>
                  </>
                }
                placement="top"
              >
                <Button
                  variant={formData.batch === batch.batchCode ? "contained" : "outlined"}
                  onClick={() => handleSelectionChange("batch", batch.batchCode)}
                >
                  {batch.batchCode}
                </Button>
              </Tooltip>
              <IconButton
                sx={{ position: "absolute", right: 0, top: 0 }}
                onClick={() => handleRemoveBatch(batch.batchCode)}
                size="small"
              >
                <MinimizeIcon fontSize="small" />
              </IconButton>
            </Grid>
          ))}
          <Grid item>
            <IconButton onClick={() => setOpen(true)}>
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>

        {formData.batch && (
          <>
            <Typography variant="h4" mt={4}>
              Combined Batch
            </Typography>
            <Grid container spacing={2} mt={2}>
              {allCombinedBatches.length > 0 ? (
                allCombinedBatches.map((batchData) => (
                  <Grid item key={batchData.id} sx={{ position: 'relative' }}>
                    <Tooltip
                      title={
                        <>
                          <Typography variant="body2">
                            <strong>Batch Count:</strong> {batchData.batchCount}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Start Date:</strong> {batchData.startDate.toLocaleDateString()}
                          </Typography>
                          <Typography variant="body2">
                            <strong>End Date:</strong> {batchData.endDate.toLocaleDateString()}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Course Director:</strong> {batchData.courseDirector || 'Unknown'}
                          </Typography>
                        </>
                      }
                      placement="top"
                    >
                      <Button
                        variant={formData.selectedCombinedBatch === batchData.batchCode ? 'contained' : 'outlined'}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            selectedCombinedBatch:
                              prev.selectedCombinedBatch === batchData.batchCode
                                ? null
                                : batchData.batchCode,
                          }))
                        }
                      >
                        {batchData.batchCode}
                      </Button>
                    </Tooltip>
                  </Grid>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No combined batches found.
                </Typography>
              )}
            </Grid>
          </>
        )}

        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Add New Batch</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Batch Name"
                  fullWidth
                  value={newBatchData.batch}
                  onChange={(e) => handleInputChange('batch', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Course Director"
                  fullWidth
                  value={newBatchData.courseDirector}
                  onChange={(e) => handleInputChange('courseDirector', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Count"
                  fullWidth
                  type="number"
                  value={newBatchData.count}
                  onChange={(e) => handleInputChange('count', e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Start Date"
                  fullWidth
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={newBatchData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="End Date"
                  fullWidth
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={newBatchData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                />
              </Grid>
            </Grid>
            <Typography variant="h6" mt={3}>
              Batch Content
            </Typography>
            {newBatchData.subjects.map((subject, index) => (
              <Box key={index} display="flex" gap={2} mt={2}>
                <TextField
                  label="Subject Name"
                  value={subject.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value, index)}
                />
                <TextField
                  label="Lecturer"
                  value={subject.lecturer}
                  onChange={(e) => handleInputChange('lecturer', e.target.value, index)}
                />
                <TextField
                  label="No of Hours"
                  value={subject.hours}
                  onChange={(e) => handleInputChange('hours', e.target.value, index)}
                />
              </Box>
            ))}
            <Button
              startIcon={<AddIcon />}
              onClick={handleAddSubjectGroup}
              sx={{ mt: 2 }}
            >
              Add Subject Group
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveBatch}>Save</Button>
          </DialogActions>
        </Dialog>

        <>
          <Typography variant="h4" mt={4}>
            Subjects
          </Typography>
          <Grid container spacing={2} mt={2}>
            {subjects.length > 0 &&
              subjects.map((subject, index) => (
                <Grid item key={index} sx={{ position: 'relative', width: 'auto' }}>
                  <Button
                    variant={
                      formData.selectedSubjects.includes(subject.subject)
                        ? 'contained'
                        : 'outlined'
                    }
                    onClick={() => handleSubjectSelection(subject)}
                    sx={{
                      textAlign: 'left',
                      justifyContent: 'flex-start',
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 2,
                      width: '200px',
                      border: '1px solid #ccc',
                      alignItems: 'flex-start',
                      backgroundColor: formData.selectedSubjects.includes(subject.subject)
                        ? 'primary.main'
                        : 'inherit',
                      color: formData.selectedSubjects.includes(subject.subject)
                        ? 'white'
                        : 'inherit',
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 'bold',
                        marginBottom: '4px',
                        color: formData.selectedSubjects.includes(subject.subject)
                          ? 'white'
                          : 'inherit',
                      }}
                    >
                      {subject.subject}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: formData.selectedSubjects.includes(subject.subject)
                          ? 'white'
                          : 'gray',
                        marginBottom: '4px',
                      }}
                    >
                      Lecturer: {subject.lecturer}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: formData.selectedSubjects.includes(subject.subject)
                          ? 'white'
                          : 'gray',
                      }}
                    >
                      Hours: {subject.hours}
                    </Typography>
                  </Button>
                </Grid>
              ))}
            <Grid item key="add-subject">
              <IconButton
                onClick={() => setOpenAddSubject(true)}
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': { backgroundColor: 'primary.dark' },
                }}
              >
                <AddIcon />
              </IconButton>
            </Grid>
          </Grid>

          <Dialog open={openAddSubject} onClose={() => setOpenAddSubject(false)}>
            <DialogTitle>Add Subject</DialogTitle>
            <DialogContent>
              <TextField
                label="Subject"
                fullWidth
                value={newSubjectData.subject}
                onChange={(e) =>
                  setNewSubjectData((prev) => ({ ...prev, subject: e.target.value }))
                }
                sx={{ mb: 2 }}
              />
              <TextField
                label="Lecturer"
                fullWidth
                value={newSubjectData.lecturer}
                onChange={(e) =>
                  setNewSubjectData((prev) => ({ ...prev, lecturer: e.target.value }))
                }
                sx={{ mb: 2 }}
              />
              <TextField
                label="Hours"
                fullWidth
                type="number"
                value={newSubjectData.hours}
                onChange={(e) =>
                  setNewSubjectData((prev) => ({ ...prev, hours: e.target.value }))
                }
                sx={{ mb: 2 }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenAddSubject(false)}>Cancel</Button>
              <Button onClick={handleSaveSubject} variant="contained" color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </>

        {/* Lecture Date Section - FIXED ALIGNMENT & SPACING */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4">Lecture Date</Typography>

          {/* Current Month */}
          <Typography variant="h5" sx={{ mt: 5, mb: 1 }}>{currentMonth}</Typography>
          <Box
            sx={{
              overflowX: 'auto',
              pb: 1,
              '&::-webkit-scrollbar': { height: 8 },
              '&::-webkit-scrollbar-thumb': { backgroundColor: '#888', borderRadius: 4 },
            }}
          >
            <Grid container spacing={6.5} sx={{ minWidth: 900, flexWrap: 'nowrap' }}>
              {Array.from({ length: 31 }, (_, index) => {
                const day = String(index + 1).padStart(2, "0");
                const date = new Date(new Date().getFullYear(), new Date().getMonth(), index + 1);
                const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${day}`;
                const isReserved = bookedSeats[formattedDate];
                const isSelected = currentMonthDates.includes(formattedDate);

                return (
                  <Grid item key={formattedDate}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        minWidth: 60,
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: '0.75rem',
                          fontWeight: 'medium',
                          color: 'text.secondary',
                          mb: 0.5,
                        }}
                      >
                        {date.toLocaleString("default", { weekday: "short" })}
                      </Typography>
                      <Tooltip
                        title={
                          isReserved ? (
                            <>
                              <Typography variant="body2"><strong>Subject:</strong> {bookedSeats[formattedDate]?.subject || "N/A"}</Typography>
                              <Typography variant="body2"><strong>Time:</strong> {bookedSeats[formattedDate]?.time || "N/A"}</Typography>
                              <Typography variant="body2"><strong>Lecturer:</strong> {bookedSeats[formattedDate]?.lecturer || "N/A"}</Typography>
                            </>
                          ) : ""
                        }
                        placement="top"
                      >
                        <Button
                          variant={isSelected ? "contained" : isReserved ? "outlined" : "outlined"}
                          onClick={() => !isReserved && handleCurrentMonthSelectionChange(day)}
                          disabled={isReserved}
                          sx={{
                            width: 48,
                            height: 48,
                            minWidth: 48,
                            borderRadius: '50%',
                            fontWeight: 'bold',
                            backgroundColor: isReserved ? 'grey' : undefined,
                            color: isReserved ? 'white' : isSelected ? 'white' : 'inherit',
                            '&:hover': {
                              backgroundColor: isSelected ? 'primary.dark' : isReserved ? 'grey' : undefined,
                            },
                          }}
                        >
                          {day}
                        </Button>
                      </Tooltip>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Box>

          {/* Next Month Toggle */}
          <Button
            variant="outlined"
            onClick={() => setNextMonthVisible((prev) => !prev)}
            sx={{ mt: 3 }}
          >
            {nextMonthVisible ? "Hide Next Month" : "Show Next Month"}
          </Button>

          {/* Next Month */}
          {nextMonthVisible && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h5" sx={{ mb: 1 }}>{nextMonth}</Typography>
              <Box
                sx={{
                  overflowX: 'auto',
                  pb: 1,
                  '&::-webkit-scrollbar': { height: 8 },
                  '&::-webkit-scrollbar-thumb': { backgroundColor: '#888', borderRadius: 4 },
                }}
              >
                <Grid container spacing={6.5} sx={{ minWidth: 900, flexWrap: 'nowrap' }}>
                  {Array.from(
                    { length: new Date(new Date().getFullYear(), new Date().getMonth() + 2, 0).getDate() },
                    (_, index) => {
                      const day = String(index + 1).padStart(2, "0");
                      const date = new Date(new Date().getFullYear(), new Date().getMonth() + 1, index + 1);
                      const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${day}`;
                      const isReserved = bookedSeats[formattedDate];
                      const isSelected = nextMonthDates.includes(formattedDate);

                      return (
                        <Grid item key={formattedDate}>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              minWidth: 60,
                            }}
                          >
                            <Typography
                              variant="caption"
                              sx={{
                                fontSize: '0.75rem',
                                fontWeight: 'medium',
                                color: 'text.secondary',
                                mb: 0.5,
                              }}
                            >
                              {date.toLocaleString("default", { weekday: "short" })}
                            </Typography>
                            <Tooltip
                              title={
                                isReserved ? (
                                  <>
                                    <Typography variant="body2"><strong>Subject:</strong> {bookedSeats[formattedDate]?.subject || "N/A"}</Typography>
                                    <Typography variant="body2"><strong>Time:</strong> {bookedSeats[formattedDate]?.time || "N/A"}</Typography>
                                    <Typography variant="body2"><strong>Lecturer:</strong> {bookedSeats[formattedDate]?.lecturer || "N/A"}</Typography>
                                  </>
                                ) : ""
                              }
                              placement="top"
                            >
                              <Button
                                variant={isSelected ? "contained" : isReserved ? "outlined" : "outlined"}
                                onClick={() => !isReserved && handleNextMonthSelectionChange(day)}
                                disabled={isReserved}
                                sx={{
                                  width: 48,
                                  height: 48,
                                  minWidth: 48,
                                  borderRadius: '50%',
                                  fontWeight: 'bold',
                                  backgroundColor: isReserved ? 'grey' : undefined,
                                  color: isReserved ? 'white' : isSelected ? 'white' : 'inherit',
                                  '&:hover': {
                                    backgroundColor: isSelected ? 'primary.dark' : isReserved ? 'grey' : undefined,
                                  },
                                }}
                              >
                                {day}
                              </Button>
                            </Tooltip>
                          </Box>
                        </Grid>
                      );
                    }
                  )}
                </Grid>
              </Box>
            </Box>
          )}
        </Box>

        {/* Session Type */}
        <Box sx={{ mb: 4, mt: 4 }}>
          <Typography variant="h4">Session Type</Typography>
          <Grid container spacing={2} mt={2}>
            {['Lecture', 'Coursework', 'Tutorial', 'Lab Session'].map((type) => (
              <Grid item key={type}>
                <Button
                  variant={formData.sessionType === type ? 'contained' : 'outlined'}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      sessionType: type,
                    }))
                  }
                >
                  {type}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Select Time Range */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4">Select Time</Typography>
          <Grid container spacing={2} mt={2}>
            {[
              "Full Day ",
              "8.30am to 11.30am",
              "12.30pm to 3.30pm",
              "5.30pm to 8.30pm",
            ].map((timeRange) => (
              <Grid item key={timeRange}>
                <Button
                  variant={formData.time === timeRange ? "contained" : "outlined"}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      time: timeRange,
                    }))
                  }
                >
                  {timeRange}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Executive Summary & Schedule Button */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4">Executive Summary</Typography>
          <Paper sx={{ padding: 2, mt: 2 }}>
            <Typography variant="body1">
              <strong>Time:</strong> {formData?.time || 'Not selected'}
            </Typography>
            <Typography variant="body1">
              <strong>Batch:</strong> {formData?.batch || 'Not selected'}
            </Typography>
            <Typography variant="body1">
              <strong>Combined Batch:</strong> {formData?.selectedCombinedBatch || 'None'}
            </Typography>
            <Typography variant="body1">
              <strong>Course Director:</strong> {name || 'Unknown'}
            </Typography>
            <Typography variant="body1">
              <strong>Dates:</strong>{' '}
              {(formData?.dates || []).length > 0
                ? formData.dates
                    .map((date) => {
                      const [year, month, day] = date.split('-');
                      return `${day}-${month}-${year}`;
                    })
                    .join(', ')
                : 'Not selected'}
            </Typography>
            <Typography variant="body1">
              <strong>Session Type:</strong> {formData?.sessionType || 'Not selected'}
            </Typography>
            <Typography variant="body1">
              <strong>Lecturer:</strong>{' '}
              {formData?.lecturers?.join(', ') || 'Not assigned'}
            </Typography>
            <Typography variant="body1">
              <strong>Subjects:</strong> {(formData?.selectedSubjects || []).join(', ') || 'Not selected'}
            </Typography>
          </Paper>
          <Button
            variant="contained"
            color="primary"
            onClick={async () => {
              try {
                const combinedBatches = [
                  formData.batch,
                  ...(formData.selectedCombinedBatch ? [formData.selectedCombinedBatch] : []),
                ];
                if (!combinedBatches.length) {
                  alert("No batches selected.");
                  return;
                }
                for (const batch of combinedBatches) {
                  await addDoc(collection(db, "Agenda"), {
                    SessionType: formData.sessionType || "Not selected",
                    Time: formData.time || "Not selected",
                    batch: batch,
                    combinedbatch: combinedBatches.join(", "),
                    courseDirector: name || "Unknown",
                    date: (formData.dates || []).join(", ") || "Not selected",
                    lecturer: formData?.selectedSubjects
                      ?.map((subject) =>
                        subjects.find((item) => item.subject === subject)?.lecturer ||
                        "Unknown"
                      )
                      .filter(
                        (lecturer, index, self) =>
                          lecturer && self.indexOf(lecturer) === index
                      )
                      .join(", ") || "Not assigned",
                    subject: (formData?.selectedSubjects || []).join(", ") || "Not selected",
                  });
                }
                await addDoc(collection(db, "ScheduledSubjects"), {
                  SessionType: formData.sessionType || "Not selected",
                  Time: formData.time || "Not selected",
                  batch: formData.batch || "Not selected",
                  combinedbatch: combinedBatches.join(", "),
                  courseDirector: name || "Unknown",
                  date: (formData.dates || []).join(", ") || "Not selected",
                  hall: "",
                  lecturer: formData?.selectedSubjects
                    ?.map((subject) =>
                      subjects.find((item) => item.subject === subject)?.lecturer ||
                      "Unknown"
                    )
                    .filter(
                      (lecturer, index, self) =>
                        lecturer && self.indexOf(lecturer) === index
                    )
                    .join(", ") || "Not assigned",
                  status: "Not Booked",
                  subject: (formData?.selectedSubjects || []).join(", ") || "Not selected",
                });
                setFormData({
                  dates: [],
                  time: "",
                  sessionType: "",
                  seats: [],
                  batch: "",
                  selectedSubjects: [],
                  selectedCombinedBatch: "",
                });
                setCurrentMonthDates([]);
                setNextMonthDates([]);
                setDatesSelected(false);
                setSubjects([]);
                alert("Session scheduled successfully!");
              } catch (error) {
                console.error("Error scheduling session:", error);
                alert("Failed to schedule session. Please try again.");
              }
            }}
            sx={{ mt: 2 }}
            disabled={
              !formData?.time ||
              !formData?.batch ||
              (formData?.dates || []).length === 0
            }
          >
            Schedule
          </Button>
        </Box>
      </Container>

      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)",
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            switch (newValue) {
              case 0:
                navigate("/mainscreen", { state: { name } });
                break;
              case 1:
                navigate("/Coursedirectorbooking", { state: { name } });
                break;
              case 2:
                navigate("/Calender", { state: { name } });
                break;
              case 3:
                navigate("/Calendar", { state: { name } });
                break;
              default:
                break;
            }
          }}
          sx={{ backgroundColor: "white" }}
        >
          <BottomNavigationAction label="Main Display" icon={<Home sx={{ color: value === 0 ? "black" : "gray" }} />} />
          <BottomNavigationAction label="Schedule"
            icon={<AddBox sx={{ bgcolor: "#ddd", borderRadius: "10px", padding: "5px" }} />}
          />
          <BottomNavigationAction label="Schedule and Halls" icon={<Search sx={{ color: value === 1 ? "black" : "gray" }} />} />
        </BottomNavigation>
      </Paper>
      <Footer />
    </ThemeProvider>
  );
};

export default CoursedirectorBooking;