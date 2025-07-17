// import NavigationBar from "../components/NavigationBar";
// import Sidebar from "../components/Sidebar";
// import Nochatselected from "../components/Nochatselected";
// import Sidebartop from "../components/Sidebartop";
// import { useState,useEffect } from "react";
// import Chatselected from "../components/chatselected";

// export default function HomePage({authUser, setauthUser,socket,setsocket,setonlineUsers,onlineUsers,isLoggingOut,setisLoggingOut}){
// const [selectedUser,setselectedUser] = useState(null)
// useEffect(()=>{
//     if(authUser._id){
//         socket.on("getonlineusers",(userids)=>{
//             setonlineUsers(userids)
//         })
//     }
//     },[onlineUsers,setonlineUsers,authUser?._id,socket])


//     return(<>
//     <div className="pagehead">
//     <NavigationBar socket={socket} setsocket={setsocket} setauthUser={setauthUser} isLoggingOut={isLoggingOut} setisLoggingOut={setisLoggingOut}/>
//     </div>
//     <div className="pagebody">
//         <div className="homeleft">
            
//             <Sidebartop onlineUsers={onlineUsers}/>
            
//             <Sidebar onlineUsers={onlineUsers} setselectedUser={setselectedUser}/>
//         </div>
//         <div className="homeright">
//             {selectedUser?<Chatselected socket={socket} onlineUsers={onlineUsers} authUser={authUser} setselectedUser={setselectedUser}selectedUser={selectedUser}/>:<Nochatselected/>}
//         </div>
//     </div>
//     </>
//     );
// }

import Sidebar from "../components/Sidebar";
import Nochatselected from "../components/Nochatselected";
import Sidebartop from "../components/Sidebartop";
import { useState, useEffect } from "react";
import Chatselected from "../components/chatselected";

export default function HomePage({
  authUser,
  setauthUser,
  socket,
  setsocket,
  setonlineUsers,
  onlineUsers,
  isLoggingOut,
  setisLoggingOut
}) {
  const [selectedUser, setselectedUser] = useState(null);
  const [isMobile, setisMobile] = useState(window.innerWidth <= 768);

  // Listen for window resize to toggle mobile state
  useEffect(() => {
    const handleResize = () => {
      setisMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (authUser?._id) {
      socket.on("getonlineusers", (userids) => {
        setonlineUsers(userids);
      });
    }
  }, [onlineUsers, setonlineUsers, authUser?._id, socket]);

  return (
    
      
      <div className="flex flex-row">
        {/* Desktop view*/}
        {!isMobile ? (
          <>
            <div className="flex flex-col w-100 h-screen bg-indigo-950 border-r-2 border-gray-600">
              <Sidebartop onlineUsers={onlineUsers} />
              <Sidebar onlineUsers={onlineUsers} setselectedUser={setselectedUser} />
            </div>
            <div className="h-screen w-full bg-indigo-950">
              {selectedUser ? (
                <Chatselected
                  socket={socket}
                  onlineUsers={onlineUsers}
                  authUser={authUser}
                  setselectedUser={setselectedUser}
                  selectedUser={selectedUser}
                />
              ) : (
                <Nochatselected />
              )}
            </div>
          </>
        ) : (
          // Mobile view: Show either chat list or chat window
          <>
            {!selectedUser ? (
              <div className="flex flex-col w-100 h-screen bg-indigo-950 border-r-2 border-gray-600" style={{ width: "100%" }}>
                <Sidebartop onlineUsers={onlineUsers} />
                <Sidebar onlineUsers={onlineUsers} setselectedUser={setselectedUser} />
              </div>
            ) : (
              <div className="h-screen w-full bg-indigo-950" style={{ width: "100%" }}>
                <Chatselected
                  socket={socket}
                  onlineUsers={onlineUsers}
                  authUser={authUser}
                  setselectedUser={setselectedUser}
                  selectedUser={selectedUser}
                />
              </div>
            )}
          </>
        )}
      </div>
    
  );
}
