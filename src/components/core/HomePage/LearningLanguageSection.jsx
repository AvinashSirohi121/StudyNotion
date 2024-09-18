import React from 'react'
import HighLightText from "./HighlightText"
import KnowYourProgress from "../../../assets/Images/Know_your_progress.png"
import CompareWithOthers from "../../../assets/Images/Compare_with_others.png"
import PlanYourLessons from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from "../HomePage/Button"


const LearningLanguageSection = () => {
  return (
    <div className='mt-[130px]'>
      <div className='flex flex-col'>
        <div className='text-4xl font-semibold text-center'>
          Your Swiss Knife for <HighLightText text={"learning any language "}/>
        </div>

        <div className='text-richblack-600 mx-auto text-base mt-7 text-center font-medium'>Using spin making learning multiple languages easy , with 20+ languages realistic voice-over <br/>
        progress tracking, custome schedule and more.</div>
      </div>

      <div className='flex lg:flex-row md:flex-row sm:flex-col md:scale-[65%] lg:scale-100 sm:scale-[70%] items-center justify-center lg:mt-5 md:mt-5 sm:mt-[-5rem]'>
            <img src={KnowYourProgress} alt="Know Your Progress" className='object-contain mr-[-120px] '/>
            <img src={CompareWithOthers} alt="Compare with others" className='object-contain sm:mt-[-5rem]'/>
            <img src={PlanYourLessons} alt="Plan Your Lessons" className='object-contain ml-[-8rem] sm:ml-[2rem] sm:mt-[-6rem] lg:mt-5 lg:ml-[-8rem] md:ml-[-8rem] sm:scale-125 lg:scale-100 md:scale-100'/>

      </div>
      <div className="items-center justify-center flex mb-[50px] lg:mt-0 md:mt-0 sm:mt-[-5rem]">
      <CTAButton  active={"true"} linkto={"/signup"}>Learn More</CTAButton>
      </div>
    </div>
  )
}

export default LearningLanguageSection