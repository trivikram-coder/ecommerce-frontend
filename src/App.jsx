import React from 'react'
import Signin from './pages/signin'
import Signup from './pages/signup'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route  path='/' element={<Signin/>}/>
  <Route path='/signup' element={<Signup/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
