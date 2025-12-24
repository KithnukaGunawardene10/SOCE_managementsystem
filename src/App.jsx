import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BookingForm from "./components/BookingForm";
import MainScreen from "./components/mainscreen";
import CoursedirectorBooking from "./components/CoursedirectorBookings"
import Programingofficer from "./components/ProgrammingOfficer"
import Test from "./components/test"
import CalendarUI from "./components/Commonview";
import BottomNavigationBar from "./components/BottomNavigationBar";



// Create a custom theme for global font styling
const theme = createTheme({
  typography: {
    fontFamily: "Trebuchet MS, sans-serif",
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Ensures the theme is applied globally */}
      <Router>
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/mainscreen" element={<MainScreen />} />
          <Route path="/Coursedirectorbooking" element={<CoursedirectorBooking />} />
          <Route path="/Programmingofficer" element={<Programingofficer />} />
          <Route path="/Test" element={<Test />} />
          
        </Routes>
        {/* <BottomNavigationBar /> */}
      </Router>
    </ThemeProvider>
  );
};

export default App;
