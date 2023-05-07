export default function Sidebar({theWidth, openAndCloseSidebar}) {
  return (
    <>
      <nav className={`fixed overflow-y-auto bg-white top-0 ${theWidth} transition-[width] duration-300 max-w-[500px]`}>
        <div className="border-b border-r p-5 border-black">
        <div className="flex justify-between items-center font-extrabold m-1 p-1">
            <div className="text-xl">Menu</div>
            <div>
              <button onClick={openAndCloseSidebar} className="text-3xl hover:bg-black/80 hover:fill-white">
               <svg width="40" height="40" viewBox="0 0 512 512">
                 <g id="Page-1" stroke="none" strokeWidth="1" fillRule="evenodd">
                   <g id="work-case" transform="translate(91.520000, 91.520000)">
                    <polygon id="Close" points="328.96 30.2933333 298.666667 1.42108547e-14 164.48 134.4 30.2933333 1.42108547e-14 1.42108547e-14 30.2933333 134.4 164.48 1.42108547e-14 298.666667 30.2933333 328.96 164.48 194.56 298.666667 328.96 328.96 298.666667 194.56 164.48">
                    </polygon>
                   </g>
                 </g>
               </svg>
              </button>
            </div>
        </div>
        <ul className='m-2'>
          <li className='border-t p-1 hover:bg-black/80 hover:text-white'><a className="w-full inline-block" href='/login'>Login</a></li>
          <li className='border-t p-1 hover:bg-black/80 hover:text-white'><a className="w-full inline-block" href='/register'>Register</a></li>
          <li className='border-t p-1 hover:bg-black/80 hover:text-white'><a className="w-full inline-block" href='/suscribe'>Suscribe</a></li>
          <li className='border-t p-1 hover:bg-black/80 hover:text-white'><a className="w-full inline-block" href='/notification'>Notification</a></li>
          <li className='border-t p-1 hover:bg-black/80 hover:text-white'><a className="w-full inline-block" href='/download-our-app'>Download our app</a></li>
        </ul>
      </div>
      </nav>
    </>
  );
}
