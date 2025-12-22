import React, { useEffect, useState } from "react";
import "../styles/orders.css";
import { toast } from "react-toastify";
import apiKey from "../service/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token");

  // ---------------- FETCH ORDERS ----------------
  const [loaded, setLoaded] = useState(false);

useEffect(() => {
  if (!user || !token || loaded) return;

  const fetchOrders = async () => {
    try {
      const res = await fetch(
        `${apiKey}/orders/get`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setOrders(data || []);
      setLoaded(true); // ✅ IMPORTANT
    } catch (err) {
      console.error("Fetch orders error:", err);
    }
  };

  fetchOrders();
}, [user, token, loaded]);


  // ---------------- CANCEL ORDER ----------------
  const handleCancel = async (orderId) => {
    try {
      await fetch(
        `${apiKey}/orders/delete/${orderId}`,
        {
          method: "DELETE",
          
        }
      );

      setOrders((prev) => prev.filter((o) => o.id !== orderId));
      toast.success("Order cancelled successfully");
    } catch (err) {
      console.error("Cancel order error:", err);
      toast.error("Failed to cancel order");
    }
  };

  return (
    <div className="container py-4">
      <h2 className="orders-title">Your Orders</h2>

      {orders.length === 0 ? (
        <div className="empty-orders">No orders found.</div>
      ) : (
        orders.map((order) => (
          <div className="amazon-order-card" key={order.id}>

            {/* HEADER */}
            <div className="amazon-order-header">
              <div>
                <span className="label">ORDER PLACED</span>
                <span>{order.orderDate}</span>
              </div>

              <div>
                <span className="label">TOTAL</span>
                <span>₹{order.totalAmount.toFixed(2)}</span>
              </div>

              <div>
                <span className="label">DELIVER TO</span>
                <span>{order.name}</span>
              </div>

              <div className="order-id">
                Order #{order.id}
              </div>
            </div>

            {/* BODY */}
            <div className="amazon-order-body">
              {order.items.map((item) => (
                <div className="amazon-order-item" key={item.id}>

                  {/* IMAGE */}
                  <div className="order-item-img">
                    <img
                      src={item.image}
                      alt={item.title ?? item.name}
                    />
                  </div>

                  {/* DETAILS */}
                  <div className="order-item-details">
                    <p className="item-title">
                      {item.title ?? item.name ?? "Unnamed"}
                    </p>
                    <p className="item-qty">
                      Qty: {item.quantity || 1}
                    </p>
                    <p className="delivery-text">
                      Expected delivery: {order.expectedDelivery}
                    </p>
                  </div>

                  {/* PRICE */}
                  <div className="item-price">
                    ₹{(
                      (item.discountPrice ?? item.offerPrice ?? item.price) *
                      (item.quantity || 1)
                    ).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* FOOTER */}
            <div className="amazon-order-footer">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => handleCancel(order.id)}
              >
                Cancel order
              </button>
            </div>

          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
