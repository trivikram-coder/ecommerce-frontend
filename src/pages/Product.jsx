import React, { useEffect, useState } from 'react';
import '../styles/products.css';
import { Heart, Search, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import products2 from '../Categories/data/data2';
const Products = () => {
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [quantities, setQuantities] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const [wishCount, setWishCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    setItems(products2)
    setFiltered(products2)
  }, []);

  const handleQuantityChange = (id, value) => {
    const quantity = Math.max(1, parseInt(value) || 1);
    setQuantities((prev) => ({ ...prev, [id]: quantity }));
  };

  const searchProduct = (name) => {
    setItems(
      name === ''
        ? filtered
        : filtered.filter((item) => item.title.toLowerCase().includes(name.toLowerCase()))
    );
  };

  const addToWishlist = (product) => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (!wishlist.some((item) => item.id === product.id)) {
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    } else {
      toast.success(`${product.title} is already in your wishlist.`);
    }
    setWishCount(wishlist.length);
  };

  const addToCart = async (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id === product.id);
    const quantity = quantities[product.id] || 1;

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      product.quantity = quantity;
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    const token=localStorage.getItem("token")
    try {
      const response = await fetch("http://localhost:9000/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
                  
        },
        body: JSON.stringify(product)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`${product.title} added to cart`);
      } else {
        toast.error(`Backend Error: ${data.message}`);
      }
    } catch (error) {
      toast.error(`Error while adding to cart: ${error.message}`);
    }

    setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
  };

  return (
    <div className="main-container">
      <div className="main-body">
        <div className="middle">
          <input
            type="text"
            value={search}
            placeholder="Search products"
            className="search-box"
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="search-btn" onClick={() => searchProduct(search)}>
            <Search size={20} />
          </div>
        </div>

        <div className="py-3 text-center text-success">
          <div className="container">
            <h1 className="display-5 fw-bold mb-2">
              Welcome to <span className="text-warning">VK Store</span>
              <span className="ms-2"><ShoppingBag size={30} /></span>
            </h1>
            <p className="lead fw-semibold">
              Discover top deals and latest collections – shop smart, live stylish!
            </p>
          </div>
        </div>

        <h3 className='d-flex justify-content-center mt-4 mb-4'><strong>Featured Categories</strong></h3>
        <div className='category'>
          <div className='cuboid' onClick={() => navigate("/electronics")}>
            <img src='https://canvify.app/_astro/electronics-store-product-page-template-in-canva.NKs74bXI_2dbDGR.webp' alt="Electronics" style={{ width: "100%", height: '300px' }} />
          </div>
          <div className='cuboid' onClick={() => navigate("/clothing")}>
            <img src='https://marketplace.canva.com/EAE942zKuBI/1/0/1600w/canva-brown-minimalist-casual-fashion-collection-presentation-lXzzAes9eEE.jpg' alt="Clothing" style={{ width: "90%", height: '300px' }} />
          </div>
          <div className='cuboid' onClick={() => navigate("/jewellery")}>
            <img src='https://marketplace.canva.com/EAE0ZQHtsMQ/1/0/1600w/canva-gray-and-white-minimalist-beauty-jewelry-instagram-post-rKvLvfuDqSM.jpg' alt="Jewellery" style={{ width: "100%", height: '300px' }} />
          </div>
        </div>

        <div className="container mt-4 mb-4">
          <div className="row g-3">
            <h3 className='d-flex justify-content-center mt-5 mb-5'><strong>Popular Products</strong></h3>
            {items.length > 0 ? items.map((item) => (
              <div className="col-md-3" key={item.id}>
                <div className="card h-100 d-flex flex-column">
                  <div className='image-container'>
                    <Link to='/item' state={{ item }}>
                      <img src={item.image} className="product-image" alt={item.title} style={{ width: '100%', height: '300px', padding: '26px' }} />
                    </Link>
                  </div>
                  <div className="card-body d-flex flex-column flex-grow-1">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">
                      <del className='p-1 text-danger'>₹{item.price}</del>
                      <span className='text-success'> ₹{item.discountPrice}</span>
                    </p>

                    <div className="d-flex align-items-center justify-content-center my-2">
                      <label className="me-2 fw-bold">Qty:</label>
                      <input
                        type="number"
                        min="1"
                        value={quantities[item.id] || 1}
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                        className="form-control text-center"
                        style={{ width: '60px' }}
                      />
                    </div>

                    <div className='d-flex flex-wrap gap-2 justify-content-center mt-auto'>
                      <Link to='/checkout' state={{ item }} className="btn btn-primary fw-bold px-4 py-2 shadow-sm rounded-pill">Buy Now</Link>
                      <button className="btn btn-dark fw-bold px-4 py-2 shadow-sm rounded-pill" onClick={() => addToCart(item)}>Add to Cart</button>
                      <button className="btn btn-outline-danger fw-bold px-4 py-2 shadow-sm rounded-pill" onClick={() => addToWishlist(item)}>
                        <Heart size={18} /> Add to Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )) : <p>No products found</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
