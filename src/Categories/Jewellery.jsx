import React, { useEffect, useState } from "react";
import {getProducts} from "./data/data";
import { useNavigate } from "react-router-dom";
import "../styles/category.css";

const Jewellery = () => {
  const[products,setProducts]=useState([])
  const navigate = useNavigate();
  useEffect(()=>{
    getProducts().then(setProducts);
  },[])
  const jewellery = products.filter(
    (product) => product.category === "jewellery"
  );

  return (
    <div className="container py-5">
      <h2 className="category-title text-center mb-5">
        Jewellery
      </h2>

      <div className="row g-4">
        {jewellery.map((item) => (
          <div className="col-md-4" key={item.id}>
            <div
              className="product-card"
              onClick={() => navigate("/item", { state: { item } })}
            >
              <img src={item.image} alt={item.title} />

              <div className="product-body">
                <h5>{item.title}</h5>
                <p className="desc">{item.description}</p>
                <span className="price">₹{item.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jewellery;
