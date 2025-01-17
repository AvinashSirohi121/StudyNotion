import React, {useState,useEffect} from 'react'
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import IconBtn from '../../components/Dashboard/Iconbtn';
import { useNavigate } from 'react-router-dom';
import { CiCircleCheck } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5";
import Popup from '../../components/common/Popup';
import {getCourseData,deleteCourse,} from "../../services/operations/courseMethods"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {logout} from "../../services/operations/authMethods"
import { setCourse,setEditCourse,setStep } from '../../slices/courseSlice';
import {formatDate} from "../../utils/formatDate"
import{ formatTime} from "../../utils/formatDate"


const MyCourses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {token} = useSelector((state)=>state.auth);
  const {course,editCourse,} = useSelector((state)=>state.course)
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [courseData,setCourseData] = useState("");

  useEffect(() => {
   // console.log("Inside useEffect of MyCourse =>",course)
    const fetchCourseData = async () => {
      try {
        let data = await getCourseData(token);
        //console.log("CourseData =>", data);
        if (data) {
          dispatch(setCourse(data));
        }
      } catch (error) {
        console.log("Error while getting courseData =>", error);
        if (error?.response?.data?.message === "Token is invalid or expired") {
          dispatch(logout(navigate));
        }
      }
    };

    
      fetchCourseData();
    
  }, [token, navigate]); // Add necessary dependencies
 

  const handleCancel = () => {
    setIsPopupVisible(false); // Close the popup
    console.log("Action cancelled");
  };

  const handleConfirm = (courseId) => {
      setIsPopupVisible(false); // Close the popup
      deleteCourses(courseId);
    };

  const editCourseButton =(course)=>{
    console.log("Inside editCourseButton")
      dispatch(setStep(1));
      // dispatch(setEditCourse(true));
      navigate(`/dashboard/edit-course/${course._id}`,{state:course})


  }

  const deleteButton =(course)=>{
    setIsPopupVisible(true);
    setCourseData(course._id)
  }

  const deleteCourses =async(courseId)=>{
    console.log("Action confirmed => delelte Course Id =>", courseId);
    try{
      const formData = new FormData();
      formData.append("courseId",courseId);
      let response = await deleteCourse(token,formData);
      console.log("Deleting Course Response =>",response);
      dispatch(setCourse(response))
    }catch(error){
      console.log("Error while deleting course =>", error);
      if (error?.response?.data?.message === "Token is invalid or expired") {
        dispatch(logout(navigate));
      }
    }
  }
  
  
  return (
    <div className='text-white'>
    <span className='flex gap-2'>Home / Dashboard / <p className='text-yellow-50'> My Courses</p></span>

    <div className='mt-[1rem] flex justify-between'>
        <h1 className='text-3xl'>My Courses</h1>
        <IconBtn 
                  text={"Add Course +"} 
                  className={"bg-yellow-50 text-richblack-900 scale-90"}
                  onclick={()=>navigate("/dashboard/add-course")}></IconBtn>
      </div>

      {course && course.length>0 ? 
      <>
      
        <div className='flex  mt-[3rem] bg-richblack-500 p-3 gap-3 rounded-t-md px-4  items-center border-[1px] border-richblack-600 justify-evenly'>
          <div className='w-[60%] m'>Courses</div>
          <div className='w-[40%] flex justify-between'>
          <div className='md:hidden lg:block min-w-[15%]'>Duration</div>
          <div className='min-w-[15%] md:ml-[4rem] lg:mr-[4rem]'>Price</div>
          <div className='min-w-[10%] lg:mr-[3rem] md:mr-[1rem]'>Action</div>
          </div>
          
        </div>

        {course.map((course,index)=>{
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const formattedDate = formatDate(course?.dateOfCreation); // Example: '14th Jan, 2025'
            const formattedTime = formatTime(course?.dateOfCreation); 

            return (
              <div key={index} className='p-3 px-4 flex justify-between items-center border-[1px] border-richblack-600'>
                  <div className='flex gap-4 w-[70%]'>
                      <img src={course?.thumbNail} className='bg-richblack-700 md:h-[4rem] md:w-[4rem] lg:h-[5.5rem] lg:w-[6rem]  rounded-md' />
                      <div className='flex flex-col'>
                      <p className='flex  gap-2 items-center font-bold text-lg'>{course?.courseName} </p>
                        {/* <p className='text-sm text-richblack-400 flex gap-2 italic font-thin mt-1 '>by -<p className=' text-yellow-50'> {course?.instructor}</p></p></p> */}
                      <p className='text-richblack-100 text-xs lg:w-[100%] md:w-[90%]'>{`${course?.courseDescription.slice(0,70)}...`}</p>
                      <p className='text-richblack-100 text-xs mt-1'>Created: {`${formattedDate} | ${formattedTime}`} </p>
                      {course?.status==="published" ? 
                        <div className='text-caribbeangreen-100 text-xs mt-1 flex gap-1 bg-caribbeangreen-800 w-[5rem] p-1 rounded-2xl justify-center '>
                          <CiCircleCheck className='text-caribbeangreen-50  text-xs mt-1'/> 
                          <p className='mt-[2px]'>Published</p>
                        </div>:
                        <span className='text-pink-200 text-xs mt-1 flex gap-1 bg-pink-900 w-[5rem] p-1 rounded-2xl justify-center '>
                        <IoTimeOutline className='text-pink-200 text-xs mt-1'/>
                        <p className='mt-[2px]'>Drafted</p>
                      </span>}
                      </div>
                  </div>
        
          <p className='md:hidden lg:block flex  gap-2 items-center w-[15%] '>{course.duration}</p>
          <p className='flex  gap-2 items-center w-[15%]  text-yellow-25'>{course?.price && parseInt(course?.price) !== 0 ? `₹ ${(course?.price).toFixed(2)}` : " Free"}</p>
          <div className='flex  gap-4 items-center w-[15%]  justify-center text-xl'>
            <MdEdit className='hover:text-yellow-50 cursor-pointer' 
                  onClick={()=>editCourseButton(course)} />
            <RiDeleteBin5Line className='hover:text-pink-1000 cursor-pointer' onClick={()=> deleteButton(course)} />
          </div>
          
              </div>
            )   
        }
          
        )}
        </>

        :
        <div className=' mt-[3rem] border-[1px] border-richblack-600 rounded-t-md'>
         <div className='flex  bg-richblack-500 p-3 gap-3 rounded-t-md px-4  items-center border-[1px] border-richblack-600 justify-evenly'>
          <div className='w-[60%] m'>Courses</div>
          <div className='w-[40%] flex justify-between'>
          <div className='min-w-[15%]'>Duration</div>
          <div className='min-w-[15%] mr-[10px]'>Price</div>
          <div className='min-w-[10%] mr-[40px]'>Action</div>
          </div>
          
        </div>
        <div className="flex flex-1 m-[3rem] justify-center items-center text-white text-3xl">
            No Course Found
        </div>
        </div>
       
        }

        <Popup  
          title="Do you want to delete this course?"
          message="All the data related to this course will be deleted"
          isVisible={isPopupVisible}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          btn1="Delete"
          btn2="Cancel"
          data={courseData}
        />
      
  </div>
  )
}

export default MyCourses