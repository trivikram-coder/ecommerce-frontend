import React from 'react';
import products from './data/data'; // Make sure this contains flat product list
import {Shirt} from 'lucide-react'
const Clothing = () => {
  const clothing = products.filter((product) => product.category === 'clothing');

  return (
    <div className="container my-4">
      <h2 className="text-primary text-center mb-4">Fashion
        <Shirt size={24}/>
      </h2>
      <div className="row">
        {clothing.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={product.image}
                alt={product.name}
                className="card-img-top"
                style={{ height: '250px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
    
                <p className="card-text">{product.description}</p>
                <p className="card-text text-success fw-bold">₹ {product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clothing;
