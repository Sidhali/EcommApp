import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  fetchProducts,
  fetchProductsByCategory,
} from "../features/products/productsThunk";
import { useEffect } from "react";
import { setSelectedCategory } from "../features/products/productsSlice";
import CategoryIcon from "@mui/icons-material/Category";
import { categoryIcons } from "../constants/categoryIcons";
import { categoryLabels } from "../constants/categoryLabels";
import { Box, Typography } from "@mui/material";

function CategoryBar() {
  const dispatch = useDispatch();

  const { categories, selectedCategory } = useSelector(
    (state) => state.products,
  );

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  const handleCategorySelect = (category) => {
    dispatch(setSelectedCategory(category));

    if (category === "all") {
      dispatch(fetchProducts());
    } else {
      dispatch(fetchProductsByCategory(category));
    }
  };

  const formatCategory = (cat) => {
    if (categoryLabels[cat]) return categoryLabels[cat];
    return cat.replace("-", " ");
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        px: 3,

        py: 2,
        overflowX: "auto",
        backgroundColor: "#d0ecfc",
      }}
    >
      <Box
        onClick={() => handleCategorySelect("all")}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
          minWidth: 90,
        }}
      >
        <CategoryIcon />
        <Typography variant="caption">All</Typography>
      </Box>

      {categories.map((category) => (
        <Box
          key={category}
          onClick={() => handleCategorySelect(category)}
          sx={{
            display: "flex",

            flexDirection: "column",
            color: selectedCategory === category ? "#035384" : "#014a60",
            borderBottom:
              selectedCategory === category ? "3px solid #125389" : "#802384",
            pb: 1,
            transition: "0.2s",
            alignItems: "center",
            cursor: "pointer",
            minWidth: 80,
          }}
        >
          {(() => {
            const IconComponent = categoryIcons[category] || CategoryIcon;
            return <IconComponent sx={{ fontSize: 28 }} />;
          })()}

          <Typography
            variant="caption"
            sx={{ textTransform: "capitalize", whiteSpace: "nowrap" }}
          >
            {formatCategory(category)}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
export default CategoryBar;
