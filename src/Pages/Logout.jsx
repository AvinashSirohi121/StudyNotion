import React from 'react'
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {logout} from "../services/operations/authMethods"

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  return (
    <div className='min-h-[calc(100vh-3.5rem)] grid place-items-center'>
       <div className='max-w-[500px] p-8 lg:p-8 bg-richblack-800 rounded-lg scale-125'>
       <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
           Logout
          </h1>
          <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
           Are you sure you want to logout ?
          </p><div className='flex gap-5'>
           
              
            </div>
            <div className="text-[1.125rem] mt-6 flex items-center justify-between">
            
            <button
                onClick={() =>dispatch(logout(navigate))}
              className="flex items-center justify-center bg-yellow-25 p-4 w-[40%] rounded-lg">
              Confirm
            </button>
            <button
                onClick={()=>navigate(-1)}
              className="flex items-center justify-center text-white bg-richblack-600 p-4 w-[40%]  rounded-lg">
              Cancel
            </button>
          </div>
        </div> 
        
    </div>
  )
}

export default Logout