import React, { useEffect, useState } from 'react';
import '../styles/products.css';
import { Cuboid, Heart, Search, ShoppingBag, User } from 'lucide-react';

const Products = () => {
  return (
    <div className="main-container">
        <div className="header bg-dark">
          <div className="left">
            <h4>VK store</h4>
          </div>
          <div className="middle">
            <input type="text" placeholder='Search' className='search-box'/>
            <div className='search-btn'><Search size={20}/></div>
          </div>
          <div className="right">
            <div className="nav">
            <User size={20}/>
            Account
            </div>
            <div className="nav">
            <Heart size={20}/>
            Wishlist
            </div>
            <div className="nav">
            <ShoppingBag size={20}/>
            Cart
            </div>
           
           
            
          </div>
        </div>
        <div className="main-body">
            <div className="head">
                Welcome to VK
            </div>
            <div className='category'>
            
                {['Electronics','Clothing','Grocery'].map((item)=>(
                    
                  <div className='cuboid'><Cuboid size={24}/>
                     
                  <p className='cat-name'>  {item}</p>
                  </div>
                ))}
            </div>
            <div className='product-card'>
        <div className="card" style={{ width: '18rem' }}>
  <img className="card-img-top" src="..." alt="Card image cap"/>
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
  
  </div>
  <div className="card" style={{ width: '18rem' }}>
  <img className="card-img-top" src="..." alt="Card image cap"/>
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
  </div>
</div>
        </div>
        <footer>
                 <div className="footer-box">
        <div className="foot bg-dark text-light d-flex justify-content-center align-items-center ">
            <p>&copy; 2025 VK Store. All Rights Reserved</p>

        </div>
        </div>
        </footer>
 
    </div>
  )
}

export default Products
