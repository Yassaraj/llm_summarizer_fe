import React from "react";
import { Paper, Typography, CircularProgress, Box } from "@mui/material";
import "../styles/SummaryPanel.css";

const SummaryPanel = ({ pageNumber, summaryData, loading }) => {
  const pageData = summaryData?.response?.find(
    (item) => Number(item.page_number) === Number(pageNumber)
  );

  //highlighting the keywords in summary
  const HighlightedText = ({ text, keywords }) => {
    if (!text || !Array.isArray(keywords) || keywords.length === 0) return text;

    // Escape special characters in keywords for regex
    const escapedKeywords = keywords.map((kw) => kw.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
    const regex = new RegExp(`(${escapedKeywords.join("|")})`, "gi");

    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, index) =>
          keywords.some((kw) => kw.toLowerCase() === part.toLowerCase()) ? (
            <span key={index} style={{ backgroundColor: "lightblue", fontWeight: "bold" }}>
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <Paper elevation={3} className="summary-panel">
      <Typography variant="h6" className="summary-title">
        Page {pageNumber}
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography
            variant="subtitle1"
            className="section-title"
            style={{ marginTop: 20, fontWeight: "bold" }}
          >
            Summary:
          </Typography>
          <Typography variant="body1">
            {pageData?.summary ? (
              <HighlightedText text={pageData.summary} keywords={pageData.keywords} />
            ) : (
              "Loading..."
            )}
          </Typography>

          <Typography
            variant="subtitle1"
            className="section-title"
            style={{ marginTop: 25, fontWeight: "bold" }}
          >
            Key Words:
          </Typography>
          {Array.isArray(pageData?.keywords) ? (
            <ul className="keyword-list">
              {pageData.keywords.map((word, index) => (
                <li key={index}>{word}</li>
              ))}
            </ul>
          ) : (
            <Typography variant="body1">{pageData?.keywords || "Loading..."}</Typography>
          )}
        </>
      )}
    </Paper>
  );
};

export default SummaryPanel;