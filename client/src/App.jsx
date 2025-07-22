import { Route,Routes,Navigate} from "react-router-dom"; 
import HomePage from "./pages/Homepage";
import Profilepage from "./pages/Profilepage";
import LoginPage from "./pages/Loginpage";
import SignupPage from "./pages/Signuppage";
import {  useState,useEffect } from "react";
import { Loader } from "lucide-react";
import BASE_URL from "./config";
import connectSocket from "./connectsocket";
import { Toaster } from "react-hot-toast";
import NavigationBar from "./components/NavigationBar";


function App() {
  const [authUser,setauthUser] = useState(null)
  const [socket,setsocket] = useState(null)
  const [onlineUsers,setonlineUsers] = useState([])
  const [isLogginigin,setisloggingin] = useState(false)
  const [isSigning,setisSigning] = useState(false)
  const [isLoggingOut,setisLoggingOut] = useState(false)
  const [isCheckingAuth,setIsCheckingAuth] = useState(false)
  console.log(onlineUsers)
  console.log(authUser?authUser:'')


useEffect(() => {
  const checkAuth = async () => {
    try {
      setIsCheckingAuth(true)
      const response = await fetch(`${BASE_URL}/user/checkAuth`, {
        method: 'GET',
        credentials: 'include',
      });
       if (!response.ok) throw new Error("Unauthorized");
      const data = await response.json();
      console.log("Auth data:", data);
      setauthUser(data);
      if (data?._id) connectSocket(data._id, setsocket, socket, setonlineUsers);
    } catch {
      setauthUser(null);
    
    }
    finally{
      setIsCheckingAuth(false)
    }
  };
  checkAuth();
}, []);




  return (
   <>
   {authUser&&
   
      <NavigationBar
        socket={socket}
        setsocket={setsocket}
        setauthUser={setauthUser}
        setisLoggingOut={setisLoggingOut}
      />
   }
   <Toaster position="top-center"reverseOrder={false}/>
    {(isLogginigin || isSigning || isLoggingOut || isCheckingAuth) && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-[#0d1117]/80 backdrop-blur-sm">
        <div className="flex items-center">
          <Loader size={34} className="animate-spin text-white" />
        </div>
      </div>
    )}
   <Routes>
   <Route path="/" element={authUser?<HomePage authUser={authUser} setauthUser={setauthUser} socket={socket} setsocket={setsocket} onlineUsers={onlineUsers} setonlineUsers={setonlineUsers} setisLoggingOut={setisLoggingOut} isLoggingOut={isLoggingOut} />:<Navigate to='/login'/>} />
   <Route path="/signup" element={!authUser?<SignupPage setauthUser={setauthUser} socket={socket} setsocket={setsocket} onlineUsers={onlineUsers} setonlineUsers={setonlineUsers} setisSigning={setisSigning} isSigning={isSigning} />:<Navigate to='/'/>} />
   <Route path="/login" element={!authUser?<LoginPage authUser={authUser} setauthUser={setauthUser} socket={socket} setsocket={setsocket} onlineUsers={onlineUsers} setonlineUsers={setonlineUsers} isLogginigin={isLogginigin} setisloggingin={setisloggingin}/>:<Navigate to='/'/>} />
   <Route path="/profile" element={authUser?<Profilepage authUser={authUser} setauthUser={setauthUser} socket={socket} setsocket={setsocket} setisLoggingOut={setisLoggingOut} isLoggingOut={isLoggingOut}/>:<Navigate to='/login'/>}/>
   </Routes>
   </>
  );
}

export default App;
