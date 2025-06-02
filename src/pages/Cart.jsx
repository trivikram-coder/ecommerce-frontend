import React, { useEffect, useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
const Cart = () => {
  const navigate=useNavigate()
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch("https://backend-server-3-ycun.onrender.com/cart/get")
      .then((response) => response.json())
      .then((data) => {
        setCartItems(data)
      })
      .catch((error) => console.error('Error fetching cart items:', error));
    
  }, []);

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    fetch("https://backend-server-3-ycun.onrender.com/cart/remove", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
      setCartItems(updatedCart); // Update state only after successful API call
    })
    .catch((error) => console.error('Error removing item:', error));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return; // Prevent negative or zero quantity

    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    );

    fetch("https://backend-server-3-ycun.onrender.com/cart/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id, quantity })
    })
    setCartItems(updatedCart);
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + item.offerPrice * (item.quantity || 1), 0);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty</p>
      ) : (
        <div className="row">
          {cartItems.map((item) => (
            <div key={item.id} className="col-md-4 mb-4">
              <div className="card shadow-sm border-light h-100">
                <img src={item.image} alt={item.title} className="card-img-top" style={{ height: '200px', objectFit: 'contain' }} />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text"><strong>Price: </strong>${item.offerPrice}</p>

                  {/* Quantity Selection */}
                  <div className="d-flex align-items-center justify-content-center">
  <button 
    className="btn btn-outline-secondary btn-sm rounded-pill shadow-sm px-3" 
    onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
  >
    −
  </button>

  <input
    type="number"
    className="form-control form-control-sm text-center mx-2"
    style={{ width: '80px' }}
    value={item.quantity || 1}
    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
    min="1"
  />

  <button 
    className="btn btn-outline-secondary btn-sm rounded-pill shadow-sm px-3" 
    onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
  >
    +
  </button>
</div>


                  <button className="btn btn-outline-danger w-100 mt-2" onClick={() => removeItem(item.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="text-center mt-4">
          <h4>Total: ${totalAmount.toFixed(2)}</h4>
          <Link to='/checkout' state={{cartItems}} className="btn btn-primary w-50 mt-3" >Proceed to Checkout</Link>
        </div>
      )}

    
    </div>
  );
};

export default Cart;
