import React from 'react'
import { MdNavigateNext } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { setStep } from '../../../../slices/courseSlice';

const CoursebuilderForm = () => {

  const dispatch = useDispatch();
  return (
    <div className='text-white'>
      <div className='mt-4 flex gap-3 justify-end'>  
                            
                  <button 
                    onClick={()=>dispatch(setStep(1))}
                    className='   h-[35px] px-2 lg:mr-3 flex items-center justify-between  bottom-0 rounded-lg bg-richblack-400 text-white z-10'> <MdNavigateNext className='rotate-180' /> Back</button>                  
                  
                  {/* <button 
                    onClick={()=>initiateCourse()}
                    className='lg:w-[15%]   h-[35px] px-2 lg:mr-3 flex items-center justify-between  bottom-0 rounded-lg bg-yellow-50 text-black z-10'>{editCourse ? "Save Changes" :"Next"} <MdNavigateNext /> </button>                   */}
                </div> 
    </div>
  )
}

export default CoursebuilderForm