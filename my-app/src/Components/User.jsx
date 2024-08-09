import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const User = () => {

  const navigate = useNavigate();

  const [ username , setusername] = useState("");

  const handlechange = (e) => {
    setusername( { ...username , [e.target.name] : e.target.value } );
  }
 
  return (
    <>
     
    <div className="contai" style={{display : "flex" ,  justifyContent:"center" , height : "100vh" ,  alignItems:'center' }}>
      <div style={{width : "500px", height : "250px" , border :"2px solid grey" , borderRadius :"20px" ,  padding : "20px"}} >
    <div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Your Name </label>
  <input type="text" name='username' onChange={handlechange}  class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
</div>
<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Room name</label>
  <input type="text" name='roomname' class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
</div>
<div class="mb-3">
  <button onClick={() => navigate('/Chat' , { state :  username })} className='btn btn-primary'>Submit</button>
</div>

</div>
</div>
    </>
  )
}
