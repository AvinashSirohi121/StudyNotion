import React from 'react'
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { accountDeletion } from '../../services/operations/authMethods';


const DeleteProfile = () => {
  const {token} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();

  const deleteAccount=()=>{
      dispatch(accountDeletion(token))
  }
  return (
    <div className='flex mt-[3rem] bg-pink-900 p-[2rem] rounded-lg px-10 gap-5  border-[1px] border-pink-400'>
       <div className='h-[4rem] bg-pink-800 w-[4rem] flex justify-center items-center p-4 rounded-full'>
        <RiDeleteBin5Line className='text-2xl text-pink-100'/>
        </div>
        <div className='text-pink-25 lg:w-[55%] '>
            <p className='text-2xl text-white'>Delete Account</p>
            <p>Would you linke to delete account ?</p>
            <p>This account may contain Paid Courses. Deleting your account is permanent and will remove all the content accociated with it.</p>
            <p className='text-pink-200 italic mt-2 hover:text-pink-50 cursor-pointer' 
              onClick={deleteAccount}>I want to delete my account</p>
        </div>
     </div>   
  )
}

export default DeleteProfile