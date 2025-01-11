import React, { useEffect, useState, useRef } from 'react'
import {useForm} from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../../../services/operations/courseMethods';
import { useNavigate } from 'react-router-dom';
import useValidation from '../../../../services/hooks/useValidation';
import { AiFillStar } from 'react-icons/ai';

import { MdNavigateNext } from "react-icons/md";
import Tags from "../../../../components/Dashboard/Tags"

import Upload from '../../../../components/common/Upload';
import {setCourseCategory} from "../../../../slices/courseSlice"
import { setStep } from '../../../../slices/courseSlice';
import { createCourse } from '../../../../services/operations/courseMethods';

const CourseInformationForm = () => {
    //const { register,handleSubmit,setValue,getValue,formState:{errors}}= useForm();

    const {course, editCourse,courseCategory} = useSelector((state)=>state.course);
    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);
    const [courseCategories,setCourseCategories]= useState([]);
    const {validate,validateAll,setErrors,errors} = useValidation();
    const [finalTags, setFinalTags] = useState([]);
    const [instruction, setInstruction] = useState("");
    const [instructions, setInstructions] = useState([]);
    const [courseImage,setCourseImage] = useState("");
    
 
   
    useEffect(() => {
        const fetchData = async () => {
            if (courseCategory.length === 0) {
                setLoading(true);
                let category = await fetchCategories();
                dispatch(setCourseCategory(category.data.data));
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const [courseData,setCourseData] = useState({
        courseName:"",
        courseDescription:"",
        price:0,
        tag:[],
        whatYouWillLearn:"",
        category:"",
        status:"draft",
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
        let instructionData ={ id: `id-${Date.now()}`, name: instruction.trim() };
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
    console.log("CourseImage =>",URL.createObjectURL(Image));
    setCourseData((prevData) => ({
      ...prevData,
      courseImage: Image,
  }));
  }

  const initiateCourse =()=>{
    if(courseData.courseName !=="" &&
      courseData.courseDescription !=="" &&
      courseData.price !=="" &&
      courseData.courseImage !=="" &&
      courseData.courseCategories !=="" &&
      courseData.tag.length >0 &&
      courseData.instructions.length>0 &&
      courseData.whatYouWillLearn !=="" &&
      courseData.instructor !==""
    ){
      console.log("Course =>",courseData)
      const formData = new FormData();
      formData.append('courseImage',courseData.courseImage);
      console.log("FormData =>",formData)

      dispatch(createCourse(courseData,formData,token,navigate));
      

   }
   
  }

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
                        {instructions.length > 0 &&
                            instructions.map((i) => (
                            <div key={i.id} className='flex items-end gap-2 justify-between px-2 mt-2 '>
                                <p className="max-w-[80%] break-words  italic">
                                {i?.name}
                                </p>
                                <button
                                    className="text-pink-1000 bg-pink-900 p-1 rounded-2xl text-xs mb-[2px] cursor-pointer"
                                    onClick={() => deleteInstruction(i.id)}>
                                        remove
                                    </button>
                            </div>
                            ))}
                        </div>

            </div>

             

        </div>
        <div className='mt-4 flex justify-end'>              
            <button 
              onClick={()=>initiateCourse()}
              className='w-[15%]  h-[35px]  mr-3 flex items-center justify-center  bottom-0 rounded-lg bg-yellow-50 text-black z-10'>Next <MdNavigateNext /> </button>                  
          </div> 

       
       
    </div>
  )
}

export default CourseInformationForm