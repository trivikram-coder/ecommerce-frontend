import React from "react";
import { ShoppingBag, Heart, User, Search, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const HeaderFooter = ({ search, setSearch, searchProduct, cartCount, wishCount, account }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Navigation Bar */}
      <header className="bg-dark py-3">
        <div className="container d-flex justify-content-between align-items-center">
          {/* Logo */}
          <h4 className="text-warning fw-bold m-0">
            VK Store <ShoppingBag size={24} />
          </h4>

          {/* Search Bar */}
          <div className="d-flex align-items-center">
            <input
              type="text"
              value={search}
              placeholder="Search products"
              className="form-control me-2"
              onChange={(e) => {
                setSearch(e.target.value);
                searchProduct(e.target.value);
              }}
            />
            <button className="btn btn-danger me-2" onClick={() => { setSearch(''); searchProduct(''); }}>
              <X size={20} />
            </button>
            <button className="btn btn-warning" onClick={() => searchProduct(search)}>
              <Search size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="d-flex align-items-center gap-4">
            <div className="nav-item text-light cursor-pointer" onClick={account}>
              <User size={20} /> Account
            </div>
            <div className="nav-item text-light cursor-pointer" onClick={() => navigate('/wishlist')}>
              <Heart size={20} /> Wishlist ({wishCount})
            </div>
            <div className="nav-item text-light cursor-pointer" onClick={() => navigate('/cart')}>
              <ShoppingBag size={20} /> Cart ({cartCount})
            </div>
          </div>
        </div>
      </header>

      {/* Footer */}
      <footer className="bg-dark text-light text-center py-3 mt-4">
        <div className="container">
          <p>&copy; 2025 VK Store. All Rights Reserved.</p>
          <p>Your one-stop destination for quality products at the best prices.</p>
          <p>
            Follow us on{" "}
            <a href="#" className="text-light mx-2">Facebook</a> | 
            <a href="#" className="text-light mx-2">Instagram</a> | 
            <a href="#" className="text-light mx-2">Twitter</a>
          </p>
        </div>
      </footer>
    </>
  );
};

export default HeaderFooter;
