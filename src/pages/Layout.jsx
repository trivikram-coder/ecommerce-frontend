import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Heart,
  User,
  ShoppingCart,
  ListOrdered,
} from "lucide-react";

const Layout = () => {
  const [cartCount, setCartCount] = useState(0);
  const [wishCount, setWishCount] = useState(0);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  // 🔥 SAFE PARSE function
  const safeJSON = (value, fallback = []) => {
    try {
      return JSON.parse(value) || fallback;
    } catch (err) {
      console.warn("Corrupted LS value → resetting:", value);
      return fallback;
    }
  };

  // 🔥 Load user safely
  useEffect(() => {
    const rawUser = localStorage.getItem("user");
    const storedUser = safeJSON(rawUser, null);

    if (storedUser && storedUser.id) {
      setUser(storedUser);
      setUserId(storedUser.id);
    }
  }, []);

  // 🔥 Update cart and wishlist safely
  const updateCounts = () => {
    if (!userId) return;

    const rawCart = localStorage.getItem(`cart${userId}`);
    const cart = safeJSON(rawCart, []);

    setCartCount(cart.reduce((acc, item) => acc + (item.quantity || 1), 0));

    const rawWish = localStorage.getItem(`wishlist${userId}`);
    const wish = safeJSON(rawWish, []);

    setWishCount(wish.length);
  };

  useEffect(() => {
    updateCounts();
    const intervalId = setInterval(updateCounts, 1200);
    return () => clearInterval(intervalId);
  }, [userId]);

  const account = () => {
    if (user) {
      navigate("/account", { state: { userData: user } });
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <header>
        <div className="header bg-dark d-flex justify-content-between align-items-center px-4 py-2">
          <h4
            className="vk-store btn text-white mb-0"
            onClick={() => navigate("/products")}
          >
            VK Store <ShoppingBag size={24} />
          </h4>

          <div className="right d-flex gap-4 text-white">
            <div className="nav btn" onClick={account}>
              <User size={20} /> Account
            </div>

            <div className="nav btn" onClick={() => navigate("/wishlist")}>
              <Heart size={20} /> Wishlist ({wishCount})
            </div>

            <div className="nav btn" onClick={() => navigate("/cart")}>
              <ShoppingBag size={20} /> Cart ({cartCount})
            </div>

            <div className="nav btn" onClick={() => navigate("/checkout")}>
              <ShoppingCart size={20} /> Checkout
            </div>

            <div className="nav btn" onClick={() => navigate("/orders")}>
              <ListOrdered size={20} /> My Orders
            </div>
          </div>
        </div>
      </header>

      <main className="container py-3">
        <Outlet />
      </main>

      <footer className="bg-dark text-light text-center py-3 mt-4">
        <p>&copy; 2025 VK Store — All Rights Reserved.</p>
      </footer>
    </>
  );
};

export default Layout;
