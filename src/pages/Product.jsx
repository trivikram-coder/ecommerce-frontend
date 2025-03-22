import React, { useEffect, useState } from 'react';
import '../styles/products.css';
import { Cuboid, Heart, Search, ShoppingBag, User } from 'lucide-react';

const Products = () => {
  const[items,setItems]=useState([])
  useEffect(()=>{
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data =>{
      setItems(data)
      
    }
    );
  },[])
  
  return (
    <div className="main-container">
      {/* Header Section */}
      <header>
      <div className="header bg-dark">
        <div className="left">
          <h4>VK Store</h4>
        </div>
        <div className="middle">
          <input type="text" placeholder='Search' className='search-box'/>
          <div className='search-btn'><Search size={20}/></div>
        </div>
        <div className="right">
          <div className="nav"><User size={20}/> Account</div>
          <div className="nav"><Heart size={20}/> Wishlist</div>
          <div className="nav"><ShoppingBag size={20}/> Cart</div>
        </div>
      </div>
      </header>
      {/* Welcome Section */}
      <div className="main-body">
        
      <div className="head">
        <h2>Welcome to VK</h2></div>
        {/* Categories */}
        <div className='category'>
        
          <div className='cuboid'><Cuboid size={24}/> <p className='cat-name'>Electronics</p></div>
          <div className='cuboid'><Cuboid size={24}/> <p className='cat-name'>Clothing</p></div>
          <div className='cuboid'><Cuboid size={24}/> <p className='cat-name'>Grocery</p></div>
        </div>

        {/* Product Cards Grid */}
        <div className="container mt-4 mb-4">
  <div className="row g-3">  
    {items.map((item) => (
      <div className="col-md-3" key={item.id}>
        <div className="card h-100 d-flex flex-column">
          <div className='image-container'>
          <img 
            src={item.image} 
            className="product-image h-100" 
            alt={item.title} 
           
          />
          </div>
          <div className="card-body d-flex flex-column flex-grow-1">
            <h5 className="card-title">{item.title}</h5>
            <p className="card-text">${item.price}</p>
            <a href="#" className="btn btn-primary mt-auto">Add to Cart</a>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

        

      </div>

      {/* Footer */}
      <footer>
  <div className="footer-box">
    <div className="foot bg-dark text-light d-flex justify-content-center align-items-center flex-column p-3">
      <p>&copy; 2025 VK Store. All Rights Reserved.</p>
      <p>Your one-stop destination for quality products at the best prices.</p>
      <p>Follow us on  
        <a href="#" className="text-light mx-2">Facebook</a> |  
        <a href="#" className="text-light mx-2">Instagram</a> |  
        <a href="#" className="text-light mx-2">Twitter</a>
      </p>
    </div>
  </div>
</footer>

    </div>
  );
};

export default Products;
