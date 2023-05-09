import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import icon from './images/photom.jpg';
import CommentEditor from './commentEditor';
import Comment from './comment';


export default function Post({post}){
console.log('post.comments in post.js',post?.comments)
    const [date, setDate] = useState('');
    const [editor, setEditor] = useState('hidden');
    const [actionSectionzIndex, setActionSectionzIndex] = useState('');

    function handleEditor(){
        if(editor === 'hidden'){
            setEditor('visible');
            setActionSectionzIndex('z-50');
        }else{
            setEditor('hidden');
            setActionSectionzIndex('')
        }
    }

    function countViewers(){
   
            fetch('/api/count-viewers',{
                method:'put',
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

    useEffect(()=>{
     let date = new Date();
     setDate(date.toDateString());
    },[]);

    return(
        <>
         <main className='m-auto max-w-2xl break-words'>
            <section className='mx-4 p-4'>
                <h1 className='my-3 py-4 text-3xl border-black font-bold'>{post.title}</h1>
                <div className='flex justify-center'>
                  {post.images.length>0?
                  <img className='max-h-[80vh]' alt={'thumbnal'} src={post.images[0]} />:
                  <Image className='w-full h-auto max-h-[80vh]' alt={'Chukwuka Nwanonenyi'} src={icon}  height={200} width={200} />
                  }
                </div>
                <div className='mt-2 mb-2'><strong>{date} | {post.theLength}</strong></div>
                <div className='flex gap-3 items-center'>
                  <Image alt={'Chukwuka Nwanonenyi'} src={icon}  height={30} width={30} />
                  <div className='ml-3'><em>By</em> <em className='font-medium underline'>{post.poster}</em></div>
                </div>
            </section>
          
            <section className='p-4'>
                <div>
                    <article dangerouslySetInnerHTML={{__html: post.postBody}}/>
                </div>
            </section>
            {/* <section className={`w-full ${actionSectionzIndex}  bg-white/50 backdrop-blur sticky top-0 bottom-0`}>
                {editor==='visible'?
                <div>
                    <CommentEditor handleEditor={handleEditor} post={post} />
                </div>:
                ''}
                <div  className='w-full bg-white/70 backdrop-blur xSm:text-xl font-bold flex justify-around border py-1 sticky top-0 bottom-0'>
                  <button className='border-r flex-1 border-black active:bg-black active:text-white'>Like</button>
                  <button onClick={handleEditor} className='border-r flex-1 border-black active:bg-black active:text-white'>Comment</button>
                  <button className='flex-1 active:bg-black active:text-white'>Copylink</button>
                </div>
            </section> */}
            <section className='m-3 p-4'>
                <h1 className='text-2xl font-bold'>Also read</h1><hr/>
                <div className='border-l-4 m-2 p-4 border-black text-xl font-semibold bg-black/5'>
                    <div>Emeka is an Ada</div>
                </div>
                <div className='border-l-4 m-2 p-4 border-black text-xl font-semibold bg-black/5'>
                    <div>A cat cries as a chicken</div>
                </div>
            </section>
            <section>
              <h1 className='text-3xl font-bold'>Comments</h1>  <hr/>
              <div className='bg-black/20 m-1'>
                {post?.comments.map((comment, i)=>{
                   
                return(<div className='bg-white my-2' key={comment.commentId}>
                          <Comment 
                            i={i} 
                            shadow={icon} 
                            post={post}
                            comment={comment}
                            />
                      </div>)
                })}
              </div>
            </section>
            <section className={`w-full ${actionSectionzIndex}  bg-white/50 backdrop-blur sticky top-0 bottom-0`}>
                {editor==='visible'?
                <div className='h-[90vh] overflow-auto'>
                    <CommentEditor handleEditor={handleEditor} post={post} />
                </div>:
                ''}
                <div  className='w-full bg-white/70 backdrop-blur xSm:text-xl font-bold flex justify-around border py-1'>
                  <button className='border-r flex-1 border-black active:bg-black active:text-white'>Like</button>
                  <button onClick={handleEditor} className='border-r flex-1 border-black active:bg-black active:text-white'>Comment</button>
                  <button className='flex-1 active:bg-black active:text-white'>Copylink</button>
                </div>
            </section>
         </main>
        </>
    )
}

