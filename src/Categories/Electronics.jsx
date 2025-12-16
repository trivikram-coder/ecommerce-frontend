import products from "./data/data";
import { useNavigate } from "react-router-dom";
import { Laptop } from "lucide-react";
import "../styles/category.css";

const Electronics = () => {
  const navigate = useNavigate();
  const electronics = products.filter(
    (item) => item.category === "electronics"
  );

  return (
    <div className="container py-5">
      <h2 className="category-title text-center mb-5">
        Electronics <Laptop size={26} />
      </h2>

      <div className="row g-4">
        {electronics.map((item) => (
          <div className="col-md-4" key={item.id}>
            <div
              className="product-card"
              onClick={() => navigate("/item", { state: { item } })}
            >
              <img src={item.image} alt={item.title} />

              <div className="product-body">
                <h5>{item.title}</h5>
                <p className="desc">{item.description}</p>

                <div className="price-row">
                  <del>₹{item.price}</del>
                  <span>₹{item.discountPrice}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Electronics;
