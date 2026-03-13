import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

export default function EmptyCart() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "55vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        gap: 2,
      }}
    >
      <ShoppingCartOutlinedIcon
        sx={{ fontSize: 90, color: "#232a89", opacity: 0.8 }}
      />

      <Typography variant="h4" sx={{ fontWeight: 400 }}>
        Your cart is empty{" "}
      </Typography>

      <Typography sx={{ maxWidth: 420, color: "#081112" }}>
        Looks like you haven't added anything yet. Discover and fill your cart
        with products you love
      </Typography>

      <Button
        variant="contained"
        sx={{
          mt: 2,
          px: 4,
          py: 1.2,
          borderRadius: 3,
          textTransform: "none",
          fontSize: 16,
          backgroundColor: "#133c89",
        }}
        onClick={() => navigate("/")}
      >
        Start Shopping
      </Button>
    </Box>
  );
}
