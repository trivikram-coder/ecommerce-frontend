import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderPlaced = () => {
  const navigate = useNavigate();
  const orderDate = new Date().toLocaleString();

  return (
    <div className="container mt-5 text-center">
      <div className="card shadow-lg p-4">
        <div className="card-body">
          <h2 className="text-success mb-3">
            <i className="bi bi-check-circle-fill me-2"></i>Order Placed Successfully!
          </h2>
          <p className="lead">Thank you for your purchase. We are processing your order.</p>
          <hr />
          <p className="text-muted">Order Date & Time: <strong>{orderDate}</strong></p>
          <button className="btn btn-primary mt-3" onClick={() => navigate('/orders')}>
            See your orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPlaced;
