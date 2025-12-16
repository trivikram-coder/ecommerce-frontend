import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Auth from "./pages/Auth";
import Layout from "./pages/Layout";

import Products from "./pages/Products";
import Account from "./pages/Account";
import Item from "./pages/Item";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";
import OrderPlaced from "./pages/OrderPlaced";
import Orders from "./pages/Orders";

import Electronics from "./Categories/Electronics";
import Clothing from "./Categories/Clothing";
import Jewellery from "./Categories/Jewellery";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" autoClose={3000} />

      <Routes>
        {/* 🔐 AUTH (Signin + Signup + OTP) */}
        <Route path="/" element={<Auth />} />

        {/* 🛒 MAIN APP WITH LAYOUT */}
        <Route element={<Layout />}>
          <Route path="/products" element={<Products />} />
          <Route path="/item" element={<Item />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-placed" element={<OrderPlaced />} />

          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/account" element={<Account />} />

          {/* Categories */}
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/clothing" element={<Clothing />} />
          <Route path="/jewellery" element={<Jewellery />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
