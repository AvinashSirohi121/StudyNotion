import React from 'react'
import { Link } from 'react-router-dom';
import {FaArrowRight}  from "react-icons/fa";
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from "../components/core/HomePage/Button";
import Banner from  "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
const Home = () => {
  return (
    <div>
        {/*Section 1*/}

        <div className='group relative mx-auto flex flex-col w-11/12 items-center text-white justify-between'>

            <Link to={"/singup"}>
            <div className=' mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition duration-200 hover:scale-95 w-full'>
                <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition duration-200 group-hover:bg-richblack-900'>
                    <p>Become an Instructor</p> <FaArrowRight/>
                </div>
            </div>
            </Link>

            <div className='text-center text-4xl font-semibold mt-6'>
                Empower Your Future with
                <HighlightText text={"Coding Skills"}/>
            </div>

            <div className='w-[90%] text-center text-lg  text-richblack-300 mt-4'>With our online courses you can learn at your pace, from anywhere in the world and get access to a <br/>
            wealth of resources including hands-on projects, quizzes and personalizes feedback from instructors.</div>

            <div className='flex flex-row gap-7 mt-8'>
                <CTAButton active="true" linkto={"/signup"}>Learn More</CTAButton>
                <CTAButton active="false" linkto={"/login"}>Book a demo</CTAButton>
            </div>

            <div className='shadow-blue-200 mx-3 my-12 w-10/12'>
                <video muted autoPlay loop>
                    <source src={Banner} type="video/mp4"></source>
                 </video>
            </div>

            {/*Code Section 1*/}
            <div className='w-10/12'>
                <CodeBlocks position={"lg:flex-row"}
                heading={<div className='text-4xl font-semibold'>Unlock you <HighlightText text={"coding potential"} /><br/> with our online courses</div>}
                subHeading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                ctabtn1={{
                    btntext:"Try it yourself",
                    active:"true",
                    linkto:"/signup"

                }}
                ctabtn2={{
                    btntext:"Learn more",
                    active:"false",
                    linkto:"/login"

                }}
                codeSpeed={40}
                
                codeblock={"<!DOCTYPE html>\n" +
                            "<html>\n" +
                            "<head>\n" +
                            "    <title>Simple Webpage</title>\n" +
                            "</head>\n" +
                            "<body>\n" +
                            "    <h1>Welcome to My Webpage</h1>\n" +
                            "    <p>This is a basic HTML page created for demonstration purposes.</p>\n" +
                            "    <a href=\"https://www.example.com\">Visit Example</a>\n" +
                            "</body>\n" +
                            "</html>\n"
                            }
                codeColor={"text-yellow-25"}    
                />
            </div>
            {/*Code Section 1*/}
            <div className='w-10/12'>
                <CodeBlocks 
                position={"lg:flex-row-reverse"}
                heading={<div className='text-4xl font-semibold'>Start <HighlightText text={`coding in seconds`} /></div>}
                subHeading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                ctabtn1={{
                    btntext:"Continue Lessons",
                    active:"true",
                    linkto:"/signup"

                }}
                ctabtn2={{
                    btntext:"Learn more",
                    active:"false",
                    linkto:"/login"

                }}
                codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n<link rel="stylesheet" href="styles.css"></link>\n</head>\n<body> \n<h1> <a href="/">Header</a></h1>\n<nav><a href="/one">One</a></nav>\n<nav><a href="/two">Two</a></nav>\n<nav><a href="/three">Three</a></nav>\n</body>\n</html>`}
                codeColor={"text-white"} 
                codeSpeed={75}   
                />
            </div>

        </div>
        {/*Section 2*/}
        {/*Section 3*/}
        {/* Footer  */}
    </div>
  )
}

export default Home