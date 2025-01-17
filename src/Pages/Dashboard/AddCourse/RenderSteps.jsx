import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaCheck  } from 'react-icons/fa';
import CourseInformationForm from "./CourseInformation/CourseInformationForm"
import CourseBuilderForm from "./CourseBuilder/CoursebuilderForm";
import PublishCourse from "./Publish/PublishCourse"


const RenderSteps = () => {
    const {step} = useSelector((state)=>state.course);
   useEffect(()=>{
        //console.log("Step =>",step)
   },[step])
    const steps=[
        {   
            id:1,
            title:"Course Information"
        },
        {   
            id:2,
            title:"Course Builder"
        },
        {   
            id:3,
            title:"Publish"
        },
    ]
  // return (
  //   <>
  //     <div className="relative mb-2 flex w-full justify-center">
  //       {steps.map((item) => (
  //         <>
  //           <div
  //             className="flex flex-col items-center  "
  //             key={item.id}
  //           >
  //             <button
  //               className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${
  //                 step === item.id
  //                   ? "border-yellow-50 bg-yellow-900 text-yellow-50"
  //                   : "border-richblack-700 bg-richblack-800 text-richblack-300"
  //               } ${step > item.id && "bg-yellow-50 text-yellow-50"}} `}
  //             >
  //               {step > item.id ? (
  //                 <FaCheck className="font-bold text-richblack-900" />
  //               ) : (
  //                 item.id
  //               )}
  //             </button>
              
  //           </div>
  //           {item.id !== steps.length && (
  //             <>
  //               <div key={item.id}
  //                 className={`h-[calc(34px/2)] w-[33%]   border-dashed border-b-2 ${
  //                 step > item.id  ? "border-yellow-50" : "border-richblack-500"
  //               } `}
  //               ></div>
  //             </>
  //           )}
  //         </>
  //       ))}
  //     </div>

  //     <div className={`relative mb-16 flex select-none w-full ${step !==1 ? " justify-between":" justify-evenly"}`}>
  //       {steps.map((item) => (
  //         <>
  //           <div
  //             className={`flex flex-col items-center gap-y-2 
  //               md:min-w-[100px]
  //              `}
  //               key={item.id}>
              
  //             <p
  //               className={`text-sm ${
  //                 step >= item.id ? "text-richblack-5" : "text-richblack-500"
  //               } `}
  //             >
  //               {item.title}
  //             </p>
  //           </div>
            
  //         </>
  //       ))}
  //     </div>

  //     {step === 1 && <CourseInformationForm />}
  //     {step === 2 && <CourseBuilderForm/>}
  //     {step === 3 && <PublishCourse/>}
  //   </>
  // )
  return (
    <>
      {/* Step Progress Bar */}
      <div className="relative mb-4 flex w-full items-center justify-between sm:justify-evenly">
        {steps.map((item, index) => (
          <React.Fragment key={item.id}>
            {/* Step Indicator */}
            <div className="flex flex-col items-center">
              <button
                className={`grid aspect-square w-[34px] place-items-center rounded-full border-[2px] text-sm font-bold 
                  ${
                    step === item.id
                      ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                      : "border-richblack-700 bg-richblack-800 text-richblack-300"
                  } 
                  ${step > item.id && "bg-yellow-50 text-richblack-900"}
                `}
              >
                {step > item.id ? <FaCheck /> : item.id}
              </button>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`h-1 flex-1 border-dashed border-b-2 sm:w-[50px] md:w-[100px] lg:w-[150px]
                  ${
                    step > item.id
                      ? "border-yellow-50"
                      : "border-richblack-500"
                  }
                `}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Titles */}
      <div
        className={`relative mb-8 flex w-full ${
          step !== 1 ? "justify-between" : "justify-evenly"
        }`}
      >
        {steps.map((item) => (
          <div
            className="flex flex-col items-center gap-y-1 md:min-w-[100px]"
            key={item.id}
          >
            <p
              className={`text-sm ${
                step >= item.id ? "text-richblack-5" : "text-richblack-500"
              }`}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {/* Step Content */}
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </>
  );
};



export default RenderSteps