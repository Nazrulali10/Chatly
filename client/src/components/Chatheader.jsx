import { ChevronLeft } from "lucide-react";

export default function Chatheader({selectedUser,setselectedUser,onlineUsers}){
    return(
        <div className="flex h-18 w-full border-b-grey-500 flex px-5 items-center gap-2">
            <button className="text-white cursor-pointer" onClick={()=>{setselectedUser(null)}}><ChevronLeft/></button>
            <img className="h-12 w-12 border rounded-full border-grey-400 object-cover" src={selectedUser.profilepic || "/profile.png"} alt={selectedUser.fullname}/>
            <div className="headername">
            <p className="text-sm text-white">{selectedUser.fullname}</p>
            <p className={onlineUsers?.includes(selectedUser._id)?"text-lime-400 text-xs":"text-gray-400 text-xs"}>{onlineUsers?.includes(selectedUser._id)?"online":"offline"}</p>
            </div>
        </div>
    );
}