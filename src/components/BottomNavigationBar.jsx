import React, { useState } from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { Home, Search, AddBox, Favorite, Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const BottomNavigationBar = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)",
        // Added: Safe area support for notched phones (iPhone X and later, modern Android)
        pb: { xs: "env(safe-area-inset-bottom)", sm: 0 }, // Adds padding at bottom on notched devices
        bgcolor: "background.paper",
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
              navigate("/");
              break;
            case 1:
              navigate("/search");
              break;
            case 2:
              navigate("/add");
              break;
            case 3:
              navigate("/favorites");
              break;
            case 4:
              navigate("/profile");
              break;
            default:
              break;
          }
        }}
        // Improved responsiveness & touch targets
        sx={{
          height: { xs: 66, sm: 56 }, // Slightly taller on mobile for better touch
          "& .MuiBottomNavigationAction-root": {
            minWidth: 64,
            padding: "6px 0 8px",
            "& .MuiSvgIcon-root": {
              fontSize: "1.5rem", // Consistent icon size
            },
            "& .MuiBottomNavigationAction-label": {
              fontSize: "0.75rem",
              mt: 0.5,
            },
          },
          // Special styling for the middle "Add" button (your custom style preserved)
          "& .MuiBottomNavigationAction-root:nth-of-type(3)": {
            "& .MuiSvgIcon-root": {
              bgcolor: "#ddd",
              borderRadius: "10px",
              padding: "5px",
              fontSize: "2rem", // Make the + icon stand out
            },
          },
          // Favorites icon color preserved
          "& .MuiBottomNavigationAction-root:nth-of-type(4) .MuiSvgIcon-root": {
            color: "black",
          },
        }}
      >
        <BottomNavigationAction label="Home" icon={<Home />} />
        <BottomNavigationAction label="Search" icon={<Search />} />
        <BottomNavigationAction icon={<AddBox sx={{ bgcolor: "#ddd", borderRadius: "10px", padding: "5px" }} />} />
        <BottomNavigationAction label="Favorites" icon={<Favorite sx={{ color: "black" }} />} />
        <BottomNavigationAction label="Profile" icon={<Person />} />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavigationBar;