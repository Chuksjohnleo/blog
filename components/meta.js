import React from "react"

export default function MetaInfo({description, title, ogImage, url}){
    return(
        <>
         <link rel="shortcut icon" type="image/x-icon" href="/favicon_io/favicon.ico" />
         <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png" />
         <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png" />
         <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png" />
         <link rel="manifest" href="/favicon_io/site.webmanifest" />
         <meta property="description" content={description} />
         <meta property="og:url" content={'https://blog-pearl-five.vercel.app/'} />
         <meta property="og:type" content="website" />
         <meta property="og:title" content={title} />
         <meta property="og:description" content={description} />
         <meta property="og:image" content={ogImage} />
         <meta name="twitter:site" content="@Chuksjohnleo" />
         <meta name="twitter:card" content="summary_large_image" />
         <meta name="twitter:title" content={title} />
         <meta name="twitter:description" content={description} />
         <meta name="twitter:image" content={ogImage} />
         {/* <title>{title}</title> */}
        </>
    )
}