import Sidebar from "../components/Sidebar";
import Nochatselected from "../components/Nochatselected";
import Sidebartop from "../components/Sidebartop";
import { useState, useEffect } from "react";
import Chatselected from "../components/chatselected";

export default function HomePage({
  authUser,
  socket,
  setonlineUsers,
  onlineUsers,
}) {
  const [selectedUser, setselectedUser] = useState(null);
  const [isMobile, setisMobile] = useState(window.innerWidth <= 768);

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
          <div className="flex flex-col w-100 h-svh bg-zinc-900 border-r-2 border-zinc-800">
            <Sidebartop onlineUsers={onlineUsers} />
            <Sidebar
              onlineUsers={onlineUsers}
              setselectedUser={setselectedUser}
            />
          </div>
          <div className="h-fit w-full bg-zinc-900">
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
            <div
              className="flex flex-col w-100 h-screen bg-zinc-900 border-r-2 "
              style={{ width: "100%" }}
            >
              <Sidebartop onlineUsers={onlineUsers} />
              <Sidebar
                onlineUsers={onlineUsers}
                setselectedUser={setselectedUser}
              />
            </div>
          ) : (
            <div
              className="h-screen w-full bg-zinc-900"
              style={{ width: "100%" }}
            >
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
