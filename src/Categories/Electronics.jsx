import React from 'react';
import products from './data/data';
import { useNavigate } from 'react-router-dom';

const Electronics = () => {
  const electronics = products.filter((item) => item.category === 'electronics');
  const navigate = useNavigate();

  return (
    <div className="container my-4">
      <h2 className="text-center text-primary mb-4">Electronics</h2>
      <div className="row">
        {electronics.map((item) => (
          <div
            key={item.id}
            className="col-md-4 mb-4"
            onClick={() => navigate('/item', { state: { item } })}
            style={{ cursor: 'pointer' }}
          >
            <div className="card h-100 shadow-sm">
              <img
                src={item.image}
                alt={item.name}
                className="card-img-top"
                style={{ height: '250px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text"><strong>Model:</strong> {item.model}</p>
                <p className="card-text">{item.description}</p>
                <p className="card-text text-success fw-bold">₹ {item.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Electronics;
