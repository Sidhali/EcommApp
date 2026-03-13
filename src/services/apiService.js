import axios from "axios";

const API = axios.create({
  baseURL: "https://dummyjson.com",
  // withCredentials: true,
});

// ----------------------------- PRODUCTS ---------------------------------------------------------
export const getProductsAPI = async (limit, skip) => {
  const response = await API.get("/products", {
    params: {
      limit,
      skip,
    },
  });
  return response.data;
};

export const getProductByIdAPI = async (id) => {
  const response = await API.get(`/products/${id}`);
  return response.data;
};

// ----------------------------- AUTH ---------------------------------------------------------------
export const loginAPI = async (credentials) => {
  const response = await API.post("/auth/login", {
    username: credentials.username,
    password: credentials.password,
    expiresInMins: 30,
  });

  return response.data;
};

export const getCurrentUserAPI = async (token) => {
  const response = await API.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// ----------------------------------- SEARCH -------------------------------------------
export const searchProductsAPI = async (query) => {
  const response = await API.get(`/products/search?q=${query}`);
  return response.data.products;
};

// ----------------------------------- Category ------------------------------------------

export const getCategoriesAPI = async () => {
  const response = await API.get("/products/category-list");
  return response.data;
};

export const getProductsByCategoryAPI = async (category) => {
  const response = await API.get(`products/category/${category}`);
  return response.data;
};
