import React, { useState, useEffect,  useContext } from 'react';
import { HomeContext } from "../context/context";
import Link from 'next/link';
import Image from 'next/image';
import Reply from './reply';
import dynamic from "next/dynamic";
const ReplyEditor = dynamic(import("./replyEditor"), { ssr: false });


export default function Comment({post, comment, shadow, i}){
 
    const [date,setDate] = useState('date');
    const [repliesVisiblity,setRepliesVisiblity] = useState('hidden');
    const [editor,setEditor] = useState('hidden');
    const [hasFetchedReplies, setHasFetchedReplies] = useState(false);
    const [repliesIsLoading, isRepliesStillLoading] = useState('no');
    const [replies,setReplies] = useState([]);
    const [likedReplies, setLikedReplies] = useState([]);
    const [replyCount, setReplyCount] = useState(comment.replyCount)
    const [replyTo,setReplyTo] = useState({
      username: comment.commenter,
      userId: comment.commenterId
    });
    
    const userContext =  useContext(HomeContext);

    function resetReplies(reply){
    
      if(!hasFetchedReplies){
       setReplyCount(replyCount+1);
       return getReplies();
      }
       setReplies(prevReplies=>[...prevReplies,reply])
       setReplyCount(replyCount+1);
    }


    function getReplies(e){
      if(e) e.target.disabled = true;
      if(replies.length>0 && hasFetchedReplies)return replyVisibility();
      isRepliesStillLoading('yes');
      fetch('/api/get-replies',{
        method: 'post',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          commentId: comment.commentId,
          category: comment.category,
          userId: userContext.user.userId
        })
      })
      .then(resp=>{
        return resp.json()
      })
      .then(resp=>{
        if(resp.replies){
          setReplies(prevReplies=>[...prevReplies,...resp.replies]);
          replyVisibility();
          isRepliesStillLoading('no');
          setHasFetchedReplies(true);
        }
       setLikedReplies(resp.liked);
      
      })
      .catch(e=>{
          console.log(e)
      })
    }


    function handleEditor(replyingTo){ 
       setEditor('visible');
       if(replyingTo) {
        setReplyTo({
          username: replyingTo.replier,
          userId: replyingTo.replierId
        })
     }
    }

    function closeEditor(){
       setEditor('hidden');
       setReplyTo({
         username: comment.commenter,
         userId: comment.commenterId
       })
      
     }
     
    function replyVisibility(){
       repliesVisiblity==='visible'? setRepliesVisiblity('hidden'):
       setRepliesVisiblity('visible');
    }

    useEffect(()=>{
        const theDate = new Date(comment.date);
        return setDate(theDate.toLocaleString())//.toDateString())
      },[]);

    useEffect(()=>{
        const replyEditorSection = document.getElementById('replyEditorSection'+i);
        replyEditorSection?.scrollIntoView({block:'center'});
      },[replyTo])
    return(
        <>
       <h1>{comment.commentId}</h1>
          <div>
            <div >
             <Link href="/#">
                <Image alt={comment.commenter+"pics"} width={30} height={30} src={shadow} />
                <em >{comment.commenter?.length<1?'NWANONENYI CHUKWUKA':comment.commenter}</em>
             </Link>
            
             <div>{date}</div>
            <hr/> 
            <article dangerouslySetInnerHTML={{__html: comment.comment}} />
            <hr/>
            <div className='flex justify-around'>
              <button className='hover:bg-black/5 py-1 px-4'>29 Likes</button>
              <button className='hover:bg-black/5 py-1 px-4'>400 Replies</button>
            </div>
            <hr/>
            <div className='flex justify-around font-bold'>
               <button className='hover:bg-black/5 py-1 px-4'>Like</button>
               <button className='hover:bg-black/5 py-1 px-4'>Reply</button>
            </div>
            {
              replyCount > 0?<button disabled={ repliesIsLoading=== 'yes'?true:false } onClick={(e)=>{
                  getReplies(e);
                  }} >
                    <span> {replyCount} </span>
                    <span>{replyCount>1?'Replies':'reply'}</span>
                    <svg width="30" height="15" viewBox="0 0 1024 1024"  version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z" />
                    </svg>
                </button>:<span >No replies</span>
              }
            <div>
            {replies.map((reply,i)=>{
            return(
             
                <div key={reply.replyId}>
                    <div>{i+1}</div>
                    <Reply  handleEditor={handleEditor} likedReplies={likedReplies} shadow={shadow} Image={Image} reply={reply} />
                </div>
             
                )
               })
                }
            </div>
            </div>
            <div>{editor==='visible'?<ReplyEditor resetReplies={resetReplies} post={post} replyTo={replyTo} theComment={comment} i={i} closeEditor={closeEditor} />:''}</div>
          </div>
        </>
    )
}