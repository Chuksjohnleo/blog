import Link from 'next/link';
import React from 'react';

const Custom404 = () => {
  return (
    <div className='h-screen gap-2 font-bold flex flex-col items-center justify-center'>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <p className='p-4 m-3'>
        <Link className='border h-full p-4 border-black hover:bg-black hover:text-white' href='/'>Back to home page</Link>
      </p>
    </div>
  );
};

export default Custom404;