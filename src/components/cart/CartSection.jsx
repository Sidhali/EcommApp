import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import CartItemCard from "./CartItemCard";
import BillingSummary from "./BillingSummary";
import EmptyCart from "./EmptyCart";


export default function CartSection({ setActiveStep }) {
  const cartItems = useSelector((state) => state.cart.items);

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={8}>
        {cartItems.map((item) => (
          <CartItemCard key={item.id} item={item} />
        ))}
      </Grid>

      <Grid item xs={12} md={4}>
        <BillingSummary setActiveStep={setActiveStep} />
      </Grid>
    </Grid>
  );
}
