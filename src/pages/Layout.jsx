import React, { useEffect, useState } from 'react';
import '../styles/products.css';
import { Cuboid, Heart, Search, ShoppingBag, User, X } from 'lucide-react';
import productsDetails from '../data/Data';
import Wishlist from './Wishlist';
import Cart from './Cart';
import Account from './Account';

const Products = () => {
  const [items, setItems] = useState(productsDetails);
  const [filtered, setFiltered] = useState(productsDetails);
  const [search, setSearch] = useState('');
  const [user, setUser] = useState(null);
  const [quantities, setQuantities] = useState({}); 
  const [cartCount, setCartCount] = useState(0);
  const [wishCount, setWishCount] = useState(0);
  const [activePage, setActivePage] = useState('home');

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
  }, []);
  
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  function searchProduct(name) {
    setItems(
      name === ''
        ? filtered
        : filtered.filter((item) => item.title.toLowerCase().includes(name.toLowerCase()))
    );
  }

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
              />
              <button className="btn-del" onClick={() => { setSearch(''); setItems(filtered); }} >
                <X size={20} />
              </button>
            </div>
            <div className="search-btn" onClick={() => searchProduct(search)}>
              <Search size={20} />
            </div>
          </div>
          <div className="right">
            <div className="nav" onClick={() => setActivePage('account')}><User size={23} /> Account</div>
            <div className="nav" onClick={() => setActivePage('wishlist')}><Heart size={20} /> Wishlist({wishCount})</div>
            <div className="nav" onClick={() => setActivePage('cart')}><ShoppingBag size={20} /> Cart({cartCount})</div>
          </div>
        </div>
      </header>

      {activePage === 'home' && (
        <div className="main-body">
          <h3 className='d-flex justify-content-center mt-4 mb-4'><strong>Featured Categories</strong></h3>
          <div className='category'>
            <div className='cuboid' onClick={() => setItems(filtered.filter(item => item.category === 'electronics'))}>
              <Cuboid size={24} /> <p><strong>Electronics</strong></p>
            </div>
            <div className='cuboid' onClick={() => setItems(filtered.filter(item => ['men\'s clothing', 'women\'s clothing'].includes(item.category)))}>
              <Cuboid size={24} /> <p><strong>Clothing</strong></p>
            </div>
            <div className='cuboid' onClick={() => setItems(filtered.filter(item => item.category === 'jewelery'))}>
              <Cuboid size={24} /> <p><strong>Jewellery</strong></p>
            </div>
          </div>
        </div>
      )}
      {activePage === 'wishlist' && <Wishlist />}
      {activePage === 'cart' && <Cart />}
      {activePage === 'account' && <Account />}
    </div>
  );
};

export default Products;
