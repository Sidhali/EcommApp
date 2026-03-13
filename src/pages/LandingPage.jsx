import React from "react";
import Header from "../components/Header";
import ProductsPreviewSection from "./ProductsPreviewSection";
import Navbar from "../components/Navbar";
import ProductsPage from "./ProductsPage";
import { Box } from "@mui/material";
import CategoryBar from "../components/CategoryBar";

function LandingPage() {
  return (
    <>
      <Header />
      <CategoryBar />
      <Box sx={{ mt: 2 }}>
        <ProductsPage />
      </Box>
    </>
  );
}

export default LandingPage;
