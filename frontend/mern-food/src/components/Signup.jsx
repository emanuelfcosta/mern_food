import React, { useState } from 'react'

import {Link} from "react-router"

const Signup = () => {

    const [credentials, setCredentials] = useState({name:"",email:"",password:""
       
    })

    const handleSubmit = async(e) => {

        e.preventDefault();

        console.log(JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password}))

        const response = await fetch("http://localhost:3004/api/v1/users",{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:credentials.name,
                 email:credentials.email,
                 password:credentials.password
                })

        });

        console.log(response);

        const json = await response.json()
        console.log( json);

        window.location.href = "/login";


       

       if(!response.ok){

            alert("enter valid credentials")

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
    
    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

    <div className="form-floating">
      <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange}/>
      <label htmlFor="name">Name</label>
    </div>

    <div className="form-floating">
      <input type="email" className="form-control" id="floatingInput" name='email' value={credentials.email} onChange={onChange}/>
      <label htmlFor="floatingInput">Email address</label>
    </div>
    
    <div className="form-floating">
      <input type="password" className="form-control" id="floatingPassword" name='password' value={credentials.password} onChange={onChange}/>
      <label htmlFor="floatingPassword">Password</label>
    </div>

    <br />
    <button className="btn btn-primary py-2" style={{ marginRight: "10px" }} type="submit">Sign in</button>

    
    <Link to="/login" className=' btn btn-danger py-2 '>Alread a user</Link>
    
  </form>

</div>
   
   
   </>
  )
}

export default Signup