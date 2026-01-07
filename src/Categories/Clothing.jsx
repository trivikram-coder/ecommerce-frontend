import React, { useEffect, useState } from "react";
import { getProducts } from "./data/data";
import { Shirt } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/category.css";

const Clothing = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const clothing = products.filter(
    (product) => product.category === "clothing"
  );

  return (
    <div className="container py-5">
      <h2 className="category-title text-center mb-5">
        Fashion <Shirt size={26} />
      </h2>

      <div className="row g-4">
        {clothing.map((item) => (
          <div className="col-md-4" key={item.productId}>
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

export default Clothing;
