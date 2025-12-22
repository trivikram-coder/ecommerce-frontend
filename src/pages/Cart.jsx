import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import "../styles/cart.css";
import apiKey from "../service/api";
/* ================= CART ITEM ================= */
const CartItem = ({ item, updateQuantity, removeItem }) => {
  const name = item.title ?? item.name ?? "Unnamed Item";
  const price = item.discountPrice ?? item.offerPrice ?? item.price ?? 0;
  const quantity = item.quantity || 1;
  const subTotal = price * quantity;

  return (
    <li className="cart-item-card">
      <div className="cart-item-left">
        <img src={item.image} alt={name} className="cart-item-image" />
      </div>

      <div className="cart-item-center">
        <h5 className="fw-semibold mb-1">{name}</h5>
        <p className="text-muted small mb-2">{item.category}</p>

        <div className="price-row">
          <span className="price">₹{price.toFixed(2)}</span>
          <span className="subtotal">Subtotal: ₹{subTotal.toFixed(2)}</span>
        </div>

        <div className="quantity-controls">
          <button
            className="btn btn-outline-secondary btn-sm"
            disabled={quantity <= 1}
            onClick={() => updateQuantity(item.id, quantity - 1)}
          >
            <Minus size={16} />
          </button>

          <input
            type="number"
            className="form-control form-control-sm quantity-input"
            min="1"
            value={quantity}
            onChange={(e) =>
              updateQuantity(item.id, parseInt(e.target.value) || 1)
            }
          />

          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => updateQuantity(item.id, quantity + 1)}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <button
        className="btn remove-btn"
        onClick={() => removeItem(item.id)}
        aria-label="Remove item"
      >
        <X size={18} />
      </button>
    </li>
  );
};

/* ================= MAIN CART ================= */
const Cart = () => {
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const userId = storedUser?.id;
  const token = localStorage.getItem("token") || "";

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  /* Redirect if not logged in */
  useEffect(() => {
    if (!userId) navigate("/", { replace: true });
  }, [userId, navigate]);

  /* Load cart */
  const fetchCartItems = () => {
    if (!userId) return;

    setLoading(true);
    fetch(`${apiKey}/cart/get`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setItems(list);
        localStorage.setItem(`cart${userId}`, JSON.stringify(list));
        window.dispatchEvent(new Event("storage"));
      })
      .catch((err) => console.error("Cart load error:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCartItems();
  }, [userId, token]);

  /* Remove item */
  const removeItem = (id) => {
    fetch(`${apiKey}/cart/delete/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Delete failed");

        setItems((prev) => {
          const updated = prev.filter((item) => item.id !== id);
          localStorage.setItem(`cart${userId}`, JSON.stringify(updated));
          window.dispatchEvent(new Event("storage"));
          return updated;
        });
      })
      .catch((err) => console.error("Remove error:", err));
  };

  /* Update quantity */
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;

    setItems((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      localStorage.setItem(`cart${userId}`, JSON.stringify(updated));
      return updated;
    });

    fetch(`${apiKey}/cart/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id, quantity }),
    })
      .then((res) => {
        if (!res.ok) {
          fetchCartItems();
          throw new Error("Update failed");
        }
        window.dispatchEvent(new Event("storage"));
      })
      .catch((err) => console.error("Update error:", err));
  };

  /* Total */
  const totalAmount = items.reduce((acc, item) => {
    const price = item.discountPrice ?? item.offerPrice ?? item.price ?? 0;
    return acc + price * (item.quantity || 1);
  }, 0);

  /* Loading */
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  /* Empty */
  if (items.length === 0) {
    return (
      <div className="text-center py-5">
        <h2 className="fw-bold mb-4">Your Cart</h2>
        <ShoppingBag size={64} className="text-muted mb-3" />
        <h5 className="text-muted">Your cart is empty</h5>
        <Link to="/products" className="btn btn-primary mt-4 px-5">
          Start Shopping
        </Link>
      </div>
    );
  }

  /* UI */
  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-5">
        Your Cart ({items.length})
      </h2>

      <div className="row">
        <div className="col-lg-8">
          <ul className="cart-list">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
            ))}
          </ul>
        </div>

        <div className="col-lg-4">
          <div className="summary-card sticky-top">
            <h4 className="fw-semibold mb-4 text-primary">
              Order Summary
            </h4>

            <div className="summary-row">
              <span>Total Items</span>
              <span className="fw-bold">
                {items.reduce(
                  (acc, i) => acc + (i.quantity || 1),
                  0
                )}
              </span>
            </div>

            <div className="summary-row total">
              <span>Total Amount</span>
              <span className="fw-bold text-danger">
                ₹{totalAmount.toFixed(2)}
              </span>
            </div>

            <Link
              to="/checkout"
              state={{ items }}
              className="btn btn-primary w-100 py-2 fw-semibold"
            >
              Proceed to Checkout
            </Link>

            <Link
              to="/products"
              className="btn btn-outline-secondary w-100 mt-2"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
