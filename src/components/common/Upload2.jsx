import React,{useState,useRef, useEffect} from 'react'
import { AiFillStar } from 'react-icons/ai';
import { IoCloudUpload } from "react-icons/io5";
import toast from 'react-hot-toast';
import { MdCancel } from "react-icons/md";

const Upload = ({title,setImagepath,type,editCourse,imagePath}) => {
    const [courseImage,setCourseImage] = useState("");
    const [isImageSelected, setIsImageSelected] = useState(false);  // Track if the user selected a new image
    const [isEdit,setIsEdit] = useState(false);
    

    const imageRef = useRef(null);
    const imageUploader = ()=>{
        imageRef.current.click();  
     }
     const imageUploadHandle = (e) => {
      setImagepath("");
      setIsEdit(false);
      let file = e.target.files && e.target.files[0];
      console.log("File =>",file," FileType =>",file.type)
  
      if (!file.type.startsWith("image/")) {
        toast.error("Selected file is not an image.",{duration:3000});
        return;
      }
      if(file){
         // Create a URL object for the selected image
      // const imageURL = URL.createObjectURL(file);
      // console.log("Selected Image URL =>", imageURL);
  
     
      setCourseImage(file);
      setImagepath(file);  
      setIsImageSelected(true);  
      }
     
    };

    const removeImage =(e)=>{
      e.stopPropagation();
      console.log("inside removeImage")
      setCourseImage("");
    }
    const a =()=>{
      console.log("isEdit =>",isEdit," CourseImage =>",courseImage)
    }  
     useEffect(() => {
      if (imagePath && !isImageSelected) {
        console.log("Inside Upload EditCourse =>",editCourse," => ImagePath =>",imagePath, " typeOdf Image path =>",typeof imagePath)
        if (imagePath && !imagePath?.type?.startsWith("image/")) {
            console.log("Setting is Edit true")
            setIsEdit(true);
        }
        setCourseImage(imagePath);
        a();
      }
    }, [imagePath,isEdit, isImageSelected]);
  
  return (
      <div className='flex flex-col mt-4'>
                  <label className='flex tracking-wider  text-sm'>{title} <AiFillStar className='text-[5px] ml-2 text-pink-1000'/></label>
                    <div 
                        onClick={()=>imageUploader()}
                        className='relative cursor-pointer h-[15rem] text-richblack-400 flex flex-col justify-center items-center bg-richblack-800 mt-2 rounded-xl border-dotted border-richblack-400 border-[2px]'>
                        {courseImage ? 
                          <>
                            <img  
                              className='h-[100%] w-[100%]  object-contain'
                            src={isEdit === true ? courseImage :URL.createObjectURL(courseImage)} 
                            alt="CourseImage"/> 
                            
                            <MdCancel 
                            onClick={(e)=>removeImage(e)}
                            className='absolute top-0  right-0 hover:text-pink-1000 text-richblack-50 text-3xl '/>
                          </>
                          :
                          
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
                          className='hidden'
                          accept={type === "image" ? "image/*" : undefined}/>
                    </div>
                    
                    {/* {errors.lName && <span className="text-[10px]  text-pink-1000">{errors.lName}</span>} */}
                </div>
  )
}

export default Upload