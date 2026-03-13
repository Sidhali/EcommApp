import React from "react";
import { Box, Typography } from "@mui/material";
import ScaleIcon from "@mui/icons-material/Scale";
import QrCodeIcon from "@mui/icons-material/QrCode";
import StraightenIcon from "@mui/icons-material/Straighten";
import ReplayIcon from "@mui/icons-material/Replay";
import { Padding } from "@mui/icons-material";

function ProductsSpecifications({ product }) {
  if (!product) return null;
  return (
    <Box
      sx={{
        mt: 5,
        width: "90%",
        margin: "0 auto",
        marginBottom: 3,
      }}
    >
      <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
        Product Specifications
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          rowGap: 3,
        }}
      >
        <Box sx={boxStyle}>
          <ScaleIcon sx={{ color: "#054280" }} />
          <Box>
            <Typography fontWeight={600}>Weight</Typography>
            <Typography variant="body2" color="#151412">
              {product.weight ? `${product.weight} kg` : "N/A"}
            </Typography>
          </Box>
        </Box>

        <Box sx={boxStyle}>
          <QrCodeIcon sx={{ color: "#054280" }} />
          <Box>
            <Typography fontWeight={600}>SKU</Typography>
            <Typography variant="body2" color="text.secondary">
              {product.sku || "N/A"}
            </Typography>
          </Box>
        </Box>

        <Box sx={boxStyle}>
          <StraightenIcon sx={{ color: "#054280" }} />
          <Box>
            <Typography fontWeight={600}>Dimensions</Typography>
            <Typography variant="body2" color="#130e0f">
              {product.dimesions
                ? `${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth} `
                : "N/A"}
            </Typography>
          </Box>
        </Box>

        <Box sx={boxStyle}>
          <ReplayIcon sx={{ color: "#054280" }} />
          <Box>
            <Typography fontWeight={600}>Return Policy</Typography>
            <Typography variant="body2" color="#101110">
              {product.returnPolicy || "N/A"}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const boxStyle = {
  width: "48%",
  border: "1px solid #3a8382",
  borderRadius: 3,
  padding: 3,
  display: "flex",
  gap: 2,
  alignItems: "flex-start",
  backgroundColor: "white",
};

export default ProductsSpecifications;
