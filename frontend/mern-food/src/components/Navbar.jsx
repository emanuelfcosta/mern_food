import React, { useState } from 'react'

import {Link, useNavigate} from "react-router"
import Modal from './Modal';



import Cart from './Cart';

import { useCart } from './ContextReducer';
 



const Navbar = () => {

  let data = useCart();

  const[cartView, setCartView] = useState(false)

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("authToken");
    navigate("/login")


  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand fs-1 fst-italic" to="#">Food</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav me-auto mb-2">
       
{/* 
        {(localStorage.getItem("authToken"))?

          <li className="nav-item">
          <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Orders</Link>
          </li>
        
      : ""} */}

      </ul>
      {(!localStorage.getItem("authToken"))?
        <div className="d-flex">

        
          <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
        
          <Link className="btn bg-white text-success mx-1" to="/createuser">SignUp</Link>
        
        </div>
        :
         <div>

          <div className='btn bg-white text-success mx-2' onClick={()=>{setCartView(true)}}>
            My Cart {" "} { data.length}
          </div>
          {cartView? <Modal onClose={()=>setCartView(false)}> <Cart/> </Modal>:null}

          <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>
            Logout
          </div>

         </div>
        
        }



    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar