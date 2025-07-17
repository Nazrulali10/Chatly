import {  useState } from 'react';
import {Link} from 'react-router-dom'
import {Toaster,toast} from 'react-hot-toast'
import { Introanimation } from '../components/Chatanimation';
import {io} from 'socket.io-client'
import BASE_URL from '../config';
import connectSocket from '../connectsocket';


export default function LoginPage({setauthUser,authUser,setsocket,socket,onlineUsers,setonlineUsers,setisloggingin,isLogginigin}){
    const [formData,setformData] = useState({email:'',password:''})
 
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            setisloggingin(true)
            const response = await fetch(`${BASE_URL}/user/login`,{method:'POST',credentials:'include',headers:{'Content-type':'application/json'},body:JSON.stringify(formData)})
            const result = await response.json()
            if(result.success===false){
                toast.error(result.message,{duration:4000})
            }
            else{
                toast.success(result.message,{duration:5000})
                setTimeout(() => {
                    setauthUser(result.userData)
                    connectSocket(result.userData._id,setsocket, socket, setonlineUsers)
                }, 2000);
            }
        } 
        catch (error) {
            console.log(error)

        }
        finally{
            setisloggingin(false)
        }
    }
    return(

        <div className='flex flex-col md:flex-row w-screen h-screen md:py-0 py-15 bg-sky-500 md:gap-0 gap-10 '>

        <div className='items-center h-full md:h-screen md:w-1/2 w-full px-10 md:px-0 md:items-center md:justify-center flex bg-sky-500'>
       
         <form className="max-w-96 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-indigo-950"
         onSubmit={handleSubmit}
         >
            <h1 className="text-sky-400 text-3xl mt-10 font-medium">Login</h1>
            <p className="text-white text-xs mt-2">Please sign in to continue</p>
            <div className="flex items-center w-full mt-10  border-2 border-sky-500 h-12 rounded-full overflow-hidden pl-6 gap-2">
               
                <input onChange={(e)=>{setformData({...formData,email:e.target.value})}} type="email" placeholder="Email id" className="bg-indigo-950 text-white placeholder-gray-500 outline-none text-sm w-full h-full" required />                 
            </div>
        
            <div className="flex items-center mt-4 w-full border-2 border-sky-500 h-12 rounded-full overflow-hidden pl-6 gap-2">
               
                <input onChange={(e)=>{setformData({...formData,password:e.target.value})}} type="password" placeholder="Password" className="bg-indigo-950 text-white placeholder-gray-500 outline-none text-sm w-full h-full" required />                 
            </div>
            <div className="mt-5 text-left text-white">
                <a className="text-sm" href="#">Forgot password?</a>
            </div>
        
            <button disabled={isLogginigin} type="submit" className="mt-2 w-full h-11 rounded-full text-black bg-sky-600 hover:opacity-90 transition-opacity">
                Login
            </button>
            <p className="text-gray-500 text-sm mt-3 mb-11">Don’t have an account? <Link className='text-blue-500' to="/signup">Sign up</Link></p>
        </form>
        </div>  

         <div className='items-center h-full md:h-screen md:w-1/2 w-full px-10 md:px-0 md:items-center md:justify-center flex bg-indigo-950'>
         <Introanimation/>
        </div>

        </div>
    );
}
