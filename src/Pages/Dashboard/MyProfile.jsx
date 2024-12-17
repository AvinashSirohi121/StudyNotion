import React from 'react'
import EditButton from '../../components/Dashboard/EditButton'
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import User from "../../assets/Images/user.png"
import { RiEditBoxLine } from "react-icons/ri"
import IconBtn from '../../components/Dashboard/Iconbtn';
const MyProfile = () => {

  const navigate = useNavigate();
  const {user} = useSelector((state)=>state.profile);


  

  return (
    <div className='text-white flex flex-col '>
        <Link className='w-[80px] flex gap-2 items-center mb-2 hover:text-yellow-50' onClick={()=>navigate(-1)}><FaArrowLeft/>Back</Link>
        <h2 className='text-2xl mt-[2rem]'>
          My Profile
        </h2>
        <div className='mt-[3rem] bg-richblack-800 p-[2rem] rounded-lg px-8 flex justify-between items-center border-[1px] border-richblack-600'>
          <div className='flex gap-4 w-[80%]  items-center px-4'>
          <img src={user?.image ?
              user?.image : user?.firstName && user?.lastName ?
              `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName} ${user?.lastName}` : User}
              alt={`Profile -${user?.firstName}`} 
          className='h-[5rem] w-[5rem] rounded-full  '/>

          <div className=''>
            <p className='font-bold text-lg'>{`${user?.firstName} ${user?.lastName}`}</p>
            <p className='text-richblack-400 '>{`${user?.email}`}</p>
          </div>
          </div>

          

          <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/Settings")
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
        </div>

        <div className='flex flex-col mt-[3rem] bg-richblack-800 p-[2rem] rounded-lg px-8 justify-between  border-[1px] border-richblack-600'>
          
         
          
                  <div className='flex justify-between'>
                  <p className='font-bold text-lg'>Personal Details</p>
                  <IconBtn
                  text="Edit"
                  onclick={() => {
                    navigate("/dashboard/Settings")
                  }}
                >
                  <RiEditBoxLine />
                </IconBtn>
                  </div>
              <p className={`text-richblack-400 mt-[3rem] ${user?.additionalDetails?.about ? "" : "italic text-sm text-richblack-200"}`}>{`${user?.additionalDetails?.about ?  user?.additionalDetails?.about :`Please write about youself...`}`}</p>
          
         

         

          
        </div>

        <div className='flex flex-col mt-[3rem] bg-richblack-800 p-[2rem] rounded-lg px-8 justify-between  border-[1px] border-richblack-600'>
         
         <div className='flex justify-between'>
          <p className='font-bold text-lg'>Personal Details</p>
          <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/Settings")
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
          </div>


         <div className='mt-[3rem]'>
            <div className='flex flex-col gap-4'>
                <div className='flex  gap-6  h-[5rem] w-[100%]'>
                      <div className='min-w-[50%]'>
                        <p className='text-sm text-richblack-400'>First Name</p>
                        <p>{`${user?.firstName}`}</p>
                      </div>
                      <div className='min-w-[50%]'>
                        <p className='text-sm text-richblack-400'>Last Name</p>
                        <p>{`${user?.lastName}`}</p>
                      </div>
                  </div>
            </div>
            <div className='flex flex-col gap-4'>
                <div className='flex  gap-6  h-[5rem] w-[100%]'>
                      <div className='min-w-[50%]'>
                        <p className='text-sm text-richblack-400'>Email</p>
                        <p>{`${user?.email}`}</p>
                      </div>
                      <div className='min-w-[50%]'>
                        <p className='text-sm text-richblack-400'>Phone Number</p>
                        <p>{`+ ${String(user?.contactNumber).slice(0,2)} - ${String(user?.contactNumber).slice(2)}`}</p>
                      </div>
                  </div>
            </div>
            <div className='flex flex-col gap-4'>
                <div className='flex  gap-6  h-[5rem] w-[100%]'>
                      <div className='min-w-[50%]'>
                        <p className={`text-sm text-richblack-400  `}>Gender</p>
                        <p className={`${user?.additionalDetails?.gender ? "" : "italic text-sm text-richblack-200 ml-2"}`}>{`${user?.additionalDetails?.gender ? user?.additionalDetails?.gender : `-NA-`}`}</p>
                      </div>
                      <div className='min-w-[50%]'>
                        <p className='text-sm text-richblack-400'>Date of Birth</p>
                        <p className={`${user?.additionalDetails?.dob ? "" : "italic text-sm text-richblack-200 ml-2"}`}>
                        {`${user?.additionalDetails?.dob ? user?.additionalDetails?.dob : `-NA-`}`}
                        </p>
                      </div>
                  </div>
            </div>
          </div>
        </div>
         

       
    </div>
  )
}

export default MyProfile