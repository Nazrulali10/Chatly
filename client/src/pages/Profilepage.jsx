import { Camera } from "lucide-react";
import BASE_URL from "../config";
import NavigationBar from "../components/NavigationBar";

export default function Profilepage({
  authUser,
  setauthUser,
  socket,
  setsocket,
  isLoggingOut,
  setisLoggingOut,
}) {
  const handleImageUpload = (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const image = reader.result;
        const response = await fetch(`${BASE_URL}/user/updateprofile`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ profilepic: image }),
        });
        const result = await response.json();
        setauthUser(result);
      };
    } catch (error) {
      console.log("error in profilepage");
    }
  };
  return (
    
      <div className="bg-sky-500 flex h-screen w-full items-center px-10 md:p-0 md:justify-center md:items-center">
        <div className="flex flex-col bg-indigo-950  h-100 md:h-120 w-100 md:w-120 p-3 md:p-5 justify-center items-center">
          <h1 className="text-3xl md:text-4xl text-white font-bold">Profile</h1>
          <div className="mt-4 relative ">
            <img
              className="border-2 border-white rounded-full h-35 w-35 md:h-50 md:w-50"
              src={authUser.profilepic || "/profile.png"}
              alt="profile"
            />
            <label
              className="absolute bottom-2 right-2 bg-sky-600 p-2 rounded-full shadow-md cursor-pointer hover:bg-sky-800 transition"
              htmlFor="inputload"
            >
              <Camera className="w-5 h-5 text-white" />
            </label>
            <input
              type="file"
              onChange={handleImageUpload}
              id="inputload"
              className="hidden"
              accept="image/*"
            />
          </div>
          <span className="text-lime-400 mb-3 font-semibold">Active</span>

          <label className="text-white font-semibold text-sm">
             Name:
            <input
              type="text"
              className="w-60 md:w-80 border ml-2 bordee-1 font-semibold border-md px-3 py-2 text-white border-sky-500 mb-4 text-xs"
              value={authUser.fullname}
              readOnly
            />
          </label>
          <label className="text-white text-sm font-semibold">
            Email:{" "}
            <input
              type="text"
              className="w-60 md:w-80 border ml-2 bordee-1 font-semibold border-md px-3 py-2 text-white border-sky-500 text-xs"
              value={authUser.email}
              readOnly
            />
          </label>
        </div>
      </div>
    
  );
}
