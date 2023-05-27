export default function GeneralSearchResult({filteredPosts, searchResultHandler}){
 
    return(
      <>
      <div style={{zIndex:999}}>
         {filteredPosts.length>0? filteredPosts.map((post)=>{
           return (
            <div onClick={()=>searchResultHandler(post.title)}
              className="text-center border mt-3 hover:bg-black/80 hover:text-white cursor-pointer" 
              key={post.id}>
              {post.title}
            </div>)
         }):
         <div className="text-center font-bold text-3xl">
            Nothing here
         </div>
         }
      </div>
      </>)
  }