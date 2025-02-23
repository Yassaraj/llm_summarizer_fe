import React, { useState } from "react";
import { Container, Typography, Box, Button, Alert } from "@mui/material";
import PDFViewer from "../components/PDFViewer";
import { pdfjs } from "react-pdf";
import "../styles/MainPage.css";

const MainPage = ({ uploadPDF, summaryData }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  // Store validation errors
  const [error, setError] = useState(""); 

  const onFileChange = async (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) return;

    // Reset state
    setError("");
    setFile(null);

    // Validate PDF page count before uploading
    const reader = new FileReader();
    reader.readAsArrayBuffer(selectedFile);
    reader.onloadend = async () => {
      const pdf = await pdfjs.getDocument({ data: reader.result }).promise;
      const numPages = pdf.numPages;

      if (numPages < 3 || numPages > 10) {
        setError("Please upload a PDF with 3 to 10 pages.");
        return;
      }

      setFile(selectedFile);
      setLoading(true);
      await uploadPDF(selectedFile);
      setLoading(false);
    };
  };

  return (
    <Container className="container">
      <Typography variant="h4">PDF Summarizer</Typography>
      <Typography variant="subtitle1" gutterBottom>
        Summarize your PDF page-wise. Please select a PDF (3-10 pages).
      </Typography>

      <Box>
        <Button variant="outlined" component="label" className="upload-button">
          Select and Upload PDF
          <input type="file" hidden accept="application/pdf" onChange={onFileChange} />
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      {file && <PDFViewer file={file} summaryData={summaryData} loading={loading} />}
    </Container>
  );
};

export default MainPage;
