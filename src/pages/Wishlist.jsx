import React, { useState, useEffect } from "react";
import { Heart, Trash } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/wishlist.css";

const Wishlist = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const userId = user?.id;

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(
      localStorage.getItem(`wishlist${userId}`) || "[]"
    );
    setWishlist(storedWishlist);
  }, [userId]);

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem(
      `wishlist${userId}`,
      JSON.stringify(updatedWishlist)
    );
    const updatedWishlistIds=updatedWishlist.map(item=>item.id)
    localStorage.setItem(
      "wishlistIds",
      JSON.stringify(updatedWishlistIds)
    )
      window.dispatchEvent(new Event("storage"))
  };

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-5">
        My Wishlist <Heart size={26} />
      </h2>

      {wishlist.length === 0 ? (
        <div className="text-center">
          <h4 className="text-muted">Your wishlist is empty</h4>
          <Link to="/products" className="btn btn-primary mt-3">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {wishlist.map((item) => (
            <div className="col-md-3" key={item.id}>
              <div className="wishlist-card">
                <img
                  src={item.image}
                  alt={item.title}
                  className="wishlist-img"
                />

                <div className="wishlist-body">
                  <h6>{item.title}</h6>

                  <div className="price">
                    <del>₹{item.price}</del>
                    <span>₹{item.discountPrice}</span>
                  </div>

                  <div className="wishlist-actions">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() =>
                        navigate("/checkout", { state: { item } })
                      }
                    >
                      Buy Now
                    </button>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
