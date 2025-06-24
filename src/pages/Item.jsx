import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Minus, Plus } from 'lucide-react';
import '../styles/items.css';
import { toast } from 'react-toastify';

const Item = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state?.item;

  const [quan, setQuan] = useState(item?.quantity || 1);
  const [price, setPrice] = useState(item?.discountPrice ?? item?.offerPrice ?? item?.price ?? 0);
  const [msg, setMsg] = useState("");

  if (!item) return <h2 className="text-center mt-5">Item not found!</h2>;

  const handleIncreaseQuantity = () => {
    const newQuan = quan + 1;
    setQuan(newQuan);
    setPrice(newQuan * (item.discountPrice ?? item.offerPrice ?? item.price));
    setMsg("");
  };

  const handleDecreaseQuantity = () => {
    if (quan > 1) {
      const newQuan = quan - 1;
      setQuan(newQuan);
      setPrice(newQuan * (item.discountPrice ?? item.offerPrice ?? item.price));
      setMsg("");
    } else {
      setMsg("Quantity should not be less than 1");
    }
  };

  const addToCart = async (product) => {
    try {
      console.log(product)
      await fetch("http://localhost:9000/cart/add", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then((data) => toast.success(data.message));
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <>
    

      <div className="item-container">
        <div className="item-img1">
          <img src={item.image} className="item-img" alt={item.title} style={{ width: '90%', height: '300px', padding: '26px' }} />
        </div>

        <div className="item-det">
          <h4>{item.title}</h4>
          <p>{item.description.toUpperCase()}</p>
          <p>Category: {item.category}</p>
          <p>
            Quantity:
            <Minus size={22} className='minus' onClick={handleDecreaseQuantity} />
            {quan}
            <Plus size={22} className='plus' onClick={handleIncreaseQuantity} />
          </p>
          {msg && <p className="text-danger">{msg}</p>}
          <h3>Price: <del>₹{item.price}</del> ₹{price.toFixed(2)}</h3>

          <Link
            to='/checkout'
            state={{
              item: {
                ...item,
                quantity: quan,
                discountPrice: item.discountPrice ?? item.offerPrice ?? item.price,
              }
            }}
            className='btn btn-primary buy-now fw-bold px-4 py-2 shadow-sm rounded-pill ms-2'
          >
            Buy now
          </Link>

          <button
            className="btn btn-outline-dark fw-bold px-4 py-2 shadow-sm rounded-pill ms-2"
            onClick={() => addToCart(item)}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default Item;
