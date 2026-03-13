import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  TextField,
  Badge,
} from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import { clearWishlist } from "../features/wishlist/wishlistSlice";
import { closeLoginModal, openLoginModal } from "../features/ui/uiSlice";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../services/apiService";
import { loginSuccess } from "../features/auth/authSlice";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StorefrontIcon from "@mui/icons-material/Storefront";
import Modal from "@mui/material/Modal";
import { searchProducts } from "../features/search/searchThunk";
import { clearSearchResults } from "../features/search/searchSlice";
import { debounce } from "../utility/debounce";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

import SearchIcon from "@mui/icons-material/Search";

import { useSelector } from "react-redux";

// import React, { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //   const [open, setOpen] = useState(false);
  //   const handleOpen = () => setOpen(true);

  const [query, setQuery] = useState("");

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

  const wishlistItems = useSelector((state) => state.wishlist.items);

  const open = useSelector((state) => state.ui.loginModalOpen);

  const wishlistCount = wishlistItems.length;

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const results = useSelector((state) => state.search.results);

  const [showDropDown, setShowDropDown] = useState(false);

  const debouncedSearch = debounce((value) => {
    if (value.trim() !== "") {
      dispatch(searchProducts(value));
    } else {
      dispatch(clearSearchResults());
    }
  }, 500);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearWishlist());
    dispatch(closeLoginModal());
    navigate("/");
  };

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const handleWishlistClick = () => {
    if (!isLoggedIn) {
      dispatch(openLoginModal());
      return;
    }
    navigate("/wishlist");
  };

  return (
    <Box>
      <AppBar sx={{ backgroundColor: "#0d3463fd" }} position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            onClick={() => navigate("/")}
            sx={{
              display: "flex",
              gap: 1,
              cursor: "pointer",
            }}
          >
            <StorefrontIcon sx={{ fontSize: 28 }} />
            <Typography
              sx={{ fontWeight: "bold", fontSize: 18, color: "#f1f2f5" }}
            >
              My Shop
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <SearchIcon />
            <TextField
              size="small"
              value={query}
              onFocus={() => setShowDropDown(true)}
              onBlur={() => {
                setTimeout(() => {
                  setShowDropDown(false);
                }, 200);
              }}
              onChange={(e) => {
                const value = e.target.value;
                setQuery(value);
                debouncedSearch(value);
              }}
              placeholder="Search products..."
              sx={{ backgroundColor: "white", borderRadius: 1, width: 600 }}
            />
            {showDropDown && query && (
              <Box
                sx={{
                  position: "absolute",
                  top: 60,
                  width: 500,
                  backgroundColor: "#f5f6f9",
                  borderRadius: 2,
                  boxShadow: 3,
                  zIndex: 1000,
                  color: "#0a0708",
                  maxHeight: 400,
                  overflowY: "auto",
                }}
              >
                {results.length === 0 ? (
                  <Typography sx={{ p: 2 }}>No Results Found</Typography>
                ) : (
                  results.map((item) => (
                    <Box
                      key={item.id}
                      onClick={() => {
                        navigate(`/products/${item.id}`);
                        setShowDropDown(false);
                        setQuery("");
                        dispatch(clearSearchResults());
                      }}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        p: 2,
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "#cbdcf8",
                        },
                      }}
                    >
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        width={40}
                        height={40}
                      />
                      <Typography>{item.title}</Typography>
                    </Box>
                  ))
                )}
              </Box>
            )}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton onClick={handleWishlistClick}>
              <Badge badgeContent={wishlistCount} color="error">
                <FavoriteIcon sx={{ color: "#f9f8f7" }} />
              </Badge>
            </IconButton>
            <IconButton onClick={() => navigate("/cart")}>
              <Badge badgeContent={totalQuantity} color="error">
                <ShoppingCartIcon sx={{ color: "#fafbf9" }} />
              </Badge>
            </IconButton>

            {isLoggedIn ? (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Box>
                <Button
                  color="inherit"
                  onClick={() => dispatch(openLoginModal())}
                >
                  Login
                </Button>
                <Modal open={open} onClose={() => dispatch(closeLoginModal())}>
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",

                      width: 400,
                      bgcolor: "#1c548c",

                      p: 4,
                      borderRadius: 3,
                      boxShadow: 24,

                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      sx={{ color: "#f7f0f3" }}
                    >
                      Please Login
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

                          dispatch(closeLoginModal());
                        } catch (error) {
                          console.error("Login failed:", error);
                        }
                      }}
                    >
                      {({
                        values,
                        handleChange,
                        handleBlur,
                        errors,
                        touched,
                      }) => (
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
                </Modal>
              </Box>
            )}

            <IconButton>
              <FaceIcon sx={{ color: "#f2f66c" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* <Sidebar open={open} setOpen={setOpen} /> */}
    </Box>
  );
}

export default Navbar;
