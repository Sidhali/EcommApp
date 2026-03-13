import { useDispatch } from "react-redux";
import { Box, Typography, Button, TextField } from "@mui/material";
import {
  decrement,
  increment,
  removeFromCart,
  setQuantity,
} from "../../features/cart/cartSlice";
import AddIcon from "@mui/icons-material/Add";


import RemoveIcon from "@mui/icons-material/Remove";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { useState, useEffect } from "react";
import QuantityInput from "../../common/QuantityInput";

export default function CartItemCard({ item }) {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) =>
    state.cart.items.find((i) => i.id === item.id),
  );

  const navigate = useNavigate();

  const quantity = cartItem ? cartItem.quantity : 0;
  //   const [inputQty, setInputQty] = useState(quantity);

  //   useEffect(() => {
  //     setInputQty(quantity);
  //   }, [quantity]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid #036281",
        p: 3,
        width: 900,
        borderRadius: 2,
        backgroundColor: "#fefafc",
        boxShadow: "0 2px 6px rgb(119, 185, 254)",
        mb: 3,
      }}
    >
      <Box
        onClick={() => navigate(`/products/${item.id}`)}
        sx={{ display: "flex", gap: 3, alignItems: "center", flex: 3 }}
      >
        <Box
          component="img"
          src={item.images?.[0]}
          alt={item.title}
          sx={{
            width: 150,
            height: 150,
            objectFit: "contain",
            borderRadius: 2,
          }}
        />
        <Box sx={{ flex: 1 }}>
          <Typography fontWeight={600}>{item.title}</Typography>
          <Typography>Unit price: ₹{item.price}</Typography>
          <Typography>
            Subtotal: ₹{(item.price * item.quantity).toFixed(2)}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
            <LocalShippingIcon
              sx={{ fontSize: 18, mr: 0.5, color: "#234d80" }}
            />
            <Typography sx={{ fontSize: "14px", color: "#103690" }}>
              {item.shippingInformation}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          border: "1px solid rgb(101, 197, 242)",
          overflow: "hidden",
          borderRadius: 3,
          boxShadow: "0 2px 6px rgb(94, 142, 239)",
          ml: 4,
        }}
      >
        <Button
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
        >
          <AddIcon />
        </Button>
      </Box>
    </Box>
  );
}
