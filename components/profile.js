import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import icon from './images/shadow.svg';

export default function Profile({user}){

    const [date, setDate] = useState('');

    useEffect(()=>{
     let date = new Date(user.joined);
     setDate(date.toDateString());
    },[]);

    return(
        <>
            <section className='p-4 border-black border-b-2 break-words'>
              <h1 className='text-3xl mt-4 mb-4 font-extrabold font-sans max-w-[98vw]' >
                 Profile
              </h1>
                    {/* <div><em>By</em> <em className='font-medium underline'>The Poster</em></div> */}
                <div> {user.username} </div>
                <div> {user.firstname} </div>
                <div> {user.surname} </div>
                <div> {user.email} </div>
                <div className='mt-2 mb-2'> {date} </div>
                <div className='flex justify-center'>
                    { 
                     post.images.length>0?
                     <Image className='w-full' alt={'thumbnail'} src={user.profilePicture}  height={200} width={200} />:
                     <Image className='w-full' alt={'Chukwuka Nwanonenyi'} src={icon}  height={200} width={200} />
                     }
                </div>
            </section>
        </>
    )
}

