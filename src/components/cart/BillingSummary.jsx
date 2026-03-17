import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function BillingSummary({ setActiveStep }) {
  const { items } = useSelector((state) => state.cart);

  const [openLoginDialog, setOpenLoginDialog] = useState(false);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  const handleProceedToPayment = () => {
    console.log("Proceed clicked");
    if (!isLoggedIn) {
      localStorage.setItem("checkoutStep", "1");
      setOpenLoginDialog(true);
      return;
    }
    setActiveStep(1);
  };

  const totalAmount = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <>
      <Box
        sx={{
          border: "1px solid #235489",
          p: 3,
          backgroundColor: "#fcf9f9",
          borderRadius: 2,
          padding: 6,
          boxShadow: "0 2px 6px rgb(94, 142, 239)",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Billing Details
        </Typography>

        {items.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Typography sx={{ paddingRight: 15 }}>
              {item.title} x {item.quantity}
            </Typography>

            <Typography>₹{(item.price * item.quantity).toFixed(2)}</Typography>
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Subtotal</Typography>
          <Typography>₹{totalAmount.toFixed(2)}</Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <Typography>Shipping</Typography>
          <Typography>Free</Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <Typography>Tax</Typography>
          <Typography>₹0.00</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Total</Typography>
          <Typography variant="h6">₹{totalAmount.toFixed(2)}</Typography>
        </Box>

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, backgroundColor: "#053072" }}
          onClick={() => {
            handleProceedToPayment();
          }}
        >
          Proceed to shipping
        </Button>
      </Box>

      <Dialog open={openLoginDialog} onClose={() => setOpenLoginDialog(false)}>
        <DialogTitle>Login Required</DialogTitle>

        <DialogContent>
          You must login before proceeding to payment
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenLoginDialog(false)}>Close</Button>

          <Button variant="contained" onClick={() => navigate("/login")}>
            Proceed to Login
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
