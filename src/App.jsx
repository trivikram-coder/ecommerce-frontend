
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Products from './pages/Products';
import Account from './pages/Account';
import Item from './pages/Item';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import Cart from './pages/Cart';
import OrderPlaced from './pages/OrderPlaced';
import Layout from './pages/Layout';
import {ToastContainer} from 'react-toastify'
import Electronics from './Categories/Electronics';
import Clothing from './Categories/Clothing';
import Jewellery from './Categories/Jewellery'
import Orders from './pages/Orders';
const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer position='top-center' autoClose={3000}/>
      <Routes>
      <Route element={<Layout />}>
        <Route path="/products" element={<Products />} />
        <Route path='/orders' element={<Orders/>}/>
        <Route path="/item" element={<Item />} />
        <Route path="/account" element={<Account />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-placed" element={<OrderPlaced />} />
        <Route path='/electronics' element={<Electronics/>}/>
        <Route path='/clothing' element={<Clothing/>}/>
        <Route path='/jewellery' element={<Jewellery/>}/>
      </Route>
      <Route path="/" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
