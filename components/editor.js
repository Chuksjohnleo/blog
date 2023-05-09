import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import icon from './images/photom.jpg';
import ConfirmModal from './confirmModal';
import Progress from "./progress";
import Status from "./status";
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(import('react-quill'), {ssr: false  });


export default function Editor(){
    const [content, setContent] = useState(` 
    'header', 'font', 'background', 'color', 'code', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent', 'script', 'align', 'direction',
    'link', 'image', 'code-block', 'formula', 'video'`);
    const [title,setTitle] = useState(`This insertedId: new ObjectId("6447d72a7cb01cb7fe10b182")`);
    const [description, setDescription] = useState('description');
    const [descriptionCounter,setDescriptionCounter] = useState(0);
    const [category,setCategory] = useState('News');
    const [contentLength, setContentLength] = useState(0);
    const [date, setDate] = useState('');
    const [modal,setModal] = useState('closed');
    const [modalStatus, setModalStatus] = useState('no');
    const [error, setError] = useState(false);
    const [progress,setProgress] = useState(false);
    const [status,setStatus] = useState(false);
    const [user, setUser] = useState({username: 'Ck N', userId: 'U1'});
    const [postId, setPostId] = useState('');

    function modalHandler(status){
       setModalStatus(status);
       clearText(status);
       if(modal==='opened'){
        setModal('closed');
        document.documentElement.style.overflow = 'auto';
    }
       else setModal('opened');
    
    }

    function openModal(){
        setModal('opened');
        document.documentElement.style.overflow = 'hidden';
    }

    function clearText(status){
       if(status === 'yes'){
         setTitle('');
         setContent('');
       }
    }

    function statusHandler(){
       location.reload()
    }

    
    function getCategory(e){
     if(e) setCategory(e.target.value);
     
    };

    function getTitle(e){
        setTitle(e.target.value);
    }
    
    function handleEditorText(value){
        setContent(value);
        setContentLength(getLength())
    }

    
    function handleDescription(e){
      if(e){
        setDescription(e.target.value);
       }
       setDescriptionCounter(description.length)
       localStorage.setItem('description',description);
      }

    
   function getLength(){
      const parser = new DOMParser();
      const doc = parser.parseFromString(content,"text/html");
      const body = doc.childNodes[0].innerText
 
      return body.length;
   }

    
    function postRichText(){
    if(description.length<2){
      setError(true)
      return console.log('Little or No description')
    }
    if(category.length<2){
      setError(true)
      return console.log('No category')
    }
    // if('a'==='a')  return getLength()
    if(content.length<2){

        return;
    }
    if(title.length<2){
        return;
    }
    setProgress(true);
    if(error)setError(false);
    fetch('/api/save-post',{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body : JSON.stringify({
        title:title,
        description: description,
        post: content,
        poster: user.username,
        posterId: user.userId,
        theLength: getLength()
      })
    }).then(r=>r.json())
      .then(response=>{
        if(response.postId){
          setStatus(true);
          setPostId(response.postId)
        }
        localStorage.setItem('text',response.postBody)
      })
      .catch(e=>{
        console.log('error:'+e);
        setProgress(false);
        setError(true);
      })
    }

    useEffect(()=>{
     let date = new Date();
     setDate(date.toDateString());
    },[]);

    const modules = {};
    modules.toolbar = [
  ['bold', 'italic', 'underline', 'strike', 'code'],       // toggled buttons
  ['blockquote', 'code-block'],                    // blocks
  [{ 'header': 1 }, { 'header': 2 }],              // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],    // lists
  [{ 'script': 'sub'}, { 'script': 'super' }],     // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],         // outdent/indent
  [{ 'direction': 'rtl' }],                        // text direction
  [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, true] }],       // header dropdown
  [{ 'color': [] }, { 'background': [] }],         // dropdown with defaults
  [{ 'font': [] }],                                // font family
  [{ 'align': [] }],  
  ['link', 'image', 'video','formula'],                             // text align
  ['clean'],                                       // remove formatting
]

/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  'header', 'font', 'background', 'color', 'code', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent', 'script', 'align', 'direction',
  'link', 'image', 'code-block', 'formula', 'video'
]



    return(
        <section>
             {
             modal==='opened'?
             <ConfirmModal text={'Discard post'} handler={modalHandler}  />
             :''
             }
             {status===true?
               <Status 
                 text={'Posted'} 
                 postId={postId} 
                 handler={statusHandler} 
                 />:''}
            <h1 className='font-extrabold text-3xl m-3'>Write Post</h1>
            {error?
                <div>
                   <div>An error occurred please retry</div>
                   <div>{'theError'}</div>
                </div>
            :''}
       <div className='flex flex-col items-center justify-center mb-2'>
         <label className='text-2xl m-2' htmlFor="categories">Choose category</label>
         <select className='border-2 focus:outline-none focus:shadow focus:shadow-black' value={category} onChange={(e)=>getCategory(e)} name="categories">
          <optgroup label="categories">
            <option value={'none'}>None</option>
            <option value={'News'}>News</option>
            <option value={'Politics'}>Politics</option>
            <option value={'Learning'}>Learning</option>
            <option value={'Religion'}>Religion</option>
            <option value={'Sports'}>Sports</option>
            <option value={'Stories'}>Stories</option>
            <option value={'History'}>History</option>
            <option value={'LoveAndFamily'}>Love And Family</option>
            <option value={'ScienceAndTechnology'}>Science And Technology</option>
            <option value={'PetsAndAnimals'}>Pets And Animals</option>
            <option value={'Ict'}>I.C.T</option>
            <option value={'Health'}>Health</option>
          </optgroup>
         </select>
        </div>
         <div className='m-3'>
            <div className='flex flex-col items-center justify-center mb-2'>
                <label htmlFor="title" className='text-2xl'>Title</label>
                <textarea placeholder='Title of the post' cols='15' value={title} className='w-full border-2 focus:outline-none focus:shadow focus:shadow-black' onChange={(e)=>getTitle(e)}></textarea>
            </div>
            
            <div className='flex flex-col items-center justify-center mb-2'>
               <label className='text-2xl'>Description</label>
               <textarea value={description} onInput={(e)=>handleDescription(e)} placeholder="Write a short description of your post. Not less than 1 word and Not more than 100 words" rows={4} className='w-full border-2 focus:outline-none focus:shadow focus:shadow-black'></textarea>
               <span>{descriptionCounter}/200</span>
             </div>
             <div className='flex flex-col items-center justify-center mb-2'>
               <label className='text-2xl'>Og Image</label>
               <input onChange={(e)=>console.log(e.target.files[0])} type='file' accept='image/*' placeholder="Write a short description of your post. Not less than 1 word and Not more than 100 words" rows={4} className='w-full border-2 focus:outline-none focus:shadow focus:shadow-black' />
               <span>{descriptionCounter}/200</span>
             </div>
            <div id='writePost'>
              <ReactQuill
               value={content}
               formats={formats}
               modules={modules}
               placeholder='Write Post Here'
               onChange={handleEditorText}
               />
            </div>
            {progress===true?
              <div className='text-center text-3xl font-bold  animate-pulse'>
                Posting<span className='animate-color delay-200 font-extrabold'>.</span><span className='animate-pulse delay-500 font-extrabold'>.</span><span className='animate-pulse delay-200 font-extrabold'>.</span>
              </div>
              :''}
            <div className='flex justify-around'>
                <button onClick={postRichText}  disabled={progress?true:false} className={'enabled:hover:fill-white border border-black m-3 p-3 text-2xl font-bold enabled:hover:bg-black disabled:bg-black/20 hover:text-white disabled:cursor-not-allowed'}>
                 {progress===true?<Progress height='50px' color='black' status={status} />:'Post'}
                </button>
                <button onClick={openModal}  disabled={progress?true:false} className='border border-red-500 text-red-500 m-3 p-3 text-2xl font-bold enabled:hover:bg-red-500 enabled:hover:text-white disabled:bg-black/20 disabled:cursor-not-allowed'>Clear</button>
            </div>
         </div>
         <div className='text-center'><strong>{date}</strong></div>
        </section>
    )
}

