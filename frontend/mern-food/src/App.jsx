import { useState } from 'react'


import {BrowserRouter,
  Routes,
  Route
 
}  from "react-router";

import CartProvider from './components/ContextReducer'
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import MyOrder from './components/MyOrder';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <CartProvider>  
    <BrowserRouter>
      <div>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/createuser" element={<Signup/>} />
        <Route path="/myOrder" element={<MyOrder/>} />
       

        </Routes>
      </div>
     </BrowserRouter>

     </CartProvider>
    </>
  )
}

export default App
