import React, {useEffect, useState} from 'react';
import PostCard from './postCard';


export default function Posts({posts}){

    return(
        <main className='m-auto max-w-2xl break-words'>
         {
         posts.map(post=>{
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