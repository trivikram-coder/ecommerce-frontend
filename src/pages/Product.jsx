import React, { useEffect, useState } from 'react';
import '../styles/products.css';
import { Cuboid, Heart, Search, ShoppingBag, User,X } from 'lucide-react';
import productsDetails from '../data/data';
import { Link } from 'react-router-dom';
const Products = () => {
  const[items,setItems]=useState(productsDetails)
  const[filtered,setFiltered]=useState(productsDetails)
  const[search,setSearch]=useState('');
  
  function searchProduct(name){
  
    if(name===''){
      setItems(filtered)
      return
    }
    const filter=items.filter(item=>item.title.toLowerCase().includes(name.toLowerCase()))
    setItems(filter)
  }
  

  return (
    <div className="main-container">
      {/* Header Section */}
      <header>
      <div className="header bg-dark">
        <div className="left">
          <h4>VK Store   <ShoppingBag size={24}/></h4>
        </div>
        <div className="middle">
        <input 
  type="text" 
 value={search}
  placeholder="Search"
  className="search-box" 
  onChange={(e) => {
    setSearch(e.target.value);
    searchProduct(e.target.value); // Perform search on every change
  }} 
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === "Backspace") {
      searchProduct(search); 
    }
  }}
/>


          <button className="btn-del" onClick={()=>{setSearch('')
            setItems(filtered)
            }}>
          <X size={23} />
        </button>
            <div className='search-btn'>
            
            <Search size={20} onClick={(e)=>searchProduct(search)} style={{ textDecoration: 'none' }}/></div>
          </div>
          <div className="right">
          
            <div className="nav">
            
            <Link to='/signup' style={{ textDecoration: 'none',color:'white' }}> <User size={23} className='text'/> Account
            </Link>
             
            </div>
            <div className="nav"><Heart size={20} style={{ textDecoration: 'none' }}/> Wishlist</div>
            <div className="nav"><ShoppingBag size={20} style={{ textDecoration: 'none' }}/> Cart</div>
          </div>
          </div>
          </header>
          {/* Welcome Section */}
      <div className="main-body">
        
      <div className="head">
        <div className="headh2">
        <h2>Welcome to VK Store <ShoppingBag size={28}className='gap-3'/>
        </h2>
        </div>
        
        
        </div>
        {/* Categories */}
          <h3 className='d-flex justify-content-center mt-4 mb-4'><strong>Featured Categories</strong></h3>
          <div className='category'>
               
            <div className='cuboid'><Cuboid size={24}/> <p className='cat-name'><strong>Electronics</strong></p></div>
            <div className='cuboid'><Cuboid size={24}/> <p className='cat-name'><strong>Clothing</strong></p></div>
            <div className='cuboid'><Cuboid size={24}/> <p className='cat-name'><strong>Grocery</strong></p></div>
          </div>

          {/* Product Cards Grid */}
        <div className="container mt-4 mb-4">
  <div className="row g-3">  
    <h3 className='d-flex justify-content-center mt-5 mb-5'><strong>Popular Products in our store</strong></h3>
    {items.length > 0 ? items.map((item) => (
      <div className="col-md-3" key={item.id}>
        <div className="card h-100 d-flex flex-column">
          <div className='image-container'>
            <Link to='/item' state={{item}}>
          <img 
            src={item.image} 
            className="product-image" 
            alt={item.title} 
           style={{width:'100%',height:'300px',padding:'26px'}}
          />
          </Link>
          </div>
          <div className="card-body d-flex flex-column flex-grow-1">
            <h5 className="card-title">{item.title}</h5>
           
            <p className="card-text">${item.price}</p>
            <div className="flex flex-col items-center">
             
  <select className="border rounded-md p-2 w-full focus:ring-blue-500 focus:border-blue-500">
    <option value="" disabled>Select quantity</option>
    {[1, 2, 3, 4, 5].map((num) => (
      <option key={num} value={num}>{num}</option>
    ))}
  </select>
</div>

            <a href="#" className="btn btn-primary mt-auto">Add to Cart</a>
          </div>
        </div>
      </div>
    )) : <p>No products found</p>}
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
