import React, { useEffect, useState } from 'react';
import '../styles/products.css';
import { Cuboid, Heart, Search, ShoppingBag, User, X } from 'lucide-react';
import productsDetails from '../data/data';
import { Link, useNavigate } from 'react-router-dom';

const Products = () => {
  const [items, setItems] = useState(productsDetails);
  const [filtered, setFiltered] = useState(productsDetails);
  const [search, setSearch] = useState('');
  const [user, setUser] = useState(null);
  const [quantities, setQuantities] = useState({}); 
  const[cartCount,setCartCount]=useState(0)
const[wishCount,setWishCount]=useState(0)
  const navigate = useNavigate();

  useEffect(() => {
    // Load cart count when the component mounts
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
  }, []);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleQuantityChange = (id, value) => {
    const quantity = Math.max(1, parseInt(value) || 1); 
    setQuantities((prev) => ({ ...prev, [id]: quantity }));
  };

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const quantity = quantities[product.id] || 1; 

    const existingItemIndex = cart.findIndex((item) => item.id === product.id);
    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity = quantity; 
     
    } else {
      cart.push({ ...product, quantity });
      
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    setCartCount(cart.reduce((total, item) => total + item.quantity, 0))
  };

  function searchProduct(name) {
    setItems(
      name === ''
        ? filtered
        : filtered.filter((item) => item.title.toLowerCase().includes(name.toLowerCase()))
    );
  }
  async function account() {
    try {
      const res = await fetch("https://backend-server-538r.onrender.com/user/details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rollNo: user?.rollNo }),
      });
      if (res.ok) {
        const data = await res.json();
        if (user) {
          return navigate("/account", { state: { userData: data } });
        }
        navigate("/");
      } else {
        console.error("Failed to fetch user details");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }


  function categoryFilter(e) {
    if (["DIV", "P", "CUBOID", "STRONG"].includes(e.target.tagName)) {
      const categoryMap = {
        Electronics: 'electronics',
        Clothing: ["men's clothing", "women's clothing"],
        Jewellery: 'jewelery',
      };
      const category = categoryMap[e.target.innerText];
      if (category) {
        setItems(
          filtered.filter((item) =>
            Array.isArray(category) ? category.includes(item.category) : item.category === category
          )
        );
      }
    }
  }

  useEffect(() => {
    // Load wish count when the component mounts
    const wish = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishCount(wish.length);
  }, []);
  
  function addToWishlist(product) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    
    if (!wishlist.some((item) => item.id === product.id)) {
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    } else {
      alert(`${product.title} is already in your wishlist.`);
    }
  
    // Update wishlist count
    setWishCount(wishlist.length);
  }
  

  return (
    <div className="main-container">
      <header>
        <div className="header bg-dark">
          <div className="left">
            <h4 className="vk-store">VK Store <ShoppingBag size={24} /></h4>
          </div>
          <div className="middle">
            <div className="search-box-wrapper">
              <input
                type="text"
                value={search}
                placeholder="Search"
                className="search-box"
                onChange={(e) => {
                  setSearch(e.target.value);
                  searchProduct(e.target.value);
                }}
              />
              <button className="btn-del" onClick={() => { setSearch(''); setItems(filtered); }} >
                <X size={20} />
              </button>
            </div>
            <div className="search-btn" onClick={() => searchProduct(search)}>
              <Search size={20} />
            </div>
          </div>
          <div className="right">
            <div className="nav" onClick={account}><User size={23} /> Account</div>
            <div className="nav" onClick={() => navigate('/wishlist')}><Heart size={20} /> Wishlist({wishCount})</div>
            <div className="nav" onClick={() => navigate('/cart')}><ShoppingBag size={20} /> Cart({cartCount})</div>
          </div>
        </div>
      </header>

      <div className="main-body">
        <div className="head bg-primary py-3">
          <h2 className="text-center text-light fw-bold">
            Welcome to VK Store <ShoppingBag size={28} />
          </h2>
        </div>

        <h3 className='d-flex justify-content-center mt-4 mb-4'><strong>Featured Categories</strong></h3>
        <div className='category' onClick={categoryFilter}>
          <div className='cuboid'><Cuboid size={24} /> <p><strong>Electronics</strong></p></div>
          <div className='cuboid'><Cuboid size={24} /> <p><strong>Clothing</strong></p></div>
          <div className='cuboid'><Cuboid size={24} /> <p><strong>Jewellery</strong></p></div>
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
                    <p className="card-text"><del className='p-1 text-danger'>{item.price}</del><span className='text-success'> ${item.offerPrice} ({item.discountPercentage} off)</span></p>
                    
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
                      <button className="btn btn-primary fw-bold px-4 py-2 shadow-sm rounded-pill">Buy Now</button>
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

      {/* Footer Section */}
      <footer className="bg-dark text-light text-center py-3 mt-4">
        <p>&copy; 2025 VK Store. All Rights Reserved.</p>
        <p>Your one-stop destination for quality products at the best prices.</p>
        <p>Follow us on <a href="#" className="text-light mx-2">Facebook</a> | <a href="#" className="text-light mx-2">Instagram</a> | <a href="#" className="text-light mx-2">Twitter</a></p>
      </footer>
      
    </div>
  );
};

export default Products;
