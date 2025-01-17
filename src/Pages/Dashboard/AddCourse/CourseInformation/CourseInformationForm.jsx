import React, { useEffect, useState, useRef } from 'react'
import {useForm} from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../../../services/operations/courseMethods';
import { useLocation, useNavigate } from 'react-router-dom';
import useValidation from '../../../../services/hooks/useValidation';
import { AiFillStar } from 'react-icons/ai';

import { MdNavigateNext } from "react-icons/md";
import Tags from "../../../../components/Dashboard/Tags"

import Upload from '../../../../components/common/Upload';
import {setCourse, setCourseCategory,setStep,setEditCourse} from "../../../../slices/courseSlice"
import { createCourse,editCourses } from '../../../../services/operations/courseMethods';


const CourseInformationForm = () => {
    //const { register,handleSubmit,setValue,getValue,formState:{errors}}= useForm();

    const {step,course, editCourse,courseCategory} = useSelector((state)=>state.course);
    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [loading,setLoading] = useState(false);
    const {validate,validateAll,setErrors,errors} = useValidation();
    const [finalTags, setFinalTags] = useState([]);
    const [instruction, setInstruction] = useState("");
    const [instructions, setInstructions] = useState([]);
    const [courseImage,setCourseImage] = useState("");
    const previousPath = useRef(location.pathname);

   

    const data = useLocation();
    const setEditableCourseData = (data) => {
      dispatch(setCourse(data));
      //console.log("Inside setEditableCourseData =>", data);
    
      
      // Update courseData with values from data, if present
      setCourseData((prevState) => {
        const categoryId = data?.category[0];
        const categoryName = courseCategory.find((cat) => cat._id === categoryId)?.name || prevState.category;
         //console.log("data",data)
        // console.log("data?.courseImage =>",data?.thumbNail," prevState.courseImage =>",prevState.courseImage, prevState.thumbNail )
      return {
        ...prevState,
        courseName: data?.courseName || prevState.courseName,
        courseDescription: data?.courseDescription || prevState.courseDescription,
        price: data?.price || prevState.price,
        tag: data?.tag || prevState.tag,
        whatYouWillLearn: data?.whatYouWillLearn || prevState.whatYouWillLearn,
        category: categoryId || prevState.category ,
        status: data?.status || prevState.status,
        instructor: data?.instructor || prevState.instructor,
        instructions: data?.instructions || prevState.instructions,
        courseImage: data?.thumbNail || prevState.courseImage,
      }
    });
      setInstructions(data?.instructions)
    };
    
    
  const [courseData,setCourseData] = useState({
        courseName:"",
        courseDescription:"",
        price:0,
        tag:[],
        whatYouWillLearn:"",
        category:"",
        status:"Draft",
        instructor:user._id,
        instructions:[],
        courseImage:""
  })

  const handleChange =(e)=>{
        const {name,value} = e.target;
        const error = validate(name,value,courseData);
       // console.log("Name =>",name," Value =>",value)

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
          }));
         
          // Update data state
          
            setCourseData((prevData) => ({
              ...prevData,
              [name]: value,
          }));
          
          
  }
    
  const handleTagsChange = (updatedTags) => {
    setFinalTags(updatedTags); // Store the tags in the parent component
    setCourseData((prevData)=>({
      ...prevData,
      tag:updatedTags
    }))
  };

  const addInstruction =()=>{
    if(instruction !==""){
        let instructionData ={ id: `${Date.now()}`, name: instruction.trim() };
        //console.log("Instructions =>",instructionData);
        let updatedInstruction = [...instructions,instructionData];
        setInstructions(updatedInstruction);
        setInstruction("")
        setCourseData((prevData)=>({
          ...prevData,
          instructions:updatedInstruction
        }))
    }
   

  }
  const deleteInstruction =(id)=>{
        let updatedInstruction = instructions.filter((i)=>i.id !=id);
        setInstructions(updatedInstruction);
  }

  const setImagepath =(Image)=>{
    console.log("setting Image in courseInformation =<",Image)
    if(Image){
      console.log("CourseImage =>",URL.createObjectURL(Image));
    setCourseData((prevData) => ({
      ...prevData,
      courseImage: Image,
  }));
    }
    
  }

  const  checkIfCourseEdited=()=>{

    if(courseData?.courseName !== course?.courseName ||
      courseData?.courseDescription !== course?.courseDescription ||
      courseData?.price !== course?.price ||
      courseData.courseCategory !== course?.courseCategory ||
      courseData.tag !== course?.tag ||
      courseData.instructions !== course?.instructions || 
      courseData.whatYouWillLearn !== course?.whatYouWillLearn ||
      courseData.courseImage !== course?.courseImage
    ){
      return true
    }
    return false
  }
  const initiateCourse =async()=>{
    // console.log("Edit Course =>",editCourse," Step =>",step)
     console.log("Course from Redux =>",course)
    let formData = new FormData();
    if(editCourse){
      // console.log("Calling befor Saving edited course");
      // console.log("CourseData =>",courseData);
      let IfCourseEdited = checkIfCourseEdited();
      console.log("Is Course Edited =>",IfCourseEdited);

      if(courseData.courseName !=="" && courseData.courseName !== course?.courseName){
        formData.append("courseName",courseData.courseName)
        console.log("OldCourseName =>",course?.courseName," UpdatedCourseName =>",courseData.courseName)
      }
      if(courseData.courseDescription !=="" && courseData.courseDescription !== course?.courseDescription){
        formData.append("courseDescription",courseData.courseDescription)
        console.log("OldcourseDescription =>",course?.courseDescription," UpdatedcourseDescription =>",courseData.courseDescription)
      }
      if(courseData.price !=="" && courseData.price !== course?.price){
        formData.append("price",courseData.price)
        console.log("OldCourseName =>",course?.price," UpdatedCourseName =>",courseData.price)
      }
      if(courseData.courseImage !=="" && courseData.courseImage !== course?.thumbNail){
        formData.append('courseImage',courseData?.courseImage);
        console.log("OldCourseImage =>",course?.thumbNail," UpdatedCourseImage =>",courseData.courseImage)
      }
      if(courseData.whatYouWillLearn !=="" && courseData.whatYouWillLearn !== course?.whatYouWillLearn){
        formData.append('whatYouWillLearn',courseData?.whatYouWillLearn)
        console.log("Old WhatYouWillLearn=>",course?.whatYouWillLearn," Updated WhatYouWillLearn =>",courseData.whatYouWillLearn)
      }
      if(courseData.tag.length > 0 && courseData.tag.toString() !== course?.tag.toString()){
        formData.append('tag',JSON.stringify(courseData?.tag))
        console.log("Old tags =>",course?.tag," Updated Tags=>",courseData.tag)
      }
      if(courseData.category !=="" && courseData.category !== course?.category[0]){
        formData.append('category',courseData?.category)
        console.log("OldCategory =>",course?.category[0]," UpdatedCategory =>",courseData.category)
      }
      if(courseData.instructions.length >0  && courseData.instructions.toString() !== course?.instructions.toString()){
        formData.append('instructions',JSON.stringify(courseData?.instructions))
        console.log("Old Instructions =>",course?.instructions," UpdatedInstrctions =>",courseData.instructions)
      }

      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      console.log("Lenght =>",Array.from(formData.entries()).length)
      if(Array.from(formData.entries()).length>0){
        try {
          formData.append('courseId',course?._id);
          for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
          }
          const data = await editCourses(token,formData); // Call the API function
          if (data) {
            dispatch(setCourse(data));
            dispatch(setStep(2));
            console.log("Course Edited:", data);
            if(editCourse==true){
              dispatch(setEditCourse(false));
            }
            console.log("Printing after editing the course = the course")
          }
        } catch (error) {
          console.error("Failed to edit course:", error);
        }
     
      }
      
    }else{
      // course is created for First Time
      if (courseData.courseName !=="" &&
        courseData.courseDescription !=="" &&
        courseData.price !=="" &&
        courseData.courseImage !=="" &&
        courseData.courseCategories !=="" &&
        courseData.tag.length >0 &&
        courseData.instructions.length>0 &&
        courseData.whatYouWillLearn !=="" &&
        courseData.instructor !==""
      ){
        console.log("CoursImage=>",courseData.courseImage)
       
        
       
        formData.append('courseName',courseData?.courseName)
        formData.append('courseDescription',courseData?.courseDescription)
        formData.append('courseImage',courseData?.courseImage);
        formData.append('whatYouWillLearn',courseData?.whatYouWillLearn)
        formData.append('price',courseData?.price)
        formData.append('tag',JSON.stringify(courseData?.tag))
        formData.append('category',courseData?.category)
        formData.append('status',courseData?.status)
        formData.append('instructor',courseData?.instructor)
        formData.append('instructions',JSON.stringify(courseData?.instructions))
        
        try {
          const data = await createCourse(formData, token); // Call the API function
          if (data) {
            dispatch(setCourse(data));
            dispatch(setStep(2));
            console.log("Course Created:", data);
            if(editCourse==true){
              dispatch(setEditCourse(false));
            }
            console.log("Printing after creating the course = the course")
          }
        } catch (error) {
          console.error("Failed to create course:", error);
        }
       
    
    }
    
   
    }

   
    
    
  
   

}

  useEffect(() => {
    const fetchData = async () => {
        if (courseCategory.length === 0) {
            setLoading(true);
            let category = await fetchCategories();
            dispatch(setCourseCategory(category?.data?.data));
            setLoading(false);
        }
    };
    fetchData();
    if(data.state){
      setEditableCourseData(data.state);
    }
    

}, [data]);




  return (
    <div className='text-white'>
        <div className='w-full bg-richblack-700 border-richblack-300 rounded-md px-4 p-3'>
            <div className='flex flex-col'>
              <label className='flex tracking-wider  text-sm'>Course Title <AiFillStar className='text-[5px] ml-2 text-pink-1000'/></label>
                <input 
                    name="courseName"
                    value={courseData.courseName}
                    onChange={(e)=>handleChange(e)}
                    className='h-[40px]  rounded-lg bg-richblack-800 pl-2 border-b border-richblack-400 outline-none mt-1' 
                    placeholder='Enter last name'/>
                {errors.courseName && <span className="text-[10px]  text-pink-1000">{errors.courseName}</span>}
            </div>
            <div className='flex flex-col mt-4'>
              <label className='flex tracking-wider  text-sm'>Course Description <AiFillStar className='text-[5px] ml-2 text-pink-1000'/></label>
                <textarea
                    name="courseDescription"
                    value={courseData.courseDescription}
                    onChange={(e)=>handleChange(e)}
                    className='min-h-[8rem] max-h-[15rem] pt-2 rounded-lg bg-richblack-800 pl-2 border-b border-richblack-400 outline-none mt-1' 
                    placeholder='Enter Description'/>
                {errors.courseDescription && <span className="text-[10px]  text-pink-1000">{errors.courseDescription}</span>}
            </div>
            <div className='flex flex-col mt-4'>
              <label className='flex tracking-wider  text-sm'>Course price <AiFillStar className='text-[5px] ml-2 text-pink-1000'/></label>
                <input 
                    type="number"
                    name="price"
                    value={courseData.price}
                    min="0"
                    onChange={(e)=>handleChange(e)}
                    className='h-[40px]  rounded-lg bg-richblack-800 pl-2 border-b border-richblack-400 outline-none mt-1 outline-none mt-1 no-arrows' 
                    placeholder='Enter Price'/>
                {errors.price && <span className="text-[10px]  text-pink-1000">{errors.price}</span>}
            </div>
            <div className='flex flex-col mt-4'>
              <label className='flex tracking-wider  text-sm'>Course Category <AiFillStar className='text-[5px] ml-2 text-pink-1000'/></label>
                <select 
                  name="category"
                  value={courseData.category}
                  onChange={(e)=>handleChange(e)}
                className='bg-richblack-800 h-[40px] rounded-lg'>
                  <option 
                    
                    value=""
                    className='text-richblack-500'>Choose a Category</option>
                  {!loading && courseCategory?.map((category,index)=>(
                    <option 
                      key={index} 
                      value={category._id}>{category.name}</option>
                  ))}
                </select>
                {errors.category && <span className="text-[10px]  text-pink-1000">{errors.category}</span>}
            </div>
            
            <Tags
                courseTags={courseData.tag}
                placeholder="Add your tags here"
                onTagsChange={handleTagsChange} // Callback to receive the tags
            />
            {errors.tag && <span className="text-[10px]  text-pink-1000">{errors.tag}</span>}


            {/* <div className='flex flex-col mt-4'>
              <label className='flex tracking-wider  text-sm'>Course Thumbnail <AiFillStar className='text-[5px] ml-2 text-pink-1000'/></label>
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
                      <p>Drag and drop an image, or</p>
                      <div className='flex gap-2'>click to <p className='text-yellow-50'>Browse</p> a file</div>
                    <div className='flex mt-5 text-xs gap-7'>
                    
                          <p>• Aspect ration 16:9</p>
                          <p>• Recommended sixe 1024x576</p>
                      
                      </div>
                    </>
                    }  
                    
                        <input 
                      type="file" 
                      ref={imageRef} 
                      onChange={(e)=>imageUploadHandle(e)}
                      className='hidden'/>
                </div>
                
                {errors.lName && <span className="text-[10px]  text-pink-1000">{errors.lName}</span>}
            </div> */}
            <Upload 
             title="Browse Image"
             type="image"
             editCourse={editCourse}
             imagePath={data?.state?.thumbNail}
             setImagepath={setImagepath}/>
              {errors.courseImage && <span className="text-[10px]  text-pink-1000">{errors.courseImage}</span>}

            <div className='flex flex-col mt-4'>
              <label className='flex tracking-wider  text-sm'>Beneift of the course <AiFillStar className='text-[5px] ml-2 text-pink-1000'/></label>
                <textarea
                    name="whatYouWillLearn"
                    value={courseData.whatYouWillLearn}
                    onChange={(e)=>handleChange(e)}
                    className='min-h-[8rem] max-h-[15rem] pt-2 rounded-lg bg-richblack-800 pl-2 border-b border-richblack-400 outline-none mt-1' 
                    placeholder='Enter benefits of the course'/>
                {errors.whatYouWillLearn && <span className="text-[10px]  text-pink-1000">{errors.whatYouWillLearn}</span>}
            </div>

            <div className='flex flex-col mt-4'>
              <label className='flex tracking-wider  text-sm'>Requirements/ Instructions<AiFillStar className='text-[5px] ml-2 text-pink-1000'/></label>
                <div className='flex justify-between items-center'>
                    <input
                        name="instructions"
                        value={instruction}
                        onChange={(e)=>setInstruction(e.target.value)}
                        className='h-[40px] w-[80%]  rounded-lg bg-richblack-800 pl-2 border-b border-richblack-400 outline-none mt-1' 
                        placeholder='Add Instructions'/>
                    
                    <button 
                        onClick={()=>addInstruction()}
                        className='w-[15%]  h-[35px] rounded-lg bg-yellow-50 text-black z-10'>Add</button>   
                 </div>
                {errors.instruction && <span className="text-[10px]  text-pink-1000">{errors.instruction}</span>}
                <div className="flex-wrap max-w-[80%]">
                {instructions.map((i, index) => (
                      <div key={i.id} className="flex items-end gap-2 justify-between px-2 mt-2">
                        <p className="max-w-[80%] break-words italic">
                        {`${index + 1}. ${i?.name}`}
                        </p>
                        <button
                          className="text-pink-1000 bg-pink-900 p-1 rounded-2xl text-xs mb-[2px] cursor-pointer"
                          onClick={() => deleteInstruction(i.id)}
                        >
                          remove
                        </button>
                      </div>
                    ))}

                        </div>

            </div>

             

        </div>
        <div className='mt-4 flex gap-3 justify-end'>  
            {editCourse ?            
            <button 
              onClick={()=>dispatch(setStep(2))}
              className='h-[35px] px-2 lg:mr-3 flex items-center justify-between  bottom-0 rounded-lg bg-richblack-400 text-white z-10'>Continue Without Saving <MdNavigateNext /> </button>                  
            :""}
            <button 
              onClick={()=>initiateCourse()}
              className='h-[35px] px-2 lg:mr-3 flex items-center justify-between  bottom-0 rounded-lg bg-yellow-50 text-black z-10'>{editCourse ? "Save Changes" :"Next"} <MdNavigateNext /> </button>                  
          </div> 

       
       
    </div>
  )
}

export default CourseInformationForm