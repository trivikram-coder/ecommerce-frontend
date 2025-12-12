import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const userId=JSON.parse(localStorage.getItem("user")).id
  const token = localStorage.getItem("token") || "";

  const [items, setItems] = useState([]);

  // ✅ Fetch cart items from backend on page load
  useEffect(() => {
    fetch("https://spring-server-0m1e.onrender.com/cart/get", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setItems(data)
      })
      .catch((err) => console.error("Error loading cart:", err));
  }, []);

  // ✅ Remove item
  const removeItem = (id) => {
    fetch(`https://spring-server-0m1e.onrender.com/cart/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) return;

        setItems((prev) => prev.filter((i) => i.id !== id));
        localStorage.setItem(`cart${userId}`,JSON.stringify(items))
      })
      .catch((err) => console.error("Remove Error:", err));
  };

  // ✅ Update quantity
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;

    fetch("https://spring-server-0m1e.onrender.com/cart/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id, quantity }),
    })
      .then(() => {
        setItems((prev) =>
          prev.map((i) => (i.id === id ? { ...i, quantity } : i))
        );
      })
      .catch((err) => console.error("Update error:", err));
  };

  // 🧮 Calculate total
  const totalAmount = items.reduce((acc, item) => {
    const price =
      item.discountPrice ?? item.offerPrice ?? item.price ?? 0;
    return acc + price * (item.quantity || 1);
  }, 0);
console.log(items)
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 fw-bold">Your Cart</h2>

      {items.length === 0 ? (
        <div className="text-center mt-4">
          <h4>Your cart is empty</h4>
          <Link to="/products" className="btn btn-primary mt-3">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="row">
          {items.map((item) => {
            const name = item.title ?? item.name ?? "Unnamed Item";
            const price =
              item.discountPrice ?? item.offerPrice ?? item.price ?? 0;

            return (
              <div key={item.id} className="col-md-4 mb-4">
                <div className="card shadow-sm border-light h-100">
                  <img
                    src={item.image}
                    alt={name}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "contain" }}
                  />

                  <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">
                      <strong>Price: </strong>₹{price}
                    </p>

                    {/* Quantity Controls */}
                    <div className="d-flex align-items-center justify-content-center">
                      <button
                        className="btn btn-outline-secondary btn-sm rounded-pill shadow-sm px-3"
                        onClick={() =>
                          updateQuantity(item.id, (item.quantity || 1) - 1)
                        }
                      >
                        −
                      </button>

                      <input
                        type="number"
                        className="form-control form-control-sm text-center mx-2"
                        style={{ width: "80px" }}
                        value={item.quantity || 1}
                        min="1"
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value))
                        }
                      />

                      <button
                        className="btn btn-outline-secondary btn-sm rounded-pill shadow-sm px-3"
                        onClick={() =>
                          updateQuantity(item.id, (item.quantity || 1) + 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      className="btn btn-outline-danger w-100 mt-2"
                      onClick={() => removeItem(item.id)}
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

      {/* Total */}
      {items.length > 0 && (
        <div className="text-center mt-4">
          <h4>Total: ₹{totalAmount.toFixed(2)}</h4>

          <Link
            to="/checkout"
            state={{ items }}
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
