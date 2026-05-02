import {CircleUserRound, LogOut,UserRound} from 'lucide-react'
import toast from 'react-hot-toast'
import {Link} from 'react-router-dom'
import BASE_URL from '../config'
export default function NavigationBar({setauthUser,setsocket,socket,setisLoggingOut}){
    const handleLogout = async()=>{
        try {
            setisLoggingOut(true)
            const response =await fetch(`${BASE_URL}/user/logout`,{method:"POST",credentials:"include",headers:{'Content-type':'application/json'}})
            const result =await response.json()
            console.log(result)
            toast.success(result.message)
            setauthUser(null)
            (socket&&socket.disconnect())
            setsocket(null)

        } catch (error) {
            console.log(error)
            
        }
       finally{
        setisLoggingOut(false)
       }

    }
    return(
        <div className='flex  bg-zinc-900 h-15 w-full items-center justify-between px-6 md:px-10 border-b border-b-zinc-800'>
        <Link to='/'><h1 className='righteous-regular text-transparent bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 text-2xl bg-clip-text font-bold'><strong>Chatly</strong></h1></Link>
        <div className=' flex gap-3'>
        <Link className='' to={'/profile'}>
        <div>
             <CircleUserRound className='text-white h-6 hover:text-amber-500  transition duration-300 w-6' size={30} /> 
        </div>
       
        </Link>
        <button className='text-white h-5 hover:text-amber-500 transition duration-300 cursor-pointer' onClick={handleLogout}><LogOut size={22}/></button>
        </div>
        </div>
    );
}