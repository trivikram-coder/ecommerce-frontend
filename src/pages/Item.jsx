import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Minus, Plus, ShoppingCart, ArrowRight, Heart } from "lucide-react";
import "../styles/items.css";
import { toast } from "react-toastify";
import apiKey from "../service/api";
const Item = () => {
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const user = storedUser;
  const userId=user.id;
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state?.item;
  const token = localStorage.getItem("token") || "";
  const[wishlist,setWishlist]=useState([])
  useEffect(()=>{
    const data=JSON.parse(localStorage.getItem(`wishlist${user.id}`)||"[]")
    setWishlist(data);
  },[item])
  const basePrice =
    item?.discountPrice ?? item?.offerPrice ?? item?.price ?? 0;

  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(basePrice);
  const [msg, setMsg] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  // ❤️ Wishlist
  const [isWishlisted, setIsWishlisted] = useState(false);

  const WISHLIST_IDS_KEY = `wishlistIds${userId}`;

  const getWishlistIds = () =>
    JSON.parse(localStorage.getItem(WISHLIST_IDS_KEY)) || [];

  const setWishlistIds = (ids) =>
    localStorage.setItem(WISHLIST_IDS_KEY, JSON.stringify(ids));

  // ---------------- PRICE CALC ----------------
  useEffect(() => {
    setTotalPrice(quantity * basePrice);
    setMsg(quantity <= 0 ? "Quantity must be at least 1." : "");
  }, [quantity, basePrice]);

  // ---------------- SYNC WISHLIST FROM BACKEND ----------------
  useEffect(() => {
    if (!user || !item) return;

    const fetchWishlist = async () => {
      try {
        const res = await fetch(
          `${apiKey}/wishlist/get`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        const ids = data.map((p) => p.productId);

        setWishlistIds(ids);
        setIsWishlisted(ids.includes(item.productId));
      } catch (err) {
        console.error("Wishlist fetch error:", err);
      }
    };

    fetchWishlist();
  }, [user, item, token]);

  if (!item)
    return <h2 className="text-center mt-5">Item not found!</h2>;

  // ---------------- QUANTITY ----------------
  const handleIncreaseQuantity = () => setQuantity((prev) => prev + 1);

  const handleDecreaseQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
    else setMsg("Quantity cannot be less than 1");
  };

  // ---------------- WISHLIST TOGGLE (BACKEND) ----------------
const toggleWishlist = async () => {
  if (!user) {
    toast.error("Please sign in to use wishlist");
    navigate("/");
    return;
  }

  try {
    let wishlistIds = getWishlistIds();
    let updatedWishlist = [...wishlist];

    if (isWishlisted) {
      // ❌ REMOVE
      await fetch(`${apiKey}/wishlist/delete/${item.productId}`, {

        method: "DELETE",
        headers:{
          "Authorization":`Bearer ${token}`
        }
      });

      wishlistIds = wishlistIds.filter((id) => id !== item.productId);
      updatedWishlist = updatedWishlist.filter(
        (p) => p.productId !== item.productId
      );

      setIsWishlisted(false);
      toast.info("Removed from wishlist");
    } else {
      // ❤️ ADD
      const itemData = { ...item, email: user.email };

      await fetch(`${apiKey}/wishlist/add`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemData),
      });

      wishlistIds.push(item.productId);
      updatedWishlist.push(item);

      setIsWishlisted(true);
      toast.success("Added to wishlist ❤️");
    }

    // ✅ UPDATE STATE + LOCALSTORAGE TOGETHER
    setWishlist(updatedWishlist);
    localStorage.setItem(
      `wishlist${user.id}`,
      JSON.stringify(updatedWishlist)
    );

    localStorage.setItem(`wishlistIds${userId}`, JSON.stringify(wishlistIds));
    setWishlistIds(wishlistIds);

    window.dispatchEvent(new Event("storage"));
  } catch (err) {
    console.error("Wishlist error:", err);
    toast.error("Wishlist service error");
  }
};



  // ---------------- ADD TO CART ----------------
  const addToCart = async (product) => {
    if (!user) {
      toast.error("Please sign in to add items to the cart.");
      navigate("/signin");
      return;
    }

    const cartKey = `cart${user.id}`;
    const existingCart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const cartData = {
      ...product,
     
    };

    try {
      setIsAdding(true);

      const response = await fetch(
        `${apiKey}/cart/add`,
        {
          method: "POST",
          headers: {
            "Authorization":`Bearer ${token}`,
            "Content-Type": "application/json",
            
          },
          body: JSON.stringify(cartData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to add to cart");
        return;
      }

      const index = existingCart.findIndex((p) => p.productId === product.productId);

      if (index !== -1) existingCart[index].quantity += quantity;
      else existingCart.push(cartData);

      localStorage.setItem(cartKey, JSON.stringify(existingCart));
      window.dispatchEvent(new Event("storage"));

      toast.success(`${product.title} added to cart!`);
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Error while connecting to service");
    } finally {
      setIsAdding(false);
    }
  };

  const originalPrice = item.price;
  const discountPercentage =
    basePrice < originalPrice
      ? Math.round(((originalPrice - basePrice) / originalPrice) * 100)
      : null;

  return (
    <div className="container item-page-container py-5">
      <div className="row item-detail-card shadow-lg p-lg-5 p-4">
        {/* IMAGE */}
        <div className="col-lg-6 d-flex justify-content-center">
          <img src={item.image} className="img-fluid item-img" alt={item.title} />
        </div>

        {/* DETAILS */}
        <div className="col-lg-6 mt-4 mt-lg-0">
          <div className="d-flex justify-content-between">
            <h1 className="item-title">{item.title}</h1>
            <button className="btn p-0" onClick={toggleWishlist}>
              <Heart
                size={28}
                fill={isWishlisted ? "red" : "none"}
                color={isWishlisted ? "red" : "gray"}
              />
            </button>
          </div>

          <p className="text-muted">{item.category}</p>
          <p>{item.description}</p>

          <h3>₹{totalPrice.toFixed(2)}</h3>

          {discountPercentage && (
            <p className="text-success fw-bold">{discountPercentage}% OFF</p>
          )}

          <div className="d-flex align-items-center mb-3">
            <button
              className="btn btn-outline-secondary"
              onClick={handleDecreaseQuantity}
              disabled={quantity <= 1}
            >
              <Minus size={18} />
            </button>

            <input
              type="number"
              className="form-control text-center mx-2"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              style={{ width: "70px" }}
            />

            <button
              className="btn btn-outline-secondary"
              onClick={handleIncreaseQuantity}
            >
              <Plus size={18} />
            </button>
          </div>

          {msg && <p className="text-danger">{msg}</p>}

          <div className="d-flex gap-3">
            <button
              className="btn btn-warning w-50"
              onClick={() => addToCart(item)}
              disabled={isAdding}
            >
              <ShoppingCart size={18} className="me-2" />
              {isAdding ? "Adding..." : "Add To Cart"}
            </button>

            <Link
              to="/checkout"
              state={{
                item: { ...item, quantity, discountPrice: basePrice },
              }}
              className="btn btn-primary w-50"
            >
              Buy Now <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
