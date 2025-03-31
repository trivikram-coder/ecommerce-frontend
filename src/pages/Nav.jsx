import React from 'react'
import Signin from './Signin'
import Signup from './Signup'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Products from './Product'
import Item from './Item'
import Account from './Account'
const Nav = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route  path='/' element={<Signin/>}/>
  <Route path='/signup' element={<Signup/>}/>
  <Route path='/product' element={<Products/>}/>
  <Route path='/item' element={<Item/>}/>
  <Route path='/account' element={<Account/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default Nav
