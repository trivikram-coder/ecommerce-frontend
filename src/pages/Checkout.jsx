import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/checkout.css";
import { apiUrl } from "../service/api";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token") || "";
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

  const itemBuy = location.state?.items ?? location.state?.item;

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: storedUser?.userName || "",
    email: storedUser?.email || "",
    address: "",
    city: "",
    zip: "",
  });

  /* ================= CALCULATE TOTAL ================= */
  const calculateTotal = (items) =>
    items.reduce((acc, item) => {
      const price =
        item.discountPrice ?? item.offerPrice ?? item.price ?? 0;
      return acc + price * (item.quantity || 1);
    }, 0);

  /* ================= INIT CART ================= */
  useEffect(() => {
    if (itemBuy && Array.isArray(itemBuy)) {
      setCart(itemBuy);
      setTotal(calculateTotal(itemBuy));
    } else if (itemBuy) {
      const singleItem = {
        ...itemBuy,
        quantity: itemBuy.quantity || 1,
      };
      setCart([singleItem]);
      setTotal(calculateTotal([singleItem]));
    } else {
      fetch(`${apiUrl}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          const items = data?.items || [];
          setCart(items);
          setTotal(calculateTotal(items));

          if (items.length === 0) {
            toast.info("Your cart is empty");
            navigate("/products");
          }
        })
        .catch(() => toast.error("Failed to load cart"));
    }
  }, [itemBuy, token, navigate]);

  /* ================= QUANTITY UPDATE ================= */
  const updateQuantity = (id, type) => {
    const updatedCart = cart.map((item) => {
      const itemId = item._id || item.cartId;

      if (itemId === id) {
        let qty = item.quantity || 1;
        qty = type === "inc" ? qty + 1 : Math.max(1, qty - 1);
        return { ...item, quantity: qty };
      }
      return item;
    });

    setCart(updatedCart);
    setTotal(calculateTotal(updatedCart));
  };

  /* ================= FORM HANDLER ================= */
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  /* ================= PAYMENT FLOW ================= */
const handleSubmit = async (e) => {
  e.preventDefault();

  if (cart.length === 0) {
    toast.error("Cart is empty");
    return;
  }

  setLoading(true);

  try {
    /* ================= 1️⃣ CREATE ORDER ================= */
    const paymentRes = await fetch(`${apiUrl}/payment/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization":`Bearer ${token}`
      },
      body: JSON.stringify({
        userId: storedUser._id,
        amount: total,
      }),
    });

    const paymentData = await paymentRes.json();

    if (!paymentRes.ok) {
      toast.error(paymentData.message || "Failed to initiate payment");
      setLoading(false);
      return;
    }

    const { razorpayOrder } = paymentData;

    /* ================= 2️⃣ OPEN RAZORPAY ================= */
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      order_id: razorpayOrder.id,
      name: "VK Store",
      description: "Order Payment",
      prefill: {
        name: storedUser.userName,
        contact: storedUser.mobileNumber,
        email: storedUser.email,
      },
      theme: {
        color: "#3399cc",
      },

      /* ================= SUCCESS HANDLER ================= */
      handler: async function (response) {
        try {
          /* 3️⃣ VERIFY PAYMENT */
          const verifyRes = await fetch(
            `${apiUrl}/payment/verify-payment`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "authorization":`Bearer ${token}`
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            }
          );

          const verifyData = await verifyRes.json();

          if (!verifyRes.ok) {
            toast.error(
              verifyData.message || "Payment verification failed"
            );
            setLoading(false);
            return;
          }

          /* 4️⃣ CREATE FINAL ORDER */
          const orderDate = new Date();
          const expectedDate = new Date();
          expectedDate.setDate(orderDate.getDate() + 5);

          const formattedItems = cart.map((item) => ({
            productId: item.productId,
            title: item.title,
            image: item.image,
            category: item.category,
            price: item.discountPrice ?? item.price,
            quantity: item.quantity,
          }));

          const finalOrder = {
            name: formData.name,
            email: formData.email,
            address: formData.address,
            city: formData.city,
            zip: formData.zip,
            items: formattedItems,
            totalAmount: total,
            orderDate: orderDate.toISOString(),
            expectedDelivery: expectedDate.toISOString(),
            status: "PLACED",
            payment: {
              method: "RAZORPAY",
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
            },
          };

          const orderRes = await fetch(`${apiUrl}/orders`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(finalOrder),
          });

          const orderData = await orderRes.json();

          if (!orderRes.ok) {
            toast.error(orderData.message || "Order creation failed");
            setLoading(false);
            return;
          }

          /* ================= SUCCESS ================= */
          localStorage.removeItem("cart");
          localStorage.removeItem(`cartIds_${storedUser.id}`);
          window.dispatchEvent(new Event("storage"));

          toast.success("Payment successful & Order placed!");
          navigate("/order-placed");

          setLoading(false);

        } catch (err) {
          console.error(err);
          toast.error("Payment verification failed");
          setLoading(false);
        }
      },

      /* ================= CANCEL HANDLER ================= */
      modal: {
        ondismiss: function () {
          toast.error("Payment cancelled");
          setLoading(false);
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (error) {
    console.error(error);
    toast.error("Payment failed");
    setLoading(false);
  }
};


  /* ================= UI ================= */
  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 fw-bold checkout-title">
        Checkout
      </h2>

      <div className="row">
        {/* LEFT SIDE */}
        <div className="col-lg-7">
          <div className="card p-4 shadow-lg">
            <h4 className="text-primary mb-4">Billing Details</h4>

            <form onSubmit={handleSubmit}>
              <input
                className="form-control mb-3"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
              />

              <input
                className="form-control mb-3"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />

              <input
                className="form-control mb-3"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                required
              />

              <input
                className="form-control mb-3"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                required
              />

              <input
                className="form-control mb-4"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                placeholder="ZIP Code"
                required
              />

              <button
                className="btn btn-success w-100"
                disabled={loading}
              >
                {loading
                  ? "Processing..."
                  : `Pay Securely ₹${total.toFixed(2)}`}
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-lg-5">
          <div className="card p-4 shadow-lg">
            <h4 className="text-primary mb-3">Order Summary</h4>

            {cart.map((item) => {
              const price =
                item.discountPrice ?? item.offerPrice ?? item.price ?? 0;
              const id = item._id || item.cartId;

              return (
                <div
                  key={id}
                  className="d-flex justify-content-between align-items-center mb-3"
                >
                  <div>
                    <strong>{item.title}</strong>
                    <div className="quantity-controls mt-1">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => updateQuantity(id, "dec")}
                      >
                        −
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => updateQuantity(id, "inc")}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <strong>
                    ₹{(price * item.quantity).toFixed(2)}
                  </strong>
                </div>
              );
            })}

            <hr />
            <h5 className="d-flex justify-content-between">
              <span>Total</span>
              <span className="text-danger">
                ₹{total.toFixed(2)}
              </span>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
