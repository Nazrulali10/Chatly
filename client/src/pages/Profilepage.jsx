import { Camera } from "lucide-react";
import BASE_URL from "../config";

export default function Profilepage({ authUser, setauthUser }) {
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
    <div className="bg-zinc-900 flex h-[calc(100vh-60px)] w-full items-center justify-center px-10 md:p-0">
      <div className="flex md:flex-row flex-col bg-neutral-800 md:p-6  md:gap-5 rounded-2xl shadow-md">
        <div className="flex flex-col md:p-6 p-4 items-center gap-4 md:gap-4">
          <h1 className="text-2xl md:text-3xl text-white ">Profile</h1>
          <div className="relative ">
            <img
              className="border-2 border-white rounded-full h-35 w-35 md:h-50 md:w-50 object-cover"
              src={authUser.profilepic || "/profile.png"}
              alt="profile"
            />
            <label
              className="absolute bottom-2 right-2 bg-amber-500 p-2 rounded-full shadow-md cursor-pointer hover:bg-amber-800 transition"
              htmlFor="inputload"
            >
              <Camera className="w-5 h-5 text-black" />
            </label>
            <input
              type="file"
              onChange={handleImageUpload}
              id="inputload"
              className="hidden"
              accept="image/*"
            />
          </div>
        </div>
        <div className="flex flex-col p-6">
          <span className="text-green-400 mb-3 text-sm f">Active</span>
          
          <label className="text-white  text-sm">
            Name:
            <input
              type="text"
              className=" border ml-2  border-md px-4 py-3 text-gray-200 rounded-2xl  border-amber-500 mb-4 text-xs"
              value={authUser.fullname}
              readOnly
            />
          </label>
          <label className="text-white text-sm">
            Email: {" "}
            <input
              type="text"
              className="border ml-2   border-md px-4 py-3 text-gray-200  rounded-2xl border-amber-500 text-xs"
              value={authUser.email}
              readOnly
            />
          </label>
        </div>
      </div>
    </div>
  );
}
