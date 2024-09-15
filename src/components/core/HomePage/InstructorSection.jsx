import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import CTAButton from "../HomePage/Button"
import {FaArrowRight}  from "react-icons/fa";

const InstructorSection = () => {
  return (
    <div >
        <div className='flex flex-row gap-20 items-center mt-14'>
            <div className='w-[50%]'>
                <img src={Instructor} alt="Instructor" className='object-contain shadow-white drop-shadow-2xl' />
            </div>
            <div className='w-[50%] flex flex-col gap-10'>
                <div className='text-4xl font-semibold'>Become an <br/><HighlightText text={"Instructor"}/></div>
                <p className='text-richblack-400 font-medium text-[16px]'>Instructoes from around the world teach millions of students on StudyNotion.<br/>
                    We provide the tools and skills to teach what you love.
                </p>
                <div className='flex items-start'>
                    <CTAButton  active={"true"} linkto={"/signup"}>
                       <div className="flex flex-row items-center gap-2">Start teaching today <FaArrowRight/> </div> 
                    </CTAButton>
                </div>
            </div>

        </div>
    </div>
  )
}

export default InstructorSection