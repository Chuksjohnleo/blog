import Image from 'next/image';
import Nav from '@/components/nav';
import Editor from '@/components/editor';
import Footer from '@/components/footer';
import Meta from '@/components/meta';
import Head from 'next/head';


export default function Home() {
  const trendingPosts = [];
  const latestPosts = [];

  for(let i=0;i<10;i++){
    if(i<7){
      latestPosts.push(`latest post ${i}`)
    }
    trendingPosts.push(`trending post ${i}`)
  }
  return (
    <>
      <Head>
            <Meta 
              
              ogImage={'/favicon_io/favicon-32x32.png'} 
              title={'Write a new post | TheBlogging'} 
              description={`Everything you have to know about
               a website.`} />
           
      </Head>
      <div>
          <Nav path='writePost' />
          <main className='m-auto max-w-3xl break-words'>
           <Editor />
          </main>
          <div>
            <Footer />
          </div>
      </div>
    </>
  )
}
