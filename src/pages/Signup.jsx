// Signup.jsx
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Container,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import backgroundImage from "../NIBMloginwallpaper.png";

const Signup = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [customRole, setCustomRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [roleError, setRoleError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const validateFields = () => {
    let valid = true;

    if (!name.trim()) {
      setNameError("Name is required.");
      valid = false;
    } else {
      setNameError("");
    }

    if (!role) {
      setRoleError("Role is required.");
      valid = false;
    } else if (role === "Other" && !customRole.trim()) {
      setRoleError("Please specify your role.");
      valid = false;
    } else {
      setRoleError("");
    }

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

  const handleSignup = async () => {
    if (!validateFields()) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name,
        role: role === "Other" ? customRole : role,
        email: user.email,
        createdAt: new Date(),
      });

      alert("Signup successful!");

      if (role === "Program Office") {
        navigate("/Programmingofficer", { state: { name } });
      } else {
        navigate("/Coursedirectorbooking", { state: { name } });
      }
    } catch (error) {
      alert("Error signing up: " + error.message);
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
          backgroundColor: "rgba(0, 0, 0, 0.65)", // Dark overlay for readability
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
            background: "rgba(20, 20, 30, 0.85)", // Deep dark with transparency
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
              mb: 5,
              letterSpacing: "0.5px",
            }}
          >
            Create Account
          </Typography>

          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!nameError}
            helperText={nameError}
            InputProps={{ style: { borderRadius: 12 } }}
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

          <FormControl fullWidth margin="normal" error={!!roleError}>
            <InputLabel id="role-select-label" sx={{ color: "#aaa" }}>
              Role
            </InputLabel>
            <Select
              labelId="role-select-label"
              label="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              sx={{
                borderRadius: 3,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                "& .MuiSelect-select": { color: "#fff" },
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.08)" },
              }}
            >
              <MenuItem value="Course Director">Course Director</MenuItem>
              <MenuItem value="Program Office">Program Office</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
            {roleError && (
              <Typography variant="caption" color="error" sx={{ ml: 2, mt: 0.5 }}>
                {roleError}
              </Typography>
            )}
          </FormControl>

          {role === "Other" && (
            <TextField
              label="Specify Your Role"
              variant="outlined"
              fullWidth
              margin="normal"
              value={customRole}
              onChange={(e) => setCustomRole(e.target.value)}
              error={!!roleError && !customRole.trim()}
              helperText={!!roleError && !customRole.trim() ? roleError : ""}
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
          )}

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
            onClick={handleSignup}
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
            Sign Up
          </Button>

          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="body2" color="#ccc">
              Already have an account?{" "}
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate("/login")}
                sx={{
                  fontWeight: 600,
                  color: "#00E5FF",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Log In
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Signup;