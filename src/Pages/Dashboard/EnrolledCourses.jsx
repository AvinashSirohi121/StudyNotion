import React from 'react'
import ProgressBar from "@ramonak/react-progress-bar";

const EnrolledCourses = () => {
  let courses =[
    {
      "courseName": "JavaScript for Beginners",
      "courseDescription": "Learn the fundamentals of JavaScript, the most popular programming language for web development.Learn the fundamentals of JavaScript, the most popular programming language for web development.Learn the fundamentals of JavaScript, the most popular programming language for web development.Learn the fundamentals of JavaScript, the most popular programming language for web development.Learn the fundamentals of JavaScript, the most popular programming language for web development.",
      "courseProgress": "80%"
    },
    {
      "courseName": "ReactJS Mastery",
      "courseDescription": "Master ReactJS and build dynamic, responsive user interfaces with reusable components.",
      "courseProgress": "30%"
    },
    {
      "courseName": "Node.js Fundamentals",
      "courseDescription": "Understand backend development with Node.js, including APIs, Express, and database integration.",
      "courseProgress": "60%"
    },
    {
      "courseName": "CSS Flexbox and Grid",
      "courseDescription": "Learn advanced CSS techniques to create beautiful and flexible web layouts.",
      "courseProgress": "45%"
    },
    {
      "courseName": "MongoDB Basics",
      "courseDescription": "Explore the basics of MongoDB, a NoSQL database, and how to use it in web applications.",
      "courseProgress": "90%"
    },{
      "courseName": "JavaScript for Beginners",
      "courseDescription": "Learn the fundamentals of JavaScript, the most popular programming language for web development.Learn the fundamentals of JavaScript, the most popular programming language for web development.Learn the fundamentals of JavaScript, the most popular programming language for web development.Learn the fundamentals of JavaScript, the most popular programming language for web development.Learn the fundamentals of JavaScript, the most popular programming language for web development.",
      "courseProgress": "80%"
    },
    {
      "courseName": "ReactJS Mastery",
      "courseDescription": "Master ReactJS and build dynamic, responsive user interfaces with reusable components.",
      "courseProgress": "30%"
    },
    {
      "courseName": "Node.js Fundamentals",
      "courseDescription": "Understand backend development with Node.js, including APIs, Express, and database integration.",
      "courseProgress": "60%"
    },
    {
      "courseName": "CSS Flexbox and Grid",
      "courseDescription": "Learn advanced CSS techniques to create beautiful and flexible web layouts.",
      "courseProgress": "45%"
    },
    {
      "courseName": "MongoDB Basics",
      "courseDescription": "Explore the basics of MongoDB, a NoSQL database, and how to use it in web applications.",
      "courseProgress": "90%"
    }
  ]
  
  return (
    <div className='text-white'>
      <p className='flex gap-2'>Home / Dashboard / <p className='text-yellow-50'> Enrolled Courses</p></p>

      {courses && courses.length>0 ?
      <>
        <h2 className='text-2xl mt-[2rem]'>
          Enrolled Courses
      </h2>

      <div className='flex  mt-[3rem] bg-richblack-500 p-3 rounded-t-md px-4  items-center border-[1px] border-richblack-600'>
          <div className='min-w-[70%]'>Courses</div>
          <div className='md:ml-12 lg:ml-0'>Progress</div>
        </div>
        {courses.map((course,index)=>(
          <div className='p-3 px-4 flex justify-between items-center border-[1px] border-richblack-600'>
          <div className='flex gap-4'>
              <img src="" className='bg-richblack-700 md:h-[3rem] md:w-[3rem] lg:h-[4rem] lg:w-[4rem] rounded-md' />
              <div className='flex flex-col  max-w-[70%]'>
              <p className='font-bold text-lg'>{course?.courseName}</p>
              <p className='text-richblack-400 text-xs '>{`${course?.courseDescription.slice(0,80)}...`}</p>
              </div>
          </div>
          <div className='w-[30%] text-sm flex flex-col'>
            <p>Progress : {course?.courseProgress}</p>
            <ProgressBar 
            completed={parseInt(course?.courseProgress)} 
             height="8px"
            isLabelVisible={false}/>
          </div>
        </div>
        ))}
      </>:
      <div className="flex flex-1 mt-[3rem] justify-center items-center text-white text-3xl">
            Not enrolled in any course
      </div>}
      
        
    </div>
  )
}

export default EnrolledCourses