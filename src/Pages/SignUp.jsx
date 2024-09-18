import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import loginImage from "../assets/Images/Mobile login-bro.svg"
import CTAButton from "../components/core/HomePage/Button"
import { Link } from 'react-router-dom'
import { AiFillStar } from "react-icons/ai";

const SignUp = () => {
  return (
    <div className='text-semibold'>
        <div className='text-white w-10/12 mx-auto mt-16 justify-center flex overflow-x-hidden gap-2'>
           {/* Left Part*/}
            <div className='flex flex-col  p-2'>
                <h2 className='text-4xl'>Join the millions learning to code  <br/> with <HighlightText text={"Studynotion"} /> for free</h2>
                <p className='lg:text-lg md:text-lg sm:text-sm mb-4 mt-2 italic '>Build skills for today, tomorrow, and beyond. <br/>
                <HighlightText className="italic" text={"Education to future-proof your career."}/> </p>

                <div className='lg:mt-10'>
                    <div className='flex lg:flex-row lg:justify-between md:flex-col sm:flex-col  gap-2 md:mb-2 sm:mb-2 lg:mb-4 '>
                        <div className='flex flex-col'>
                            <label className='flex text-sm'>First Name <AiFillStar className='text-[5px]  text-pink-1000'/></label>
                            <input className='h-[40px] lg:w-[18rem] rounded-lg bg-richblack-800 pl-2 border-b border-richblack-400 outline-none mt-1' 
                            placeholder='Enter first name'/>
                        </div>
                        <div className='flex flex-col'>
                        <label className='flex text-sm'>Last Name <AiFillStar className='text-[5px]  text-pink-1000'/></label>
                        <input className='h-[40px]  lg:w-[18rem] rounded-lg bg-richblack-800 pl-2 border-b border-richblack-400 outline-none mt-1' 
                            placeholder='Enter last name'/>
                        </div>
                    </div>

                    <div className='flex flex-col md:mb-2 sm:mb-2 lg:mb-4'>
                            <label className='flex text-sm'>Email Address <AiFillStar className='text-[5px]  text-pink-1000'/></label>
                            <input className='h-[40px] rounded-lg bg-richblack-800 pl-2 border-b border-richblack-400 outline-none mt-1' 
                            placeholder='Enter email address'/>
                        </div>

                    <div className='flex lg:flex-row lg:justify-between md:flex-col sm:flex-col  gap-2 md:mb-2 sm:mb-2 lg:mb-8 '>
                        <div className='flex flex-col'>
                            <label className='flex text-sm'>Password <AiFillStar className='text-[5px]  text-pink-1000'/></label>
                            <input className='h-[40px]   lg:w-[18rem] rounded-lg bg-richblack-800 pl-2 border-b border-richblack-400 outline-none mt-1' 
                            placeholder='Enter password'/>
                        </div>
                        <div className='flex flex-col'>
                        <label className='flex text-sm'>Confirm Password <AiFillStar className='text-[5px]  text-pink-1000'/></label>
                        <input className='h-[40px] rounded-lg  lg:w-[18rem] bg-richblack-800 pl-2 border-b border-richblack-400 outline-none mt-1' 
                            placeholder='Confirm Password'/>
                        </div>
                    </div>
                    
                    <div className='mt-5 flex items-center justify-center'>
                        <CTAButton active={"true"} linkto={"/signup"} className="">Create Account</CTAButton>
                    </div>

                </div>

                <p className='text-richblack-300 flex text-center justify-center mt-2 text-semibold'>Already have account? <Link className='ml-2 text-white hover:text-yellow-50' to="/login"> Login</Link></p>
            </div>
             {/* Right Part*/}
            <div className=''>
                <img  src={loginImage} alt="login page" className='lg:h-[40rem] md:h-[30rem]  ' />
            </div>
        </div>
    </div>
  )
}

export default SignUp