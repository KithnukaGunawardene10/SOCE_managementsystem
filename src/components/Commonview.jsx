import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Tabs,
  Tab,
  TextField,
  Button,
} from "@mui/material";


// Use a simpler, lightweight, fully free & open-source Excel-like component
// Install: npm install react-spreadsheet

const EMBED_URL = "https://nibm-my.sharepoint.com/:x:/g/personal/chandula_nibm_lk/IQCgIDF-sYzjQadNJVUavD-jAfXP7lrPyAKTRnc95CvBAWg?e=mKbAeb&xsdata=MDV8MDJ8a2l0aG51a2FAbmlibS5sa3wwOTE3MWRlNWNmZjc0MGNkYmVkZTA4ZGUzN2FkNDRmMXxhNmVjMGYxYzJhMzQ0MWE5YWQxMTIyNzVhNDg4ODQ5N3wwfDB8NjM5MDA5NDE0NTA0NDk3MTQ4fFVua25vd258VFdGcGJHWnNiM2Q4ZXlKRmJYQjBlVTFoY0draU9uUnlkV1VzSWxZaU9pSXdMakF1TURBd01DSXNJbEFpT2lKWGFXNHpNaUlzSWtGT0lqb2lUV0ZwYkNJc0lsZFVJam95ZlE9PXwwfHx8&sdata=U2kxVStjRFZpRWJPWFArbjZEU3R4MDBKRElmTzhNSlZiQXkvWVFnMFhUST0%3d&action=embedview";
const MANUAL_DOWNLOAD_URL = "https://nibm-my.sharepoint.com/:x:/g/personal/chandula_nibm_lk/IQCgIDF-sYzjQadNJVUavD-jAfXP7lrPyAKTRnc95CvBAWg?e=mKbAeb&download=1";

const Commonview = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [liveSelectedDate, setLiveSelectedDate] = useState("");
  const [pickSelectedDate, setPickSelectedDate] = useState("");
  const [sessions, setSessions] = useState([]); // For date picker logic

  // 2D array for the interactive spreadsheet (rows of cells with { value: string })
  const [spreadsheetData, setSpreadsheetData] = useState([[{ value: "" }]]);

  const parseExcel = (workbook) => {
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // 2D array

    // Simple parsing for date view
    const headers = json[0] || [];
    const dataRows = json.slice(1);
    const parsedSessions = dataRows.map((row) => {
      const dateIndex = headers.findIndex((h) => /date/i.test(h || ""));
      let dateKey = row[dateIndex];
      if (typeof dateKey === "number") {
        dateKey = XLSX.SSF.format("yyyy-mm-dd", dateKey);
      } else if (dateKey instanceof Date) {
        dateKey = dateKey.toISOString().split("T")[0];
      }

      const morningIndex = headers.findIndex((h) => /morning/i.test(h || ""));
      const afternoonIndex = headers.findIndex((h) => /afternoon/i.test(h || ""));

      return {
        dateKey: dateKey || "",
        morning: row[morningIndex] || "-",
        afternoon: row[afternoonIndex] || "-",
      };
    }).filter((s) => s.dateKey);
    setSessions(parsedSessions);

    // Convert to react-spreadsheet format: array of rows, each row array of { value: ... }
    const sheetData = json.map((row) =>
      row.map((cell) => ({ value: cell == null ? "" : String(cell) }))
    );
    setSpreadsheetData(sheetData.length ? sheetData : [[{ value: "" }]]);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      parseExcel(wb);
    };
    reader.readAsBinaryString(file);
  };

  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    const today = "2025-12-18";
    setLiveSelectedDate(today);
    setPickSelectedDate(today);
  }, []);

  const liveSession = sessions.find((s) => s.dateKey === liveSelectedDate);
  const pickSession = sessions.find((s) => s.dateKey === pickSelectedDate);

  return (
    l
  );
};

export default Commonview;