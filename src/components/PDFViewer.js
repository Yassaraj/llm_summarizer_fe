import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import { Box, Paper, Button, Typography, Container, IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { pdfjs } from "react-pdf";
import SummaryPanel from "./SummaryPanel";
import "../styles/PDFViewer.css";

// Setting the worker source manually using a relative path
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

const PDFViewer = ({ file, summaryData, loading }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);

  // Reset page number when a new PDF is selected
  useEffect(() => {
    setPageNumber(1);
  }, [file]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <Container maxWidth="xl" className="pdf-container">
      <Box className="viewer-box">
        <Paper elevation={3} className="pdf-paper">
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} scale={scale} />
          </Document>
        </Paper>
        <SummaryPanel pageNumber={pageNumber} summaryData={summaryData} loading={loading} />
      </Box>

      {/* Zoom Control Buttons */}
      <Box className="navigation-box">
        <IconButton onClick={() => setScale((prev) => Math.max(prev - 0.1, 0.5))} className="zoom-button">
          <Remove />
        </IconButton>
        <Typography variant="body1">Zoom: {Math.round(scale * 100)}%</Typography>
        <IconButton onClick={() => setScale((prev) => Math.min(prev + 0.1, 2.0))} className="zoom-button">
          <Add />
        </IconButton>
      </Box>

      {/* PDF Navigation Buttons*/}
      <Box className="navigation-box">
        <Button variant="contained" onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))} disabled={pageNumber === 1}>
          Prev
        </Button>
        <Typography variant="body1">
          Page {pageNumber} of {numPages}
        </Typography>
        <Button variant="contained" onClick={() => setPageNumber((prev) => Math.min(prev + 1, numPages))} disabled={pageNumber === numPages}>
          Next
        </Button>
      </Box>
    </Container>
  );
};

export default PDFViewer;