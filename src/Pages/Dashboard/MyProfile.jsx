import React from 'react'
import EditButton from '../../components/Dashboard/EditButton'
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const MyProfile = () => {

  const navigate = useNavigate();

  return (
    <div className='text-white flex flex-col '>
        <Link className='w-[80px] flex gap-2 items-center mb-2 hover:text-yellow-50' onClick={()=>navigate(-1)}><FaArrowLeft/>Back</Link>
        <h2 className='text-2xl mt-[2rem]'>
          My Profile
        </h2>
        <div className='flex  mt-[3rem] bg-richblack-800 p-[2rem] rounded-lg px-8 flex justify-between items-center border-[1px] border-richblack-600'>
          <div className='flex gap-4 w-[80%]  items-center px-4'>
          <img src="" alt="User Image" 
          className='h-[5rem] w-[5rem] rounded-full bg-yellow-200 '/>

          <div className=''>
            <p className='font-bold text-lg'>Avinash Sirohi</p>
            <p className='text-richblack-400 '>avinashsirohi121@gmail.com</p>
          </div>
          </div>

          

          <EditButton/>
        </div>

        <div className='flex  mt-[3rem] bg-richblack-800 p-[2rem] rounded-lg px-8 flex justify-between  border-[1px] border-richblack-600'>
          <div className='flex gap-4 w-[80%]  items-center px-4'>
         
          <div className=''>
            <p className='font-bold text-lg'>About</p>
            <p className='text-richblack-400 mt-[3rem]'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur sunt accusamus eum nam odit ipsum. Laborum quis corporis accusamus eaque, harum nesciunt, modi hic libero omnis ratione error dolorem molestias.</p>
          </div>
          </div>

          

          <EditButton/>
        </div>

        <div className='flex flex-col mt-[3rem] bg-richblack-800 p-[2rem] rounded-lg px-8 flex justify-between  border-[1px] border-richblack-600'>
         
         <div className='flex justify-between'>
          <p className='font-bold text-lg'>Personal Details</p>
          <EditButton/>
          </div>
         <div className='mt-[3rem]'>
            <div className='flex flex-col gap-4'>
                <div className='flex  gap-6  h-[5rem] w-[100%]'>
                      <div className='min-w-[50%]'>
                        <p className='text-sm text-richblack-400'>First Name</p>
                        <p>Avinash</p>
                      </div>
                      <div className='min-w-[50%]'>
                        <p className='text-sm text-richblack-400'>Last Name</p>
                        <p>Sirohi</p>
                      </div>
                  </div>
            </div>
            <div className='flex flex-col gap-4'>
                <div className='flex  gap-6  h-[5rem] w-[100%]'>
                      <div className='min-w-[50%]'>
                        <p className='text-sm text-richblack-400'>Email</p>
                        <p>avinashsirohi86@gmail.com</p>
                      </div>
                      <div className='min-w-[50%]'>
                        <p className='text-sm text-richblack-400'>Phone Number</p>
                        <p>909090909090</p>
                      </div>
                  </div>
            </div>
            <div className='flex flex-col gap-4'>
                <div className='flex  gap-6  h-[5rem] w-[100%]'>
                      <div className='min-w-[50%]'>
                        <p className='text-sm text-richblack-400'>Gender</p>
                        <p>Male</p>
                      </div>
                      <div className='min-w-[50%]'>
                        <p className='text-sm text-richblack-400'>Date of Birth</p>
                        <p>October 24, 1999</p>
                      </div>
                  </div>
            </div>
          </div>
        </div>
         

       
    </div>
  )
}

export default MyProfile