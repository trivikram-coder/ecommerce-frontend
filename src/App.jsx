import React from 'react'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Products from './pages/Product'
import Account from './pages/Account'
import Item from './pages/Item'
import Wishlist from './pages/Wishlist'
import Checkout from './pages/Checkout'
import Cart from './pages/Cart'
import { BrowserRouter,Routes,Route,Link } from 'react-router-dom'
import Nav from './pages/Nav'
import OrderPlaced from './pages/OrderPlaced'
const App = () => {
  return (
    <BrowserRouter>
   
    <Routes>
      <Route path='/' element={<Signin/>}/>
      
  <Route path='/signup' element={<Signup/>}/>
  <Route path='/product' element={<Products/>}/>
  <Route path='/item' element={<Item/>}/>
  <Route path='/account' element={<Account/>}/>
  <Route path="/wishlist" element={<Wishlist />} />
<Route path='/checkout' element={<Checkout/>}/>
  <Route path='/cart' element={<Cart/>}/>
  <Route path='/order-placed' element={<OrderPlaced/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
