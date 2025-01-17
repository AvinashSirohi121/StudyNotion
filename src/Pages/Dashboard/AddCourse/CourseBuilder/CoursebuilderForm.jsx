import React,{useState,useEffect} from 'react'
import { MdNavigateNext } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { setStep,setCourse } from '../../../../slices/courseSlice';
import useValidation from '../../../../services/hooks/useValidation';
import {AiFillStar} from "react-icons/ai"
import { IoMdAddCircleOutline } from "react-icons/io";
import { createSection } from '../../../../services/operations/sectionMethod';
import toast from 'react-hot-toast';

const CoursebuilderForm = () => {

  const dispatch = useDispatch();
  const [section,setSection]= useState({section:""});
  const {validate,validateAll,setErrors,errors} = useValidation();
  const {course} = useSelector((state)=>state.course);
  const {token} = useSelector((state)=>state.auth);
  const handleChange =(e)=>{
    const {name,value} = e.target;
    const error = validate(name,value,section);
   // console.log("Name =>",name," Value =>",value)

    setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
      }));
     
      // Update data state
      
        setSection((prevData) => ({
          ...prevData,
          [name]: value,
      }));
      
      
  }

  console.log("Course =>",course)

  const addSection =async()=>{
    console.log("CurrentCourse Id=>",course._id);
    console.log("Section =>",section)
    let formData = new FormData();
    if(section.section ==""){
      toast.error("Please enter Section Name",{duration:3000});
    }
    else{
      formData.append('sectionName',section?.section)
      formData.append('courseId',course?._id)
        try {
            let data = await createSection(token,formData)
            console.log("Creating Section Data =>",data)
            if(data){
              setSection({section:""});
              dispatch(setCourse(data))
              toast.success("Section Created successfully",{duration:3000})
            }
        } catch (error) {
          console.log("Failed to Creation Section =>",error)
        }
    }
  }
  return (
    <div className='text-white'>
      <div className='mt-5 bg-richblack-700 rounded-xl py-2 px-3'>
        <h2 className='text-2xl ml-3'>Course Builder</h2>
        <div className='flex-col items-end p-3'>
       
        
          <label className='flex tracking-wider  text-sm'>Course Title <AiFillStar className='text-[5px] ml-2 text-pink-1000'/></label>
          <div className='flex items-center gap-5'>
          <input 
             name="section"
             value={section.section}
             onChange={(e)=>handleChange(e)}
             className='h-[40px] lg:w-[80%] md:w-[70%] rounded-lg bg-richblack-800 pl-2 border-b border-richblack-400 outline-none mt-1' 
             placeholder='Enter Section Name'/>
             {errors.section && <span className="text-[10px]  text-pink-1000">{errors.section}</span>}

             <button
             onClick={()=>addSection()}
              className='h-[35px] px-2 border-2 border-yellow-50 flex items-center justify-between  bottom-0 rounded-lg text-yellow-50  z-10'>  Add Section <IoMdAddCircleOutline className='rotate-40 ml-2' /></button>
          </div>
          <div className='mt-5 bg-richblack-800 rounded-lg p-3'>
            {course?.courseContent?.map((co)=>(
              // <p>{co.}</p>
              <p>{co?.sectionName}</p>
            ))}
          </div>
        
        <div className='flex bg-richblack-500 item-end'>
       
        </div>
       
        </div>
        
       
      </div>
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