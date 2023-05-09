import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import icon from './images/iconC.svg';


export default function Footer(){
    let date = new Date()
    return(
        <>
         <footer className='bg-black/10 p-1 h-[100vh]'>
            <div>
              <div className='flex justify-center items-center'>
                <Image alt='picture of the description' src={icon} height={30} width={40} />
                <div className='break-words text-xl font-bold  xSm:text-4xl xSm:font-extrabold max-[98vw]'>Chuksjohnleo</div>
              </div>
              <div className='text-center'>Website by Chuksjohnleo</div>
            </div>
            <div className='flex justify-around'>
                <div><a>facebook</a></div>
                <div><a>twitter</a></div>
            </div>
            <div className='text-center text-blue-800 break-words'>
                <span>All right are reserved</span>
                <span>TheBlogingBloggerBlog</span>
                <span>{date.getFullYear()}</span>
            </div>
         </footer>
        </>
    )
}