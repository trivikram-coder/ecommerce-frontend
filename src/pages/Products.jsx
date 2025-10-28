import React, { useEffect, useState } from 'react';
import '../styles/products.css';
import { Delete, Heart, Search, ShoppingBag, ShoppingCart } from 'lucide-react';
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
useEffect(()=>{
  const wishIds=JSON.parse(localStorage.getItem('wishlistIds')) || []
  setWishlistIds(wishIds)
},[])
  const handleQuantityChange = (id, value) => {
    const quantity = Math.max(1, parseInt(value) || 1);
    setQuantities((prev) => ({ ...prev, [id]: quantity }));
  };

  const searchProduct = (e) => {
    const value=e.target.value;
    setSearch(value)
    const results =
      value === ''
        ? filtered
        : filtered.filter((item) =>
            item.title.toLowerCase().includes(value.toLowerCase())
          );
          setItems(results);
          console.log(items)
    setCurrentPage(1); // reset to first page after search
  };

  const addToWishlist = (product) => {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (!wishlist.some((item) => item.id === product.id)) {
      toast.success(product.title + ' added to wishlist');
      wishlist.push(product);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setWishlistIds(
        (prev) => {
          const updated=[...prev, product.id]
          localStorage.setItem('wishlistIds',JSON.stringify(updated))
          return updated;
    
    
    }
    );
      
      
    } else {
      toast.success(`${product.title} is already in your wishlist.`);
    }
    setWishCount(wishlist.length);
  };

  const removeFromWishlist = (product) => {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist = wishlist.filter((item) => item.id !== product.id);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    toast.success(`${product.title} removed from wishlist.`);
    setWishCount(wishlist.length);
    setWishlistIds((prev) => 
    {
      
      const updated=prev.filter((id) => id !== product.id)
      localStorage.setItem('wishlistIds',JSON.stringify(updated))
      return updated;

    }
    );
    
  };

  const addToCart = async (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find((item) => item.id === product.id);
    const quantity = quantities[product.id] || 1;

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      product.quantity = quantity;
      cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    try {
      const response = await fetch('https://spring-server-0m1e.onrender.com/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
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
function highlightText(text) {
    if (!search) return text;
    const index = text.toLowerCase().indexOf(search);
    if (index === -1) return text;

    const before = text.substring(0, index);
    const match = text.substring(index, index + search.length);
    const after = text.substring(index + search.length);

    return (
      <span>
        {before}
        <span className="highlight">{match}</span>
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
        <div className="middle">
          <input
            type="text"
            value={search}
            placeholder="Search products"
            className="search-box"
            onChange={searchProduct}
          />
          <div className="search-btn" >
            <Search size={20} />
          </div>
        </div>
        {
          search.length>0?(
             items.map((item,index)=>(
                <div className='search-ctn'>
                <img src={item.image} style={{width:'50px',height:'50px'}}/>
                <p key={index} className="suggestion" style={{cursor:'pointer'}}>
              <button style={{border:'none',cursor:'pointer'}} onClick={()=>navigate("/item",{state:{item}})}>
                {highlightText(item.title)}
                </button>
            </p>
                </div>
              ))
          ):(
            <p></p>
          )
        }
        <div className="py-3 text-center text-success">
          <div className="container">
            <h1 className="display-5 fw-bold mb-2">
              Welcome to <span className="text-warning">VK Store</span>
              <span className="ms-2">
                <ShoppingBag size={30} />
              </span>
            </h1>
            <p className="lead fw-semibold">
              Discover top deals and latest collections – shop smart, live stylish!
            </p>
          </div>
        </div>

        <h3 className="d-flex justify-content-center mt-4 mb-4">
          <strong>Featured Categories</strong>
        </h3>

        <div className="category">
          <div className="cuboid" onClick={() => navigate('/electronics')}>
            <img
              src="https://canvify.app/_astro/electronics-store-product-page-template-in-canva.NKs74bXI_2dbDGR.webp"
              alt="Electronics"
              style={{ width: '100%', height: '300px' }}
            />
          </div>
          <div className="cuboid" onClick={() => navigate('/clothing')}>
            <img
              src="https://marketplace.canva.com/EAE942zKuBI/1/0/1600w/canva-brown-minimalist-casual-fashion-collection-presentation-lXzzAes9eEE.jpg"
              alt="Clothing"
              style={{ width: '90%', height: '300px' }}
            />
          </div>
          <div className="cuboid" onClick={() => navigate('/jewellery')}>
            <img
              src="https://marketplace.canva.com/EAE0ZQHtsMQ/1/0/1600w/canva-gray-and-white-minimalist-beauty-jewelry-instagram-post-rKvLvfuDqSM.jpg"
              alt="Jewellery"
              style={{ width: '100%', height: '300px' }}
            />
          </div>
        </div>

        <div className="container mt-4 mb-4">
          <div className="row g-3">
            <h3 className="d-flex justify-content-center mt-5 mb-5">
              <strong>Popular Products</strong>
            </h3>

            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <div className="col-md-3" key={item.id}>
                  <div className="card h-100 d-flex flex-column">
                    <div className="image-container">
                      <Link to="/item" state={{ item }}>
                        <img
                          src={item.image}
                          className="product-image"
                          alt={item.title}
                          style={{ width: '100%', height: '300px', padding: '26px' }}
                        />
                      </Link>
                    </div>
                    <div className="card-body d-flex flex-column flex-grow-1">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text">
                        <del className="p-1 text-danger">₹{item.price}</del>
                        <span className="text-success"> ₹{item.discountPrice}</span>
                      </p>

                      <div className="d-flex align-items-center justify-content-center my-2">
                        <label className="me-2 fw-bold">Qty:</label>
                        <input
                          type="number"
                          min="1"
                          value={quantities[item.id] || 1}
                          onChange={(e) =>
                            handleQuantityChange(item.id, e.target.value)
                          }
                          className="form-control text-center"
                          style={{ width: '60px' }}
                        />
                      </div>

                      <div className="d-flex flex-wrap gap-2 justify-content-center mt-auto">
                        <Link
                          to="/checkout"
                          state={{ item }}
                          className="btn btn-outline-warning"
                        >
                        <ShoppingBag size={18}/>
                          Buy Now
                        </Link>
                        <br />
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => addToCart(item)}
                        >
                          <ShoppingCart size={18} style={{margin:'3px'}}/>
                          Add to Cart
                        </button>

                        {wishlistIds.includes(item.id) ? (
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => removeFromWishlist(item)}
                          >
                            <Delete size={18} /> 
                            Remove from Wishlist
                          </button>
                        ) : (
                          <button
                            className="btn btn-outline-success"
                            onClick={() => addToWishlist(item)}
                          >
                            <Heart size={18} /> 
                            Add to Wishlist
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No products found</p>
            )}
          </div>

          {/* ✅ Pagination Controls */}
          {totalPages > 1 && (
            <div className="pagination d-flex justify-content-center mt-4">
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
                      ? 'btn-warning text-dark'
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
