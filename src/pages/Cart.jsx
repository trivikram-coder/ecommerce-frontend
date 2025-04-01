import React, { useEffect, useState } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
  }, []);

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return; // Prevent negative or zero quantity

    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    );

    localStorage.setItem('cart', JSON.stringify(updatedCart));
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
    style={{ width: '50px' }}
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


                  <button className="btn btn-danger w-100 mt-2" onClick={() => removeItem(item.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="text-center mt-4">
          <h4>Total: ${totalAmount.toFixed(2)}</h4>
          <button className="btn btn-primary w-50 mt-3">Proceed to Checkout</button>
        </div>
      )}

      {/* Footer Section */}
      <footer className="bg-dark text-light text-center py-3 mt-5">
        <p>&copy; 2025 VK Store. All Rights Reserved.</p>
        <p>Your one-stop destination for quality products at the best prices.</p>
        <p>
          Follow us on 
          <a href="#" className="text-light mx-2">Facebook</a> | 
          <a href="#" className="text-light mx-2">Instagram</a> | 
          <a href="#" className="text-light mx-2">Twitter</a>
        </p>
      </footer>
    </div>
  );
};

export default Cart;
