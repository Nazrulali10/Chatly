import {LogOut,UserRound} from 'lucide-react'
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
        <div className='flex  bg-black h-15 w-full items-center justify-between px-2 md:px-10'>
        <Link to='/'><img className='h-32 ' src='/icon.png' alt='icon'/></Link>
        <div className=' flex gap-3'>
        <Link className='' to={'/profile'}>
        <UserRound className='text-white h-7 hover:text-sky-500 hover:border-sky-500 transition border-2 rounded-full border-white w-7 font-bold' size={29} />
        </Link>
        <button className='text-white h-6 hover:text-blue-500 transition' onClick={handleLogout}><LogOut size={27}/></button>
        </div>
        </div>
    );
}