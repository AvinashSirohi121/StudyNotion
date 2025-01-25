import React from 'react'
import { useDispatch } from 'react-redux'
import { setStep } from '../../../../slices/courseSlice';
import { MdNavigateNext } from 'react-icons/md';

const PublishCourse = () => {
  const dispatch = useDispatch();
  const saveCourseChanges=()=>{
    console.log("Inside SaveCourseChanges")
    //dispatch(setStep(1))
  }
  return (
    <div className='flex justify-center '>
    <div className='w-[60%] bg-richblack-700 text-white p-4 rounded-xl flex-col justify-center items-center'>
      <h2 className='text-2xl font-semibold'>Publish Settings</h2>

      <div className='flex gap-2 mt-5'>
        <input
         type="checkbox" 
         className='w-[20px]'/>
         <p className='text-richblack-300 text-lg'>make this course as public</p>
      </div>

      <div className='mt-4 flex gap-3 justify-end'>  
                                  
                        <button 
                          onClick={()=>dispatch(setStep(2))}
                          className='   h-[35px] px-2 lg:mr-3 flex items-center justify-between  bottom-0 rounded-lg bg-richblack-400 text-white z-10'> <MdNavigateNext className='rotate-180' /> Back</button>                  
                        
                        <button 
                          onClick={()=>saveCourseChanges()}
                          className='   h-[35px] px-2 lg:mr-3 flex items-center justify-between  bottom-0 rounded-lg bg-yellow-50 text-black z-10'>Next <MdNavigateNext /> </button>                  
            </div> 
      
    </div>
    </div>
  )
}

export default PublishCourse