import { useState } from "react";
import {Link} from 'react-router-dom'
import {Toaster,toast} from 'react-hot-toast'
import { Introanimation } from "../components/Chatanimation";
import {io} from 'socket.io-client'
import BASE_URL from "../config";



export default function SignupPage({ setauthUser,authUser,setsocket,socket,onlineusers,setonlineUsers,isSigning,setisSigning}){
const [formData,setformData] = useState({fullname:'',email:'',password:''})


const connectSocket = (userid) =>{
    if(userid){
    const newsocket =io(BASE_URL,{query:{userid:userid}})
    newsocket.connect()
    setsocket(newsocket)
    newsocket.on("getonlineusers",(userids)=>{
        setonlineUsers(userids)
    })
}else{
    console.log("error in sockets")
}
}

const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
        setisSigning(true)
        const response = await fetch(`${BASE_URL}/user/signup`,{method:'POST',credentials:"include",headers:{'Content-Type':'application/json'},body:JSON.stringify(formData)})
        const result = await response.json()
           if(result.success){
            setauthUser(result.userData)
            toast.success(result.message)
            connectSocket(result.userData._id)
           }
           else{
            toast.error(result.message)
           } 
    } 
    catch (error) {
        toast.error(error)
    }
    finally{
        setisSigning(false)
    }
    
}
    return(
    //     <div className="signupPage">

            

    //     <div className="signupBox"> 
    //     <form className="formBox" onSubmit={handleSubmit}>
    //     <h1>Create Account</h1>
    //     <div className='inputBox'>
    //     <label>Fullname : <input id="i3" type="text" onChange={(e)=>{setformData({...formData,fullname:e.target.value})}}/></label>
    //     <label>Email : <input id="i4" type="email" onChange={(e)=>{setformData({...formData,email:e.target.value})}}/></label>
    //     <label>Password : <input id="i5" type="password" onChange={(e)=>{setformData({...formData,password:e.target.value})}}/></label>
    //     </div>
    //     <button id="b" type="submit" disabled={isSigning}>create
    //     </button>
    //     <p className="downlink">already a user? click here to <Link to="/" className="link">Login</Link></p>
    //    </form>
    //    </div>  
    //    <div className="pictureBox">
    //     <div className="design"> 
    //     <Introanimation/>
    //     </div>
    //    </div>
    //    </div>
      <div className='flex flex-col md:flex-row w-screen h-screen md:py-0 py-15 bg-sky-500 md:gap-0 gap-10 '>

        <div className='items-center h-full md:h-screen md:w-1/2 w-full px-10 md:px-0 md:items-center md:justify-center flex bg-sky-500'>
       
         <form className="max-w-96 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-indigo-950"
         onSubmit={handleSubmit}
         >
            <h1 className="text-sky-400  text-2xl md:text-3xl mt-10 font-medium">Create account</h1>
            <p className="text-white text-xs mt-2">Enter your deails</p>
            <div className="flex items-center mt-6 w-full border-2 border-sky-500 h-11 rounded-full overflow-hidden pl-6 gap-1">
               
                <input onChange={(e)=>{setformData({...formData,fullname:e.target.value})}} type="text" placeholder="fullname" className="bg-indigo-950 text-white placeholder-gray-500 outline-none text-xs w-full h-full" required />                 
            </div>
            <div className="flex items-center w-full mt-4  border-2 border-sky-500 h-11 rounded-full overflow-hidden pl-6 gap-1">
               
                <input onChange={(e)=>{setformData({...formData,email:e.target.value})}} type="email" placeholder="Email id" className="bg-indigo-950 text-white placeholder-gray-500 outline-none text-xs w-full h-full" required />                 
            </div>
        
            <div className="flex items-center mt-4 w-full border-2 border-sky-500 h-11 rounded-full overflow-hidden pl-6 gap-1">
               
                <input onChange={(e)=>{setformData({...formData,password:e.target.value})}} type="password" placeholder="Password" className="bg-indigo-950 text-white placeholder-gray-500 outline-none text-xs w-full h-full" required />                 
            </div>
            
        
            <button disabled={isSigning} type="submit" className="mt-5 w-full h-11 rounded-full text-black bg-sky-600 hover:opacity-90 transition-opacity">
                Sign in
            </button>
            <p className="text-gray-500 text-sm mt-3 mb-11">Already have an account? <Link className='text-blue-400 hover:text-blue-500 transition' to="/login">Login</Link></p>
        </form>
        </div>  

         <div className='items-center h-full md:h-screen md:w-1/2 w-full px-10 md:px-0 md:items-center md:justify-center flex bg-indigo-950'>
         <Introanimation/>
        </div>

        </div>

    );
}