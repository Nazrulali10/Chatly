import { useEffect, useState } from "react";
import Chatheader from "./Chatheader";
import Chatinput from "./Chatinput";
import ScrollToBottom from "react-scroll-to-bottom"; // ✅ fixed name casing
import BASE_URL from "../config";
import Chatanimation from "./Chatanimation";

export default function Chatselected({
  selectedUser,
  setselectedUser,
  authUser,
  onlineUsers,
  socket,
}) {
  const [messages, setmessages] = useState([]);

    useEffect(() => {
    const getmessages = async () => {
      const response = await fetch(`${BASE_URL}/message/${selectedUser._id}`, {
        method: "GET",
        headers: { "Content-type": "application/json" },
        credentials: "include",
      });
      const result = await response.json();
      setmessages(result);
    };
    const subscribeToMessages = () => {
      socket.on("newMessages", (newMessages) => {
        setmessages((prevMessages) => [...prevMessages, newMessages]);
      });
    };
    getmessages();
    subscribeToMessages();
    return () => {
      socket.off("newMessages");
    };
  }, [selectedUser._id, messages, socket]);

  return (
    // ✅ Changed: use h-screen + overflow-hidden to prevent full-page scrolling
    <div className="flex flex-col h-dvh w-full overflow-hidden" >
      
      {/* ✅ Header stays fixed at the top */}
      <Chatheader
        onlineUsers={onlineUsers}
        selectedUser={selectedUser}
        setselectedUser={setselectedUser}
      />

      {/* ✅ Changed: only messages area should scroll */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 md:py-3 ">
        {messages.length > 0 ? (
          <ScrollToBottom className="h-full"> {/* ✅ Scrolls only inside this area */}
            {messages.map((message) => (
              <div
                className={
                  message.senderid === authUser._id
                    ? "flex justify-end gap-2"
                    : "flex justify-start gap-2"
                }
                key={message._id}
              >
                <img
                  className="w-9 md:w-12 h-9 md:h-12 border rounded-full object-cover"
                  src={
                    message.senderid === authUser._id
                      ? authUser.profilepic || "/profile.png"
                      : selectedUser.profilepic || "/profile.png"
                  }
                  alt="profile"
                />

                <div className="relative flex flex-col p-2 md:p-4 bg-amber-500 border rounded-2xl opacity-90 md:max-w-md max-w-xs mb-4 gap-1">
                  <div className="text-white font-semibold text-xs md:text-xs mb-1">
                    <p>
                      {message.senderid === authUser._id
                        ? authUser.fullname
                        : selectedUser.fullname}
                    </p>
                  </div>

                  {/* ✅ Image only shown if exists */}
                  {message.image && (
                    <img
                      className="max-h-45 max-w-35 border border-gray-400 rounded-lg mb-2 object-cover"
                      src={message.image}
                      alt="message"
                    />
                  )}

                  {/* ✅ Text only if present */}
                  {message.text && (
                    <p className="text-sm text-black">{message.text}</p>
                  )}

                  {/* ✅ Clean timestamp formatting */}
                  <div className="text-[8px] self-end text-gray-100">
                    <p>
                      {new Date(message.timestamp).getHours()}:
                      {new Date(message.timestamp)
                        .getMinutes()
                        .toString()
                        .padStart(2, "0")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </ScrollToBottom>
        ) : (
          // ✅ Changed: properly center "no messages" text
          <div className="h-full flex items-center justify-center text-gray-500">
            <div className="flex flex-col h-32 w-32 items-center">
              <Chatanimation className />
              <p className="mt-2 text-sm">No messages</p>
            </div>
          </div>
        )}
      </div>

      {/* ✅ Fixed input bar at the bottom (not scrollable) */}
      <div className="border-t sticky bottom-0  bg-white">
        <Chatinput selectedUser={selectedUser} />
      </div>
    </div>
  );
}

