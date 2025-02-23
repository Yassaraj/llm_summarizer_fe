import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import MainPage from "./pages/MainPage";

function App() {
  const [summaryData, setSummaryData] = useState([]);

  //Upload selected pdf
  const uploadPDF = async (file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response  = await axios.post("http://localhost:8000/upload-pdf/", formData);
      setSummaryData(response.data);
    } catch (error) {
      console.error("Error uploading PDF:", error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage uploadPDF={uploadPDF} summaryData={summaryData} />} />
      </Routes>
    </Router>
  );
}

export default App;