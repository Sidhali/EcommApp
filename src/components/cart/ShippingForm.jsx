import { Box, TextField, Button } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

export default function ShippingForm({ setActiveStep }) {
  // const navigate = useNavigate();

  const initialValues = {
    fullName: "",
    address: "",
    city: "",
    pincode: "",
  };
  const validationSchema = Yup.object({
    fullName: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .matches(/^[A-Za-z\s]+$/, "Only letters are allowed")
      .required("Full name is required"),
    address: Yup.string()
      .min(5, "Address is too short")
      .required("Address is required"),
    city: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "City can only contain letters")
      .required("City is required"),
    pincode: Yup.string()
      .matches(/^[0-9]{6}$/, "Pincode must be exactly 6 digits")
      .required("Pincode is required"),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={() => {
          setActiveStep(2);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Box
              sx={{
                maxWidth: 500,
                mx: "auto",
                backgroundColor: "#134d90",
                borderRadius: 3,
                padding: 3,
              }}
            >
              <Field
                as={TextField}
                name="fullName"
                label="Full Name"
                fullWidth
                margin="normal"
                error={touched.fullName && Boolean(errors.fullName)}
                helperText={touched.fullName && errors.fullName}
                sx={{ backgroundColor: "#f8f5f8", borderRadius: 3 }}
              />

              <Field
                as={TextField}
                name="address"
                label="Address"
                fullWidth
                margin="normal"
                error={touched.address && Boolean(errors.address)}
                helperText={touched.address && errors.address}
                sx={{ backgroundColor: "#f8f5f8", borderRadius: 3 }}
              />

              <Field
                as={TextField}
                name="city"
                label="city"
                fullWidth
                margin="normal"
                error={touched.city && Boolean(errors.city)}
                helperText={touched.city && errors.city}
                sx={{ backgroundColor: "#f8f5f8", borderRadius: 3 }}
              />

              <Field
                as={TextField}
                name="pincode"
                label="Pincode"
                fullWidth
                margin="normal"
                error={touched.pincode && Boolean(errors.pincode)}
                helperText={touched.pincode && errors.pincode}
                sx={{ backgroundColor: "#f8f5f8", borderRadius: 3 }}
              />

              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#10abda",
                  marginLeft: 15,
                  marginTop: 3,
                  borderRadius: 3,
                }}
              >
                Continue to payment
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
}
