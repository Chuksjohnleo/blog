import { useEffect } from 'react';


export default function Status({text, postId, handler}){
 
  return(
    <>
    <div style={{zIndex:999}} className='fixed w-full h-full inset-0 backdrop-blur'>
       <div style={{zIndex:999}} className='fixed m-[auto] bg-black text-white inset-0 w-[90vw] h-[200px] flex justify-center items-center flex-col'>
         <div className='p-2 text-center md:text-[2rem]'><strong>{text} Successfully</strong></div>
         <div className='flex justify-around w-full mt-5'>
            <a href={`/posts/${postId}`} className='border flex-1 m-2 p-4 font-extrabold text-center cursor-pointer hover:bg-white hover:text-black'> View Post</a>
            <button onClick={handler} className='border flex-1 m-2 p-4 font-extrabold hover:bg-white hover:text-black'> Ok </button>
         </div>
       </div>
    </div>
    </>)
}