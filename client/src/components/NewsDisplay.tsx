import React from "react";
import { Container, Typography, CircularProgress, Box } from "@mui/material";
import { NewsCard } from "./NewsCard";
import { NewsArticle } from "../interfaces/news";

interface NewsDisplayProps {
  news: NewsArticle[];
  loading: boolean;
  onAISummary: (article: NewsArticle) => void;
}

export const NewsDisplay: React.FC<NewsDisplayProps> = ({
  news,
  loading,
  onAISummary,
}) => {
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress size={50} />
      </Box>
    );
  }

  if (news.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <Typography variant="h6" color="text.secondary">
          No news articles found. Try adjusting your search criteria.
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth={false} sx={{ mt: 4, mb: 4, px: 3 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(3, 1fr)",
          },
          gap: 3,
        }}
      >
        {news.map((article, index) => (
          <NewsCard
            key={`article-${index}`}
            article={article}
            onAISummary={onAISummary}
          />
        ))}
      </Box>
    </Container>
  );
};
