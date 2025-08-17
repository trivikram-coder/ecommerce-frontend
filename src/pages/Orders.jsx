import React, { useEffect, useState } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);
const handleCancel=(index)=>{
    const updatedOrders=[...orders]
    updatedOrders.splice(index,1)
    setOrders(updatedOrders)
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
}
console.log(orders)
  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Your Orders</h2>

      {orders.length === 0 ? (
        <div className="alert alert-info text-center">No orders found.</div>
      ) : (
        orders.map((order, index) => (
          <div className="card mb-4 shadow-sm" key={index}>
            <div className="card-body">
              <h5 className="card-title">Order #{index + 1}</h5>
              <p><strong>Name:</strong> {order.name}</p>
              <p><strong>Email:</strong> {order.email}</p>
              <p><strong>Order Date:</strong> {order.orderDate}</p>
              <p><strong>Expected Delivery:</strong> {order.expectedDelivery}</p>

              <h6>Items:</h6>
              <ul className="list-group mb-3">
                {order.items.map((item, idx) => (
                  <li key={idx} className="list-group-item d-flex justify-content-between">
                    <span>{item.title ?? item.name ?? 'Unnamed'} (x{item.quantity || 1})</span>
                    <strong>₹{((item.discountPrice ?? item.offerPrice ?? item.price) * (item.quantity || 1)).toFixed(2)}</strong>
                  </li>
                ))}
                <li className="list-group-item d-flex justify-content-between bg-light">
                  <strong>Total:</strong>
                  <strong>₹{order.totalAmount.toFixed(2)}</strong>
                </li>
              </ul>
              <button className='btn btn-danger' onClick={()=>handleCancel(index)}>Cancel order</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
