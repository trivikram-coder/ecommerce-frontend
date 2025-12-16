import React, { useEffect, useState } from 'react';
import '../styles/products.css';
import { Delete, Heart, Search, ShoppingBag, ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import products2 from '../Categories/data/data2';

const Products = () => {
  // ... (Your state and function definitions are kept as they are)
  const storedUser = JSON.parse(localStorage.getItem("user") || "[]");
  const user = storedUser
  const userId = user.id

  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [quantities, setQuantities] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const [wishCount, setWishCount] = useState(0);
  const [wishlistIds, setWishlistIds] = useState([]);

  // ✅ Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const navigate = useNavigate();

  useEffect(() => {
    setItems(products2);
    setFiltered(products2);
  }, []);

  //Wishlist state
  useEffect(() => {
    const wishIds = JSON.parse(localStorage.getItem('wishlistIds')) || []
    setWishlistIds(wishIds)
  }, [])

  const handleQuantityChange = (id, value) => {
    const quantity = Math.max(1, parseInt(value) || 1);
    setQuantities((prev) => ({ ...prev, [id]: quantity }));
  };

  const searchProduct = (e) => {
    const value = e.target.value;
    setSearch(value)
    const results =
      value === ''
        ? filtered
        : filtered.filter((item) =>
          item.title.toLowerCase().includes(value.toLowerCase())
        );
    setItems(results);

    setCurrentPage(1); // reset to first page after search
  };

  const addToWishlist = (product) => {
    let wishlist = JSON.parse(localStorage.getItem(`wishlist${user.id}`) || "[]") || [];
    if (!wishlist.some((item) => item.id === product.id)) {
      toast.success(product.title + ' added to wishlist');
      wishlist.push(product);
      localStorage.setItem(`wishlist${user.id}`, JSON.stringify(wishlist));
      setWishlistIds(
        (prev) => {
          const updated = [...prev, product.id]
          localStorage.setItem('wishlistIds', JSON.stringify(updated))
          return updated;
        }
      );
    } else {
      toast.success(`${product.title} is already in your wishlist.`);
    }
    window.dispatchEvent(new Event("storage"))
    setWishCount(wishlist.length);
  };

  const removeFromWishlist = (product) => {
    let wishlist = JSON.parse(localStorage.getItem(`wishlist${userId}`)) || [];
    wishlist = wishlist.filter((item) => item.id !== product.id);
    localStorage.setItem(`wishlist${userId}`, JSON.stringify(wishlist));
      window.dispatchEvent(new Event("storage"))
    toast.success(`${product.title} removed from wishlist.`);
    setWishCount(wishlist.length);
    setWishlistIds((prev) => {
      const updated = prev.filter((id) => id !== product.id)
      localStorage.setItem('wishlistIds', JSON.stringify(updated))

      return updated;
    }
    );

  };

  const addToCart = async (product) => {
    const cart = JSON.parse(localStorage.getItem(`cart${userId}`) || "[]")
    const existingItem = cart.find((item) => item.id === product.id);
    const quantity = quantities[product.id] || 1;

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      product.quantity = quantity;
      cart.push(product);
    }

    localStorage.setItem(`cart${userId}`, JSON.stringify(cart));
    const cartData = { ...product, email: user.email };
    console.log(cartData)
    try {
      const response = await fetch('https://spring-server-0m1e.onrender.com/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cartData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`${product.title} added to cart`);
        window.dispatchEvent(new Event("storage"));
      } else {
        toast.error(`Backend Error: ${data.message}`);
      }
    } catch (error) {
      toast.error(`Error while adding to cart: ${error.message}`);
    }

    setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
  };

  function highlightText(text) {
    if (!search) return text;
    const index = text.toLowerCase().indexOf(search.toLowerCase()); // Convert search to lowercase for case-insensitive match
    if (index === -1) return text;

    const before = text.substring(0, index);
    const match = text.substring(index, index + search.length);
    const after = text.substring(index + search.length);

    // Apply the highlight class (must be defined in your CSS)
    return (
      <span>
        {before}
        <span className="text-warning fw-bold">{match}</span>
        {after}
      </span>
    );
  }

  // ✅ Pagination logic
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="main-container">
      <div className="main-body">
        {/* Search Bar Section */}
        <div className="d-flex justify-content-center pt-4 pb-2" style={{ position: 'relative' }}>
          <div className="input-group mb-3" style={{ maxWidth: '600px' }}>
            <input
              type="text"
              value={search}
              placeholder="Search products..."
              className="form-control"
              onChange={searchProduct}
            />
            <button className="btn btn-primary" type="button">
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* Search Suggestions Dropdown */}
        {search.length > 0 && items.length > 0 && (
          <div
            className="card position-absolute shadow-lg border-0"
            style={{ zIndex: 1000, top: '100px', left: '50%', transform: 'translateX(-50%)', width: '90%', maxWidth: '600px' }}
          >
            <ul className="list-group list-group-flush">
              {items.slice(0, 5).map((item, index) => (
                <li
                  key={item.id}
                  className="list-group-item list-group-item-action p-2"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    navigate("/item", { state: { item } });
                    setSearch(''); // Clear search after navigation
                  }}
                >
                  <div className='d-flex align-items-center'>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: '40px', height: '40px', objectFit: 'contain', marginRight: '10px' }}
                      className="border rounded p-1"
                    />
                    <p className="mb-0 text-truncate">
                      {highlightText(item.title)}
                    </p>
                  </div>
                </li>
              ))}
              {/* Optional: Add a link to view all results */}
              {items.length > 5 && (
                <li className="list-group-item text-center text-primary fw-bold" style={{ cursor: 'pointer' }}>
                  View All {items.length} Results
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Hero Section */}
        <div className="py-5 text-center bg-light mt-5">
          <div className="container">
            <h1 className="display-4 fw-bold mb-2 text-dark">
              Welcome to <span className="text-warning">VK Store</span>
              <span className="ms-2">
                <ShoppingBag size={30} />
              </span>
            </h1>
            <p className="lead fw-semibold text-muted">
              Discover top deals and latest collections – shop smart, live stylish!
            </p>
          </div>
        </div>

        {/* Featured Categories */}
        <h3 className="text-center mt-5 mb-4">
          <strong className="border-bottom border-3 border-warning pb-2">Featured Categories</strong>
        </h3>

        <div className="container mb-5">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card shadow-sm category-card" onClick={() => navigate('/electronics')} style={{ cursor: 'pointer', overflow: 'hidden' }}>
                <img
                  src="https://canvify.app/_astro/electronics-store-product-page-template-in-canva.NKs74bXI_2dbDGR.webp"
                  alt="Electronics"
                  className="card-img-top"
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <div className="card-img-overlay bg-dark bg-opacity-50 d-flex align-items-end">
                  <h4 className="card-title text-white fw-bold">Electronics</h4>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm category-card" onClick={() => navigate('/clothing')} style={{ cursor: 'pointer', overflow: 'hidden' }}>
                <img
                  src="https://marketplace.canva.com/EAE942zKuBI/1/0/1600w/canva-brown-minimalist-casual-fashion-collection-presentation-lXzzAes9eEE.jpg"
                  alt="Clothing"
                  className="card-img-top"
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <div className="card-img-overlay bg-dark bg-opacity-50 d-flex align-items-end">
                  <h4 className="card-title text-white fw-bold">Clothing</h4>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm category-card" onClick={() => navigate('/jewellery')} style={{ cursor: 'pointer', overflow: 'hidden' }}>
                <img
                  src="https://marketplace.canva.com/EAE0ZQHtsMQ/1/0/1600w/canva-gray-and-white-minimalist-beauty-jewelry-instagram-post-rKvLvfuDqSM.jpg"
                  alt="Jewellery"
                  className="card-img-top"
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <div className="card-img-overlay bg-dark bg-opacity-50 d-flex align-items-end">
                  <h4 className="card-title text-white fw-bold">Jewellery</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Products */}
        <div className="container mt-4 mb-4">
          <h3 className="text-center mt-5 mb-5">
            <strong className="border-bottom border-3 border-warning pb-2">Popular Products</strong>
          </h3>

          <div className="row g-4">
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <div className="col-lg-3 col-md-4 col-sm-6" key={item.id}>
                  <div className="card h-100 shadow-sm transition-shadow">
                    <div className="p-3 text-center">
                      <Link to="/item" state={{ item }}>
                        <img
                          src={item.image}
                          className="card-img-top product-image"
                          alt={item.title}
                          style={{ height: '200px', objectFit: 'contain' }}
                        />
                      </Link>
                    </div>
                    <div className="card-body d-flex flex-column">
                      <h6 className="card-title mb-2 text-truncate fw-bold" title={item.title}>
                        {item.title}
                      </h6>
                      <p className="card-text mb-2">
                        <del className="p-1 text-danger me-2">₹{item.price}</del>
                        <span className="text-success fw-bold fs-5"> ₹{item.discountPrice}</span>
                      </p>

                      <div className="d-flex align-items-center justify-content-start my-2">
                        <label className="me-2 fw-bold text-muted">Qty:</label>
                        <input
                          type="number"
                          min="1"
                          value={quantities[item.id] || 1}
                          onChange={(e) =>
                            handleQuantityChange(item.id, e.target.value)
                          }
                          className="form-control form-control-sm text-center"
                          style={{ width: '70px' }}
                        />
                      </div>

                      <div className="d-grid gap-2 mt-auto pt-2">
                        <Link
                          to="/checkout"
                          state={{ item }}
                          className="btn btn-warning btn-sm fw-bold"
                        >
                          <ShoppingBag size={16} className="me-1" />
                          Buy Now
                        </Link>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => addToCart(item)}
                        >
                          <ShoppingCart size={16} className="me-1" />
                          Add to Cart
                        </button>

                        {wishlistIds.includes(item.id) ? (
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => removeFromWishlist(item)}
                          >
                            <Delete size={16} className="me-1" />
                            Remove from Wishlist
                          </button>
                        ) : (
                          <button
                            className="btn btn-outline-success btn-sm"
                            onClick={() => addToWishlist(item)}
                          >
                            <Heart size={16} className="me-1" />
                            Add to Wishlist
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <p className="lead text-muted">No products found matching your search.</p>
              </div>
            )}
          </div>

          {/* ✅ Pagination Controls */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-5">
              <button
                className="btn btn-outline-secondary mx-2"
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`btn mx-1 ${
                    currentPage === i + 1
                      ? 'btn-warning text-dark fw-bold'
                      : 'btn-outline-secondary'
                  }`}
                  onClick={() => goToPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}

              <button
                className="btn btn-outline-secondary mx-2"
                disabled={currentPage === totalPages}
                onClick={() => goToPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;