import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import aboutImage1  from "../assets/Images/aboutUslanding.webp"

import journey from "../assets/Images/ourjourney.svg"

import Footer from "../components/core/HomePage/Footer"
const AboutPage = () => {
  return (
    <div className=' bg-richblack-900'>
        
    <div className='border-b border-richblack-600 pb-[6rem]'>
        <div className="lg:mt-[3rem] md:mt-[3rem] sm:mt-[2rem] w-11/12 text-xl md:text-4xl font-semibold mx-auto py-5 pb-20 text-center text-white">
            We are passionate about revolutionizing the way we learn. Our
            innovative platform <HighlightText text={"combines technology"} />,{" "}
            <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold">
                {" "}
                expertise
            </span>
            , and community to create an
            <span className="bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold">
                {" "}
                unparalleled educational
            experience.
            </span> 
        </div>
        <img   src={aboutImage1} alt="about us image" />

        <section className="">
        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white">
          <header className="mx-auto py-20 text-4xl font-semibold lg:w-[70%]">
            Driving Innovation in Online Education for a
            <HighlightText text={"Brighter Future"} />
            <p className="mx-auto mt-3 text-center text-[18px] leading-6 font-medium text-richblack-300 lg:w-[95%]">
              Studynotion is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </header>     
        </div>
        
      </section>
    </div>

    <div className='pt-16 w-11/12 mx-auto flex md:flex-col lg:flex-row sm:flex-col justify-between items-center  gap-[4rem]'>
            <div className=' flex flex-col gap-10 lg:w-[50%] p-10 text-[18px]'>
                <h2 className='text-4xl font-bold bg-gradient-to-b from-[#ff2f82] to-[#f04b19] text-transparent bg-clip-text font-bold"'>Our Founding Story</h2>
                <p className=' text-richblack-400'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                <p className='lg:block md:block sm:hidden text-richblack-400'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
            </div>
            <div>
                
                <img src={journey}  className=' scale-[80%] '/>
            </div>
    </div>

    <div className='mt-16 pt-16 w-11/12 mx-auto flex md:flex-col lg:flex-row sm:flex-col justify-between items-center  gap-[4rem]'>
            <div className=' flex flex-col gap-10 lg:w-[40%] p-10 text-[18px]'>
                <h2 className='text-4xl font-bold bg-gradient-to-b from-[#ff12c8] to-[#ff0e6b] text-transparent bg-clip-text font-bold"'>Our Vision</h2>
                <p className=' text-richblack-400'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
            </div>
            <div className=' flex flex-col gap-10 lg:w-[40%] p-10 text-[18px]'>
                <h2 className='text-4xl font-bold bg-gradient-to-b from-[#8bbde9] to-[#4489d3] text-transparent bg-clip-text font-bold"'>Our Mission</h2>
                <p className=' text-richblack-400'>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
            </div>
           
    </div>

    <div className='bg-richblack-700   mt-16 flex sm:flex-col lg:flex-row md:flex-row  p-10 justify-center md:gap-[9rem]  sm:gap-[2rem] lg:gap-[17rem] items-center'>
        <div className='flex md:gap-[5rem] lg:gap-[10rem] sm:gap-[5rem]'>
            <div className='flex flex-col justify-center items-center'>
                <h2 className='lg:text-4xl md:text-4xl sm:text-lg text-white font-bold'>5K</h2>
                <p className='text-lg md:text-lg sm:text-[12px] text-richblack-400'>Active Students</p>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <h2 className='lg:text-4xl md:text-4xl sm:text-lg text-white font-bold'>10+</h2>
                <p className='lg:text-lg md:text-lg sm:text-[12px] text-richblack-400'>Mentors</p>
            </div>
            </div>
            <div className='flex  md:gap-[5rem] sm:gap-[7rem] lg:gap-[10rem]'>
            <div className='flex flex-col justify-center items-center'>
                <h2 className='lg:text-4xl md:text-4xl sm:text-lg text-white font-bold'>200+</h2>
                <p className='lg:text-lg md:text-lg sm:text-[12px] text-richblack-400'>Courses</p>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <h2 className='lg:text-4xl md:text-4xl sm:text-lg text-white font-bold'>50+</h2>
                <p className='lg:text-lg md:text-lg sm:text-[12px] text-richblack-400'>Awards</p>
            </div>
            </div>
    
    </div>

    <Footer/>


</div>
    
  )
}

export default AboutPage