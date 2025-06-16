import React, { useEffect, useState } from 'react';
import '../styles/products.css';
import { Cuboid, Heart, Search, ShoppingBag, User, X } from 'lucide-react';
// import productsDetails from '../data/data';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Products = () => {
   
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const[category,setCategory]=useState([]);
  const [search, setSearch] = useState('');
  const [user, setUser] = useState(null);
  const [quantities, setQuantities] = useState({}); 
  const[cartCount,setCartCount]=useState(0)
    const[wishCount,setWishCount]=useState(0)


  const navigate = useNavigate();
useEffect(() => {
  fetch("https://backend-server-3-ycun.onrender.com/product/get")
    .then((response) => response.json())
    .then((data) => {
      setItems(data);
      setFiltered(data); // Store the original data for filtering
    })
    .catch((error) => console.error("Error fetching products:", error));
},[])
 


  const handleQuantityChange = (id, value) => {
    const quantity = Math.max(1, parseInt(value) || 1); 
    setQuantities((prev) => ({ ...prev, [id]: quantity }));
  };

  
  
  function searchProduct(name) {
    setItems(
      name === ''
        ? filtered
        : filtered.filter((item) => item.title.toLowerCase().includes(name.toLowerCase()))
    );
  }
 
  function addToWishlist(product) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    
    if (!wishlist.some((item) => item.id === product.id)) {
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    } else {
      toast.success(`${product.title} is already in your wishlist.`);
    }
  
    // Update wishlist count
    setWishCount(wishlist.length);
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

  const addToCart = async (product) => {
     // Get existing cart from localStorage or initialize empty
     const cart = JSON.parse(localStorage.getItem("cart")) || [];
   
     // Check if the product already exists in the cart
     const existingItem = cart.find((item) => item.id === product.id);
   
     // Get the quantity from the state (quantities object) or default to 1
     const quantity = quantities[product.id] || 1;
   
     if (existingItem) {
       // If product exists, just update the quantity
       existingItem.quantity += quantity;
     } else {
       // Add quantity field to product and push it to cart
       product.quantity = quantity;
       cart.push(product);
     }
   
     // Save the updated cart back to localStorage
     localStorage.setItem("cart", JSON.stringify(cart));
   
     try {
       // Make API call to backend to sync cart
       const response = await fetch("https://backend-server-3-ycun.onrender.com/cart/add", {
         method: "POST",
         headers: {
           "Content-Type": "application/json"
         },
         body: JSON.stringify(product)
       });
   
       const data = await response.json();
   
       if (response.ok) {
         console.log(data.message);
         toast.success(`${product.title} added to cart`);
       } else {
         toast.error("Failed to add product to backend cart:", data.message);
       }
     } catch (error) {
       toast.error("Error while adding to cart:", error);
     }
   
     // Update cart count state (assuming you have this state declared)
     setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
   };
  // async function buy(items) {
  //   const response=await fetch("https://backend-server-3-ycun.onrender.com/cart/add", {
  //     method:"POST",
  //     headers:{
  //       "content-type":"application/json"
  //     },
  //     body:JSON.stringify(items)
  //   })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data.message);
  //     setCartCount(cartCount + 1); 
  //     navigate("/checkout")
      
  //   })
  // }

  return (
    <div className="main-container">
      

      <div className="main-body">
       
                      <div className="middle">
                         <input
                        type="text"
                        value={search}
                        placeholder="Search products"
                        className="search-box"
                        onChange={(e) => {
                          setSearch(e.target.value);
                        
                        }}
                      />
                              
                                    
                                   
                        
                                  <div className="search-btn" onClick={() => searchProduct(search)}>
                                    <Search size={20} />
                                  </div>
                                </div>
      <div className="head bg-primary py-3 text-center text-white">
  <div className="container">
    <h1 className="display-5 fw-bold mb-2" >
      Welcome to <span className="text-warning" >VK Store</span>
      <span className="ms-2"><ShoppingBag size={30} /></span>
    </h1>
    <p className="lead fw-semibold">
      Discover top deals and latest collections – shop smart, live stylish!
    </p>
  </div>
</div>


        <h3 className='d-flex justify-content-center mt-4 mb-4'><strong>Featured Categories</strong></h3>
        <div className='category' >
          <div className='cuboid' onClick={()=>navigate("/electronics")}><img src='https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' /> <p><strong>Electronics</strong></p></div>
          <div className='cuboid' onClick={()=>navigate("/clothing")}><img  /> <p><strong>Clothing</strong></p></div>
          <div className='cuboid' onClick={()=>navigate("/jewellery")}><img /> <p><strong>Jewellery</strong></p></div>
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
                      <Link to='/checkout' state={{item}} className="btn btn-primary fw-bold px-4 py-2 shadow-sm rounded-pill" >Buy Now</Link>
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