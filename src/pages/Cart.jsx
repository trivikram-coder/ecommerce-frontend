import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import "../styles/cart.css";
import {apiUrl} from "../service/api";
import { toast } from "react-toastify";

/* ================= CART ITEM ================= */
const CartItem = ({ item, updateQuantity, removeItem }) => {
  const name = item.title || "Unnamed Item";
  const price = item.discountPrice ?? item.price ?? 0;
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
          <span className="subtotal">
            Subtotal: ₹{subTotal.toFixed(2)}
          </span>
        </div>

        <div className="quantity-controls">
          <button
            className="btn btn-outline-secondary btn-sm"
            disabled={quantity <= 1}
            onClick={() => updateQuantity(item.cartId, quantity - 1)}
          >
            <Minus size={16} />
          </button>

          <input
            type="number"
            className="form-control form-control-sm quantity-input"
            min="1"
            value={quantity}
            onChange={(e) =>
              updateQuantity(
                item.cartId,
                parseInt(e.target.value) || 1
              )
            }
          />

          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => updateQuantity(item.cartId, quantity + 1)}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <button
        className="btn remove-btn"
        onClick={() => removeItem(item.cartId)}

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
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")) || {};
const userId = user?.id;
const CART_IDS_KEY = `cartIds${userId}`;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  /* Redirect if not logged in */
  useEffect(() => {
    if (!token) navigate("/", { replace: true });
  }, [token, navigate]);

  /* 🔁 Sync helper (IMPORTANT) */
  const syncCart = (updatedItems) => {
    setItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    window.dispatchEvent(new Event("storage"));
  };

  /* Fetch cart */
  const fetchCartItems = () => {
    setLoading(true);

    fetch(`${apiUrl}/cart/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const list = data?.data || [];
        syncCart(list);
      })
      .catch((err) => console.error("Cart fetch error:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  /* Remove item */
  const removeItem = (cartId) => {
  const cartIds =
    JSON.parse(localStorage.getItem(CART_IDS_KEY)) || [];

  const removedItem = items.find(
    (item) => item.cartId === cartId
  );

  const productId = removedItem?.productId;

  fetch(`${apiUrl}/cart/delete/${cartId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(() => {
      const updated = items.filter(
        (item) => item.cartId !== cartId
      );

      // ✅ update cartIds
      const updatedIds = cartIds.filter(
        (id) => id !== productId
      );

      localStorage.setItem(
        CART_IDS_KEY,
        JSON.stringify(updatedIds)
      );
      toast.info(`Item removed from cart`)
      syncCart(updated);
    })
    .catch((err) => console.error("Delete error:", err));
};


  /* Update quantity */
  const updateQuantity = (cartId, quantity) => {
    if (quantity < 1) return;

    const updated = items.map((item) =>
      item.cartId === cartId
        ? { ...item, quantity }
        : item
    );

    syncCart(updated);

    fetch(
      `${apiUrl}/cart/update/${cartId}?quantity=${quantity}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).catch((err) => console.error("Update error:", err));
  };

  /* Total */
  const totalAmount = items.reduce((acc, item) => {
    const price = item.discountPrice ?? item.price ?? 0;
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

  /* Empty cart */
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
                key={item.cartId}
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
