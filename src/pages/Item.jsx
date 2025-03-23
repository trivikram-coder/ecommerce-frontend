import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/items.css';

const Item = () => {
  const location = useLocation();
  const item = location.state?.item;

  if (!item) {
    return <h2 className="text-center mt-5">Item not found!</h2>;
  }

  return (
    <div className="item-container">
      {/* Image Section */}
      <div className="item-img1">
        <img src={item.image} className="item-img" alt={item.title} 
        style={{width: '100%', height: '100%'}}
        />
      </div>

      {/* Details Section */}
      <div className="item-det">
        <h4>{item.title}</h4>
        <p>{item.description}</p>
        <h3>Price: ${item.price}</h3>

        <button className="btn btn-outline-dark">Add to Cart</button>
      </div>
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

export default Item;
