import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../features/products/productsThunk";
import ProductPreviewSkeleton from "../components/ProductPreviewSkeleton";

import {
  Box,
  CircularProgress,
  Container,
  Typography,
  Rating,
  Button,
  Divider,
  TextField,
  IconButton,
} from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SellIcon from "@mui/icons-material/Sell";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ProductsSpecifications from "../components/ProductsSpecifications";
import CustomerReviews from "../components/CustomerReviews";
import QuantityInput from "../common/QuantityInput";
import { addToCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

function ProductsPreviewSection() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const reviewsRef = useRef(null);

  const { selectedProduct, loading } = useSelector((state) => state.products);
  const [activeImage, setActiveImage] = useState(null);

  const [quantity, setQuantity] = useState(1);

  const cartItems = useSelector((state) => state.cart.items);
  const isInCart = cartItems.some((item) => item.id === selectedProduct?.id);

  const scrollToReviews = () => {
    reviewsRef.current?.scrollIntoView({
      behaviour: "smooth",
      block: "start",
    });
  };

  const handleIncrease = () => {
    if (quantity < selectedProduct.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > selectedProduct.minimumOrderQuantity) {
      setQuantity((prev) => prev - 1);
    }
  };

  const discountedPrice = selectedProduct
    ? (
        selectedProduct.price *
        (1 - selectedProduct.discountPercentage / 100)
      ).toFixed(2)
    : 0;

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct) {
      setActiveImage(selectedProduct.thumbnail);
      setQuantity(selectedProduct.minimumOrderQuantity || 1);
    }
  }, [selectedProduct]);

  if (loading || !selectedProduct) return <ProductPreviewSkeleton />;

  return (
    <Box sx={{ width: "80%", mx: "auto" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          minHeight: "70vh",
        }}
      >
        <Box
          sx={{
            width: { xs: "90%", md: "50%" },
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 3,
          }}
        >
          <Box
            component="img"
            src={activeImage}
            alt={selectedProduct.title}
            sx={{
              width: "100%",
              maxHeight: 450,
              objectFit: "contain",
              borderRadius: 3,
            }}
          />

          <Box sx={{ gap: 2, mt: 3, overflowX: "auto", display: "flex" }}>
            {selectedProduct.images?.map((img, index) => (
              <Box
                key={index}
                component="img"
                src={img}
                onClick={() => setActiveImage(img)}
                sx={{
                  marginTop: 5,
                  width: 80,
                  height: 80,
                  objectFit: "cover",
                  borderRadius: 2,
                  cursor: "pointer",
                  border:
                    activeImage === img
                      ? "2px solid #890230"
                      : "2px solid transparent",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            p: 6,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h4"
            color="#100c0e"
            fontWeight="bold"
            gutterBottom
          >
            {selectedProduct.title}
          </Typography>

          <Typography variant="subtitle1" color="#07162a" gutterBottom>
            Brand: {selectedProduct.brand}
          </Typography>

          <Box
            onClick={scrollToReviews}
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              gap: 1.5,
              mb: 2,
            }}
          >
            <Rating value={selectedProduct.rating} precision={0.5} readOnly />

            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {selectedProduct.rating}
            </Typography>

            <Typography variant="body2" color="#3d6696">
              ({selectedProduct.reviews?.length || 0} reviews)
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 3,
              backgroundColor: "#d7eaf9",
              padding: 3,
              width: "100%",
            }}
          >
            <Typography
              variant="h6"
              sx={{ textDecoration: "line-through", color: "#985a38" }}
            >
              ${selectedProduct.price}
            </Typography>

            <Typography variant="h4" sx={{ fontWeight: 700, color: "#20498c" }}>
              ${discountedPrice}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                backgroundColor: "#b01b1b",
                color: "#f5f4f0",
                px: 1.5,
                py: 0.5,
                borderRadius: 2,
                fontWeight: 600,
              }}
            >
              {selectedProduct.discountPercentage} % OFF
            </Typography>
          </Box>

          <Typography sx={{ color: "#12161d", lineHeight: 1.8, mb: 4 }}>
            {selectedProduct.description}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <VerifiedUserIcon
              sx={{ color: selectedProduct.stock > 0 ? "#0a8c0e" : "#c80f40}" }}
            />
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: selectedProduct.stock > 0 ? "#208108" : "#d92f46",
              }}
            >
              {selectedProduct.stock > 0 ? "In stock" : "Out of stock"}
            </Typography>

            <Typography variant="body2" color="#198c05">
              ({selectedProduct.stock} in stock)
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ padding: 3 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                paddingBottom: 2,
              }}
            >
              <IconButton
                onClick={handleDecrease}
                disabled={quantity <= selectedProduct.minimumOrderQuantity}
                sx={{
                  border: "1px solid #ccc",
                  width: 50,
                  height: 50,
                  borderRadius: 1,
                }}
              >
                <RemoveIcon />
              </IconButton>

              <QuantityInput
                quantity={quantity}
                min={selectedProduct.minimumOrderQuantity}
                max={selectedProduct.stock}
                onUpdate={(value) => setQuantity(value)}
              />

              <IconButton
                onClick={handleIncrease}
                disabled={quantity >= selectedProduct.stock}
                sx={{
                  border: "1px solid #ccc",
                  width: 50,
                  height: 50,
                  borderRadius: 1,
                }}
              >
                <AddIcon />
              </IconButton>
            </Box>

            <Typography variant="body" color="#0d070a" sx={{ mt: 3 }}>
              Minimum Order: {selectedProduct.minimumOrderQuantity} units
            </Typography>
          </Box>

          <Button
            variant="contained"
            size="large"
            startIcon={<ShoppingCartIcon />}
            sx={{
              width: "100%",
              px: 5,
              py: 1.5,
              borderRadius: 3,
              textTransform: "none",
              fontSize: 16,
              boxShadow: "0 6px 20px rgba(1, 4, 4, 0.3)",
              backgroundColor: "#0a2e64",
            }}
            onClick={() => {
              if (isInCart) {
                navigate("/cart");
                return;
              }
              let finalQty = Number(quantity);

              if (!finalQty) finalQty = selectedProduct.minimumOrderQuantity;

              if (finalQty < selectedProduct.minimumOrderQuantity)
                finalQty = selectedProduct.minimumOrderQuantity;

              if (finalQty > selectedProduct.stock)
                finalQty = selectedProduct.stock;

              dispatch(addToCart({ ...selectedProduct, quantity: finalQty }));
            }}
          >
            {isInCart ? "Go to cart" : "Add to cart"}
          </Button>

          <Box sx={{ display: "flex", gap: 3, mt: 4, flexWrap: "wrap" }}>
            <Box
              sx={{
                flex: 1,
                minWidth: 250,
                border: "1px solid #232589",
                borderRadius: 3,
                p: 3,
                display: "flex",
                alignItems: "flex-start",
                gap: 2,
                backgroundColor: "white",
              }}
            >
              <LocalShippingIcon sx={{ color: "#1a30ac", mt: 0.5 }} />

              <Box>
                <Typography fontWeight={600} variant="body2" color="#0c0d0a">
                  {selectedProduct.shippingInformation}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                flex: 1,
                minWidth: 250,
                border: "1px solid #233789",
                borderRadius: 3,
                p: 3,
                display: "flex",
                alignItems: "flex-start",
                gap: 2,
                backgroundColor: "white",
              }}
            >
              <SellIcon sx={{ color: "#1a30ac", mt: 0.5 }} />

              <Box>
                <Typography variant="body" color="#1d1619" fontWeight={600}>
                  {selectedProduct.warrantyInformation}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <ProductsSpecifications product={selectedProduct} />

      <Box ref={reviewsRef}>
        <CustomerReviews reviews={selectedProduct.reviews} />
      </Box>
    </Box>
  );
}

export default ProductsPreviewSection;
