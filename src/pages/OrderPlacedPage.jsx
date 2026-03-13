import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function OrderPlacedPage() {
  const [cartItems] = useState(() => {
    const savedOrder = localStorage.getItem("lastOrder");
    return savedOrder ? JSON.parse(savedOrder) : [];
  });

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#fcefb6",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
      }}
    >
      <CheckCircleOutlineIcon sx={{ fontSize: 80, color: "#022489", mb: 2 }} />
      <Typography variant="h4" sx={{ fontWeight: 700, margin: 3 }}>
        Order Placed Successfully
      </Typography>

      <Grid container spacing={3} sx={{ maxWidth: "1500px" }}>
        {cartItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={item.thumbnail}
                alt={item.title}
              />

              <CardContent>
                <Typography variant="h6">{item.title}</Typography>

                <Typography sx={{ color: "rgb(0, 43, 153)" }}>
                  Quantity: {item.quantity}
                </Typography>

                <Typography sx={{ fontWeight: 600 }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Button
        variant="contained"
        sx={{
          mt: 5,
          px: 4,
          py: 1.2,
          borderRadius: 3,
          textTransform: "none",
          fontSize: 16,
          backgroundColor: "#082348",
        }}
        onClick={() => navigate("/")}
      >
        Continue Shopping
      </Button>
    </Box>
  );
}
