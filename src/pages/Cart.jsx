import { Box, Stepper, Step, StepLabel } from "@mui/material";
import { useState } from "react";
import CartSection from "../components/cart/CartSection.jsx";
import ShippingForm from "../components/cart/ShippingForm";
import PaymentForm from "../components/cart/PaymentForm";

const steps = ["Cart", "Shipping Address", "Payment"];

export default function CartPage() {
  const [activeStep, setActiveStep] = useState(() => {
    const savedStep = localStorage.getItem("checkoutStep");

    if (savedStep) {
      localStorage.removeItem("checkoutStep");
      return Number(savedStep);
    }
    return 0;
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        backgroundColor: "#daf4fe",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ p: 4, width: "100%", maxWidth: "1600px" }}>
        <Stepper activeStep={activeStep} sx={{ mb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && <CartSection setActiveStep={setActiveStep} />}
        {activeStep === 1 && <ShippingForm setActiveStep={setActiveStep} />}
        {activeStep === 2 && <PaymentForm />}
      </Box>
    </Box>
  );
}
