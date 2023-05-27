import React, { useEffect, useState, useContext } from 'react';
import PostCard from './postCard';
import { HomeContext } from '@/context/context';


export default function Posts({posts}){
  const context = useContext(HomeContext);
  context.posts = posts;

  const [allPosts, setAllPosts] = useState(context.posts);
  context.handlePosts = setAllPosts;

    return(
        <main className='m-auto max-w-2xl break-words'>
         {
         allPosts.map(post=>{
           return (
             <div key={post.id}>
                <PostCard post={post}/>
             </div>
             )
        }
         )
         }
        </main>
    )
}