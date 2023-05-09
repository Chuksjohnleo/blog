import { useEffect, useState } from "react";
import Progress from "./progress";
import Link from "next/link";


export default function Login(){

    const [email,setEmail] = useState('nwa@gmail.com');
    const [password,setPassword] = useState('mypass');
    const [status, setStatus] = useState(false);
    const [progress, setProgress] = useState(false);

    function handleEmail(e){
        setEmail(e.target.value)
    }
    
    function handlePassword(e){
        setPassword(e.target.value)
    }

    function login(){
        setProgress(true);
        fetch('/api/login',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body : JSON.stringify({
             email: email,
             password: password
           })
        })
        .then(resp=>{
            return resp.json();
            
        })
        .then(
            resp=>{
               if(resp.userData) {
                setStatus(true);
                setProgress(false);
              
                const {surname, firstname, id} = resp.userData;
                localStorage.setItem('userdata',JSON.stringify({
                    firstname: firstname,
                    surname: surname,
                    userId: id
                }));
                // location.href = '/'
             }
            }
        ).catch(e=>{
            setProgress(false)
            console.error(e)
        })
    }

    return(
        <>
      
        <main className='m-auto max-w-2xl'>
        <div className='p-1 min-h-[50vh]'>
            <h1 className='text-3xl text-center font-extrabold m-2 p-2'>Login</h1>
            <div className='flex flex-col justify-center items-center m-2 p-2'>
               
                <div className='m-2 flex justify-around gap-3 xSm:flex-row flex-col w-full'>  
                    <label className="font-bold flex-none border p-1 w-[100px] bg-black/10"> Email: </label>
                    <input  value={email}  onInput={(e)=>handleEmail(e)} className='text-center border flex-1 p-1' type={'text'} name='email' placeholder="Email" />
                </div>
               
                <div className='m-2 flex justify-around gap-3 xSm:flex-row flex-col w-full'>  
                    <label className="font-bold flex-none border p-1 w-[100px] bg-black/10">Password: </label>
                    <input value={password} onInput={(e)=>handlePassword(e)} className='text-center border flex-1 p-1' name='password' placeholder="Password" />
                </div>
                {progress?<div className="animate-pulse font-bold">Logging you in. . .</div>:''}
                <div className="my-6">
                    <button 
                        className="min-w-[150px] flex items-center justify-center border text-2xl font-bold p-1 active:bg-black active:text-white  hover:fill-white hover:bg-black hover:text-white" 
                        onClick={login}>
                        {progress? <Progress height={'40px'} status={status} />:'Login'}
                    </button>
                </div>
            </div>
        </div>
        <div className="text-center">
            <span>Not Registered?</span>
            <Link className="font-bold" href="/register"> Register</Link>
        </div>
        </main>
       
        </>
    )
}