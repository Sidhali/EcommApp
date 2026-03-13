import Cart from "../pages/Cart";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import ProductsPreviewSection from "../pages/ProductsPreviewSection";
import OrderPlacedPage from "../pages/OrderPlacedPage";
import WishList from "../pages/WishList";

export const routes = [
  {
    path: "/",
    element: LandingPage,
  },
  {
    path: "/products/:id",
    element: ProductsPreviewSection, // this should be the product preview page - on click product navigate this
  },
  {
    path: "/login",
    element: LoginPage,
  },
  {
    path: "/cart",
    element: Cart,
  },
  {
    path: "/order-placed",
    element: OrderPlacedPage,
  },
  {
    path: "/wishlist",
    element: WishList,
  },
];
