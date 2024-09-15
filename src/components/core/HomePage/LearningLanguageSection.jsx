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

      <div className='flex flex-row items-center justify-center mt-5'>
            <img src={KnowYourProgress} alt="Know Your Progress" className='object-contain mr-[-120px]'/>
            <img src={CompareWithOthers} alt="Compare with others" className='object-contain'/>
            <img src={PlanYourLessons} alt="Plan Your Lessons" className='object-contain ml-[-150px]'/>
      </div>
      <div className="items-center justify-center flex mb-[50px]">
      <CTAButton  active={"true"} linkto={"/signup"}>Learn More</CTAButton>
      </div>
    </div>
  )
}

export default LearningLanguageSection