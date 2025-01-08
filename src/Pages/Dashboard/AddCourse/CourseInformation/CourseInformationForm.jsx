import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../../../services/operations/courseMethods';
import { useNavigate } from 'react-router-dom';
import useValidation from '../../../../services/hooks/useValidation';
import { AiFillStar } from 'react-icons/ai';
import { MdOutlineCancel } from "react-icons/md";
import Tags from "../../../../components/Dashboard/Tags"
import { IoCloudUpload } from "react-icons/io5";


const CourseInformationForm = () => {
    //const { register,handleSubmit,setValue,getValue,formState:{errors}}= useForm();

    const {course, editCourse,courseCategory} = useSelector((state)=>state.course);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);
    const [courseCategories,setCourseCategories]= useState([]);
    const {validate,validateAll,setErrors,errors} = useValidation();
    const [finalTags, setFinalTags] = useState([]);
    const [instruction, setInstruction] = useState("");
    const [instructions, setInstructions] = useState([]);
    

    // const settingCategories=()=>{
    //     setCourseCategories(courseCategory);
    // }
    // useEffect(()=>{
    //     settingCategories();
    // },[]);

    const [courseData,setCourseData] = useState({
        courseName:"",
        courseDescription:"",
        price:0,
        tag:finalTags,
        whatYouWillLearn:"",
        category:"",
        status:"",
        instructor:"",
        instructions:[],
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
  };

  const addInstruction =()=>{
    if(instruction !==""){
        let instructionData ={ id: `id-${Date.now()}`, name: instruction.trim() };
        //console.log("Instructions =>",instructionData);
        let updatedInstruction = [...instructions,instructionData];
        setInstructions(updatedInstruction);
        setInstruction("")
    }
   

  }
  const deleteInstruction =(id)=>{
        let updatedInstruction = instructions.filter((i)=>i.id !=id);
        setInstructions(updatedInstruction);
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
                {errors.lName && <span className="text-[10px]  text-pink-1000">{errors.lName}</span>}
            </div>
            <div className='flex flex-col mt-4'>
              <label className='flex tracking-wider  text-sm'>Course Description <AiFillStar className='text-[5px] ml-2 text-pink-1000'/></label>
                <textarea
                    name="courseDescription"
                    value={courseData.courseDescription}
                    onChange={(e)=>handleChange(e)}
                    className='min-h-[8rem] max-h-[15rem] pt-2 rounded-lg bg-richblack-800 pl-2 border-b border-richblack-400 outline-none mt-1' 
                    placeholder='Enter Description'/>
                {errors.lName && <span className="text-[10px]  text-pink-1000">{errors.lName}</span>}
            </div>
            <div className='flex flex-col mt-4'>
              <label className='flex tracking-wider  text-sm'>Course price <AiFillStar className='text-[5px] ml-2 text-pink-1000'/></label>
                <input 
                    type="number"
                    name="price"
                    value={courseData.price}
                    onChange={(e)=>handleChange(e)}
                    className='h-[40px]  rounded-lg bg-richblack-800 pl-2 border-b border-richblack-400 outline-none mt-1 outline-none mt-1 no-arrows' 
                    placeholder='Enter Price'/>
                {errors.lName && <span className="text-[10px]  text-pink-1000">{errors.lName}</span>}
            </div>
            
            <Tags
                placeholder="Add your tags here"
                onTagsChange={handleTagsChange} // Callback to receive the tags
            />


            <div className='flex flex-col mt-4'>
              <label className='flex tracking-wider  text-sm'>Course Thumbnail <AiFillStar className='text-[5px] ml-2 text-pink-1000'/></label>
                <div 
                    
                    className='h-[15rem] text-richblack-400 flex flex-col justify-center items-center bg-richblack-800 mt-2 rounded-xl border-dotted border-richblack-400 border-[2px]'>
                    <IoCloudUpload className='text-[5rem] text-yellow-25 bg-yellow-700 rounded-full p-3'/>
                    <p>Drag and drop an image, or</p>
                    <div className='flex gap-2'>click to <p className='text-yellow-50'>Browse</p> a file</div>
                   <div className='flex mt-5 text-xs gap-7'>
                  
                        <p>• Aspect ration 16:9</p>
                        <p>• Recommended sixe 1024x576</p>
                    
                    </div>
                </div>
                <input type="file"/>
                {errors.lName && <span className="text-[10px]  text-pink-1000">{errors.lName}</span>}
            </div>

            <div className='flex flex-col mt-4'>
              <label className='flex tracking-wider  text-sm'>Beneift of the course <AiFillStar className='text-[5px] ml-2 text-pink-1000'/></label>
                <textarea
                    name="whatYouWillLearn"
                    value={courseData.whatYouWillLearn}
                    onChange={(e)=>handleChange(e)}
                    className='min-h-[8rem] max-h-[15rem] pt-2 rounded-lg bg-richblack-800 pl-2 border-b border-richblack-400 outline-none mt-1' 
                    placeholder='Enter benefits of the course'/>
                {errors.lName && <span className="text-[10px]  text-pink-1000">{errors.lName}</span>}
            </div>

            <div className='flex flex-col mt-4'>
              <label className='flex tracking-wider  text-sm'>Requirements/ Instructions<AiFillStar className='text-[5px] ml-2 text-pink-1000'/></label>
                <div className='flex justify-between items-center'>
                    <input
                        name="whatYouWillLearn"
                        value={instruction}
                        onChange={(e)=>setInstruction(e.target.value)}
                        className='h-[40px] w-[80%]  rounded-lg bg-richblack-800 pl-2 border-b border-richblack-400 outline-none mt-1' 
                        placeholder='Add Instructions'/>
                    
                    <button 
                        onClick={()=>addInstruction()}
                        className='w-[15%]  h-[35px] rounded-lg bg-yellow-50 text-black z-10'>Add</button>   
                 </div>
                {errors.lName && <span className="text-[10px]  text-pink-1000">{errors.lName}</span>}
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

       
       
    </div>
  )
}

export default CourseInformationForm