import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const [item, setItems] = useState([]);

  useEffect(() => {
    fetch("https://spring-server-0m1e.onrender.com/cart/get")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      })
      .catch((error) => console.error('Error fetching cart items:', error));
  }, []);

 const removeItem = (id) => {
  const updatedCart =item.filter((item1) => item1.id !== id);
    localStorage.setItem("cart",JSON.stringify(updatedCart))
  
  fetch(`https://spring-server-0m1e.onrender.com/cart/delete/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.ok) {
        // Update local state only after successful deletion
        const updatedCart = item.filter(item => item.id !== id);
        setItems(updatedCart);
      } else {
        console.error("Failed to delete item from cart");
      }
    })
    .catch((error) => console.error("Error removing item:", error));
};

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;

    const updatedCart = item.map(item =>
      item.id === id ? { ...item, quantity } : item
    );

    fetch("https://spring-server-0m1e.onrender.com/cart/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id, quantity })
    })
      .then(() => {
        setItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      })
      .catch((err) => console.error("Update error:", err));
  };

  const totalAmount = item.reduce((acc, item1) => {
    const price = item1.discountPrice ?? item1.offerPrice ?? item1.price ?? 0;
    return acc + price * (item1.quantity || 1);
  }, 0);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Your Cart</h2>
      {item.length === 0 ? (
        <p className="text-center">Your cart is empty</p>
      ) : (
        <div className="row">
          {item.map((item1) => {
            const name = item1.title ?? item1.name ?? "Unnamed Item";
            const price = item1.discountPrice ?? item1.offerPrice ?? item1.price ?? 0;
            return (
              <div key={item1.id} className="col-md-4 mb-4">
                <div className="card shadow-sm border-light h-100">
                  <img
                    src={item1.image}
                    alt={name}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'contain' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text"><strong>Price: </strong>${price}</p>

                    {/* Quantity controls */}
                    <div className="d-flex align-items-center justify-content-center">
                      <button
                        className="btn btn-outline-secondary btn-sm rounded-pill shadow-sm px-3"
                        onClick={() => updateQuantity(item1.id, (item1.quantity || 1) - 1)}
                      >−</button>

                      <input
                        type="number"
                        className="form-control form-control-sm text-center mx-2"
                        style={{ width: '80px' }}
                        value={item1.quantity || 1}
                        onChange={(e) => updateQuantity(item1.id, parseInt(e.target.value))}
                        min="1"
                      />

                      <button
                        className="btn btn-outline-secondary btn-sm rounded-pill shadow-sm px-3"
                        onClick={() => updateQuantity(item1.id, (item1.quantity || 1) + 1)}
                      >+</button>
                    </div>

                    <button
                      className="btn btn-outline-danger w-100 mt-2"
                      onClick={() => removeItem(item1.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {item.length > 0 && (
        <div className="text-center mt-4">
          <h4>Total: ₹{totalAmount.toFixed(2)}</h4>
          <Link
            to='/checkout'
            state={{ item }}
            className="btn btn-primary w-50 mt-3"
          >
            Proceed to Checkout
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
