import React, { useEffect, useState } from "react";
import "../styles/orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders_1")) || [];
    setOrders(storedOrders);
  }, []);

  const handleCancel = (index) => {
    const updatedOrders = [...orders];
    updatedOrders.splice(index, 1);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  return (
    <div className="container py-4">
      <h2 className="orders-title">Your Orders</h2>

      {orders.length === 0 ? (
        <div className="empty-orders">No orders found.</div>
      ) : (
        orders.map((order, index) => (
          <div className="amazon-order-card" key={index}>

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
                Order #{index + 1}
              </div>
            </div>

            {/* BODY */}
            <div className="amazon-order-body">
              {order.items.map((item, idx) => (
                <div className="amazon-order-item" key={idx}>

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
                onClick={() => handleCancel(index)}
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
