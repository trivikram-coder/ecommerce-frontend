import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, ShoppingCart, ArrowRight, Heart } from 'lucide-react';
import '../styles/items.css';
import { toast } from 'react-toastify';

const Item = () => {
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const user = storedUser;
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state?.item;
  const token = localStorage.getItem("token") || "";

  const basePrice =
    item?.discountPrice ?? item?.offerPrice ?? item?.price ?? 0;

  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(basePrice);
  const [msg, setMsg] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  // ❤️ Wishlist state
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    setTotalPrice(quantity * basePrice);
    setMsg(quantity <= 0 ? "Quantity must be at least 1." : "");
  }, [quantity, basePrice]);

  // ❤️ Sync wishlist on load
  useEffect(() => {
    if (!user || !item) return;

    const wishlistKey = `wishlist${user.id}`;
    const wishlist =
      JSON.parse(localStorage.getItem(wishlistKey)) || [];

    const exists = wishlist.some((p) => p.id === item.id);
    setIsWishlisted(exists);
  }, [user, item]);

  if (!item) return <h2 className="text-center mt-5">Item not found!</h2>;

  const handleIncreaseQuantity = () => setQuantity((prev) => prev + 1);

  const handleDecreaseQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
    else setMsg("Quantity cannot be less than 1");
  };

  // ❤️ TOGGLE WISHLIST
  const toggleWishlist = () => {
    if (!user) {
      toast.error("Please sign in to use wishlist");
      navigate("/");
      return;
    }

    const wishlistKey = `wishlist${user.id}`;
    const wishlist =
      JSON.parse(localStorage.getItem(wishlistKey)) || [];

    const index = wishlist.findIndex((p) => p.id === item.id);

    if (index !== -1) {
      wishlist.splice(index, 1);
      setIsWishlisted(false);
      toast.info("Removed from wishlist");
    } else {
      wishlist.push({ ...item });
      setIsWishlisted(true);
      toast.success("Added to wishlist ❤️");
    }

    localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
    window.dispatchEvent(new Event("storage"));
  };

  // -------- ADD TO CART (BACKEND + LOCALSTORAGE) --------
  const addToCart = async (product) => {
    if (!user) {
      toast.error("Please sign in to add items to the cart.");
      navigate("/signin");
      return;
    }

    const cartKey = `cart_${user.id}`;
    const existingCart =
      JSON.parse(localStorage.getItem(cartKey)) || [];

    const cartData = {
      ...product,
      email: user.email,
      quantity: quantity,
    };

    try {
      setIsAdding(true);

      const response = await fetch(
        "https://spring-server-0m1e.onrender.com/cart/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(cartData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to add to cart");
        return;
      }

      const itemIndex = existingCart.findIndex(
        (p) => p.id === product.id
      );

      if (itemIndex !== -1) {
        existingCart[itemIndex].quantity += quantity;
      } else {
        existingCart.push(cartData);
      }

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
        <div className="col-lg-6 col-md-12 d-flex justify-content-center align-items-center">
          <img
            src={item.image}
            className="img-fluid item-img"
            alt={item.title}
          />
        </div>

        {/* DETAILS */}
        <div className="col-lg-6 col-md-12 mt-4 mt-lg-0">
          {/* TITLE + HEART */}
          <div className="d-flex justify-content-between align-items-start">
            <h1 className="item-title">{item.title}</h1>
            <button
              className="btn p-0 border-0 bg-transparent"
              onClick={toggleWishlist}
            >
              <Heart
                size={28}
                fill={isWishlisted ? "red" : "none"}
                color={isWishlisted ? "red" : "gray"}
              />
            </button>
          </div>

          <p className="item-category text-muted mb-3">{item.category}</p>

          <div className="mb-4">
            <p>{item.description}</p>
          </div>

          {/* PRICE */}
          <div className="mb-4 border-top pt-3">
            <div className="d-flex align-items-center mb-2">
              <h3 className="mb-0 me-3">₹{totalPrice.toFixed(2)}</h3>

              {basePrice < originalPrice && (
                <>
                  <del className="text-muted me-3">
                    ₹{originalPrice.toFixed(2)}
                  </del>
                  <span className="badge bg-success">
                    {discountPercentage}% OFF
                  </span>
                </>
              )}
            </div>

            <p className="small text-danger fw-bold">
              Total price for {quantity} item{quantity > 1 ? "s" : ""}
            </p>
          </div>

          {/* QUANTITY */}
          <div className="d-flex align-items-center mb-4">
            <label className="me-3 fw-bold">Quantity:</label>
            <div className="input-group item-quantity-input">
              <button
                className="btn btn-outline-secondary"
                onClick={handleDecreaseQuantity}
                disabled={quantity <= 1}
              >
                <Minus size={20} />
              </button>

              <input
                type="number"
                className="form-control text-center"
                value={quantity}
                min="1"
                onChange={(e) =>
                  setQuantity(parseInt(e.target.value) || 1)
                }
              />

              <button
                className="btn btn-outline-secondary"
                onClick={handleIncreaseQuantity}
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          {msg && <p className="text-danger fw-bold small">{msg}</p>}

          {/* ACTION BUTTONS */}
          <div className="d-flex gap-3 mt-4">
            <button
              className="btn btn-warning w-50"
              onClick={() => addToCart(item)}
              disabled={isAdding}
            >
              <ShoppingCart size={20} className="me-2" />
              {isAdding ? "Adding..." : "Add To Cart"}
            </button>

            <Link
              to="/checkout"
              state={{
                item: {
                  ...item,
                  quantity,
                  discountPrice: basePrice,
                },
              }}
              className="btn btn-primary w-50"
            >
              Buy now <ArrowRight size={20} className="ms-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
