import React, { useEffect, useState } from "react";
import Progress from "./progress";
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(import('react-quill'), {ssr: false  });





export default function CommentEditor({addToComments, post, handleEditor}) {
 
  const [content, setContent] = useState(`wait  - compiling...
  event - compiled client and server successfully in 4.9s (314 modules)
  wait  - compiling...
  event - compiled client and server successfully in 3.7s (314 modules)
  wait  - compiling...
  event - compiled client and server successfully in 3.9s (314 modules)

  Comments nke m
  `);
  const [userId,setUserId] = useState('U1');
  const [username,setUsername] = useState('Chuks Commenter');
  const [status,setStatus] = useState(false);
  const [progress,setProgress] = useState(false);
 
  
  
 
const quillRef = React.useRef(null);

function test() {
  quillRef.current.scrollIntoView()
  };

function handleChange(value) {
  
    setContent(value);
    localStorage.setItem(post.id.toString(),value);
 };


function changeBg() {
  const blank =  document.querySelector('.ql-blank');
  const toolbar =  document.querySelector('.ql-toolbar');
    if (theme.theme === 'light'){
      setTheme({theme:"dark",backgroundColor:"rgb(10,30,50)",color:"white"})
      blank?.classList.add('ql-placeholder');
      toolbar?.classList.add('ed');
    }else{
      blank?.classList.remove('ql-placeholder');
      toolbar?.classList.remove('ed');
      setTheme({theme:"light",backgroundColor:"white",color:"black"});
   } 
}

// function save(){
//   const parser = new DOMParser();
//   const doc = parser.parseFromString(content,"text/html");
//   const body = doc.childNodes[0].childNodes[1];
// }


function comment(){
  location.href+'/kli'
  console.log(location.href)
 setProgress(true);
  fetch('/api/save-comment',{
    method:'post',
    headers:{'Content-Type':'application/json'},
    body : JSON.stringify({
      postId: post.id,
      category: post.category,
      comment: content,
      commenter: username,
      commenterId: userId
   })
  })
  .then(r=>r.json())
    .then(response=>{
      if(response.comment){
        console.log(response)
        setProgress(false);
        setStatus(true);
        localStorage.setItem('text',response.comment);
        handleEditor();
        addToComments(response.comment)
        // setTimeout(()=>location.reload(),5000)
      }else{
        setProgress(false);
        setStatus(false);
      }
    })
    .catch(e=>{
      console.log('error:'+e);
      handleEditor();
      setStatus(false);
      setProgress(false);
    })
}

useEffect(()=>{
  if(localStorage.getItem('userdata')){
    const userdata = JSON.parse(localStorage.getItem('userdata'));
    console.log(userdata,userId,username);
    setUserId(userdata.userId);
    setUsername(`${userdata.firstname} ${userdata.surname}`);
  }
 if(localStorage.getItem(post.id.toString())){
  setContent(localStorage.getItem(post.id.toString()));
}

},[]);

useEffect(()=>{
  console.log(content)
  var encoder = new TextEncoder();
  var contentSize = encoder.encode(content).byteLength;
  console.log(contentSize/1024 + ' kb');
  console.log(localStorage.getItem(post.id.toString()))
},[content]);

// const modules = {
//   toolbar: {
//   container:[
//         [{header:[1,2,3,4,5,6]}],
//         [{'font':[]}],
//         [{'size': []}],
//         ['bold', 'italic', 'underline', 'strike','code-block',
//          'blockquote',{'background':[]},{'color':[]},'code'],
//         [{'list': 'ordered'}, {'list': 'bullet'},
//          {'indent': '-1'}, {'indent': '+1'}],
//          [{'align':[]}],
//         ['link', 'image', 'video','formula']
//       ]
//    }
//   };

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
  
return (
   <div>
     <div className='border border-black bg-white m-[1px]'>
      <div className='mx-3'>
        <div id="writePost" ref={quillRef} >
          <ReactQuill  
           placeholder="Write your comment here"
           value={content}
           modules={modules}
           onChange={handleChange} 
          /> 
          <div className=''>1/5mb</div>
        </div>
        {progress===true?
              <div className='text-center text-3xl font-bold  animate-pulse'>
                Submitting<span className='animate-color delay-200 font-extrabold'>.</span><span className='animate-pulse delay-500 font-extrabold'>.</span><span className='animate-pulse delay-200 font-extrabold'>.</span>
              </div>
              :''}
        <div className='flex justify-center'> 
         <button onClick={comment}  disabled={progress?true:false} className={'flex justify-center enabled:hover:fill-white w-[150px] border border-black m-1 p-1 text-2xl font-bold enabled:hover:bg-black disabled:bg-black/5 hover:text-white disabled:cursor-not-allowed'} >
          {progress===true?<Progress height='25px' color='white' status={status} />:'Submit'}
         </button>
        </div>
        <div className='flex justify-around'> 
          <button onClick={()=>setContent('')} disabled={progress?true:false} className='border w-[80px] border-red-500 text-red-500 m-1 p-1 font-bold enabled:hover:bg-red-500 enabled:hover:text-white disabled:bg-black/5 disabled:cursor-not-allowed' >Clear</button>
          <button onClick={handleEditor} disabled={progress?true:false} className='border w-[80px] border-black m-1 p-1 font-bold enabled:hover:bg-black enabled:hover:text-white disabled:bg-black/5 disabled:cursor-not-allowed'>Cancel</button>
        </div>
      </div>
     </div>
   </div>
  );
}
