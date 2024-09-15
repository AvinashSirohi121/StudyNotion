import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timeLineImage from "../../../assets/Images/TimelineImage.png"

const timeline = [
    {
        Logo:Logo1,
        heading:"LearderShip",
        description:"Full commited to the success company"
    },{
        Logo:Logo2,
        heading:"Responsiblity",
        description:"Students will always be our top priority"
    },{
        Logo:Logo3,
        heading:"Flexiblity",
        description:"The ability to switch is an important skill"
    },{
        Logo:Logo4,
        heading:"Solve the problem",
        description:"Code to get a required solution and learn"
    }
]
const TimeLineSection = () => {
  return (
    <div className=''>
        <div className='flex flex-row gap-15 items-center'>
            {/*Left Section */}
            <div className='w-[45%] flex flex-col gap-10 '>
                {timeline.map((item,index)=>(
                    <div key={index} className=' flex flex-row gap-5'>
                        
                        {/* <div className='flex flex-col '>
                             {index !==0 ? <div className='items-start text-richblack-400 rotate-90 mt-[-10px]'>---------</div>:""} 
                            <div className=' mt-[5px] w-[50px] h-[50px] bg-white items-center flex justify-center rounded-full'><img src={item.Logo}/></div>
                        </div>

                        <div className='flex flex-col items-start'>
                            <h2 className='mt-[20px] font-semibold text-[18px] absolute'>{item.heading}</h2>
                            <p className=' mt-[40px] text-[14px]'>{item.description}</p>
                        </div> */}

                        <div className='flex flex-col relative'>
                             {index !==0 ? <div className='absolute top-[-30px] right-[1px] items-start text-richblack-400 rotate-90 '>---------</div>:""} 
                            <div className='z-[2] w-[50px] h-[50px] bg-white items-center flex justify-center rounded-full drop-shadow-2xl'><img src={item.Logo}/></div>
                        </div>

                        <div className='flex flex-col  w-full'>
                            <h2 className='font-semibold text-[18px]'>{item.heading}</h2>
                            <p className='text-[12px]'>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            {/*Right Section */}
            <div className='relative shadow-blue-200 ml-[50px] mt-[20px]'>
                <img src={timeLineImage} alt="TimeLineIMage" className='shodow-white h-fit object-cover drop-shadow-2xl'/>
                <div className='absoulte bg-caribbeangreen-700 flex flex-row text-white uppercase py-5 px-5 w-fit
                left-[50%] translate-x-[25%] translate-y-[-50%]'>
                    <div className='flex  items-center gap-5 border-r border-caribbeangreen-300 px-7 mr-5 '>
                        <p className='text-3xl font-bold'>10</p>
                        <p className='text-caribbeangreen-200 text-sm'>Years of <br/> Experience</p>

                    </div>
                    <div className='flex items-center gap-5 '>
                        <p className='text-3xl font-bold'>250</p>
                        <p className='text-caribbeangreen-200 text-sm'>Types <br/>of courses</p>

                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TimeLineSection