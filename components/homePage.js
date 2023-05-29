import React, {useEffect, useState, useContext} from 'react';
import Image from 'next/image';
import { HomeContext } from '@/context/context';
import PostCard from './postCard';

export default function HomePage({posts}){
    const context = useContext(HomeContext);
    context.posts = posts.latest;


    const [theposts, setThePosts] = useState(context.posts);

    context.handlePosts = setThePosts;

    return(
        <>
         <main className='m-auto max-w-2xl'>
            <section>
                <h1 className='p-5 m-1 text-6xl border-b-2 border-black text-center font-bold break-words'>Home of the best bloggers in town</h1>
            </section>
            <section className='p-4'>
                <h1 className='text-4xl m-2 text-center font-extrabold font-sans' >Latest</h1>
                <hr/>
                 {
              theposts.map((post)=>{
                return(
                  <div key={post.id}>
                  <PostCard post={post} />
                </div>
                )
              })
              }
                
            </section>
            <section className='p-4'>
              <h1 className='text-4xl m-2 text-center font-extrabold font-sans'>Trending</h1>
              <hr/>
              {
              posts.trending.map((post)=>{
                return(
                  <div key={post.id}>
                    <PostCard post={post} />
                  </div>
                  
                )
              })
              }
            </section>
         </main>
        </>
    )
}

