import React, { useState } from 'react'

import {Link, useNavigate} from "react-router"

const Login = () => {

    const [credentials, setCredentials] = useState({email:"",password:""
          
      })
      let navigate = useNavigate()
  
      const handleSubmit = async(e) => {
  
          e.preventDefault();
  
          console.log(JSON.stringify({ email: credentials.email, password: credentials.password}))
  
          const response = await fetch("http://localhost:3004/api/v1/users/loginuser",{
              method: 'POST',
              headers: {
                  'Content-Type':'application/json'
              },
              body:JSON.stringify({
                   email:credentials.email,
                   password:credentials.password
                  })
  
          });
  
          console.log(response);
  
          const json = await response.json()
          console.log( json);
  
  
        
  
         if(!response.ok){
  
              alert("enter valid credentials")
  
          }

          if(response.ok){

           localStorage.setItem("userEmail", credentials.email ); 
           localStorage.setItem("authToken", response.authToken );

           console.log(localStorage.getItem("authTotken"))

           navigate("/");

        }
  
      }
  
      const onChange = (e) =>{
          setCredentials({...credentials,[e.target.name]:e.target.value})
  
      }


  return (
   <>
   <div className='container'>

   <br/>

   <form onSubmit={handleSubmit}>
    
    <h1 class="h3 mb-3 fw-normal">Log in</h1>

    <div class="form-floating">
      <input type="email" class="form-control" id="floatingInput" name='email' value={credentials.email} onChange={onChange}  />
      <label htmlFor="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" name='password' value={credentials.password} onChange={onChange}/>
      <label htmlFor="floatingPassword">Password</label>
    </div>

    <br />
       <button className="btn btn-primary py-2" style={{ marginRight: "10px" }} type="submit">Log in</button>
   
       
       <Link to="/createuser" className=' btn btn-danger py-2'>I'm a new user</Link>
  </form>
     
   </div>
   
   </>
  )
}

export default Login