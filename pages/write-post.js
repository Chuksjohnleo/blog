import Image from 'next/image';
import Nav from '@/components/nav';
import Editor from '@/components/editor';
import Footer from '@/components/footer';
import styles from '../styles/myStyles.module.css';
import Head from 'next/head'

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
        <title>Write Post | thBlogger</title>

      </Head>
      <div>
          <Nav path='writePost' />
          <div className='max-w-500'>
          <Editor />
          </div>
          <div>
            <Footer />
          </div>
      </div>
    </>
  )
}
