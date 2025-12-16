import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import "../styles/orderPlaced.css";

const OrderPlaced = () => {
  const navigate = useNavigate();
  const orderDate = new Date().toLocaleString();

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="order-placed-card text-center">
            <CheckCircle size={72} className="success-icon mb-3" />

            <h2 className="fw-bold mb-2">Order Placed Successfully</h2>
            <p className="text-muted mb-3">
              Thank you for shopping with VK Store.  
              Your order is being processed.
            </p>

            <div className="order-info mb-4">
              <span>Order Date & Time</span>
              <strong>{orderDate}</strong>
            </div>

            <button
              className="btn btn-primary px-5 py-2 fw-semibold"
              onClick={() => navigate("/orders")}
            >
              View My Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPlaced;
