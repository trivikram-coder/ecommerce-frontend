import React, { useState, useEffect } from "react";
import { Heart, Trash } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Wishlist = () => {
  const navigate=useNavigate();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center fw-bold mb-4">
        Your Wishlist <Heart size={28} />
      </h2>

      {wishlist.length > 0 ? (
        <div className="row">
          {wishlist.map((item) => (
            <div className="col-md-3" key={item.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={item.image}
                  className="card-img-top p-3"
                  alt={item.title}
                  style={{ height: "250px", objectFit: "contain" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text text-success fw-bold">
                    <del className="text-danger">{item.price}</del>
                    <span> ${item.discountPrice}</span>
                  </p>

                  <div className="d-flex justify-content-between mt-auto">
                    <button className="btn btn-primary" onClick={()=>navigate("/checkout",{state:{item:item}})}>
                      Buy Now
                    </button>

                    <button
                      className="btn btn-outline-danger"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      <Trash size={18} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-5">
          <h4>Your Wishlist is Empty!</h4>
          <Link to="/product" className="btn btn-primary mt-3">
            Browse Products
          </Link>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
