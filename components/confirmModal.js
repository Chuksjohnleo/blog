import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import icon from './images/iconC.svg'

export default function ConfirmModal({text, handler}){
    
    return(
        <div style={{zIndex:101}} className='fixed inset-0 backdrop-blur p-4 border text-center'>
         <div className='flex flex-col  justify-center items-center m-3 p-4 text-center'>
            <div className='font-bold text-2xl'>Are you sure you want to {text} ?</div>
            <div className='m-4 font-bold text-3xl flex justify-around'>
                <button onClick={()=>handler('no')} className='border border-red-500 text-red-500 m-3 p-3 text-2xl font-bold hover:bg-red-500 hover:text-white'>
                    No
                </button>
                <button onClick={()=>handler('yes')} className='border border-black m-3 p-3 text-2xl font-bold hover:bg-black hover:text-white'>
                    Yes
                </button>
            </div>
        </div>
        </div>
    )
}