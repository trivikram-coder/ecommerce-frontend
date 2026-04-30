import React, { useState, useEffect } from "react";
import { Heart, Trash } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/wishlist.css";
import { toast } from "react-toastify";
import { apiUrl } from "../service/api";

const Wishlist = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token");
  const userId = user?._id;

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH WISHLIST ---------------- */
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await fetch(`${apiUrl}/wishlist`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await res.json();
        console.log("Wishlist items", result);

        if (!res.ok) {
          toast.error(result.message || "Failed to fetch wishlist");
          return;
        }

        const data = result.data || [];

        // ✅ set state
        setWishlist(data);

        // ✅ save wishlist objects
        localStorage.setItem(
          `wishlist${userId}`,
          JSON.stringify(data)
        );

        // ✅ save wishlistIds
        const wishlistIds = data.map((item) => item.productId);
        localStorage.setItem(
          `wishlistIds${userId}`,
          JSON.stringify(wishlistIds)
        );

        // ✅ save rowMap
        const rowMap = {};
        data.forEach((item) => {
          rowMap[item.productId] = item._id;
        });
        localStorage.setItem(
          `wishlistRowMap${userId}`,
          JSON.stringify(rowMap)
        );
      } catch (error) {
        console.error(error);
        toast.error("Server error");
      } finally {
        // ✅ always stop loading
        setLoading(false);
      }
    };

    if (token && userId) {
      fetchWishlist();
    } else {
      setLoading(false);
    }
  }, [token, userId]);

  /* ---------------- REMOVE FROM WISHLIST ---------------- */
  const removeFromWishlist = async (productId) => {
    try {
      const rowMap =
        JSON.parse(localStorage.getItem(`wishlistRowMap${userId}`)) || {};

      const wishlistRowId = rowMap[productId];

      if (!wishlistRowId) {
        toast.error("Wishlist row id not found");
        return;
      }

      const res = await fetch(
        `${apiUrl}/wishlist/${wishlistRowId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const response = await res.json();

      if (!res.ok) {
        toast.error(response.message || "Failed to remove item");
        return;
      }

      toast.success(response.message || "Item removed");

      // ✅ update state
      const updatedWishlist = wishlist.filter(
        (item) => item.productId !== productId
      );
      setWishlist(updatedWishlist);

      // ✅ update localStorage
      localStorage.setItem(
        `wishlist${userId}`,
        JSON.stringify(updatedWishlist)
      );

      const updatedWishlistIds = updatedWishlist.map(
        (item) => item.productId
      );
      localStorage.setItem(
        `wishlistIds${userId}`,
        JSON.stringify(updatedWishlistIds)
      );

      delete rowMap[productId];
      localStorage.setItem(
        `wishlistRowMap${userId}`,
        JSON.stringify(rowMap)
      );

      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-5">
        My Wishlist <Heart size={26} />
      </h2>

      {/* ✅ 1. Loading State */}
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary"></div>
          <p className="mt-2">Loading wishlist...</p>
        </div>
      ) : wishlist.length === 0 ? (
        /* ✅ 2. Empty State */
        <div className="text-center">
          <h4 className="text-muted">Your wishlist is empty</h4>
          <Link to="/products" className="btn btn-primary mt-3">
            Browse Products
          </Link>
        </div>
      ) : (
        /* ✅ 3. Data State */
        <div className="row g-4">
          {wishlist.map((item) => (
            <div className="col-md-3" key={item._id}>
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
                      onClick={() =>
                        removeFromWishlist(item.productId)
                      }
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