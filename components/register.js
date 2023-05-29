import { useEffect,useState } from "react";
import Progress from "./progress";
import Link from "next/link";
import { useRouter } from "next/router";


export default function Register(){

    const router = useRouter();
    
    const [firstname, setFirstname] = useState('Chukwuka');
    const [surname, setSurname] = useState('Agina');
    const [gender, setGender] = useState('Male');
    const [password, setPassword] = useState('mypass');
    const [email, setEmail] = useState('nwa@gmail.com');
    const [status, setStatus] = useState(false);
    const [progress, setProgress] = useState(false);

    function handleFirstname(e){
        setFirstname(e.target.value)
    }

    function handleSurname(e){
        setSurname(e.target.value)
    }

    
    function handleEmail(e){
        setEmail(e.target.value)
    }

    function handleGender(e){
        setGender(e.target.value)
    }
    
    function handlePassword(e){
        setPassword(e.target.value)
    }

    function register(){
        setProgress(true);
        fetch('/api/register',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body : JSON.stringify({
             firstname: firstname,
             surname: surname,
             email: email,
             gender: gender,
             password: password
           })
        })
        .then(resp=>{
            return resp.json()
        })
        .then(
            resp=>{
                if(resp.status === 'yes'){
                    setStatus(true);
                    setProgress(false);
                   
                    localStorage.setItem('userdata',JSON.stringify(resp.userData));
                    router.push('/');
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
            <h1 className='text-3xl text-center font-extrabold m-2 p-2'>Register</h1>
            <div className='flex flex-col justify-center items-center'>
                <div className='m-2 flex justify-around gap-3 xSm:flex-row flex-col w-full'>
                    <label className="font-bold flex-none border p-1 w-[100px] bg-black/10">First name: </label>
                    <input value={firstname} onInput={(e)=>handleFirstname(e)} className='text-center w-full border flex-1 p-1' type={'text'} name='firstname' placeholder="First Name" />
                </div>
                <div className='m-2 flex justify-around gap-3 xSm:flex-row flex-col w-full'>
                    <label className="font-bold flex-none border p-1 w-[100px] bg-black/10">Surname: </label>
                    <input  value={surname}  onInput={(e)=>handleSurname(e)} className='text-center border w-full flex-1 p-1' type={'text'} name='surname' placeholder="Surname" />
                </div>
                <div className='m-2 flex justify-around gap-3 xSm:flex-row flex-col w-full'>
                    <label className="font-bold flex-none border p-1 w-[100px] bg-black/10">Email: </label> 
                    <input  value={email}  onInput={(e)=>handleEmail(e)} className='text-center w-full border flex-1 p-1' type={'text'} name='email' placeholder="Email" />
                </div>
                <div className='m-2 flex justify-around gap-3 xSm:flex-row flex-col w-full'>
                    <label className="font-bold flex-none border p-1 w-[100px] bg-black/10">Gender: </label>
                    <div className="text-center border flex-1 p-1 w-full flex justify-around">
                      <div>
                        <input value="male" onInput={(e)=>handleGender(e)} type='radio' name='gender' />
                        <span> Male </span>
                      </div>
                      <div className="bg-black h-full w-1"></div>
                      <div>
                        <input value="female" onInput={(e)=>handleGender(e)} type='radio' name='gender' />
                        <span> Female </span>
                      </div>
                    </div>
                    
                </div>
                <div className='m-2 flex justify-around gap-3 xSm:flex-row flex-col w-full'>
                    <label className="font-bold flex-none border p-1 w-[100px] bg-black/10">Password: </label>
                    <input value={password} onInput={(e)=>handlePassword(e)} className='text-center border w-full flex-1 p-1' type={'text'} name='password' placeholder="Password" />
                </div>
                {progress?<div className="animate-pulse font-bold">Registering you. . .</div>:''}
                <div className="my-6">
                    <button
                       className="min-w-[150px] flex items-center justify-center border text-2xl font-bold p-1 active:bg-black active:text-white hover:bg-black hover:fill-white hover:text-white" 
                     onClick={register}>{progress? <Progress height={'40px'} status={status} />:'Register'}</button>
                </div>
            </div>
        </div>
        <div className="text-center m-2">
            <span> Registered? </span>
            <Link className="font-bold" href="/login"> Login </Link>
        </div>
        </main>
        
        </>
    )
}