import React, { useState, useEffect, useRef } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import {
  ShoppingBag,
  Heart,
  User,
  ShoppingCart,
  ListOrdered,
  LogOut,
  ChevronDown,
} from "lucide-react";
import "../styles/layout.css";
import apiKey from "../service/api";
const Layout = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [wishCount, setWishCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  // ---------- Helpers ----------
  const safeJSON = (value, fallback = null) => {
    try {
      return value ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  };

  // ---------- FETCH CART USING JWT ----------
  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCartCount(0);
      return;
    }

    try {
      const res = await fetch(
        `${apiKey}/cart/get`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        setCartCount(0);
        return;
      }

      const cart = await res.json();

      // total quantity
      const total = cart.reduce(
        (sum, item) => sum + (item.quantity || 1),
        0
      );

      setCartCount(total);
    } catch (err) {
      console.error("Cart fetch failed", err);
      setCartCount(0);
    }
  };

  // ---------- UPDATE USER + COUNTS ----------
  const syncUserState = () => {
    const storedUser = safeJSON(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setUser(storedUser);
      fetchCart();

      const wish = safeJSON(
        localStorage.getItem(`wishlist${storedUser.id}`),
        []
      );
      setWishCount(wish.length);
    } else {
      setUser(null);
      setCartCount(0);
      setWishCount(0);
    }
  };

  // ---------- EFFECTS ----------
  useEffect(() => {
    syncUserState();
    window.addEventListener("storage", syncUserState);

    return () => {
      window.removeEventListener("storage", syncUserState);
    };
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ---------- HANDLERS ----------
  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
    setCartCount(0);
    setWishCount(0);

    window.dispatchEvent(new Event("storage"));
    navigate("/", { replace: true });
    setShowDropdown(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setShowDropdown(false);
  };

  const userName = user?.name ? user.name.split(" ")[0] : "Guest";

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="app-header-container">
        <div className="container-fluid px-4">
          <div className="d-flex justify-content-between align-items-center header-content">
            {/* Logo */}
            <Link to="/products" className="logo-link text-decoration-none">
              <div className="d-flex align-items-center vk-store-logo">
                <ShoppingBag size={24} className="me-2" />
                <span>VK Store</span>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="header-nav-links d-flex align-items-center">
              {/* Wishlist */}
              <div
                className="nav-item-link"
                role="button"
                onClick={() => handleNavigation("/wishlist")}
              >
                <Heart size={20} />
                {wishCount > 0 && (
                  <span className="badge-count bg-danger">{wishCount}</span>
                )}
                <span className="nav-label d-none d-lg-inline ms-1">
                  Wishlist
                </span>
              </div>

              {/* Cart */}
              <div
                className="nav-item-link"
                role="button"
                onClick={() => handleNavigation("/cart")}
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="badge-count bg-warning">{cartCount}</span>
                )}
                <span className="nav-label d-none d-lg-inline ms-1">
                  Cart
                </span>
              </div>

              {/* User Menu */}
              <div
                className="nav-item-link user-menu-toggle"
                role="button"
                ref={dropdownRef}
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                <User size={20} />
                <span className="nav-label ms-1 me-1">{userName}</span>
                <ChevronDown
                  size={14}
                  className={`chevron-icon ${showDropdown ? "rotate" : ""}`}
                />

                {showDropdown && (
                  <div className="user-dropdown-menu">
                    {user ? (
                      <>
                        <div className="dropdown-user-info">
                          <p className="fw-bold mb-0">{user.name}</p>
                          <p className="small text-muted mb-0">{user.email}</p>
                        </div>

                        <div
                          className="dropdown-item"
                          onClick={() => handleNavigation("/account")}
                        >
                          <User size={16} className="me-2" /> My Profile
                        </div>

                        <div
                          className="dropdown-item"
                          onClick={() => handleNavigation("/orders")}
                        >
                          <ListOrdered size={16} className="me-2" /> My Orders
                        </div>

                        <div
                          className="dropdown-item signout-item"
                          onClick={handleSignOut}
                        >
                          <LogOut size={16} className="me-2" /> Sign Out
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          className="dropdown-item"
                          onClick={() => handleNavigation("/")}
                        >
                          Sign In
                        </div>
                        <div
                          className="dropdown-item"
                          onClick={() =>
                            navigate("/", { state: { mode: "signup" } })
                          }
                        >
                          Create Account
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="app-main-content">
        <div className="container py-4">
          <Outlet />
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="app-footer">
        <div className="container text-center">
          <h6 className="footer-logo mb-3">VK Store</h6>
          <p className="mb-0">
            © {new Date().getFullYear()} VK Store. All Rights Reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Layout;
