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
