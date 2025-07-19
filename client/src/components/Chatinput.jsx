import { Image, Send, X } from "lucide-react";
import { useState } from "react";
import BASE_URL from "../config";

export default function Chatinput({selectedUser}){
const [text,settext] = useState("")
const [imagepreview,setimagepreview] = useState(null)
const[messageSending,setmessageSending] = useState(false)
const handleMessageSubmit = async(e)=>{
    e.preventDefault()
    try {
      setmessageSending(true)
      if(!text.trim()&&!imagepreview) return;
    const response = await fetch(`${BASE_URL}/message/send/${selectedUser._id}`,{method:"POST",credentials:"include",headers:{'Content-type':'application/json'},body:JSON.stringify({text:text.trim(),image:imagepreview})})
    settext("")
    setimagepreview(null)
    const result =  await response.json()
    console.log(result)
    } catch (error) {
      console.log(error)
    }
    finally{
      setmessageSending(false)
    }
    
}
const handleImageChange = (e)=>{
    const file = e.target.files[0]
    const reader = new FileReader();
    reader.onloadend = () => {
      setimagepreview(reader.result);
    };
    reader.readAsDataURL(file);
  };


    return(
      <div className="flex flex-col w-full">


      {imagepreview && <div className="relative mb-3 pl-2 md:pl-30">
        <img className="w-25 h-25 border-gray-500  rounded-lg" src={imagepreview} alt="preview"/>
        <button className="absolute top-0 w-6 h-6 cursor-pointer" onClick={()=>{setimagepreview(null)}}><X className="text-white" /></button>
        </div>}


        <div className="flex">
            <form className="flex justify-center items-center gap-1 w-full pb-2" onSubmit={handleMessageSubmit}>
                <input type="text" placeholder="enter a message..." value={text} onChange={(e)=>{settext(e.target.value)}} className="border-2 border-sky-500 rounded-full py-3 px-6 md:w-4xl w-xs outline-none text-sm caret-white text-white hover:border-sky-400"/>
              <label htmlFor="inputchat" className="cursor-pointer"><Image className="w-6 h-6 text-sky-500 hover:text-sky-600  transition" size={18}/><input type="file" accept="image/*" id="inputchat" onChange={handleImageChange} className="hidden"/></label>  
              <button type="submit" className="flex w-10 h-10 cursor-pointer bg-sky-500 rounded-full items-center justify-center hover:bg-sky-600 transition  transition" disabled={messageSending}><Send size={19}/></button>
            </form>
        </div>

        </div>
    );
}