import React, { useEffect, useState } from 'react';
import '../styles/products.css';
import { Cuboid, Heart, Search, ShoppingBag, User, X } from 'lucide-react';
import productsDetails from '../data/data';
import { Link, useNavigate } from 'react-router-dom';

const Products = () => {
  const [items, setItems] = useState(productsDetails);
  const [filtered, setFiltered] = useState(productsDetails);
  const [search, setSearch] = useState('');
  const[user,setUser]=useState(null)
  const navigate = useNavigate();
useEffect(()=>{
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (storedUser) {
      setUser(storedUser); // Set user state
  } 
},[])

  function searchProduct(name) {
    if (name === '') {
      setItems(filtered);
      return;
    }
    const filter = filtered.filter(item => item.title.toLowerCase().includes(name.toLowerCase()));
    setItems(filter);
  }

  function categoryFilter(e) {
    if (["DIV", "P", "CUBOID", "STRONG"].includes(e.target.tagName)) {
      const categoryMap = {
        'Electronics': 'electronics',
        'Clothing': ["men's clothing", "women's clothing"],
        'Jewellery': 'jewelery'
      };
      
      const category = categoryMap[e.target.innerText];
      if (category) {
        const filter = filtered.filter(item => Array.isArray(category) ? category.includes(item.category) : item.category === category);
        setItems(filter);
      }
    }
  }

function setQuantity(e, id) {
    setItems(prevItems => prevItems.map(item => (item.id === id ? { ...item, quantity: parseInt(e.target.value) } : item)));
  }
  async function account() {
    try {
      const res = await fetch("https://backend-server-538r.onrender.com/user/details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rollNo: user?.rollNo }),
      });
  
      if (res.ok) {
        const data = await res.json(); // Convert response to JSON
        console.log("User Data:", data); // Check the data in console
        if(user){
          return navigate("/account", { state: { userData: data } });
        }
        navigate("/")
 // Navigate to Account page with data
      } else {
        console.error("Failed to fetch user details");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }
  
// async function addtoCart(data){
  
//   const itemData={
//     title:data.title,
//     category:data.category,
//     description:data.description,
//     image:data.image,
//     price:`$${data.price}`,
//     discountPercentage:data.discountPercentage,
//     offerPrice:`$${data.offerPrice}`,
//     reviews:data.rating.rate
//   }
  
//   const res=await fetch("http://localhost:3000/cart/add",{
//     method:"POST",
//     headers:{
//       "content-type":"application/json"
//     },
//     body:JSON.stringify(itemData)
//   })
//   if(res.status===201){
//     localStorage.setItem("Token",res.text())
//   }

// }

//Getting data
// useEffect(()=>{
//   fetch("http://localhost:3000/cart/get")
//   .then(res=>res.json())
//   .then(data=>setItems(data))
// },[])
  return (
    <div className="main-container">
      <header>
        <div className="header bg-dark">
          <div className="left">
          <h4 className="vk-store">VK Store <ShoppingBag size={24} /></h4>

          </div>
          <div className="middle">
            <div className="search-box-wrapper">
              <input 
                type="text" 
                value={search}
                placeholder="Search"
                className="search-box" 
                onChange={(e) => {
                  setSearch(e.target.value);
                  searchProduct(e.target.value);
                }} 
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === "Backspace") {
                    searchProduct(search);
                  }
                }}
              />
              <button className="btn-del" onClick={() => {
                setSearch('');
                setItems(filtered);
              }}>
                <X size={20} />
              </button>
            </div>
            <div className='search-btn' onClick={() => searchProduct(search)}>
              <Search size={20} />
            </div>
          </div>
          <div className="right">
            <div className="nav" onClick={account}> <User size={23} /> Account</div>
            <div className="nav"> <Heart size={20} /> Wishlist</div>
            <div className="nav"> <ShoppingBag size={20} /> Cart</div>
          </div>
        </div>
      </header>

      <div className="main-body">
      <div className="head bg-primary py-3">
  <h2 className="text-center text-light fw-bold">
    Welcome to VK Store <ShoppingBag size={28} />
  </h2>
</div>

        
        <h3 className='d-flex justify-content-center mt-4 mb-4'><strong>Featured Categories</strong></h3>
        <div className='category' onClick={categoryFilter}>
          <div className='cuboid'><Cuboid size={24}/> <p><strong>Electronics</strong></p></div>
          <div className='cuboid'><Cuboid size={24}/> <p><strong>Clothing</strong></p></div>
          <div className='cuboid'><Cuboid size={24}/> <p><strong>Jewellery</strong></p></div>
        </div>

        <div className="container mt-4 mb-4">
          <div className="row g-3">  
            <h3 className='d-flex justify-content-center mt-5 mb-5'><strong>Popular Products</strong></h3>
            {items.length > 0 ? items.map((item) => (
              <div className="col-md-3" key={item.id}>
                <div className="card h-100 d-flex flex-column">
                  <div className='image-container'>
                    <Link to='/item' state={{ item }}>
                      <img src={item.image} className="product-image" alt={item.title} style={{width:'100%', height:'300px', padding:'26px'}} />
                    </Link>
                  </div>
                  <div className="card-body d-flex flex-column flex-grow-1">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text"><del className='p-1 text-danger'>{item.price}</del><span className='text-success'> ${item.offerPrice}({item.discountPercentage} off)</span></p>
                    <select className="border rounded-md p-2 w-full" onChange={(e) => setQuantity(e, item.id)}>
                      {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num}</option>)}
                    </select>
                    <button  className="btn btn-primary mt-auto" >Add to Cart</button>
                  </div>
                </div>
              </div>
            )) : <p>No products found</p>}
          </div>
        </div>
      </div>

      <footer>
        <div className="footer-box">
          <div className="foot bg-dark text-light d-flex justify-content-center align-items-center flex-column p-3">
            <p>&copy; 2025 VK Store. All Rights Reserved.</p>
            <p>Your one-stop destination for quality products at the best prices.</p>
            <p>Follow us on <a href="#" className="text-light mx-2">Facebook</a> |  <a href="#" className="text-light mx-2">Instagram</a> |  <a href="#" className="text-light mx-2">Twitter</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Products;
