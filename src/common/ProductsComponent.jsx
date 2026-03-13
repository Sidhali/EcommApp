import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  Container,
  Button,
  Snackbar,
  Alert,
  Box,
  IconButton,
  TextField,
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { openLoginModal } from "../features/ui/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrement,
  increment,
  removeFromCart,
  setQuantity,
} from "../features/cart/cartSlice";
import DeleteIcon from "@mui/icons-material/Delete";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { toggleWishList } from "../features/wishlist/wishlistSlice";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuantityInput from "./QuantityInput";

function ProductsComponent({ item }) {
  const dispatch = useDispatch();

  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const isWishlisted = wishlistItems.includes(item.id);

  const cartItem = useSelector((state) =>
    state.cart.items.find((i) => i.id === item.id),
  );

  const quantity = cartItem ? cartItem.quantity : 0; //check for errors

  //   const handleAddToCart = (product) => {
  //     dispatch(addToCart(product));
  //   };

  //   const [inputQty, setInputQty] = useState(quantity);

  //   useEffect(() => {
  //     setInputQty(quantity);
  //   }, [quantity]);

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleWishlistToggle = (e) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      dispatch(openLoginModal());
      return;
    }
    dispatch(toggleWishList(item.id));
  };

  return (
    <Box>
      <Card
        onClick={() => navigate(`/products/${item.id}`)}
        sx={{
          cursor: "pointer",
          borderRadius: 4,
          height: "100%",
          width: "100%",
          maxWidth: 330,
          display: "flex",
          margin: "0 auto",
          flexDirection: "column",
          backgroundColor: "#b8e9fc",
          position: "relative",
        }}
      >
        <IconButton
          onClick={handleWishlistToggle}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            backgroundColor: "white",
            zIndex: 2,
            "&:hover": { backgroundColor: "#0338b4" },
          }}
        >
          {isWishlisted ? (
            <FavoriteIcon color="error" />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
        <CardMedia
          component="img"
          image={item.thumbnail}
          alt={item.title}
          sx={{
            height: 240,
            width: "100%",
            objectFit: "cover",
          }}
        />

        <CardContent
          sx={{
            flexGrow: 1,
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 2.5,
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight={600}
            sx={{
              mb: 1,
              // width: "100%",
              // maxWidth: "200px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {item.title}
          </Typography>
          <Typography>${item.price}</Typography>
          <Rating value={item.rating} readOnly />
          <Box
            onClick={(e) => {
              e.stopPropagation();
            }}
            sx={{ marginTop: 1 }}
          >
            {quantity === 0 ? (
              <Button
                sx={{ marginLeft: 10, backgroundColor: "#385a91" }}
                variant="contained"
                onClick={() => {
                  dispatch(
                    addToCart({ ...item, quantity: item.minimumOrderQuantity }),
                  );
                  setOpen(true);
                }}
              >
                Add to Cart
              </Button>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #828402",
                  borderRadius: "8px",
                  overflow: "hidden",
                  width: "200px",
                  backgroundColor: "#f7fbfb",
                  marginLeft: 5,
                }}
              >
                <Button
                  sx={{
                    minWidth: "40px",
                    height: "40px",
                    fontSize: "20px",
                    backgroundColor: "#024da2",
                    fontWeight: "bold",
                    color: "#f6f2f2",
                    borderRadius: 0,
                    "&:hover": {
                      backgroundColor: "#eef0f1",
                    },
                  }}
                  onClick={() =>
                    quantity === item.minimumOrderQuantity
                      ? dispatch(removeFromCart(item.id))
                      : dispatch(decrement(item.id))
                  }
                >
                  {quantity === item.minimumOrderQuantity ? (
                    <DeleteIcon />
                  ) : (
                    <RemoveIcon />
                  )}
                </Button>
                <QuantityInput
                  quantity={quantity}
                  min={item.minimumOrderQuantity}
                  max={item.stock}
                  onUpdate={(value) =>
                    dispatch(setQuantity({ id: item.id, quantity: value }))
                  }
                />

                <Button
                  onClick={() => dispatch(increment(item.id))}
                  disabled={quantity >= item.stock}
                  sx={{
                    minWidth: "40px",
                    height: "40px",
                    fontSize: "20px",
                    fontWeight: "bold",
                    backgroundColor: "#024da2",
                    color: "#f6f0f0",
                    borderRadius: 0,
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                >
                  <AddIcon />
                </Button>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled">
          Item added to cart
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ProductsComponent;
