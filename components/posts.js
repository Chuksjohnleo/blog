import React, {useEffect, useState} from 'react';
import PostCard from './postCard';


export default function Posts({posts}){

    return(
        <section>
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
        </section>
    )
}