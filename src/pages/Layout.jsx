import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, User, ShoppingCart } from 'lucide-react';

const Layout = () => {
  const [cartCount, setCartCount] = useState(0);
  const [wishCount, setWishCount] = useState(0);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user once from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || null);
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Function to update cart and wishlist counts
  // const updateCounts = () => {
  //   const cart = JSON.parse(localStorage.getItem("cart") || []);
  //   setCartCount(cart.reduce((acc, item) => acc + (item.quantity || 1), 0));

  //   const wish = JSON.parse(localStorage.getItem("wishlist") || "[]");
  //   setWishCount(wish.length);
  // };

  // // Call updateCounts on load and every 2 seconds
  // useEffect(() => {
  //   updateCounts();
  //   const intervalId = setInterval(updateCounts, 2000);
  //   return () => clearInterval(intervalId); // Cleanup on unmount
  // }, []);

  // Navigate to user account
  const account = async () => {
    try {
      const res = await fetch("https://backend-server-3-ycun.onrender.com/user/details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rollNo: user?.rollNo }),
      });
      if (res.ok) {
        const data = await res.json();
        return navigate("/account", { state: { userData: data } });
      } else {
        alert("Failed to fetch user details");
      }
    } catch (error) {
      alert("Error fetching user details: " + error.message);
    }
  };

  return (
    <>
      <header>
        <div className="header bg-dark">
          <div className="left cursor-pointer">
            <h4 className="vk-store btn" onClick={() => navigate("/product")}>
              VK Store <ShoppingBag size={24} />
            </h4>
          </div>

          <div className="right">
            <div className="nav btn cursor-pointer" onClick={account}>
              <User size={23} /> Account
            </div>
            <div className="nav btn cursor-pointer" onClick={() => navigate('/wishlist', { state: { wishlistCount: wishCount } })}>
              <Heart size={20} /> Wishlist({wishCount})
            </div>
            <div className="nav btn cursor-pointer" onClick={() => navigate('/cart', { state: { cartCount } })}>
              <ShoppingBag size={20} /> Cart({cartCount})
            </div>
            <div className="nav btn cursor-pointer" onClick={() => navigate('/checkout')}>
              <ShoppingCart size={20} /> Checkout
            </div>
          </div>
        </div>
      </header>

      <main className="container py-3">
        <Outlet />
      </main>

      <footer className="bg-dark text-light text-center py-3 mt-4">
        <p>&copy; 2025 VK Store. All Rights Reserved.</p>
        <p>Your one-stop destination for quality products at the best prices.</p>
        <p>
          Follow us on 
          <a href="#" className="text-light mx-2">Facebook</a> | 
          <a href="#" className="text-light mx-2">Instagram</a> | 
          <a href="#" className="text-light mx-2">Twitter</a>
        </p>
      </footer>
    </>
  );
};

export default Layout;
