import { useState } from "react";
import {Link} from 'react-router-dom'
import {toast} from 'react-hot-toast'
import {io} from 'socket.io-client'
import BASE_URL from "../config";



export default function SignupPage({ setauthUser,setsocket,setonlineUsers,isSigning,setisSigning}){
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
   
      <div className='flex flex-col md:flex-row w-screen h-screen md:py-0 pt-15  md:gap-0 gap-10 bg-zinc-900'>

        <div className='items-center h-full md:h-screen  w-full px-10 md:px-0 md:items-center md:justify-center flex '>
       
         <form className="max-w-96 w-full text-center  rounded-2xl px-8 bg-zinc-800"
         onSubmit={handleSubmit}
         >
            <h1 className="text-amber-500  text-2xl md:text-3xl mt-10 font-medium">Create account</h1>
            <p className="text-white text-xs mt-2">Enter your deails</p>
            <div className="flex items-center mt-6 w-full border border-amber-500 h-11 rounded-full overflow-hidden pl-6 gap-1">
               
                <input onChange={(e)=>{setformData({...formData,fullname:e.target.value})}} type="text" placeholder="fullname" className="bg-zinc-800 text-white placeholder-gray-500 outline-none text-xs w-full h-full" required />                 
            </div>
            <div className="flex items-center w-full mt-4  border border-amber-500 h-11 rounded-full overflow-hidden pl-6 gap-1">
               
                <input onChange={(e)=>{setformData({...formData,email:e.target.value})}} type="email" placeholder="Email id" className="bg-zinc-800 text-white placeholder-gray-500 outline-none text-xs w-full h-full" required />                 
            </div>
        
            <div className="flex items-center mt-4 w-full border border-amber-500 h-11 rounded-full overflow-hidden pl-6 gap-1">
               
                <input onChange={(e)=>{setformData({...formData,password:e.target.value})}} type="password" placeholder="Password" className="bg-zinc-800 text-white placeholder-gray-500 outline-none text-xs w-full h-full" required />                 
            </div>
            
        
            <button disabled={isSigning} type="submit" className="mt-5 w-full h-11 rounded-full text-black bg-amber-500 hover:opacity-90 transition-opacity">
                Sign in
            </button>
            <p className="text-gray-500 text-sm mt-3 mb-11">Already have an account? <Link className='text-amber-400 hover:text-amber-500 transition' to="/login">Login</Link></p>
        </form>
        </div>  
        <div className="items-center justify-center flex flex-col bg-zinc-800 w-full p-6">
            <h1 className="text-3xl md:text-5xl text-white animate-pulse duration-200 wrap-break-word">Start <br/>  <span className=" bg-clip-text text-transparent bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500">conversations</span> <br/>that matter.</h1>
        </div>

        

        </div>

    );
}