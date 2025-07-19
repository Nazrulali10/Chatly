import { useEffect, useState } from "react";
import Chatheader from "./Chatheader";
import Chatinput from "./Chatinput";
import ScrolltoBottom from 'react-scroll-to-bottom'
import BASE_URL from "../config";


export default function Chatselected({selectedUser,setselectedUser,authUser,onlineUsers,socket}){
const [messages,setmessages] = useState([])    

    useEffect(()=>{
    const getmessages = async()=>{
        const response = await fetch(`${BASE_URL}/message/${selectedUser._id}`,{method:"GET",headers:{'Content-type':'application/json'},credentials:"include"})
        const result = await response.json()
        setmessages(result)
    }
    const subscribeToMessages =()=>{
        socket.on("newMessages",(newMessages)=>{
            setmessages((prevMessages) => [...prevMessages, newMessages])
        })}
    getmessages()
    subscribeToMessages()
    return()=>{
        socket.off("newMessages")
    }
  
    },[selectedUser._id,messages,socket])

    return(

    <div className="flex flex-col h-[680px] w-full">
        <Chatheader onlineUsers={onlineUsers} selectedUser={selectedUser} setselectedUser={setselectedUser}/>
        {/* <div className=" relative h-screen w-full px-15"> */}
            <ScrolltoBottom className="flex-1 md:px-8 md:py-3 px-4 mt-3 overflow-y-auto scrollbar-hide ">
           
                {messages.map((message)=>(
                    <div className={message.senderid===authUser._id?"flex justify-end gap-2 ":"flex justify-start gap-2"} key={message._id}>
                        
                        <img className="w-9 md:w-12 h-9 cmd:h-12 border rounded-full" src={message.senderid===authUser._id?authUser.profilepic||'/profile.png':selectedUser.profilepic||'/profile.png'} alt="imm"/>
                      
                      
                        <div className="relative flex flex-col p-2 md:p-4 bg-sky-500 border rounded-xl md:max-w-md max-w-xs mb-4 gap-1 ">

                            <div className="text-white font-bold text-xs md:text-sm mb-1"><p>{message.senderid===authUser._id?authUser.fullname:selectedUser.fullname}</p></div>
                           
                            <div className=" flex">
                           {(message.image)&&<img className="max-h-45 max-w-35 border border-gray-400 rounded-lg mb-2" src={message.image} alt="myu"/>}
                            </div>

                            <div className=" flex text-sm text-black justify-center">
                           {(message.text)&&<p>{message.text}</p>}
                            </div>

                            <div className=" flex text-xs self-end">
                           <p> {new Date(message.timestamp).getHours()+":"+new Date(message.timestamp).getMinutes()}</p>
                           </div>

                        </div>


                        
                    </div>
                ))}
                
        
        </ScrolltoBottom>
        {/* </div> */}
        <Chatinput selectedUser={selectedUser}/>
    </div>

    );
}