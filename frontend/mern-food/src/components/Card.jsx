import React from 'react'

import { useDispatchCart, useCart } from './ContextReducer'



const Card = (props) => {


 let dispatch = useDispatchCart();
  let data = useCart();

  const handleAddToCart = async () => {

    let food = []
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;

        break;
      }
    }

  
    await  dispatch({type:"ADD", id:props.foodItem._id, name:props.foodItem.name,price:props.foodItem.price})
    console.log(data)
    return
  }


  return (
    <>
        <div className="d-flex justify-content-center">
        <div className="card mt-3" style={{"width": "13rem","maxHeight":"360px"}}>
           
            <img src={props.foodItem.image } className="card-img-top" alt="..." style={{width: "150px", height: "150px", objectFit: "cover"}}/>
            <div className="card-body">
                <h5 className="card-title">{props.foodItem.name}</h5>
                
                 <div className="container w-100"> 
               
                  <div className='d-inline h-100 fs-5'>
                   $ {props.foodItem.price}
                  </div>
                  <div>
             
                  <button className={`btn btn-success `} onClick={handleAddToCart}>Add to cart</button>
                  </div>

                 

                 </div> 
                
                
            </div>

           
        </div>

      </div>
    </>
  )
}

export default Card