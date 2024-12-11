import React from 'react'
import { AiOutlineDelete } from "react-icons/ai";

const Cart = () => {

  let cart =[
    {
      "courseName": "Introduction to Web Development",
      "description": "Learn the basics of HTML, CSS, and JavaScript to build your first website.",
      "instructor": "Jane Doe",
      "price": 0,
      "rating": 4.7,
      "noOfLessons": 20,
      "level": "Beginner",
      "totalTime": "15 hours",
      "category": "Web Development",
      "language": "English"
    },
    {
      "courseName": "Advanced ReactJS",
      "description": "Master React concepts like hooks, context, and state management.",
      "instructor": "John Smith",
      "price": 99.99,
      "rating": 4.8,
      "noOfLessons": 35,
      "level": "Advanced",
      "totalTime": "25 hours",
      "category": "Frontend Development",
      "language": "English"
    },
    {
      "courseName": "Python for Data Science",
      "description": "Explore data science fundamentals with Python libraries like Pandas and NumPy.",
      "instructor": "Emily Davis",
      "price": 69.99,
      "rating": 4.6,
      "noOfLessons": 28,
      "level": "Intermediate",
      "totalTime": "20 hours",
      "category": "Data Science",
      "language": "English"
    },
    {
      "courseName": "Mastering Machine Learning",
      "description": "Dive into advanced machine learning techniques and algorithms.",
      "instructor": "Dr. Alan White",
      "price": 149.99,
      "rating": 4.9,
      "noOfLessons": 40,
      "level": "Advanced",
      "totalTime": "35 hours",
      "category": "Artificial Intelligence",
      "language": "English"
    },
    {
      "courseName": "UI/UX Design Essentials",
      "description": "Learn design principles and tools to create user-friendly interfaces.",
      "instructor": "Sarah Johnson",
      "price": 59.99,
      "rating": 4.5,
      "noOfLessons": 22,
      "level": "Beginner",
      "totalTime": "18 hours",
      "category": "Design",
      "language": "English"
    },
    {
      "courseName": "Digital Marketing Masterclass",
      "description": "Boost your marketing skills with strategies for SEO, social media, and analytics.",
      "instructor": "Michael Lee",
      "price": 79.99,
      "rating": 4.6,
      "noOfLessons": 25,
      "level": "Intermediate",
      "totalTime": "22 hours",
      "category": "Marketing",
      "language": "English"
    },
    {
      "courseName": "Introduction to Cybersecurity",
      "description": "Understand the basics of securing networks, systems, and data.",
      "instructor": "Linda Brown",
      "price": 89.99,
      "rating": 4.7,
      "noOfLessons": 30,
      "level": "Beginner",
      "totalTime": "24 hours",
      "category": "Cybersecurity",
      "language": "English"
    },
    {
      "courseName": "Data Structures and Algorithms in Java",
      "description": "Strengthen your problem-solving skills with data structures and algorithms.",
      "instructor": "Robert Wilson",
      "price": 119.99,
      "rating": 4.8,
      "noOfLessons": 50,
      "level": "Advanced",
      "totalTime": "40 hours",
      "category": "Computer Science",
      "language": "English"
    }
  ]
  let totalPrice =cart?.reduce((total,course)=>total + course.price ,0);
  
  
  return (
    <div className='text-white'>
      <p className='flex gap-2'>Home / Dashboard / <p className='text-yellow-50'> Cart</p></p>

      {cart && cart.length>0 ? 
      <>
       <h2 className='text-2xl mt-[2rem]'>
        Cart
      </h2>
      <div className='flex gap-6'>
        <div className='w-[75%]'>
           

            {cart.map((course,index)=>(
              <div className='p-3 mt-2 px-4 flex justify-between items-center border-[1px] border-richblack-600'>
              <div className='flex gap-4 w-[80%] lg:h-[7rem]'>
                <img src="" className='bg-richblack-700 md:h-[3rem] md:w-[4rem] lg:h-[7rem] lg:w-[9rem] rounded-md border-none' />
                  
                  <div className='flex flex-col'>
                  <p className='w-[100%] items-center font-bold text-lg'>{course?.courseName} </p>
                  <p className='text-sm text-richblack-400 flex gap-2 italic font-thin mt-1 '>by -<p className=' text-yellow-50'> {course?.instructor}</p></p> 
                  <div className='flex flex-col gap-2 mt-2'>
                    <p className='text-richblack-100 text-xs italic'>Rating - {course?.rating} ⭐ </p>
                    <p className='text-richblack-100 text-sm '>{`${course?.noOfLessons} Lessons · ${course?.totalTime} · ${course?.language} ·  ${course?.level}`}</p>
                  </div>
                  </div>
              </div>
            <div className='flex mt-[-2rem] flex-col   justify-start items-center gap-2 w-[20%]'>
             <button className=' flex justify-center items-center bg-richblack-800 p-2 rounded-md border-richblack-600 border-[1px] text-pink-200'><AiOutlineDelete className='text-xl'/>Remove</button>
            <p className='gap-2 items-center text-lg text-yellow-25'>{course?.price && parseInt(course?.price) !== 0 ? `₹ ${(course?.price).toFixed(2)}` : "Free"}</p>
            </div>    
            </div>
            ))}
        </div>
        <div className='w-[20%] mt-2 bg-richblack-800 max-h-[10rem] rounded-md border-richblack-600 border-[1px] p-2 flex flex-col justify-between'>
          <div>
            <p className='text-richblack-300'>Total :</p>
            <p className='text-2xl text-yellow-50'>{parseInt(totalPrice) !== 0 ? `₹ ${(totalPrice).toFixed(2)}` : "Free"}</p>
            <del className='text-richblack-300 italic text-sm'>{totalPrice===0 ? "": (totalPrice*1.5).toFixed(2)}</del>
          </div>
          <button className='bg-yellow-50 flex justify-center items-center rounded-md text-black mb-0 h-[3rem]'>Buy Now</button>
        </div>
      </div>
        
        </>
        :
        <div className='flex'>
          <div className="flex flex-1 mt-[3rem] justify-center items-center text-white text-3xl w-[75%]">

          Cart is empty
          </div>
          
        </div> 
        
        }
      
        
    </div>
  )
}

export default Cart