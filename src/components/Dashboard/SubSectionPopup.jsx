import React, { useState,useEffect } from 'react'
import { IoClose } from "react-icons/io5";
import Upload2 from "../common/Upload2"
import useValidation from '../../services/hooks/useValidation';
import { AiFillStar } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import {setCourse} from "../../slices/courseSlice"
import { createSubSection,updateSubSection } from '../../services/operations/subSectionMethod';
import {logout} from "../../services/operations/authMethods"
import { useNavigate } from 'react-router-dom';

const SubSectionPopup = ({courseId,sectionId,isVisible,editSubSection,setEditSubSection,editSubSectionData,onCancel, onConfirm,data,btn1}) => {
  const {validate,validateAll,setErrors,errors} = useValidation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {course} = useSelector((state)=>state.course)
  const {token} = useSelector((state)=>state.auth);
  
  useEffect(() => {
   
    if (editSubSection) {
      console.log("Insdie UseEffect of SubSectionPopUp =>",editSubSection)
      console.log("Insdie UseEffect of SubSectionPopUpData =>",editSubSectionData)
      setSubSectionData({
        subSectionName: editSubSectionData?.title || "",
        subSectionDescription: editSubSectionData?.description || "",
        subSectionVideo: editSubSectionData?.videoUrl || "",
      });
    
    } else {
      setSubSectionData({
        subSectionName: "",
        subSectionDescription: "",
        subSectionVideo: "",
      });
    }
  }, [editSubSection, editSubSectionData]);
  
  const [subSectionData, setSubSectionData] = useState({
    subSectionName: "",
    subSectionDescription: "",
    subSectionVideo: "",
  });

  const createSubSections= async()=>{
   // console.log(editSubSectionData,subSectionData)
    if(editSubSection){
        if(editSubSectionData.title === subSectionData.subSectionName &&
          editSubSectionData.description  === subSectionData.subSectionDescription &&
          editSubSectionData.videoUrl === subSectionData.subSectionVideo){
            
             
            // console.log("Title =>",editSubSectionData.title,subSectionData.subSectionName)
            // console.log("Description =>",editSubSectionData.description,subSectionData.subSectionDescription)
            // console.log("Video =>",editSubSectionData.videoUrl,subSectionData.subSectionVideo)

            toast.error("No changes detected in the lecture",{duration:3000})
            return
          }
             console.log("editSubSectionData =>",editSubSectionData)
             console.log("subSectionData =>",subSectionData)

            let formData = new FormData();
            formData.append("courseId",courseId);
            formData.append("sectionId",sectionId);
            formData.append("subSectionId",editSubSectionData?._id);
            formData.append("duration",editSubSectionData?.timeDuration);
            formData.append("title",subSectionData?.subSectionName);
            formData.append("description",subSectionData?.subSectionDescription);
            formData.append("videoUrl",subSectionData?.subSectionVideo);
            
            try{
              let data = await updateSubSection(token,formData);
              if(data){
                toast.success("Lecture Added successfully",{duration:3000})
                console.log("SubSectionData =>",data)
                dispatch(setCourse(data));
                onCancel();

              }
            
            }catch(error){
              console.log("Failed to create Lecture =>",error)
              if(error?.response?.data?.message=="Token is invalid or expired"){
                dispatch(logout(navigate));
            }
            }

          
          
          
    }else{
       // const updatedCourse = { ...course, }
          // console.log("UpdatedCourse =>",updatedCourse);
          if(subSectionData.subSectionName =="" || subSectionData.subSectionDescription =="" ||  subSectionData.subSectionVideo ==""){
            toast.error("Kindly Provide all details",{duration:3000})
          }else{
            console.log("SUbSection Data =>",subSectionData)
            let formData = new FormData();
            formData.append("sectionId",sectionId);
            formData.append("title",subSectionData?.subSectionName);
            formData.append("description",subSectionData?.subSectionDescription);
            formData.append("videoFile",subSectionData?.subSectionVideo);
            formData.append("courseId",courseId);
            try{
              let data = await createSubSection(token,formData);
              if(data){
                toast.success("Lecture Added successfully",{duration:3000})
                console.log("SubSectionData =>",data)
                dispatch(setCourse(data));
                onCancel();

              }
            
            }catch(error){
              console.log("Failed to create Lecture =>",error)
              if(error?.response?.data?.message=="Token is invalid or expired"){
                dispatch(logout(navigate));
            }
            }

          }
    }
   
      
  }

  const setMediaPath =(media)=>{
    console.log("setting Video in courseInformation =<",media)
    if(media){
      console.log("CourseImage =>",URL.createObjectURL(media));
      setSubSectionData((prevData) => ({
        ...prevData,
        subSectionVideo: media,
      }));
    }
  }

  const handleChange =(e)=>{
    const {name,value} = e.target;
    const error = validate(name,value,subSectionData);
   // console.log("Name =>",name," Value =>",value)

    setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
      }));
     
      // Update data state
      
        setSubSectionData((prevData) => ({
          ...prevData,
          [name]: value,
      }));
      
      
  }

  const handleCancel = () => {
      onCancel();
      setEditSubSection(false); // Reset editSubSection state
      setSubSectionData({
          subSectionName: "",
          subSectionDescription: "",
          subSectionVideo: "",
      });
};


    if (!isVisible) return null; // Do not render if not visible


  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
      <div className='h-[4rem] flex justify-between items-center bg-richblack-500 rounded-t-lg p-5'>

      <h2 className="text-xl font-semibold">{editSubSection === true ? "Edit Lecture":"Add Lecture"}</h2>
      <IoClose 
        onClick={handleCancel}
        className='text-3xl cursor-pointer'/>
      </div>
      <div className="flex-col items-center justify-between rounded-b-lg bg-richblack-700 p-5">
      
        <Upload2
           title="Lecture Video"
           type="video"
           setMediaPath={setMediaPath}
           mediaPath={subSectionData?.subSectionVideo}
          //  editCourse={editCourse}
          //  imagePath={data?.state?.thumbNail}
          //  setImagepath={setImagepath}
           />

          <div className='flex flex-col mt-5'>
              <label className='flex tracking-wider  text-sm'>Lecture Title <AiFillStar className='text-[5px] ml-2 text-pink-1000'/></label>
              <input 
                name="subSectionName"
                value={subSectionData.subSectionName}
                onChange={(e)=>handleChange(e)}
                className='h-[40px]  rounded-lg bg-richblack-800 pl-2 border-b border-richblack-400 outline-none mt-1' 
                placeholder='Enter Lecture Title'/>
                {errors.subSectionName && <span className="text-[10px]  text-pink-1000">{errors.subSectionName}</span>}
            </div>
                     
            <div className='flex flex-col mt-4'>
                <label className='flex tracking-wider  text-sm'>Lecture Description <AiFillStar className='text-[5px] ml-2 text-pink-1000'/></label>
                <textarea
                    name="subSectionDescription"
                    value={subSectionData.subSectionDescription}
                    onChange={(e)=>handleChange(e)}
                    className='min-h-[8rem] max-h-[15rem] pt-2 rounded-lg bg-richblack-800 pl-2 border-b border-richblack-400 outline-none mt-1' 
                    placeholder='Enter Lecture Description'/>
                  {errors.subSectionDescription && <span className="text-[10px]  text-pink-1000">{errors.subSectionDescription}</span>}
           </div>            

           <div className="flex  bottom-0 space-x-4 mt-5">
          <button
              onClick={()=>createSubSections()}
            className="bg-yellow-100  text-richblack-900 font-semibold py-2 px-4 rounded"
          >
            {btn1}
          </button>
          {/* <button
            onClick={onCancel}
            className="bg-richblack-500 hover:bg-richblack-600 text-white font-semibold py-2 px-4 rounded"
          >
            btn2
          </button> */}
        </div>
        
        </div>
        
        
        
      </div>
     
    </div>
  );
}

export default SubSectionPopup