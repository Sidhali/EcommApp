import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Box, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { clearCart } from "../../features/cart/cartSlice";

export default function PaymentForm() {
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlePayment = () => {
    navigate("/order-placed");
    localStorage.setItem("lastOrder", JSON.stringify(cartItems));
    dispatch(clearCart());
  };
  const initialValues = {
    cardNumber: "",
    expiry: "",
    cvv: "",
  };
  const validationSchema = Yup.object({
    cardNumber: Yup.string()
      .matches(/^\d{16}$/, "Card number must be 16 digits")
      .required("Card number is required"),
    expiry: Yup.string()
      .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry must be in MM/YY format")
      .required("Expiry date is required"),
    cvv: Yup.string()
      .matches(/^\d{3,4}$/, "CVV must be 3 or 4 digits")
      .required("CVV is required"),
  });
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={() => handlePayment()}
    >
      {({ errors, touched }) => (
        <Form>
          <Box
            sx={{
              maxWidth: 500,
              mx: "auto",
              backgroundColor: "#235290",
              borderRadius: 3,
              padding: 3,
            }}
          >
            <Field
              as={TextField}
              name="cardNumber"
              label="Card Number"
              fullWidth
              margin="normal"
              error={touched.cardNumber && Boolean(errors.cardNumber)}
              helperText={touched.cardNumber && errors.cardNumber}
              sx={{ backgroundColor: "#f8f5f8", borderRadius: 3 }}
            />

            <Field
              as={TextField}
              name="expiry"
              label="Expiry"
              fullWidth
              margin="normal"
              error={touched.expiry && Boolean(errors.expiry)}
              helperText={touched.expiry && errors.expiry}
              sx={{ backgroundColor: "#f8f5f8", borderRadius: 3 }}
            />

            <Field
              as={TextField}
              name="cvv"
              label="CVV"
              fullWidth
              margin="normal"
              error={touched.cvv && Boolean(errors.cvv)}
              helperText={touched.cvv && errors.cvv}
              sx={{ backgroundColor: "#f8f5f8", borderRadius: 3 }}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#1d6e31",
                marginLeft: 21,
                marginTop: 3,
                borderRadius: 3,
              }}
            >
              Pay Now
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
