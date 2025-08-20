import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
} from "@mui/material";
import { NewsArticle } from "../interfaces/news";

interface NewsCardProps {
  article: NewsArticle;
  onAISummary: (article: NewsArticle) => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article, onAISummary }) => {
  const handleAISummaryClick = () => {
    onAISummary(article);
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
      </CardContent>

      <Box sx={{ p: 2, pt: 0 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={handleAISummaryClick}
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
          }}
        >
          AI SUMMARY
        </Button>
      </Box>
    </Card>
  );
};
