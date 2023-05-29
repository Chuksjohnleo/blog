import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import icon from './images/photom.jpg';
import ConfirmModal from './confirmModal';
import Progress from "./progress";
import Status from "./status";
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(import('react-quill'), {ssr: false  });


export default function PostEditor({post}){
    const [content, setContent] = useState('');
    const [title,setTitle] = useState('');
    const [description, setDescription] = useState('description');
    const [descriptionCounter,setDescriptionCounter] = useState(0);
    const [category, setCategory] = useState(post.category);
    const [contentLength, setContentLength] = useState(0);
    const [date, setDate] = useState('');
    const [modal,setModal] = useState('closed');
    const [modalStatus, setModalStatus] = useState('no');
    const [error, setError] = useState({status:false, info: ''});
    const [progress,setProgress] = useState(false);
    const [status, setStatus] = useState(false);
    const [user, setUser] = useState({username: 'Ck N', userId: 'U1'});
    const [postId, setPostId] = useState('');
    const [descriptionCountColour, setDescriptionCountColour] = useState('text-blue-800');
    const [postStatus, setPostStatus] = useState('');
    const [ contentImageCount,  setContentImageCount] = useState(post.images.length)

    //start 
    
    const blogPosts = [
      {
        title: "The Importance of Cybersecurity in the Digital Age",
        description: "Learn about the increasing importance of cybersecurity in today's digital landscape and discover best practices to protect your data and privacy."
      },
      {
        title: "Demystifying Blockchain: A Comprehensive Guide for Beginners",
        description: "Explore the fundamentals of blockchain technology, its potential applications, and understand how it works behind popular cryptocurrencies like Bitcoin and Ethereum."
      },
      {
        title: "Artificial Intelligence: Transforming Industries and Driving Innovation",
        description: "Discover the revolutionary impact of artificial intelligence across various industries, including healthcare, finance, and transportation, and explore its potential future advancements."
      },
      {
        title: "Cloud Computing: Simplifying IT Infrastructure and Enabling Scalability",
        description: "Learn about the benefits of cloud computing, including cost savings, flexibility, and scalability, and explore different cloud service models like SaaS, PaaS, and IaaS."
      },
      {
        title: "The Rise of Internet of Things (IoT) and its Implications",
        description: "Understand how the Internet of Things is reshaping the world around us, from smart homes and wearable devices to industrial automation, and explore its challenges and opportunities."
      },
      {
        title: "Data Science: Unlocking Insights from Big Data",
        description: "Discover the field of data science and its role in extracting valuable insights from large datasets, including popular techniques such as machine learning and data visualization."
      },
      {
        title: "User Experience (UX) Design: Creating Engaging Digital Experiences",
        description: "Learn about the principles and best practices of user experience (UX) design, and understand how to create intuitive and delightful digital experiences for users."
      },
      {
        title: "Introduction to DevOps: Bridging the Gap between Development and Operations",
        description: "Explore the principles of DevOps, its benefits in software development, and learn about popular tools and practices used to automate and streamline the software delivery process."
      },
      {
        title: "Mobile App Development: Choosing the Right Framework for Your Project",
        description: "Discover different mobile app development frameworks like React Native, Flutter, and native development, and learn how to choose the right framework for your project requirements."
      },
      {
        title: "The Power of Data Analytics: Making Informed Business Decisions",
        description: "Understand the role of data analytics in driving business growth and making data-driven decisions, and explore popular analytics techniques and tools used in the industry."
      },
      {
        title: "Introduction to Machine Learning: A Beginner's Guide",
        description: "Get started with machine learning and understand its basic concepts, algorithms, and applications, and explore popular libraries and frameworks like TensorFlow and scikit-learn."
      },
      {
        title: "Cybersecurity Best Practices for Remote Work",
        description: "Learn essential cybersecurity practices to secure your remote work environment, including tips on secure remote access, strong authentication, and protecting sensitive data."
      },
      {
        title: "The Evolution of E-commerce: Trends and Innovations",
        description: "Explore the latest trends and innovations in e-commerce, including mobile commerce, personalized recommendations, and emerging technologies like augmented reality (AR) and virtual reality (VR)."
      },
      {
        title: "Understanding APIs: The Building Blocks of Modern Web Development",
        description: "Learn the fundamentals of Application Programming Interfaces (APIs), their role in web development, and how to consume and build APIs using popular technologies like REST and GraphQL."
      },
    {
        title: "The Future of Robotics: Advancements and Applications",
        description: "Discover the latest advancements in robotics technology, from autonomous vehicles and drones to robotic surgery, and explore the potential impact on various industries."
      },
      {
        title: "Introduction to Agile Software Development Methodology",
        description: "Learn about the principles and practices of Agile software development, including Scrum and Kanban, and understand how it promotes collaboration, adaptability, and iterative development."
      },
      {
        title: "Cybersecurity Threats: Staying Ahead of Emerging Risks",
        description: "Stay informed about the latest cybersecurity threats, such as ransomware, phishing, and social engineering, and explore strategies to protect yourself and your organization."
      },
      {
        title: "Data Privacy in the Digital Era: A Comprehensive Guide",
        description: "Understand the importance of data privacy in today's digital era, explore privacy regulations like GDPR and CCPA, and learn best practices for safeguarding personal information."
      },
      {
        title: "Introduction to Quantum Computing: Exploring the Future of Computation",
        description: "Get an introduction to the exciting field of quantum computing, understand its principles, and explore its potential applications in solving complex problems."
      },
      {
        title: "Frontend Development: Trends and Tools for Modern Web Applications",
        description: "Stay updated with the latest trends and tools in frontend development, including frameworks like React and Vue.js, and learn how to build interactive and responsive web applications."
      },
      {
        title: "Securing Web Applications: Best Practices for Developers",
        description: "Discover essential security practices for developing secure web applications, including input validation, proper authentication, and protection against common vulnerabilities."
      },
      {
        title: "The Power of Data Visualization: Communicating Insights Effectively",
        description: "Learn how to present data effectively using data visualization techniques, including charts, graphs, and interactive dashboards, to communicate insights and drive decision-making."
      },
      {
        title: "Big Data: Handling and Analyzing Large Datasets",
        description: "Explore the challenges and techniques involved in handling and analyzing big data, including distributed computing frameworks like Hadoop and Spark."
      },
      {
        title: "Introduction to UI Design: Creating Beautiful and Usable Interfaces",
        description: "Discover the principles and techniques of user interface (UI) design, and learn how to create visually appealing and user-friendly interfaces for websites and applications."
      }
    ];
    
    const postsArray = [`
    "The Future of Artificial Intelligence: Advancements and Implications"
    Artificial Intelligence (AI) has become one of the most exciting and transformative technologies in recent years. Its potential to revolutionize various industries and improve our daily lives is truly remarkable. In this blog post, we'll explore the future of AI, the latest advancements in the field, and the potential implications they bring.
    Advancements in AI are happening at an unprecedented pace. Machine learning algorithms, neural networks, and deep learning techniques have significantly enhanced AI's ability to learn, adapt, and perform complex tasks. We're witnessing breakthroughs in areas such as computer vision, natural language processing, and robotics.
    One of the key areas where AI is making strides is autonomous vehicles. Self-driving cars are becoming a reality, with companies like Tesla and Waymo leading the charge. These vehicles leverage AI algorithms to navigate roads, detect objects, and make real-time decisions. The potential impact of autonomous vehicles on transportation and urban planning is immense, offering increased safety, reduced traffic congestion, and enhanced mobility.
    Another exciting application of AI is in healthcare. AI-powered diagnostic systems can analyze medical images, such as X-rays and MRIs, to detect diseases with high accuracy. AI algorithms can also predict patient outcomes, personalize treatment plans, and assist in drug discovery. The integration of AI in healthcare has the potential to revolutionize medical practices, improve patient outcomes, and reduce healthcare costs.
    However, along with these advancements come ethical and societal implications. The increasing reliance on AI raises concerns about privacy, bias, and job displacement. It's crucial to develop robust frameworks and regulations to address these issues and ensure the responsible and ethical use of AI technology.
    In conclusion, the future of AI holds immense promise. Advancements in machine learning and deep learning are propelling AI into new frontiers, transforming industries and reshaping our world. However, as we embrace these advancements, it's vital to consider the ethical and societal implications and work towards harnessing AI's potential for the greater good.`
   ,
   `  5G Connectivity Revolution
    
   "5G Technology: Unleashing the Power of Connectivity"
   
   The rollout of 5G technology is set to revolutionize the way we connect and interact with the world around us. As the next generation of wireless technology, 5G promises lightning-fast speeds, ultra-low latency, and massive connectivity. In this blog post, we'll delve into the capabilities of 5G and explore its impact on various industries.
   
   First and foremost, 5G technology brings unparalleled speed and bandwidth. With download speeds reaching up to 10 gigabits per second, 5G is set to enable seamless streaming, high-quality video calls, and faster downloads. This enhanced speed will transform the way we consume and share content, unlocking new possibilities in entertainment, gaming, and virtual reality.
   
   Moreover, 5G's ultra-low latency will revolutionize industries such as autonomous vehicles, remote surgery, and industrial automation. With latency as low as 1 millisecond, 5G enables real-time communication and instantaneous response, paving the way for truly immersive experiences and critical applications that require split-second decision-making.
   
   The massive connectivity provided by 5G is another game-changer. With the ability to connect a vast number of devices simultaneously, 5G opens doors for the Internet of Things (IoT) to flourish. Smart cities, smart homes, and smart industries will benefit from the seamless connectivity and data exchange facilitated by 5G, leading to improved efficiency, enhanced productivity, and better quality of life.
   
   However, the widespread deployment of 5G also presents challenges. Building the necessary infrastructure to support 5G networks requires significant investments, including the installation of small cells and the upgrade of existing infrastructure. Additionally, concerns about security and privacy in a hyper-connected world need
 
   to be addressed to ensure the safe and responsible use of 5G technology.
   
   Despite the challenges, the potential benefits of 5G technology are immense. Industries such as healthcare, transportation, manufacturing, and entertainment are expected to undergo transformative changes. For example, in healthcare, 5G can enable remote patient monitoring, telemedicine, and real-time data exchange between medical devices, improving access to healthcare services and enhancing patient care.
   
   In the transportation sector, 5G can power intelligent transportation systems, enabling vehicle-to-vehicle communication, traffic management, and efficient navigation. This can lead to safer roads, reduced congestion, and optimized transportation networks.
   
   The impact of 5G on entertainment and media is equally significant. With the ultra-fast speeds and low latency of 5G, immersive technologies like augmented reality (AR) and virtual reality (VR) will flourish. Users can enjoy seamless AR/VR experiences, interactive gaming, and immersive storytelling like never before.
   
   In conclusion, 5G technology is poised to unleash the power of connectivity and transform various industries. With its high speeds, low latency, and massive connectivity, 5G opens up new possibilities for innovation, efficiency, and user experiences. However, it's crucial to address the challenges associated with 5G deployment and ensure that it is implemented responsibly to maximize its benefits while safeguarding security and privacy.
   `
   ,
   `"The Rise of Edge Computing: Redefining the Future of Computing"
    
   In recent years, edge computing has emerged as a game-changing paradigm in the world of computing. While cloud computing has been the dominant model for data processing and storage, edge computing brings computing power closer to the data source, enabling faster response times, reduced latency, and enhanced privacy. In this blog post, we'll explore the rise of edge computing and its implications for the future of computing.
   
   Traditionally, data processing and storage have been centralized in remote data centers, often far away from the devices generating the data. This approach, while efficient for many applications, can introduce latency issues and bandwidth constraints, especially in scenarios that require real-time processing or involve a massive amount of data.
   
   Edge computing addresses these challenges by moving computation and data storage closer to the edge of the network, closer to where the data is generated. By leveraging local servers, gateways, or edge devices, edge computing minimizes the need to transmit data back and forth to a remote data center, reducing latency and improving response times.
   
   One of the significant advantages of edge computing is its ability to support real-time applications and services. Industries such as autonomous vehicles, smart cities, and industrial automation rely on real-time data processing and decision-making. Edge computing facilitates faster response times, enabling critical applications to function efficiently and reliably.
   
   Furthermore, edge computing enhances privacy and security. By keeping sensitive data local and processing it at the edge, organizations can minimize the risks associated with transmitting sensitive information over the network. This is particularly important in scenarios where data privacy and regulatory compliance are paramount.
   
   The rise of the Internet of Things (IoT) has also fueled the adoption of edge computing. As the number of connected devices continues to grow, edge computing provides a scalable and efficient solution for processing and analyzing data generated by IoT devices.
`
  ]
   
    function getRandomBlogPost() {
      const confirmBeforeAutofill = confirm(
        `
        Do you really want to autofill?
        This will clear previous post content, description 
        and title and replace it with new ones. 
        Click OK if you still want to proceed
      `);
      if(!confirmBeforeAutofill) return;
      const randomIndex = Math.floor(Math.random() * blogPosts.length);
      const randomPostIndex = Math.floor(Math.random() * postsArray.length)
      console.log(blogPosts.length, randomIndex)
      setTitle(blogPosts[randomIndex].title);
      setDescription(blogPosts[randomIndex].description);
      setContent(postsArray[randomPostIndex])
    }
  
    // console.log(randomBlogPost);
    //end


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
         setDescription('');
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
    }

    function handleStatus(value){
      if(value===true){
        setPostStatus('trending');
      }else{
        setPostStatus('');
      }
      console.log(value, postStatus)
    }
    
    function handleDescription(e){
      // if(description.length>200){
      //   setError({status: true, info: 'This description is too much nah'});
      // }
      if(e){
        setDescription(e.target.value);
       }
       localStorage.setItem('description',description);
    }


useEffect(()=>{
  setDescriptionCounter(description.length);
  
  if(description.length>200){
     setError({status: true, info: 'This description is too much nah'})
     setDescriptionCountColour('text-red-800');
   }
  if(description.length<=200){
    setError({status: false, info: ''});
    setDescriptionCountColour('text-blue-800');
 }
 
  if(description.length>=150 && description.length<=200){
   setDescriptionCountColour('text-green-800');
  }
},[description]);

useEffect(()=>{
    console.log(postStatus)
  setContentLength(getLength())
},[content])
    
   function getLength(){
      const parser = new DOMParser();
      const doc = parser.parseFromString(content,"text/html");
      const body = doc.childNodes[0];
      const contentText = body.innerText;
      const images = body.querySelectorAll('img');
      setContentImageCount(images.length);
      function countWords(str) {
        // Remove leading and trailing white spaces
        str = str.trim();
        
        // If the string is empty, return 0
        if (str === '') {
          return 0;
        }
        
        // Split the string by whitespace
        var words = str.split(/\s+/);
        
        // Return the number of words
        return words.length;
      }
      
      // Example usage
      return  countWords(contentText);
   }


    
    function submitPost(){
      console.log(postStatus)
    if(description.length<2){
      setError({status: true, info: 'Little or No description'})
      return console.log('Little or No description')
    }
    if(description.length>200){
      setError({
        status: true, 
        info: `You are yet to delete some text 
        in the description, number of characters in the description must be less than 200
       `})
      return console.log('Little or No description')
    }
    if(category.length<2){
      setError({status: true, info: 'No Category'})
      return console.log('No category')
    }
    // if('a'==='a')  return getLength()
    if(content.length<2){
        setError({status: true, info: 'Low value Content'})
        return;
    }
    if(title.length<2){
        setError({status: true, info: 'No title'})
        return;
    }
    if(contentImageCount>0){
      setError({status: true, info: 'Uploading images not yet available.'})
      return;
    }
    setProgress(true);
    if(error.status === true)setError({status: false, info: ''});
    fetch('/api/edit-post',{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body : JSON.stringify({
        postId: post.id,
        title: title,
        description: description,
        post: content,
        status: postStatus,
        theLength: getLength(),
        category: category,
        images: post.images
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
        setError({status: true, info: 'An error occured please retry.'});
      })
    }

    useEffect(()=>{
        setTitle(post.title);
        setContent(post.postBody);
        setDescription(post.description);
        setCategory(post.category);
        if(post.status==='trending'){
            document.getElementById('status').click();
            // document.getElementById('status').checked = true;
        }
        console.log(category, post.category)
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
  ['link', 'image', 'video'],                             // text align
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
  'link', 'image', 'code-block','video'
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
            <h1 className='font-extrabold text-3xl m-3'>Edit Post</h1>
            {error.status === true?
                <div style={{zIndex:102}} className='z-50 bg-white text-red-800 sticky text-center text-xl font-bold border m-2 top-2'>
                   <div>An error occurred please retry</div>
                   <div>{error.info}</div>
                   <button className='border-2 p-2 m-2 active:bg-red-800 active:text-white' onClick={()=>setError({status: false, info: ''})}>ok</button>
                </div>
            :''}
       <div className='flex flex-col items-center justify-center mb-2'>
         <label className='text-2xl m-2' htmlFor="categories">Choose category</label>
         <select value={category} className='border-2 focus:outline-none focus:shadow focus:shadow-black' onChange={(e)=>getCategory(e)} id="categories" name="categories">
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
                <textarea id="title" placeholder='Title of the post' cols='15' value={title} className='w-full border-2 p-2 text-2xl focus:outline-none focus:shadow focus:shadow-black' onChange={(e)=>getTitle(e)}></textarea>
            </div>
            
            <div className='flex flex-col items-center justify-center mb-2'>
               <label htmlFor="description" className='text-2xl'>Description</label>
               <textarea id="description" value={description} onInput={(e)=>handleDescription(e)} placeholder="Write a short description of your post. Not less than 1 word and Not more than 100 words" rows={4} className='w-full border-2 p-2 text-xl focus:outline-none focus:shadow focus:shadow-black'></textarea>
               <div className='font-extrabold'>
                  <span className={`${descriptionCountColour}`}>{descriptionCounter}</span><span>/200</span>
                </div>
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
            <div className='font-bold'>
              <span> {contentLength} </span>
              <span> words |</span>
              <span> {contentImageCount} </span>
              <span> images </span>
            </div>
            {progress===true?
              <div className='text-center text-3xl font-bold  animate-pulse'>
                Posting<span className='animate-color delay-200 font-extrabold'>.</span><span className='animate-pulse delay-500 font-extrabold'>.</span><span className='animate-pulse delay-200 font-extrabold'>.</span>
              </div>
              :''}
              <div className='flex justify-center text-xl gap-3 m-1'>
                <label htmlFor='status'>Trending</label>
                <input id='status' onChange={(e)=>handleStatus(e.target.checked)} type='checkbox' />
              </div>
            <div className='flex justify-around m-1'>
                <button className='border-2 p-2 font-extrabold text-2xl active:bg-black active:text-white' onClick={getRandomBlogPost}>Auto fill</button>
            </div>
            <div className='flex justify-around'>
                <button onClick={submitPost}  disabled={progress?false:false} className={'enabled:hover:fill-white border border-black m-3 p-3 text-2xl font-bold enabled:hover:bg-black disabled:bg-black/20 hover:text-white disabled:cursor-not-allowed'}>
                 {progress===true?<Progress height='50px' color='black' status={status} />:'Post'}
                </button>
                <button onClick={openModal}  disabled={progress?true:false} className='border border-red-500 text-red-500 m-3 p-3 text-2xl font-bold enabled:hover:bg-red-500 enabled:hover:text-white disabled:bg-black/20 disabled:cursor-not-allowed'>Clear</button>
            </div>
         </div>
         <div className='text-center'><strong>{date}</strong></div>
        </section>
    )
}

