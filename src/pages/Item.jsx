import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../styles/items.css';
import { ArrowBigLeft, Minus, Plus } from 'lucide-react';

const Item = () => {
  const location = useLocation();
  const item = location.state?.item;
  
  const [quan, setQuan] = useState(item?.quantity || 1);
  const [price, setPrice] = useState(item?.offerPrice || 0);
  const [msg, setMsg] = useState("");

  if (!item) {
    return <h2 className="text-center mt-5">Item not found!</h2>;
  }

  const handleIncreaseQuantity = () => {
   
      const newQuan = quan + 1;
      setQuan(newQuan);
      setPrice(newQuan * item.offerPrice);
      setMsg("");
    
  };

  const handleDecreaseQuantity = () => {
    if (quan > 1) {
      const newQuan = quan - 1;
      setQuan(newQuan);
      setPrice(newQuan * item.offerPrice);
      setMsg("");
    } else {
      setMsg("Quantity should not be less than 1");
    }
  };

  return (
    <>
      <div className="back-btn">
        <Link to='/product'>
          <ArrowBigLeft size={36} style={{ color: 'black' }} className='back' />
        </Link>
      </div>
      <div className="item-container">
        {/* Image Section */}
        <div className="item-img1">
          <img
            src={item.image}
            className="item-img"
            alt={item.title}
            style={{ width: '90%', height: '300px', padding: '26px' }}
          />
        </div>

        {/* Details Section */}
        <div className="item-det">
          <h4>{item.title}</h4>
          <p>{item.description.toUpperCase()}</p>
          <p>Category: {item.category}</p>
          <p>
            Quantity:
            <Minus size={22} className='minus' onClick={handleDecreaseQuantity} />
            {quan}
            <Plus size={22} className='plus' onClick={handleIncreaseQuantity} />
          </p>
          {msg && <p className="text-danger">{msg}</p>}
          <h3>
           Price: <del> ${item.price.toFixed(2)}</del> ${price.toFixed(2)}</h3>
          <p></p>
          <button className='btn btn-primary buy-now fw-bold px-4 py-2 shadow-sm rounded-pill ms-2'>Buy now</button>
          <button className="btn btn-outline-dark fw-bold px-4 py-2 shadow-sm rounded-pill ms-2">
            Add To Cart
          </button>
        </div>
      </div>
      <footer className='footercl bg-dark text-light'>
        <div className="footer-box bg-dark text-light">
          <div className="foot bg-dark text-light d-flex justify-content-center align-items-center flex-column p-3">
            <p>&copy; 2025 VK Store. All Rights Reserved.</p>
            <p>Your One-Stop Destination For Quality Products At The Best Prices.</p>
            <p>
              Follow Us On
              <a href="#" className="text-light mx-2">Facebook</a> |
              <a href="#" className="text-light mx-2">Instagram</a> |
              <a href="#" className="text-light mx-2">Twitter</a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Item;
