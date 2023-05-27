import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import icon from './images/android-chrome-192x192.png';
import { useContext } from 'react';
import { HomeContext } from '@/context/context';
import Link from 'next/link';


export default function PostCard({post}){
// const cc = useContext(HomeContext)
// console.log(cc)
    const [date, setDate] = useState('');

    useEffect(()=>{
     let date = new Date(post.date);
     setDate(date.toDateString());
    },[]);

    return(
        <>
            <article className='p-4 border-black border-b-2 break-words xSm:hover:bg-black/5'>
              <h1 className='text-3xl mt-4 mb-4 font-extrabold font-sans max-w-[98vw]' >
                <Link className='hover:underline active:underline' href={`/posts/${post.id}`}>{post.title}</Link>
              </h1>
                    {/* <div><em>By</em> <em className='font-medium underline'>The Poster</em></div> */}
                <div>
                  <Link className='hover:underline active:underline' href={`/posts/${post.id}`}>
                    {post.description}
                  </Link>
                </div>
                <div className='mt-2 mb-2'><strong>{date} | {post.theLength} words(approx.)</strong></div>
                <div className='flex justify-center'>
                  <Link href={`/posts/${post.id}`}>
                     {post.images.length>0?
                     <img className='w-full' alt={'thumbnal'} src={post.images[0]} />:
                     <Image className='w-full' alt={'Chukwuka Nwanonenyi'} src={icon}  height={200} width={200} />
                     }
                  </Link>
                </div>
            </article>
        </>
    )
}

