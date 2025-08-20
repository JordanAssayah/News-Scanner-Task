import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";
import { NewsArticle, AISummaryResponse } from "../interfaces/news";
import httpClient, { ENDPOINTS } from "../services/http-client";

interface NewsCardProps {
  article: NewsArticle;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const [aiSummary, setAiSummary] = useState<AISummaryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAISummaryClick = async () => {
    if (!article.description) {
      setError("No description available for AI summary");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await httpClient.post<AISummaryResponse>(
        ENDPOINTS.AI_SUMMARY,
        {
          description: article.description,
        }
      );
      setAiSummary(response.data);
    } catch (err) {
      console.error("Error generating AI summary:", err);
      setError("Failed to generate AI summary. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback image if no image is provided
  const imageUrl = article.urlToImage || "/logo.svg";

  return (
    <Card
      sx={{
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={imageUrl}
        alt={article.title}
        sx={{
          objectFit: "cover",
        }}
      />

      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: 600,
            fontSize: "1.1rem",
            lineHeight: 1.3,
            mb: 2,
          }}
        >
          {article.title}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: 600, mb: 0.5 }}
          >
            Description:
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: "0.9rem",
              lineHeight: 1.4,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {article.description || "No description available"}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: 600, mb: 0.5 }}
          >
            Source:
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "0.9rem" }}
          >
            {article.source.name}
          </Typography>
        </Box>

        {article.author && (
          <Chip
            label={`By ${article.author}`}
            size="small"
            variant="outlined"
            sx={{ mb: 2 }}
          />
        )}

        {/* AI Summary Section */}
        {aiSummary && (
          <>
            <Divider sx={{ my: 2 }} />

            {/* Summary Section */}
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontWeight: 600, mb: 0.5 }}
              >
                Summary:
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: "0.9rem",
                  lineHeight: 1.4,
                  whiteSpace: "pre-line",
                }}
              >
                {aiSummary.summary}
              </Typography>
            </Box>

            {/* Violation Section */}
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontWeight: 600, mb: 0.5 }}
              >
                Violation:
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: "0.9rem",
                  lineHeight: 1.4,
                  fontStyle: "italic",
                }}
              >
                {aiSummary.violation}
              </Typography>
            </Box>
          </>
        )}

        {/* Error Display */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
      </CardContent>

      <Box sx={{ p: 2, pt: 0 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={handleAISummaryClick}
          disabled={isLoading || !article.description}
          sx={{
            backgroundColor: "#7c3aed",
            color: "white",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            py: 1.5,
            "&:hover": {
              backgroundColor: "#6d28d9",
            },
            "&:disabled": {
              backgroundColor: "#9ca3af",
              color: "#6b7280",
            },
          }}
        >
          {isLoading ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CircularProgress size={20} color="inherit" />
              GENERATING...
            </Box>
          ) : (
            "AI SUMMARY"
          )}
        </Button>
      </Box>
    </Card>
  );
};
