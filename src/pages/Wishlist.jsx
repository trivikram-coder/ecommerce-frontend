import React, { useState, useEffect } from "react";
import { Heart, Trash } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/wishlist.css";
import { toast } from "react-toastify";
import apiKey from "../service/api";
const Wishlist = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token=localStorage.getItem("token")
  const userId = user?.id;

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetch(`${apiKey}/wishlist/get`,{
      headers:{
        "Authorization": `Bearer ${token}`
      }
    })
    .then(res=>res.json())
    .then(data=>setWishlist(data))
 
  }, [userId]);

  const removeFromWishlist = async(id) => {
    const res=await fetch(`${apiKey}/wishlist/delete/${id}`,{
      method:"DELETE"
    })
    let response;
   try{
    response=await res.json();
   }catch(e){
    toast.error("Server error")
    return;
   }
   if(res.status===200){
    toast.success(response)
   }
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    localStorage.setItem(`wishlist${userId}`,JSON.stringify(updatedWishlist))
    setWishlist(updatedWishlist);
    window.dispatchEvent(new Event("storage"))
    const updatedWishlistIds=updatedWishlist.map(item=>item.id)
    localStorage.setItem(
      "wishlistIds",
      JSON.stringify(updatedWishlistIds)
    )
      
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
