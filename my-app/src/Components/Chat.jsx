import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './Chat.css'
import io from 'socket.io-client'

export const Chat = () => {
  
  const {state} = useLocation();
  
  const [single_chat_data , setsingle_chat_data] = useState({});

  const [new_clientname , setnew_clientname] = useState([]); 

  const [show_message , setshow_message] = useState([]);

  const [new_message , set_new_message] = useState("");

  const handlesinglechat = (user_Id) => {
    console.log("songle ca ")
       setsingle_chat_data(user_Id)
      // const socket = io(`http://localhost:5000`);
      
      // socket.emit("single_chat_message" , {
      //     chat_socketid : user_Id
      // })
     
  }


  const handleusername = () => {
    const socket = io(`http://localhost:5000`)

    socket.on("connect" , () => {
        // console.log(socket.id)
       
    })

    socket.emit("username" , {
       username : state.username
    })

    socket.on("join_new_user" , (new_client_name) => {
         setnew_clientname( (previous) =>  [...previous , new_client_name] )  
    })

    
     
  }

  const handlechangemessage = (e) => {
      set_new_message( {...new_message , [e.target.name] : e.target.value})
  }

  const handlesend = (e) => {
    e.preventDefault();
    const socket = io(`http://localhost:5000`);

    console.log("send")

    socket.timeout(3000).emit("single_chat_message", {
        chat_socketid : single_chat_data.new_user_socket_ID,
        chat_username : single_chat_data.new_user,
        chat_message : new_message
    })

  }

  useEffect(() => {
    const socket = io(`http://localhost:5000`);

    socket.on("chat_message" , (chat_details) => {
      console.log(chat_details)
       setshow_message( (previous) =>  [...previous, chat_details.chat_all_data] )
  })

   return () => {
     socket.disconnect()
   }

  },[show_message])

  useEffect(() => {
    const socket = io(`http://localhost:5000`)

    handleusername()

    return () => {
      socket.disconnect()
    }
   
  },[])



  return (
    <>
        <div className='main_div ' style={{ display : "flex" , height : "100vh" , margin : "20px" ,  border : "2px solid #e7e7e7" }}>

        {/* bootstrap div start */}
     <div class="d-flex flex-column align-items-stretch flex-shrink-0 " style={{ width: "380px" , backgroundColor : 'white' }}>
    <div  class="d-flex align-items-center flex-shrink-0 p-3 link-body-emphasis text-decoration-none border-bottom shadow p-3 mb-2  rounded  ">
    <span class="fs-5 fw-semibold d-flex  align-items-center"><img width={"50px"} height={"50px"} src='https://pluspng.com/img-png/png-user-icon-icons-logos-emojis-users-2400.png' style={{ marginLeft : "20px" ,  marginRight : "30px"}} /><span style={{fontSize : "30px" }}>{state.username}</span></span>
    </div>

     {new_clientname.map(( e , index) => {
          return (
            <>
             <div onClick={() => handlesinglechat(e)}  class="list-group-item list-group-item py-3 lh-sm chats shadow p-3 mb-3  rounded" aria-current="true" id={index}>
        <div  class="d-flex w-100 align-items-center ">
           <img src='https://th.bing.com/th/id/R.8e2c571ff125b3531705198a15d3103c?rik=gzhbzBpXBa%2bxMA&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-big-image-png-2240.png&ehk=VeWsrun%2fvDy5QDv2Z6Xm8XnIMXyeaz2fhR3AgxlvxAc%3d&risl=&pid=ImgRaw&r=0' 
            width={"40px"} height={"40px"} />
            <div className='mx-3' style={{fontSize : "25px"}}>{e.new_user}</div>
        </div>
      </div>
            </>
          )
     })}
      
    </div>
 
  {/* bootstrap div end */}
  <div style={{ marginLeft : "10px" , height : "100vh", borderRight : "2px solid #e7e7e7"}}></div>

  <div className='all_chats' style={{ width : "1200px"}}>
     <div className='allchat'> 
     {/* online start */}
     <div className='d-flex align-items-center shadow p-3  bg-body-tertiary rounded  ' style={{ margin :"10px" , padding :"10px"}}>
     <img width={"50px"} height={"50px"} src='https://pluspng.com/img-png/png-user-icon-icons-logos-emojis-users-2400.png' style={{ marginLeft : "20px" ,  marginRight : "30px"}} />
       <span style={{fontSize : "28px"}}>{single_chat_data.new_user}<small style={{fontSize : "12px"}}> id : {single_chat_data.new_user_socket_ID}</small></span>
       </div>
       {/* online end */}
      {/* message start  */}
      {show_message.map((e , index) => {
        // console.log(e)
          return (
            <>
                <div className='left my-1'>
     <div className='chat_box1 shadow p-3  bg-body-tertiary rounded ' style={{width :"fit-content" , borderRadius : "20px"}}>
          
            <div className='mx-3' style={{fontSize : "20px" , margin :"10px"}}>{e.chat_username} : <span style={{fontSize : "15px"}}>{e.chat_message.message}</span></div>
     </div>
     </div>
            </>
          )
      })}
   
     {/* message  */}
     {/* <div className='right my-1'>
     <div className='chat_box2 shadow p-3  bg-body-tertiary rounded ' style={{width :"fit-content" , borderRadius : "20px"}}>
          
            <div className='mx-3' style={{fontSize : "20px" , margin :"10px"}}>User Name : <span style={{fontSize : "15px"}}>EELO SUZAIR </span></div>
     </div>
     </div> */}
     {/* message end  */}
     </div>
     <form onSubmit={handlesend}>
     <div className='d-flex input_box'>
      <input class="form-control" name='message' onChange={handlechangemessage} type="text" />
      <span><button className='btn btn-success' type='submit'>Send</button></span>
      </div>
      </form>

  </div>


  </div>
    </>
  )
}
