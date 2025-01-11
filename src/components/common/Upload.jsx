import React,{useState,useRef} from 'react'
import { AiFillStar } from 'react-icons/ai';
import { IoCloudUpload } from "react-icons/io5";

const Upload = ({title,setImagepath,type}) => {
    const [courseImage,setCourseImage] = useState("");
    

    const imageRef = useRef(null);
    const imageUploader = ()=>{
        imageRef.current.click();  
     }
     const imageUploadHandle =(e)=>{
       let file = e.target.files[0];
       //console.log("File =>",URL.createObjectURL(file));
       setCourseImage(file)
       setImagepath(file)
     }
  return (
      <div className='flex flex-col mt-4'>
                  <label className='flex tracking-wider  text-sm'>{title} <AiFillStar className='text-[5px] ml-2 text-pink-1000'/></label>
                    <div 
                        onClick={()=>imageUploader()}
                        className='cursor-pointer h-[15rem] text-richblack-400 flex flex-col justify-center items-center bg-richblack-800 mt-2 rounded-xl border-dotted border-richblack-400 border-[2px]'>
                        {courseImage ? 
                          <img  
                            className='h-[100%] w-[100%]  object-contain'
                          src={URL.createObjectURL(courseImage)} 
                          alt="CourseImage"/> :
                        <>
                          <IoCloudUpload className='text-[5rem] text-yellow-25 bg-yellow-700 rounded-full p-3'/>
                          <p>{type=="image" ? "Drag and drop an image, or":"Drag and drop an video, or"} </p>
                          <div className='flex gap-2'>click to <p className='text-yellow-50'>Browse</p> a file</div>
                        <div className='flex mt-5 text-xs gap-7'>
                             {type=="image" ? 
                                <>  <p>• Aspect ration 16:9</p>
                                     <p>• Recommended sixe 1024x576</p>
                                 </>:""}
                              
                          
                          </div>
                        </>
                        }  
                        
                            <input 
                          type="file" 
                          ref={imageRef} 
                          onChange={(e)=>imageUploadHandle(e)}
                          className='hidden'/>
                    </div>
                    
                    {/* {errors.lName && <span className="text-[10px]  text-pink-1000">{errors.lName}</span>} */}
                </div>
  )
}

export default Upload