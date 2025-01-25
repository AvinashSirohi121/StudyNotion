import React,{useEffect} from 'react'
import RenderSteps from '../AddCourse/RenderSteps'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom';
import { setEditCourse } from '../../../slices/courseSlice';

const EditCourse = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(()=>{
    if (location.pathname.includes("/dashboard/edit-course")) {
      dispatch(setEditCourse(true));
    }
  },[dispatch, location.pathname])
  return (
    <div className="flex flex-1 flex-col">
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Course
      </h1>
      <div className="flex-1">
        <RenderSteps type="Edit" />
      </div>
    </div>
  )
}

export default EditCourse