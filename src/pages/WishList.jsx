import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productsThunk";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Rating,
  IconButton,
} from "@mui/material";
import { addToCart } from "../features/cart/cartSlice";
import { toggleWishList } from "../features/wishlist/wishlistSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

function WishList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishListItems = useSelector((state) => state.wishlist.items);

  const products = useSelector((state) => state.products?.items || []);

  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const wishlistProducts = products.filter((product) =>
    wishListItems.includes(product.id),
  );

  return (
    <Container sx={{ mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 4,
          alignItems: "center",
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          My wishlist
        </Typography>

        <Typography color="text.secondary">
          {wishListItems.length} items
        </Typography>
      </Box>

      {wishListItems.length === 0 ? (
        <Typography variant="h6">Your wishlist is empty</Typography>
      ) : (
        <Grid container spacing={4}>
          {wishlistProducts.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card
                onClick={() => navigate(`/products/${item.id}`)}
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  backgroundColor: "#f7f6f1",
                  transition: "0.3s",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={item.thumbnail}
                  height="220"
                  sx={{ objectFit: "cover", backgroundColor: "#d0f5fc" }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography fontWeight={600}>{item.title}</Typography>

                  <Typography color="text.secondary">${item.price}</Typography>

                  <Rating value={item.rating} readOnly />

                  <Box
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 2,
                    }}
                  >
                    <Button
                      sx={{ backgroundColor: "#384e89" }}
                      variant="contained"
                      onClick={() => {
                        dispatch(
                          addToCart({
                            ...item,
                            quantity: item.minimumOrderQuantity,
                          }),
                        );
                        dispatch(toggleWishList(item.id));
                      }}
                    >
                      Move to cart
                    </Button>

                    <IconButton
                      color="error"
                      onClick={() => dispatch(toggleWishList(item.id))}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default WishList;
