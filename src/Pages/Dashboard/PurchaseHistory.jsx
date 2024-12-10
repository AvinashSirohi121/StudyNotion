import React from 'react'

const PurchaseHistory = () => {
  // let purchaseHistory =[
  //   {
  //     "courseName": "Full-Stack Web Development",
  //     "courseDescription": "Learn to build scalable web applications using MERN stack technologies.",
  //     "price": 199.99,
  //     "dateOfPurchase": "2024-01-15",
  //     "instructor": "John Doe",
  //     "rating": 4.8,
  //     "purchaseID": "PSH123456",
  //     "platform": "Web",
  //     "completionStatus": "In Progress"
  //   },
  //   {
  //     "courseName": "Python for Data Science",
  //     "courseDescription": "Master Python programming and data analysis techniques for data science.",
  //     "price": 149.99,
  //     "dateOfPurchase": "2023-12-10",
  //     "instructor": "Jane Smith",
  //     "rating": 4.7,
  //     "purchaseID": "PSH123457",
  //     "platform": "Mobile",
  //     "completionStatus": "Completed"
  //   },
  //   {
  //     "courseName": "Introduction to AI and Machine Learning",
  //     "courseDescription": "Dive into AI and ML concepts with hands-on projects and case studies.",
  //     "price": 299.99,
  //     "dateOfPurchase": "2024-02-20",
  //     "instructor": "Dr. Alice Johnson",
  //     "rating": 4.9,
  //     "purchaseID": "PSH123458",
  //     "platform": "Web",
  //     "completionStatus": "Not Started"
  //   },
  //   {
  //     "courseName": "UI/UX Design Essentials",
  //     "courseDescription": "Learn design principles and tools to create user-friendly interfaces.",
  //     "price": 99.99,
  //     "dateOfPurchase": "2023-11-05",
  //     "instructor": "Michael Brown",
  //     "rating": 4.6,
  //     "purchaseID": "PSH123459",
  //     "platform": "Mobile",
  //     "completionStatus": "Completed"
  //   },
  //   {
  //     "courseName": "Cloud Computing with AWS",
  //     "courseDescription": "Gain expertise in AWS services and deploy cloud-based applications.",
  //     "price": 249.99,
  //     "dateOfPurchase": "2024-03-01",
  //     "instructor": "Emily Davis",
  //     "rating": 4.8,
  //     "purchaseID": "PSH123460",
  //     "platform": "Web",
  //     "completionStatus": "In Progress"
  //   }
  // ]
  let purchaseHistory=[];
  
  return (
    <div className='text-white'>
    <p className='flex gap-2'>Home / Dashboard / <p className='text-yellow-50'> Enrolled Courses</p></p>

   

      {purchaseHistory && purchaseHistory.length>0 ? 
      <>
       <h2 className='text-2xl mt-[2rem]'>
        Purchase History
      </h2>
        <div className='flex  mt-[3rem] bg-richblack-500 p-3 gap-3 rounded-t-md px-4  items-center border-[1px] border-richblack-600 justify-evenly'>
          <div className='w-[70%] m'>Courses</div>
          <div className='min-w-[15%]'>Purchased on</div>
          <div className='min-w-[15%]'>Price</div>
        </div>

        {purchaseHistory.map((course,index)=>(
          <div className='p-3 px-4 flex justify-between items-center border-[1px] border-richblack-600'>
          <div className='flex gap-4 w-[70%]'>
              <img src="" className='bg-richblack-700 md:h-[3rem] md:w-[3rem] lg:h-[4rem] lg:w-[4rem] rounded-md' />
              <div className='flex flex-col'>
              <p className='flex  gap-2 items-center font-bold text-lg'>{course?.courseName} <p className='text-sm text-richblack-400 flex gap-2 italic font-thin mt-1 '>by -<p className=' text-yellow-50'> {course?.instructor}</p></p></p>
              <p className='text-richblack-100 text-xs '>{`${course?.courseDescription.slice(0,80)}...`}</p>
              <p className='text-richblack-100 text-xs italic'>Rating - {course?.rating} ⭐ </p>
              </div>
          </div>
        
          <p className='flex  gap-2 items-center w-[15%] '>{course.dateOfPurchase}</p>
          <p className='flex  gap-2 items-center w-[15%] text-lg text-yellow-25'>{` ₹ ${course.price}`}</p>
          
        </div>
        ))}
        </>
        : <div className="flex flex-1 mt-[3rem] justify-center items-center text-white text-3xl">
            No Purchase History
        </div>
        }
      
  </div>
  )
}

export default PurchaseHistory