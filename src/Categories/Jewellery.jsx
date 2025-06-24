import React from 'react';
import products from './data/data'; // Make sure this contains flat product list
import { useNavigate } from 'react-router-dom';

const Jewellery = () => {
  const jewellery = products.filter((product) => product.category === 'jewellery');
  const navigate=useNavigate();
  return (
    <div className="container my-4">
      <h2 className="text-center text-primary mb-4">Jewellery</h2>
      <div className="row">
        {jewellery.map((item) => (
          <div key={item.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm" onClick={() => navigate('/item', { state: { item } })}>
              <img
                src={item.image}
                alt={item.name}
                className="card-img-top"
                style={{ height: '340px',padding:'24px' }}
              />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                
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

export default Jewellery;
