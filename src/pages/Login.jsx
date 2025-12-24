// Login.jsx
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Container,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import backgroundImage from "../NIBMloginwallpaper.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    if (!email) {
      setEmailError("Please enter your email first.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent! Check your inbox.");
    } catch (error) {
      alert("Error sending reset email: " + error.message);
    }
  };

  const validateFields = () => {
    let valid = true;

    if (!email.includes("@") || !email.includes(".")) {
      setEmailError("Please enter a valid email.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  };

  const handleLogin = async () => {
    if (!validateFields()) return;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userEmail = userCredential.user.email;

      // Fetch user details from Firestore
      const usersQuery = query(collection(db, "users"), where("email", "==", userEmail));
      const querySnapshot = await getDocs(usersQuery);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0].data();
        const { name, role } = userDoc;

        // Redirect based on role
        if (role === "Program Office") {
          navigate("/Programmingofficer", { state: { name } });
        } else {
          navigate("/Coursedirectorbooking", { state: { name } });
        }
      } else {
        alert("User details not found. Please contact admin.");
      }
    } catch (error) {
      alert("Error logging in: " + error.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.65)",
          backdropFilter: "blur(4px)",
          zIndex: 1,
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 2 }}>
        <Paper
          elevation={24}
          sx={{
            p: { xs: 4, sm: 6 },
            borderRadius: 4,
            background: "rgba(20, 20, 30, 0.85)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6)",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 800,
              background: "linear-gradient(90deg, #00B0FF, #00E5FF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 3,
              letterSpacing: "0.5px",
            }}
          >
            Welcome Back
          </Typography>

          <Typography
            variant="body1"
            align="center"
            color="#aaa"
            sx={{ mb: 5 }}
          >
            Log in to your SOCE Lecture Hall Reservation account
          </Typography>

          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!emailError}
            helperText={emailError}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.08)" },
              },
              "& .MuiInputLabel-root": { color: "#aaa" },
              "& .MuiOutlinedInput-input": { color: "#fff" },
            }}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.08)" },
              },
              "& .MuiInputLabel-root": { color: "#aaa" },
              "& .MuiOutlinedInput-input": { color: "#fff" },
            }}
          />

          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={handleLogin}
            sx={{
              mt: 5,
              py: 2,
              fontSize: "1.2rem",
              fontWeight: 700,
              textTransform: "none",
              borderRadius: 3,
              background: "linear-gradient(90deg, #00B0FF, #00E5FF)",
              boxShadow: "0 8px 20px rgba(0, 176, 255, 0.4)",
              "&:hover": {
                background: "linear-gradient(90deg, #0099e6, #00cceb)",
                boxShadow: "0 12px 30px rgba(0, 176, 255, 0.6)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Log In
          </Button>

          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Link
              component="button"
              variant="body2"
              onClick={handleForgotPassword}
              sx={{
                color: "#00E5FF",
                fontWeight: 600,
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Forgot Password?
            </Link>
          </Box>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2" color="#ccc">
              Don't have an account?{" "}
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate("/signup")}
                sx={{
                  fontWeight: 600,
                  color: "#00E5FF",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;