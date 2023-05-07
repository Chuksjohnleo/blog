export default function Error({text, error, handler}){
 
  return(
    <>
    <div style={{zIndex:999}} className='fixed w-full h-full inset-0 backdrop-blur'>
       <div style={{zIndex:999}} className='fixed m-[auto] bg-black text-white inset-0 w-[90vw] h-[200px] flex justify-center items-center flex-col'>
         <div className='p-2 text-center md:text-[2rem]'><strong>{text} Successfully</strong></div>
         <div className='flex justify-around w-full mt-5'>
            <button onClick={handler} className='border m-2 p-4 font-extrabold hover:bg-white hover:text-black'> Ok </button>
         </div>
       </div>
    </div>
    </>)
}