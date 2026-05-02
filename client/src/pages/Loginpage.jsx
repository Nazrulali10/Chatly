import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import BASE_URL from "../config";
import connectSocket from "../connectsocket";

export default function LoginPage({
  setauthUser,
  setsocket,
  socket,
  setonlineUsers,
  setisloggingin,
  isLogginigin,
}) {
  const [formData, setformData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setisloggingin(true);
      const response = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success === false) {
        toast.error(result.message, { duration: 4000 });
      } else {
        toast.success(result.message, { duration: 5000 });
        setTimeout(() => {
          setauthUser(result.userData);
          connectSocket(result.userData._id, setsocket, socket, setonlineUsers);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setisloggingin(false);
    }
  };
  return (
    <div className='flex flex-col md:flex-row w-screen h-screen md:py-0 pt-15  md:gap-0 gap-10 bg-zinc-900'>
      <div className="items-center h-full md:h-screen  w-full px-10 md:px-0 md:items-center md:justify-center flex ">
        <form
          className="max-w-96 w-full text-center rounded-2xl px-8 bg-zinc-800 "
          onSubmit={handleSubmit}
        >
          <h1 className="text-amber-500 text-2xl md:text-3xl mt-10 font-medium">
            Login
          </h1>
          <p className="text-white text-xs mt-2">Please Login to continue</p>
          <div className="flex items-center w-full mt-10  border border-amber-500 h-12  rounded-full overflow-hidden pl-6 gap-2">
            <input
              onChange={(e) => {
                setformData({ ...formData, email: e.target.value });
              }}
              type="email"
              placeholder="Email id"
              className="bg-zinc-800 text-white placeholder-gray-600 outline-none text-sm w-full h-full"
              required
            />
          </div>

          <div className="flex items-center mt-4 w-full border border-amber-500 h-12  rounded-full overflow-hidden pl-6 gap-2 focus:border-blue-200">
            <input
              onChange={(e) => {
                setformData({ ...formData, password: e.target.value });
              }}
              type="password"
              placeholder="Password"
              className="bg-zinc-800 text-white placeholder-gray-600 outline-none text-sm w-full h-full"
              required
            />
          </div>
          <div className="mt-5 text-left text-white text-xs">
            click here to Login
          </div>

          <button
            disabled={isLogginigin}
            type="submit"
            className="mt-2 w-full h-10 rounded-full text-black bg-amber-500 text-md hover:opacity-90 transition-opacity"
          >
            Login
          </button>
          <p className="text-gray-500 text-sm mt-3 mb-11">
            Don’t have an account?{" "}
            <Link
              className="text-amber-500 text-sm hover:text-gray-100 transition"
              to="/signup"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
      <div className="items-center justify-center flex flex-col bg-zinc-800 w-full p-6">
            <h1 className="text-3xl md:text-5xl text-white animate-pulse duration-200 wrap-break-word">Start <br/>  <span className=" bg-clip-text text-transparent bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500">conversations</span> <br/>that matter.</h1>
        </div>
     
    </div>
  );
}
