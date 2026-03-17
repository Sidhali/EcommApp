import CategoryIcon from "@mui/icons-material/Category";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import {
  fetchCategories,
  fetchProducts,
  fetchProductsByCategory,
} from "../features/products/productsThunk";
import { setSelectedCategory } from "../features/products/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";

const CategoryDropdown = () => {
  const dispatch = useDispatch();
  const { categories, categoriesLoading, selectedCategory } = useSelector(
    (state) => state.products,
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (categories.length === 0) dispatch(fetchCategories());
  }, [dispatch, categories.length]);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleCategorySelect = (category) => {
    dispatch(setSelectedCategory(category));

    if (category === "all") {
      dispatch(fetchProducts());
    } else {
      dispatch(fetchProductsByCategory(category));
    }
    handleClose();
  };

  console.log("categories", categories);

  const formatCategory = (cat) => {
    return cat.replace("-", " ");
  };
  return (
    <Box>
      <Button
        variant="outlined"
        startIcon={<CategoryIcon />}
        endIcon={
          <ArrowDropDownIcon
            sx={{
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "0.2s",
            }}
          />
        }
        onClick={handleOpen}
        sx={{
          textTransform: "none",
          fontWeight: 500,
          borderRadius: 2,
          backgroundColor: "#0574b5",
          px: 2,
          color: "#fbf2be",
          borderColor: "#234f89",
          "&:hover": {
            borderColor: "#488951",
            backgroundColor: "#0a55a0",
          },
        }}
      >
        {selectedCategory ? formatCategory(selectedCategory) : "Categories"}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              minWidth: 220,
              maxHeight: 320,
              borderRadius: "10px",
              mt: 1,
              boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.08)",
            },
          },
        }}
      >
        {categoriesLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" p={2}>
            <CircularProgress size={22} />
          </Box>
        ) : (
          <Box>
            <MenuItem
              key="all"
              selected={selectedCategory === "all"}
              onClick={() => handleCategorySelect("all")}
              sx={{ textTransform: "capitalize" }}
            >
              All Products
            </MenuItem>

            {categories.map((category) => (
              <MenuItem
                key={category}
                selected={category === selectedCategory}
                onClick={() => handleCategorySelect(category)}
                sx={{
                  textTransform: "capitalize",
                  "&:hover": {
                    backgroundColor: "#bed8fc",
                  },
                }}
              >
                <Typography variant="body2">
                  {formatCategory(category)}
                </Typography>
              </MenuItem>
            ))}
          </Box>
        )}
      </Menu>
    </Box>
  );
};
export default CategoryDropdown;
