import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { useNavigate } from "react-router-dom";
import { loginAPI } from "../services/apiService";
import { loginSuccess } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Email is required"),
    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f6f8f8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ backgroundColor: "#1c548c", padding: 5, borderRadius: 3 }}>
          <Typography variant="h4" fontWeight="bold" sx={{ color: "#f7f0f3" }}>
            Login
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              // console.log("FORM VALUES:", values);
              try {
                // console.log("FORM VALUES:", values);

                const data = await loginAPI(values);

                // console.log("login response:", data);
                // console.log("TOKEN:", data.accessToken);

                localStorage.setItem("accessToken", data.accessToken);

                dispatch(loginSuccess());

                // console.log(
                //   "Saved token:",
                //   localStorage.getItem("accessToken"),
                // );

                navigate("/cart");
              } catch (error) {
                console.error("Login failed:", error);
              }
            }}
          >
            {({ values, handleChange, handleBlur, errors, touched }) => (
              <Form>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Username"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                  sx={{ backgroundColor: "#f8f5f8", borderRadius: 3 }}
                />

                <TextField
                  fullWidth
                  margin="normal"
                  type="password"
                  label="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ backgroundColor: "#f8f5f8", borderRadius: 3 }}
                />

                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  sx={{ mt: 3, backgroundColor: "#f8bf39" }}
                >
                  Login
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </Box>
  );
}

export default LoginPage;
