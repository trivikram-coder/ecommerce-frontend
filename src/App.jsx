import React from 'react'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Products from './pages/Product'
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
