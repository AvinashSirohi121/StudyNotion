import React ,{useState} from 'react'
import {HomePageExplore} from "../../../data/homepage-explore";
import HighlightText from './HighlightText';
import { BsPeopleFill } from "react-icons/bs";
import Chart from "../../../assets/Images/fi-sr-chart-tree.png"
import { PiTreeView } from "react-icons/pi";

const tabsName= ["Free","New to coding","Most popular","Skills paths","Career paths"];


const ExploreMore = () => {
    const [currentTab,setCurrentTab] = useState(tabsName[0]);
    const [courses,setCourses] = useState(HomePageExplore[0]?.courses);
    const [currentCard,setCurrentCard] = useState(0)

    const setMyCards = (value) => {
        setCurrentTab(value);
    
        // Find the object in HomePageExplore that matches the current tab (value)
        const result = HomePageExplore.find((course) => course.tag === value)?.courses || [];
        
        console.log("Result =>", result);
    
        // Set the courses to the filtered result
        setCourses(result);
        setCurrentCard(0)
    
    };

    const setActiveCard =(index)=>{
        setCurrentCard(index)
    }
   
  return (
    <div className='mt-20 flex flex-col items-center justify-center relative'>

        <div className='text-4xl font-semibold text-center'>Unlock the <HighlightText text={"Power of coding"}/></div>
        <p className='text-richblack-300 font-thin text-center text-xl mt-3'>
            Learn to build anything you can imagin
        </p>

        <div className='flex items-center text-center justify-evenly mt-16 lg:flex-row md:w-[40rem] md:flex-row sm:flex-col lg:w-[45rem] mb-10 bg-richblack-800 gap-8  sm:gap-3 py-3 px-3 sm:w-[10rem] lg:rounded-full md:rounded-full sm:rounded-2xl'> 
            {tabsName.map((item, index) => (
                <div
                    className={`text-[16px] font-medium lg:px-3 md:px-3 sm:px-3 py-2 cursor-pointer rounded-full ${
                        currentTab === item
                            ? "bg-richblue-900 text-richblack-5 transition-all ease-in duration-200 hover:-richblack-900"
                            : "text-richblack-300 bg-richblack-800"}`}
                    key={index}
                    onClick={() => setMyCards(item)}>
                    {item}
                </div>
             ))}
        </div>

        <div className=' flex lg:flex-row sm:flex-col md:flex-col mx-auto  p-10 gap-7'>

             {courses.map((course,index)=>(
                <div 
                key={index} 
                onClick={()=>setActiveCard(index)} 
                className={`cursor-pointer p-3 text-richblack-300 lg:w-[22rem] md:w-[22rem] sm:w-[18rem] ${currentCard ==index ? "bg-white shadow-2xl shodow-white" :"bg-richblack-800"}`}>
                    <div className='border-b border-dashed pb-5 min-h-[150px]'>
                        <h2 className={`pb-2 ${currentCard ==index ? "text-black font-bold":"text-white"}`}>{course.heading}</h2>
                        <p className=''>{course.description}</p>
                    </div>
                    <div className={`mt-2 flex justify-between  ${currentCard ==index ? "text-blue-300":"text-richblack-300"}`}>
                        <div className='flex flex-row lg:gap-4 md:gap-2 sm:gap-2 items-center'><BsPeopleFill/> {course.level}</div>
                        <div className='flex flex-row lg:gap-4 md:gap-2 sm:gap-2 items-center'>
                            <PiTreeView className='text-[20px] mb-[5px]'/>
                            {`${course.lessionNumber} Lessons`}</div>
                    </div>
                </div>
             ))}
             
        </div>

    </div>
  )
}

export default ExploreMore