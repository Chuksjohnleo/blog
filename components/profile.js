import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import icon from './images/shadow.svg';
import Link from 'next/link';

export default function Profile(){

    const [user, setUser] = useState({});
    const [date, setDate] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(()=>{
     if(localStorage.getItem('userdata')){
        const userData = JSON.parse(localStorage.getItem('userdata'));
        setUser(userData);
        if(userData.id){
            console.log(userData);
            setIsLoggedIn(true)
        } 
     }
    },[]);

    useEffect(()=>{
        setDate(new Date(user.joined).toDateString());
    },[user])
    
    if(!isLoggedIn){
        return(
            <>
            <div className='flex text-center flex-col h-[200px] justify-center items-center'>
                <div>You are not Logged in</div>
                <div>
                    <Link className='font-bold' href='/login'>
                      Login
                    </Link>
                    <span> Or </span>
                    <Link className='font-bold' href='/register'>
                      Register
                    </Link>
                    <span> to view your profile. </span>
                </div>
            </div>
            </>
            )
    }

    return(
        <>
            <section className='p-4 border-black border-b-2 break-words'>
              <h1 className='text-3xl mt-4 mb-4 font-extrabold font-sans' >
                 Profile
              </h1>
              <div className='font-bold'>
                {user.username?<div> 
                    <span className='text-black/50'> Username: </span>
                    <span className='text-2xl'> {user.username} </span>
                </div>:''
                }
                <div className='border-b pt-2'>
                  <span className='text-black/50'> First name: </span>
                  <span className='text-2xl'> {user.firstname} </span>
                </div>
                <div className='border-b pt-2'>
                    <span className='text-black/50'> Surname: </span>
                    <span className='text-2xl'> {user.surname} </span>
                </div>
                <div className='border-b pt-2'>
                   <span className='text-black/50'> Email: </span>
                   <span className='text-2xl'> {user.email} </span>
                </div>
                <div className='border-b pt-2'> 
                   <span className='text-black/50'> Registration date: </span>
                   <span className='text-xl'> {date} </span>
                 </div>
                </div>
              <div className='flex justify-center'>
                    { 
                     user.profilePicture?
                     <Image className='p-2' alt={'thumbnail'} src={user.profilePicture}  height={50} width={100} />:
                     <Image className='p-2' alt={'Chukwuka Nwanonenyi'} src={icon}  height={50} width={100} />
                     }
                </div>
            </section>
        </>
    )
}

