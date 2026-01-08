import React, { useState, useEffect } from "react";
import { Heart, Trash } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/wishlist.css";
import { toast } from "react-toastify";
import apiKey from "../service/api";

const Wishlist = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token");
  const userId = user?.id;

  const [wishlist, setWishlist] = useState([]);

  /* ---------------- FETCH WISHLIST ---------------- */
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await fetch(`${apiKey}/wishlist/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await res.json();

        if (!res.ok) {
          toast.error(result.message || "Failed to fetch wishlist");
          return;
        }

        const data = result.data || [];

        // 1️⃣ set state
        setWishlist(data);

        // 2️⃣ save wishlist objects
        localStorage.setItem(
          `wishlist${userId}`,
          JSON.stringify(data)
        );

        // 3️⃣ save wishlistIds (productIds)
        const wishlistIds = data.map((item) => item.productId);
        localStorage.setItem(
          `wishlistIds${userId}`,
          JSON.stringify(wishlistIds)
        );

        // 4️⃣ save rowMap (productId → wishlistRowId)
        const rowMap = {};
        data.forEach((item) => {
          rowMap[item.productId] = item.id;
        });
        localStorage.setItem(
          `wishlistRowMap${userId}`,
          JSON.stringify(rowMap)
        );
      } catch (error) {
        console.error(error);
        toast.error("Server error");
      }
    };

    if (token && userId) fetchWishlist();
  }, [token, userId]);

  /* ---------------- REMOVE FROM WISHLIST ---------------- */
  const removeFromWishlist = async (productId) => {
    try {
      // 1️⃣ get rowMap
      const rowMap =
        JSON.parse(localStorage.getItem(`wishlistRowMap${userId}`)) || {};

      const wishlistRowId = rowMap[productId];

      if (!wishlistRowId) {
        toast.error("Wishlist row id not found");
        return;
      }

      // 2️⃣ delete from backend
      const res = await fetch(
        `${apiKey}/wishlist/delete/${wishlistRowId}`,
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

      // 3️⃣ update wishlist state
      const updatedWishlist = wishlist.filter(
        (item) => item.productId !== productId
      );
      setWishlist(updatedWishlist);

      // 4️⃣ update wishlist storage
      localStorage.setItem(
        `wishlist${userId}`,
        JSON.stringify(updatedWishlist)
      );

      // 5️⃣ update wishlistIds
      const updatedWishlistIds = updatedWishlist.map(
        (item) => item.productId
      );
      localStorage.setItem(
        `wishlistIds${userId}`,
        JSON.stringify(updatedWishlistIds)
      );

      // 6️⃣ update rowMap
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
