import React, {useState,useEffect} from 'react'
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import IconBtn from '../../components/Dashboard/Iconbtn';
import { useNavigate } from 'react-router-dom';
import { CiCircleCheck } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5";
import Popup from '../../components/common/Popup';
import {getCourseData} from "../../services/operations/courseMethods"
import { useSelector } from 'react-redux';

const MyCourses = () => {
  const navigate = useNavigate();
  const {token} = useSelector((state)=>state.auth);

  const handleCancel = () => {
    setIsPopupVisible(false); // Close the popup
    console.log("Action cancelled");
  };

  const handleConfirm = () => {
    setIsPopupVisible(false); // Close the popup
    console.log("Action confirmed");
    // Add your confirmation logic here
  };

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  let myCourses1=[
      {
        "courseName": "React for Beginners",
        "courseDescription": "An introductory course to ReactJS, covering basic concepts and component building.",
        "price": 4099,
        "duration": "10 hours",
        "dateOfCreation": "2025-01-01",
        "timeOfCreation": "10:30 AM",
        "status": "published"
      },
      {
        "courseName": "Advanced NodeJS",
        "courseDescription": "Dive deep into NodeJS concepts like streams, clusters, and performance tuning.",
        "price": 0,
        "duration": "15 hours",
        "dateOfCreation": "2024-12-20",
        "timeOfCreation": "02:45 PM",
        "status": "published"
      },
      {
        "courseName": "Mastering MongoDB",
        "courseDescription": "Learn database design, indexing, and aggregation with MongoDB.",
        "price": 4899,
        "duration": "12 hours",
        "dateOfCreation": "2025-01-02",
        "timeOfCreation": "11:00 AM",
        "status": "drafted"
      },
      {
        "courseName": "Full-Stack Development",
        "courseDescription": "A comprehensive guide to building full-stack applications with MERN stack.",
        "price": 8199,
        "duration": "25 hours",
        "dateOfCreation": "2024-12-15",
        "timeOfCreation": "09:15 AM",
        "status": "published"
      },
      {
        "courseName": "Introduction to Cloudinary",
        "courseDescription": "Learn to integrate Cloudinary for managing and delivering media assets.",
        "price": 3299,
        "duration": "8 hours",
        "dateOfCreation": "2024-12-18",
        "timeOfCreation": "04:30 PM",
        "status": "drafted"
      },
      {
        "courseName": "Redux Toolkit Essentials",
        "courseDescription": "Understand state management with Redux Toolkit and its advanced patterns.",
        "price": 4599,
        "duration": "10 hours",
        "dateOfCreation": "2024-11-25",
        "timeOfCreation": "03:00 PM",
        "status": "published"
      },
      {
        "courseName": "Payment Integration with Razorpay",
        "courseDescription": "Learn how to integrate Razorpay for seamless payment solutions in web applications.",
        "price": 3799,
        "duration": "7 hours",
        "dateOfCreation": "2024-12-28",
        "timeOfCreation": "01:00 PM",
        "status": "published"
      },
      {
        "courseName": "Building Scalable APIs",
        "courseDescription": "Best practices and techniques for designing scalable and efficient RESTful APIs.",
        "price": 6799,
        "duration": "18 hours",
        "dateOfCreation": "2025-01-03",
        "timeOfCreation": "05:45 PM",
        "status": "drafted"
      }
    ]
    let myCourses=[]

    const getData =async()=>{
        try {
            let data = await getCourseData(token);
            console.log("CourseData =>",data);
        } catch (error) {
          console.log("Error while getting courseData =>",error);
        }
    }

   useEffect(()=>{
      getData();
   },[]) 
  
  
  
  
  
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

      {myCourses && myCourses.length>0 ? 
      <>
      
        <div className='flex  mt-[3rem] bg-richblack-500 p-3 gap-3 rounded-t-md px-4  items-center border-[1px] border-richblack-600 justify-evenly'>
          <div className='w-[60%] m'>Courses</div>
          <div className='w-[40%] flex justify-between'>
          <div className='min-w-[15%]'>Duration</div>
          <div className='min-w-[15%] mr-[10px]'>Price</div>
          <div className='min-w-[10%] mr-[40px]'>Action</div>
          </div>
          
        </div>

        {myCourses.map((course,index)=>(
          <div key={index} className='p-3 px-4 flex justify-between items-center border-[1px] border-richblack-600'>
          <div className='flex gap-4 w-[70%]'>
              <img src="" className='bg-richblack-700 md:h-[4rem] md:w-[4rem] lg:h-[5.5rem] lg:w-[6rem]  rounded-md' />
              <div className='flex flex-col'>
              <p className='flex  gap-2 items-center font-bold text-lg'>{course?.courseName} </p>
                {/* <p className='text-sm text-richblack-400 flex gap-2 italic font-thin mt-1 '>by -<p className=' text-yellow-50'> {course?.instructor}</p></p></p> */}
              <p className='text-richblack-100 text-xs '>{`${course?.courseDescription.slice(0,70)}...`}</p>
              <p className='text-richblack-100 text-xs mt-1'>Created: {`${course?.dateOfCreation} | ${course?.timeOfCreation}`} </p>
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
        
          <p className='flex  gap-2 items-center w-[15%] '>{course.duration}</p>
          <p className='flex  gap-2 items-center w-[15%]  text-yellow-25'>{course?.price && parseInt(course?.price) !== 0 ? `₹ ${(course?.price).toFixed(2)}` : " Free"}</p>
          <div className='flex  gap-4 items-center w-[15%]  justify-center text-xl'>
            <MdEdit className='hover:text-yellow-50 cursor-pointer '/>
            <RiDeleteBin5Line className='hover:text-pink-1000 cursor-pointer' onClick={()=> setIsPopupVisible(true)} />
          </div>
          
        </div>
        ))}
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
        />
      
  </div>
  )
}

export default MyCourses