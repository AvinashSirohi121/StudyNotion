import React from 'react'
import LogoFullLight from "../../../assets/Logo/Logo-Full-Light.png"
import { MdOutlineFacebook } from "react-icons/md";
import { FaTwitter } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";
import  {FooterLink2}   from "../../../data/footer-links"


const Footer = () => {
  return (
    <div className=' bg-richblack-800 text-richblack-500 w-full'>
    <div className=" p-10 flex lg:flex-row md:flex-col sm:flex-col  cursor-pointer border-b border-richblack-600 ">
        {/*Left*/}
        <div className='lg:w-[50%] md:w-[100%]  md:pb-3 sm:pb-4 flex lg:flex-row md:flex-row sm:flex-col text-richblack-200 justify-evenly lg:border-r lg:border-b-0 md:border-b sm:border-b border-richblack-600 lg:gap-10 md:gap-8 sm:gap-5'>
            <div className='min-w-[200px] flex flex-col '>
                <img className='mt-3 lg:scale-90 md:scale-[70%] md:ml-[-1rem] lg:ml-0 sm:ml-[-4rem] sm:scale-50 ' src={LogoFullLight} alt="Logo"/>
                <div className='flex flex-col ml-3 mt-4 gap-3 font-thin text-[14px] text-pure-greys-400 '>
                    <h2 className='font-bold text-[16px] text-pure-greys-100 hover:text-white transition-all duration-300'>Company</h2>
                    <p className="hover:text-white transition-all duration-300">About</p>
                    <p className="hover:text-white transition-all duration-300">Affiliates</p>
                    <div className='flex gap-3 text-[20px]'>
                            <MdOutlineFacebook className="hover:text-white transition-all duration-300"/>
                            <FaTwitter className="hover:text-white transition-all duration-300"/>
                            <AiFillInstagram className="hover:text-white transition-all duration-300"/>
                            <FaYoutube className="hover:text-white transition-all duration-300"/>
                    </div>
                </div>
                
            </div>

            <div className='flex lg:flex-row '>
                <div className='min-w-[200px] flex flex-col ml-3 mt-4 gap-3 font-thin text-[14px] text-pure-greys-400 '>
                <h2 className='font-bold text-[16px] text-pure-greys-100'>Resources</h2>
                        <p className="hover:text-white transition-all duration-300">Articles</p>
                        <p className="hover:text-white transition-all duration-300">Blog</p>
                        <p className="hover:text-white transition-all duration-300">Chart Sheeet</p>
                        <p className="hover:text-white transition-all duration-300">Code challanges</p>
                        <p className="hover:text-white transition-all duration-300">Docs</p>
                        <p className="hover:text-white transition-all duration-300">Projects</p>
                        <p className="hover:text-white transition-all duration-300">Videos</p>
                        <p className="hover:text-white transition-all duration-300">Workspaces</p>

                        <h2 className='mt-7 font-bold text-[16px] text-pure-greys-100'>Support</h2>
                        <p className="hover:text-white transition-all duration-300">Help Center</p>
                </div>
                <div className='min-w-[200px] flex flex-col ml-3 mt-4 gap-3 font-thin text-[14px] text-pure-greys-400 '>
                <h2 className='font-bold text-[16px] text-pure-greys-100'>Plans</h2>
                        <p className="hover:text-white transition-all duration-300">Paid memberships</p>
                        <p className="hover:text-white transition-all duration-300">For students</p>
                        <p className="hover:text-white transition-all duration-300">Bussiness solutions</p>
                    

                        <h2 className='mt-7 font-bold text-[16px] text-pure-greys-100'>Community</h2>
                        <p className="hover:text-white transition-all duration-300">Forums</p>
                        <p className="hover:text-white transition-all duration-300">Chapters</p>
                        <p className="hover:text-white transition-all duration-300">Events</p>
                </div>
            </div>
            
            
        </div>


        {/*Right*/}

        <div className='lg:w-[50%] md:w-[100%]  flex lg:flex-row md:flex-row text-richblack-200 justify-evenly lg:gap-10 md:gap-4'>
           
                <div className='min-w-[200px] flex flex-col '>
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-6  bg-gray-900 text-white">
                    {FooterLink2?.map((item, index) => (
                        <div  key={index} className="flex flex-col ml-3 mt-4 gap-3 font-thin text-[14px] text-pure-greys-400">
                        <h2 className="font-bold text-[16px] text-pure-greys-100">{item.title}</h2>
                        {item.links.map((link, linkIndex) => (
                            <p key={linkIndex} className="hover:text-white transition-all duration-300">
                            {link.title}
                            </p>
                        ))}
                        </div>
                    ))}
                </div>
                </div>

         
            
            
        </div>

    </div>

    <div className='p-10 flex lg:flex-row md:flex-row sm:flex-col justify-between mx-auto  sm:gap-3 items-center'>
     <div className='flex gap-2'>
        <p className="hover:text-white transition-all duration-300  pr-2 border-r">Privacy policy</p>
        <p className="hover:text-white transition-all duration-300 pr-2 border-r">Cookies Policy</p>
        <p className="hover:text-white transition-all duration-300 pr-2 ">Terms</p>
      
     </div> 

     <div> <p className="hover:text-white transition-all duration-300"> Made with 💕 by Avinash Sirohi</p></div>  
                 
    </div>

    </div>
  )
}

export default Footer