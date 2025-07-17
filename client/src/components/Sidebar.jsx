import { useEffect, useState } from "react"

import BASE_URL from "../config"
import ScrolltoBottom from 'react-scroll-to-bottom'


export default function Sidebar({setselectedUser,onlineUsers}){
const [users,setusers] = useState([])


useEffect(()=>{
    const getusers = async()=>{
        const response = await fetch(`${BASE_URL}/message/getusers`,{method:"GET",headers:{'Content-type':'application/json'},credentials:"include"})
        const result = await response.json()
        console.log(result)
        setusers(result)
        }
        getusers()
},[])

    return(
    <div className=" overflow-y-auto ">
      <ScrolltoBottom className="flex-1 overflow-y-auto ">
            {users?.map((user)=>(
                 <button className="flex h-16 w-full items-center gap-2 border border-b-slate-600 py-5 cursor-pointer hover:bg-blue-950 transition" key={user._id} onClick={()=>{setselectedUser(user)}}>
                    <div className="relative">
                    <img className="h-12 w-12 border  rounded-full border-grey-400" src={user.profilepic || "/profile.png"} alt={user.fullname}/>
                    {onlineUsers?.includes(user._id)&&<span className="absolute top-1 right-0 h-3 w-3 border bg-lime-400 rounded-full   border-black"></span>}
                    </div>
                    <p className="text-white text-md">{user.fullname}</p>
                    
                 </button>
            ))}
        
        </ScrolltoBottom>
        </div>)
}