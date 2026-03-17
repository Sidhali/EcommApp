import React from "react";
import { Grid, Typography, Box, Pagination, Stack } from "@mui/material";
import ProductsComponent from "./ProductsComponent";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../features/products/productsSlice";
import CategoryDropdown from "./CategoryDropdown";
import ProductsSkeleton from "./ProductsSkeleton";

function ProductsGrid({ items }) {
  const dispatch = useDispatch();
  const { page, limit, total, selectedCategory, loading } = useSelector(
    (state) => state.products,
  );

  return (
    <Stack>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4">Products</Typography>
        </Box>

        <Box sx={{ flex: 1, textAlign: "center" }}>
          {selectedCategory && selectedCategory !== "all" && (
            <Typography
              variant="h6"
              sx={{
                textTransform: "capitalize",
                fontWeight: 500,
                color: "#030303",
              }}
            >
              {selectedCategory.replace("-", " ")}
            </Typography>
          )}
        </Box>

        <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <CategoryDropdown />
        </Box>
      </Box>

      <Grid container spacing={3}>
        {loading
          ? Array.from(new Array(12)).map((_, index) => (
              <Grid
                key={index}
                size={{
                  xs: 12,
                  sm: 6,
                  md: 4,
                  lg: 3,
                  xl: 2,
                }}
              >
                <ProductsSkeleton />
              </Grid>
            ))
          : items.map((item) => (
              <Grid
                key={item.id}
                size={{
                  xs: 12,
                  sm: 6,
                  md: 4,
                  lg: 3,
                  xl: 2,
                }}
              >
                <ProductsComponent item={item} />
              </Grid>
            ))}
      </Grid>
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={Math.ceil(total / limit)}
          page={page}
          onChange={(e, value) => dispatch(setPage(value))}
        />
      </Box>
    </Stack>
  );
}

export default ProductsGrid;
