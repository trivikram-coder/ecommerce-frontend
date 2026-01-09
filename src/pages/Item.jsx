import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Minus, Plus, ShoppingCart, ArrowRight, Heart, ArrowUp } from "lucide-react";
import "../styles/items.css";
import { toast } from "react-toastify";
import {apiUrl} from "../service/api";

const Item = () => {
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const user = storedUser;
  const userId = user?.id;
  const token = localStorage.getItem("token") || "";
  const CART_IDS_KEY = `cartIds${userId}`;
  const[isInCart,setIsInCart]=useState(false)
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state?.item;

  const productId = item?.productId ?? item?.id;

  const [wishlist, setWishlist] = useState([]);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const basePrice =
    item?.discountPrice ?? item?.offerPrice ?? item?.price ?? 0;
  const [totalPrice, setTotalPrice] = useState(basePrice);
  const [msg, setMsg] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  /* ---------------- LOAD LOCAL WISHLIST ---------------- */
  useEffect(() => {
    if (!userId) return;
    const cartIds =
  JSON.parse(localStorage.getItem(CART_IDS_KEY)) || [];

setIsInCart(cartIds.includes(productId));

    const storedWishlist =
      JSON.parse(localStorage.getItem(`wishlist${userId}`)) || [];
    setWishlist(storedWishlist);

    const wishlistIds =
      JSON.parse(localStorage.getItem(`wishlistIds${userId}`)) || [];
    setIsWishlisted(wishlistIds.includes(productId));
  }, [userId, productId]);

  /* ---------------- PRICE CALC ---------------- */
  useEffect(() => {
    setTotalPrice(quantity * basePrice);
    setMsg(quantity <= 0 ? "Quantity must be at least 1." : "");
  }, [quantity, basePrice]);

  if (!item) {
    return <h2 className="text-center mt-5">Item not found!</h2>;
  }

  /* ---------------- QUANTITY ---------------- */
  const handleIncreaseQuantity = () => setQuantity((prev) => prev + 1);
  const handleDecreaseQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
    else setMsg("Quantity cannot be less than 1");
  };

  /* ---------------- WISHLIST TOGGLE ---------------- */
  const toggleWishlist = async () => {
    if (!user || !token) {
      toast.error("Please sign in to use wishlist");
      navigate("/signin");
      return;
    }

    const wishlistIds =
      JSON.parse(localStorage.getItem(`wishlistIds${userId}`)) || [];
    const rowMap =
      JSON.parse(localStorage.getItem(`wishlistRowMap${userId}`)) || {};
    let updatedWishlist = [...wishlist];

    try {
      if (isWishlisted) {
        /* -------- REMOVE -------- */
        const wishlistRowId = rowMap[productId];
        if (!wishlistRowId) {
          toast.error("Wishlist row id not found");
          return;
        }

        await fetch(`${apiUrl}/wishlist/delete/${wishlistRowId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const updatedIds = wishlistIds.filter((id) => id !== productId);
        delete rowMap[productId];
        updatedWishlist = updatedWishlist.filter(
          (p) => p.productId !== productId
        );

        localStorage.setItem(
          `wishlistIds${userId}`,
          JSON.stringify(updatedIds)
        );
        localStorage.setItem(
          `wishlistRowMap${userId}`,
          JSON.stringify(rowMap)
        );
        localStorage.setItem(
          `wishlist${userId}`,
          JSON.stringify(updatedWishlist)
        );

        setWishlist(updatedWishlist);
        setIsWishlisted(false);
        toast.info("Removed from wishlist");
      } else {
        /* -------- ADD -------- */
        const res = await fetch(`${apiUrl}/wishlist/add`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...item, productId }),
        });

        const response = await res.json();
        if (!res.ok) {
          toast.error(response.message || "Failed to add");
          return;
        }

        wishlistIds.push(productId);
        rowMap[productId] = response.data.id;
        updatedWishlist.push({ ...item, productId });

        localStorage.setItem(
          `wishlistIds${userId}`,
          JSON.stringify(wishlistIds)
        );
        localStorage.setItem(
          `wishlistRowMap${userId}`,
          JSON.stringify(rowMap)
        );
        localStorage.setItem(
          `wishlist${userId}`,
          JSON.stringify(updatedWishlist)
        );

        setWishlist(updatedWishlist);
        setIsWishlisted(true);
        toast.success("Added to wishlist ❤️");
      }

      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.error("Wishlist error:", err);
      toast.error("Wishlist service error");
    }
  };

  /* ---------------- ADD TO CART ---------------- */
  const addToCart = async (product) => {
    if (!user) {
      toast.error("Please sign in to add items to the cart.");
      navigate("/signin");
      return;
    }

    const cartKey = `cart${userId}`;
    const existingCart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const index = existingCart.findIndex(
      (p) => p.productId === productId
    );

    if (index !== -1) {
      existingCart[index].quantity += quantity;
    } else {
      existingCart.push({ ...product, productId, quantity });
    }

    localStorage.setItem(cartKey, JSON.stringify(existingCart));

    try {
      setIsAdding(true);

      const response = await fetch(`${apiUrl}/cart/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...product, productId, quantity }),
      });

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Failed to add to cart");
        return;
      }
      const cartIds =
  JSON.parse(localStorage.getItem(CART_IDS_KEY)) || [];

if (!cartIds.includes(productId)) {
  cartIds.push(productId);
  localStorage.setItem(CART_IDS_KEY, JSON.stringify(cartIds));
}

setIsInCart(true);

      toast.success(`${product.title} added to cart`);
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      console.error(error);
      toast.error("Error while connecting to service");
    } finally {
      setIsAdding(false);
    }
  };

  const discountPercentage =
    basePrice < item.price
      ? Math.round(((item.price - basePrice) / item.price) * 100)
      : null;

  return (
    <div className="container item-page-container py-5">
      <div className="row item-detail-card shadow-lg p-lg-5 p-4">
        <div className="col-lg-6 d-flex justify-content-center">
          <img
            src={item.image}
            className="img-fluid item-img"
            alt={item.title}
          />
        </div>

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
            <p className="text-success fw-bold">
              {discountPercentage}% OFF
            </p>
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
              onChange={(e) =>
                setQuantity(parseInt(e.target.value) || 1)
              }
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
            {
              isInCart?(
                <button className="btn btn-success btn-sm" onClick={()=>navigate("/cart")}>
                  <ArrowUp size={18} className="me-2"/>
                  Go to Cart
                </button>
              ):(
                  <button
              className="btn btn-warning w-50"
              onClick={() => addToCart(item)}
              disabled={isAdding}
            >
              <ShoppingCart size={18} className="me-2" />
              {isAdding ? "Adding..." : "Add To Cart"}
            </button>
              )
            }
            

            <Link
              to="/checkout"
              state={{ item: { ...item, quantity, discountPrice: basePrice } }}
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
