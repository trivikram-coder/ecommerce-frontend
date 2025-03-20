import React from 'react'
import Signin from './pages/signin'
import Signup from './pages/signup'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Products from './pages/products'
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route  path='/' element={<Signin/>}/>
  <Route path='/signup' element={<Signup/>}/>
  <Route path='/product' element={<Products/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
