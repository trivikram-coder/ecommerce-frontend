import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, User, ShoppingCart,ListOrdered } from 'lucide-react';

const Layout = () => {
  const [cartCount, setCartCount] = useState(0);
  const [wishCount, setWishCount] = useState(0);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate('/');
    }
  }, []);

  // Update cart and wishlist counts
  const updateCounts = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(cart.reduce((acc, item) => acc + (item.quantity || 1), 0));

    const wish = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishCount(wish.length);
  };

  // Auto update counts every 2 seconds
  useEffect(() => {
    updateCounts();
    const intervalId = setInterval(updateCounts, 2000);
    return () => clearInterval(intervalId);
  }, []);

  // Navigate to Account page
  const account = async () => {
    const data=JSON.parse(localStorage.getItem("user"))
      if (data!=null) {
       
        navigate("/account", { state: { userData: data } });
      } else {
        navigate("/"); // redirect to login if not found
      }
    
  };

  return (
    <>
      <header>
        <div className="header bg-dark d-flex justify-content-between align-items-center px-4 py-2">
          <h4 className="vk-store btn text-white mb-0" onClick={() => navigate("/product")}>
            VK Store <ShoppingBag size={24} />
          </h4>

          <div className="right d-flex gap-4">
            <div className="nav btn text-white" onClick={account}>
              <User size={20} /> Account
            </div>
            <div className="nav btn text-white" onClick={() => navigate('/wishlist')}>
              <Heart size={20} /> Wishlist ({wishCount})
            </div>
            <div className="nav btn text-white" onClick={() => navigate('/cart')}>
              <ShoppingBag size={20} /> Cart ({cartCount})
            </div>
            <div className="nav btn text-white" onClick={() => navigate('/checkout')}>
              <ShoppingCart size={20} /> Checkout
            </div>
             <div className="nav btn text-white" onClick={() => navigate('/orders')}>
              <ListOrdered size={20} /> My orders
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
