import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productsThunk";

import ProductsGrid from "../common/ProductsGrid";

function ProductsPage() {
  const dispatch = useDispatch();
  const { items, error, page, limit } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ page, limit }));
  }, [dispatch, page, limit]);

  if (error) return <p>Error: {error.message || error}</p>;

  return <ProductsGrid items={items} />;
}

export default ProductsPage;
