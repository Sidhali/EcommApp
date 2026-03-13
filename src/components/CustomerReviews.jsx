import React from "react";
import { Box, Divider, Rating, Typography } from "@mui/material";

function CustomerReviews({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return (
      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" fontWeight={600}>
          Reviews
        </Typography>
        <Typography sx={{ mt: 2 }} color="#0c1670">
          No reviews available
        </Typography>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        mt: 6,
        width: "90%",
        margin: "0 auto",
        marginBottom: 3,
        
      }}
    >
      <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
        Customer Reviews
      </Typography>

      <Box
        sx={{
          border: "1px solid #802834",
          borderRadius: 3,
          p: 3,
          backgroundColor: "",
        }}
      >
        {reviews.map((review, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Rating value={review.rating} readOnly size="small" />

              <Typography variant="caption" color="#294183">
                {new Date(review.date).toLocaleString()}
              </Typography>
            </Box>

            <Typography variant="subtitle2" fontWeight={600} sx={{ mt: 1 }}>
              {review.reviewerName}
            </Typography>

            <Typography variant="body2" color="#060406" sx={{ mt: 1 }}>
              {review.comment}
            </Typography>

            {index !== reviews.length - 1 && <Divider sx={{ mt: 3 }} />}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default CustomerReviews;
