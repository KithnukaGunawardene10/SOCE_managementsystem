import React from "react";
import { TextField } from "@mui/material";

const ReusableForm = ({ label, type, value, onChange }) => {
  return (
    <TextField
      label={label}
      type={type}
      variant="outlined"
      fullWidth
      margin="normal"
      value={value}
      onChange={onChange}
    />
  );
};



export default ReusableForm;
