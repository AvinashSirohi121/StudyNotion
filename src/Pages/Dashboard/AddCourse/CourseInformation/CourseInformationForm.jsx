import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../../../services/operations/courseMethods';

const CourseInformationForm = () => {
    const { register,handleSubmit,setValue,getValue,formState:{errors}}= useForm();

    const {course, editCourse,courseCategory} = useSelector((state)=>state.course);
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);
    const [courseCategories,setCourseCategories]= useState([]);

    const settingCategories=()=>{
        setCourseCategories(courseCategory);
    }
    useEffect(()=>{
        settingCategories();
    },[])
  return (
    <div className='text-white'>
        <div>Hi</div>
        {courseCategories && courseCategories.map((category)=>(
            <div>{category.name}</div>
        ))}
    </div>
  )
}

export default CourseInformationForm