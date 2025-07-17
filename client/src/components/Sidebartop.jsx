import {  MessageSquareQuote } from 'lucide-react'
export default function Sidebartop({onlineUsers}){
    return(
    <div className='relative flex justify-between items-center border border-2 border-b-slate-700 px-4  min-h-18 w-full'>
        <div className='gap-2 flex'>
        <label className='text-white font-bold' htmlFor='contact'><MessageSquareQuote size={30}/></label>
        <h1 className='font-bold text-white text-lg'>Contacts</h1>
        </div>
        <div className='absolute bottom-2 right-3'>
        <p className='text-white text-xs'>Online: <span className='text-lime-300'>{onlineUsers.length}</span></p>
        </div>
    </div>);
}