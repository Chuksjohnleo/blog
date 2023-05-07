import React, {useEffect, useState, useContext} from 'react';
import { HomeContext } from '@/context/context';
import Sidebar from "./sidebar";
import Image from "next/image";
import icon from "./images/iconC.svg";
import Write from "./images/write";
import SearchResult from './result';

export default function Nav({path}) {
console.log(path)
  const context = useContext(HomeContext);
  // console.log(context?.posts);

  const [date, setDate] = useState("");
  const [sidebarWidth, setSidebarWidth] = useState('w-0');
  const [searchBarDisplay, setSearchBarDisplay] = useState('hidden');
  const [filteredPosts, setFilteredPosts] = useState([]);
  
  function filterPosts(e){
   const theFilteredPosts = context.posts.filter(post=>{
      return post.title.toLowerCase().includes(e.target.value.toLowerCase());
    });
   
    setFilteredPosts(theFilteredPosts);
  }

  
  function showAllPostsFromSearchResult(){
     //This function returns all the filtered posts.
    context.handlePosts(filteredPosts);
    setSearchBarDisplay('hidden');
  }

  
  function searchResultHandler(postTitle){
    //This function returns only one post which is the post that
    //has the same title as the post title param above.
    const theFilteredPosts = context.posts.filter(post=>{
        return post.title.includes(postTitle);
      });
      context.handlePosts(theFilteredPosts);//Sets posts to the returned post which is one.
      setSearchBarDisplay('hidden');
    }

  function openAndCloseSidebar(){
     if(sidebarWidth === 'w-0'){
      setSidebarWidth('w-[70vw]');
     }else{
       setSidebarWidth('w-0');
     }
  }

  function openSearchbar(){
      setSearchBarDisplay('flex');
  }

  function closeSearchbar(){
    setSearchBarDisplay('hidden');
  }

  useEffect(() => {
    let date = new Date();
    setDate(date.toDateString());
  }, []);
  return (
    <>
      <header className="z-40 sticky backdrop-blur bg-white/70 inset-0">
        <div className="flex h-[50px] items-center justify-around border-b">
          <div id="burger">
            <button title="Menu" onClick={openAndCloseSidebar} className="hover:bg-black/80 hover:text-white hover:fill-white p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 16 16"
               >
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                ></path>
              </svg>
            </button>
          </div>
          <div className="font-extrabold">TheBlogging</div>
          <div>
            <button title="Profile" className="hover:bg-black/80 hover:text-white hover:fill-white p-2">
            <svg height="30" width="30" viewBox="0 0 248.349 248.349">
              <g>
                <g>
                  <path
                    d="M9.954,241.305h228.441c3.051,0,5.896-1.246,7.805-3.416c1.659-1.882,2.393-4.27,2.078-6.723
		                   c-5.357-41.734-31.019-76.511-66.15-95.053c-14.849,14.849-35.348,24.046-57.953,24.046s-43.105-9.197-57.953-24.046
		                   C31.09,154.65,5.423,189.432,0.071,231.166c-0.315,2.453,0.424,4.846,2.078,6.723C4.058,240.059,6.903,241.305,9.954,241.305z"
                  />
                  <path
                    d="M72.699,127.09c1.333,1.398,2.725,2.73,4.166,4.019c12.586,11.259,29.137,18.166,47.309,18.166
			                 s34.723-6.913,47.309-18.166c1.441-1.289,2.834-2.622,4.166-4.019c1.327-1.398,2.622-2.828,3.84-4.329
			                 c9.861-12.211,15.8-27.717,15.8-44.6c0-39.216-31.906-71.116-71.116-71.116S53.059,38.95,53.059,78.16
			                 c0,16.883,5.939,32.39,15.8,44.6C70.072,124.262,71.366,125.687,72.699,127.09z"
                  />
                </g>
              </g>
            </svg>
            </button>
            {/* <Image alt='picture of the description' src={icon} height={40} width={40} /> */}
          </div>
        </div>
          {/* first row ends */}
        {path==='home'?<div className={`${searchBarDisplay}`}>
            <button title="Cancel search" onClick={closeSearchbar} className="border-l bg-black/20 active:fill-white active:bg-black">
               <svg width="40" height="40" viewBox="0 0 512 512">
                 <g id="Page-1" stroke="none" strokeWidth="1" fillRule="evenodd">
                   <g id="work-case" transform="translate(91.520000, 91.520000)">
                    <polygon id="Close" points="328.96 30.2933333 298.666667 1.42108547e-14 164.48 134.4 30.2933333 1.42108547e-14 1.42108547e-14 30.2933333 134.4 164.48 1.42108547e-14 298.666667 30.2933333 328.96 164.48 194.56 298.666667 328.96 328.96 298.666667 194.56 164.48">
                    </polygon>
                   </g>
                 </g>
               </svg>
           </button>
           <input onInput={(e)=>filterPosts(e)} className="focus:outline-black/50 w-full text-center" type='text' placeholder="what do you want to search?" />
           <button onClick={showAllPostsFromSearchResult} className="border-l bg-black/20 active:stroke-white active:fill-black active:bg-black">
            <svg className="stroke-black fill-transparent active:stroke-white active:fill-black" width="40" height="30" viewBox="0 0 24 24">
              <g id="Interface / Search_Magnifying_Glass">
               <path id="Vector" d="M15 15L21 21M10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
            </svg>
           </button>
           <div className='fixed top-[90px] overflow-auto max-h-[60vh] p-2 font-semibold border w-full bg-white'> 
             <SearchResult searchResultHandler={searchResultHandler} filteredPosts={filteredPosts} /> 
           </div>
        </div>:''}
        {/* <div className='fixed top-[90px] overflow-auto max-h-[60vh] p-2 font-semibold border w-full bg-red-800'> <SearchResult postTitles={postTitles} /> </div> */}
          {/* second row ends */}
        <div className="flex justify-around border-t border-b items-center">
          <a title="Home" className="hover:bg-black/80 font-bold p-1 hover:fill-white hover:text-white" href="/">
           <svg width="40" height="30" viewBox="0 0 1024 1024">
            <path d="M972 520.8c-6.4 0-12-2.4-16.8-7.2L530.4 86.4c-4.8-4.8-11.2-8-18.4-8-6.4 0-12.8 2.4-18.4 8L68.8 512c-4.8 4.8-10.4 7.2-16.8 7.2s-12-2.4-16-6.4c-4.8-4-7.2-8.8-7.2-15.2-0.8-7.2 2.4-14.4 7.2-19.2L458.4 52.8c14.4-14.4 32.8-22.4 52.8-22.4s38.4 8 52.8 22.4L988.8 480c4.8 4.8 7.2 11.2 7.2 18.4 0 7.2-4 13.6-8.8 17.6-4.8 3.2-10.4 4.8-15.2 4.8z" />
            <path d="M637.6 998.4v-33.6h-33.6V904c0-51.2-41.6-92-92-92-51.2 0-92 41.6-92 92v60.8h-33.6v33.6H196.8c-40.8 0-73.6-32.8-73.6-73.6V509.6c0-13.6 10.4-24 24-24s24 10.4 24 24v415.2c0 14.4 11.2 25.6 25.6 25.6h175.2v-45.6c0-77.6 63.2-140 140-140s140 63.2 140 140v45.6h175.2c14.4 0 25.6-11.2 25.6-25.6V509.6c0-13.6 10.4-24 24-24s24 10.4 24 24v415.2c0 40.8-32.8 73.6-73.6 73.6H637.6z" />
            <path d="M604 998.4v-48h48v48h-48z m-232 0v-48h48v48h-48z" />
           </svg>
          </a>
          {path!=='writePost'?
          <a title="Write a new post" className="hover:bg-black/80 font-bold p-1 hover:text-white hover:fill-white" href="/write-post">
            <Write />
          </a>
          :''}
          <a title="View all posts" className="hover:bg-black/80 font-bold p-1 hover:text-white hover:fill-white" href="/posts">
          <svg width="40" height="30" viewBox="0 0 24 24">
           <path d="M7 5C5.34315 5 4 6.34315 4 8V16C4 17.6569 5.34315 19 7 19H17C18.6569 19 20 17.6569 20 16V12.5C20 11.9477 20.4477 11.5 21 11.5C21.5523 11.5 22 11.9477 22 12.5V16C22 18.7614 19.7614 21 17 21H7C4.23858 21 2 18.7614 2 16V8C2 5.23858 4.23858 3 7 3H10.5C11.0523 3 11.5 3.44772 11.5 4C11.5 4.55228 11.0523 5 10.5 5H7Z"/>
           <path fillRule="evenodd" clipRule="evenodd" d="M18.8431 3.58579C18.0621 2.80474 16.7957 2.80474 16.0147 3.58579L11.6806 7.91992L11.0148 11.9455C10.8917 12.6897 11.537 13.3342 12.281 13.21L16.3011 12.5394L20.6347 8.20582C21.4158 7.42477 21.4158 6.15844 20.6347 5.37739L18.8431 3.58579ZM13.1933 11.0302L13.5489 8.87995L17.4289 5L19.2205 6.7916L15.34 10.6721L13.1933 11.0302Z"/>
          </svg>
          </a>
          {path==='home'?
          <>{searchBarDisplay==='hidden'?
          <button title="Search" onClick={openSearchbar} className="hover:bg-black/80 font-bold p-1 stroke-black hover:stroke-white fill-white hover:fill-transparent hover:text-white">
            <svg width="40" height="30" viewBox="0 0 24 24">
              <g id="Interface / Search_Magnifying_Glass">
               <path id="Vector" d="M15 15L21 21M10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
            </svg>
          </button>:''
          }</>:''}
        </div>
          {/* third row ends */}
        <div>
          <div className="text-center border-b">
            <strong>{date}</strong>
          </div>
        </div>
          {/* last/fourth row ends and sidebar code begins */}
        <div>
          <Sidebar openAndCloseSidebar={openAndCloseSidebar} theWidth={sidebarWidth} />
        </div>
      </header>
    </>
  );
}
