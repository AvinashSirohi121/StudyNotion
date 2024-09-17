import React from 'react'
import CTAButton from  "../HomePage/Button";
import { Link } from 'react-router-dom';
import {FaArrowRight}  from "react-icons/fa";
import HighlightText from './HighlightText';
import { TypeAnimation } from 'react-type-animation';


const CodeBlocks = ({position, heading, subHeading, ctabtn1, ctabtn2,codeblock, backgroundGradinet, codeColor,codeSpeed }) => {
  return (
    <div className={ ` w-[10/12]  flex flex-row ${position} my-20 justify-between gap-10`}>
        {/*Section1*/}
        <div className='lg:w-[50%] md:w-[70%] sm:w-[70%] flex flex-col gap-8'>{heading}
            <div className='text-richblack-300 text-[16px] leading-[24px] font-[500] t'>{subHeading}</div>

            <div className='flex flex-row gap-7 mt-7 sm:ml-[-30px] '>
                <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                    <div className='flex gap-2 items-center'>{ctabtn1.btntext}
                        <FaArrowRight/>
                    </div>
                </CTAButton>
                <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                   {ctabtn2.btntext}
                    
                </CTAButton>
            </div>
        </div>

        {/* Section 2 */}
       
        {/* Section 2 */}
        <div className='flex items-start   relative  bg-richblack-800/50 flex flex-row text-[10px] w-[100%] py-4 lg:w-[500px] border-[1px] border-richblack-600/50 rounded-md'>
          {/* Misty Blue Shadow */}
          <div className='absolute inset-0 z-0 shadow-[0px_10px_30px_rgba(0, 0, 255, 0.2), 0px_20px_60px_rgba(0, 0, 255, 0.2), 0px_30px_90px_rgba(0, 0, 255, 0.2)] blur-2xl'></div>
          
          {/* Line Numbers */}
          <div className='relative z-10 h-fit text-center flex flex-col w-[10%] select-none text-richblack-400 font-inter font-bold'>
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i}>
                <p>{i + 1}</p> {/* Match line height */}
              </div>
            ))}
          </div>

          {/* Code Block */}
          <div className={`relative z-10 w-[90%] flex flex-col font-inter font-bold ${codeColor}`}>
            <TypeAnimation 
              sequence={[codeblock, 1000, ""]}
              repeat={Infinity}
              cursor={true}
              speed={codeSpeed}
              style={{ whiteSpace: "pre-line", display: "block", height: "auto" }}
            />
          </div>
        </div>



          
          


    </div>
  )
}

export default CodeBlocks