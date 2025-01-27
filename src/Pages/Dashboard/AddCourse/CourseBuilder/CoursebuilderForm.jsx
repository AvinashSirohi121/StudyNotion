import React,{useState,useEffect} from 'react'
import { MdNavigateNext } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { setStep,setCourse } from '../../../../slices/courseSlice';
import useValidation from '../../../../services/hooks/useValidation';
import {AiFillStar} from "react-icons/ai"
import { IoMdAddCircleOutline } from "react-icons/io";
import { createSection,editSection } from '../../../../services/operations/sectionMethod';
import toast from 'react-hot-toast';
import { IoIosCloseCircle } from "react-icons/io";
import NestedComponent from '../../../../components/Dashboard/NestedComponent';

const CoursebuilderForm = () => {

  const dispatch = useDispatch();
  const [section,setSection]= useState({section:""});
  const [updatedSection,setUpdatedSection]= useState({});
  const [editSectionData,setEditSectionData] = useState(false);
  const {validate,validateAll,setErrors,errors} = useValidation();
  const {token} = useSelector((state)=>state.auth);
  const [openSectionId, setOpenSectionId] = useState(null);
  const {step,course, editCourse,courseCategory} = useSelector((state)=>state.course);

 // console.log("Course in CourseBuilder =>",course);
  const toggleSection = (sectionId) => {
    setOpenSectionId((prevId) => (prevId === sectionId ? null : sectionId));
  };
  
  const handleChange =(e)=>{
    const {name,value} = e.target;
    const error = validate(name,value,section);
   // console.log("Name =>",name," Value =>",value)

    setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
      }));
     
      // Update data state
      
        setSection((prevData) => ({
          ...prevData,
          [name]: value,
      }));
      
      
  }

  // const addSection =async()=>{
  //   console.log("CurrentCourse Id=>",course._id);
    
  //   let formData = new FormData();

  //   if(editSectionData==true){

  //       console.log("Updated Section Data =>",updatedSection)
  //       console.log("Edit Section Data =>",section)

  //       if(section.section === updatedSection.sectionName){
  //         toast.error("Section is not Edited",{duration:3000});
  //         return
  //       }
  //       else{
  //         formData.append('sectionName',section?.section)
  //         formData.append('sectionId',section?._id)
  //         formData.append('courseId',course?._id)
  //           try {
  //               let data = await editSection(token,formData)
  //               console.log("Edit Section Data =>",data)
  //               if(data){
  //                 setSection({section:""});
  //                 setUpdatedSection({});
  //                 setEditSectionData(false);
  //                 dispatch(setCourse(data))
  //                 toast.success("Section edited successfully",{duration:3000})
  //               }
  //           } catch (error) {
  //             console.log("Failed to Edit Section =>",error)
  //           }
  //       }

  //   }else{
  //     console.log("New Section Data =>",section)
  //     if(section.section ==""){
  //       toast.error("Please enter Section Name",{duration:3000});
  //     }
  //     else{
  //       formData.append('sectionName',section?.section)
  //       formData.append('courseId',course?._id)
  //         try {
  //             let data = await createSection(token,formData)
  //             console.log("Creating Section Data =>",data)
  //             if(data){
  //               setSection({section:""});
  //               dispatch(setCourse(data))
  //               toast.success("Section Created successfully",{duration:3000})
  //             }
  //         } catch (error) {
  //           console.log("Failed to Creation Section =>",error)
  //         }
  //     }
  //   }
    
  // }
  const addSection = async () => {
    //console.log("Current Course ID:", course._id);
  
    // Validate Section Input
    if (!section.section) {
      toast.error("Please enter Section Name", { duration: 3000 });
      return;
    }
  
    let formData = new FormData();
  
    try {
      if (editSectionData) {
        // Editing Section
        console.log("Updated Section Data:", updatedSection);
        console.log("Editing Section:", section);
  
        if (section.section === updatedSection.sectionName) {
          toast.error("No changes detected in the section", { duration: 3000 });
          return;
        }
  
        // Append necessary data for edit
        formData.append("sectionName", section.section);
        formData.append("sectionId", section._id);
        formData.append("courseId", course._id);
  
        const updatedData = await editSection(token, formData);
        if (updatedData) {
          // Reset States and Dispatch
          setSection({ section: "" });
          setUpdatedSection({});
          setEditSectionData(false);
          dispatch(setCourse(updatedData));
          toast.success("Section edited successfully", { duration: 3000 });
        }
      } else {
        // Creating New Section
        console.log("New Section Data:", section);
  
        formData.append("sectionName", section.section);
        formData.append("courseId", course._id);
  
        const newData = await createSection(token, formData);
        if (newData) {
          // Reset State and Dispatch
          setSection({ section: "" });
          dispatch(setCourse(newData));
          toast.success("Section created successfully", { duration: 3000 });
        }
      }
    } catch (error) {
      console.error("Error in Section Operation:", error);
      toast.error("An error occurred. Please try again.", { duration: 3000 });
    }
  };
  
  const editSections =(sectionData)=>{
    console.log("Inside editSection of CourseBuilderForm =>",sectionData);
    setEditSectionData(true);
    setUpdatedSection(sectionData)
    setSection({
      section: sectionData.sectionName || "", // Use `sectionName` if that's what your backend sends
      _id: sectionData._id || null, // Preserve the ID if needed for editing
    });
  }

  const cancelEditSection =()=>{
    setEditSectionData(false);
    setSection({
      section:  "", // Use `sectionName` if that's what your backend sends
      _id:  null, // Preserve the ID if needed for editing
    });
  }

  return (
    <div className='text-white w-[70%] mx-auto'>
      <div className='mt-5 bg-richblack-700 rounded-xl py-2 px-3'>
        <h2 className='text-2xl ml-3'>Course Builder</h2>
        <div className='flex-col items-end p-3'>
       
        
          <label className='flex tracking-wider  text-sm'>Section Name <AiFillStar className='text-[5px] ml-2 text-pink-1000'/></label>
          <div className='flex items-center justify-between lg:gap-5 md:gap-3 '>
          <input 
             name="section"
             value={section?.section || ""}
             onChange={(e)=>handleChange(e)}
             className='h-[40px] lg:w-[70%] md:w-[65%] rounded-lg bg-richblack-800 pl-2 border-b border-richblack-400 outline-none mt-1' 
             placeholder='Enter Section Name'/>
             {errors.section && <span className="text-[10px]  text-pink-1000">{errors.section}</span>}

            <div className='flex gap-3 items-center'>
             <button
              onClick={()=>addSection()}
              className='h-[35px] mt-[1px] lg:text-base  md:text-xs px-2 border-2 border-yellow-50 flex items-center justify-between  bottom-0 rounded-lg text-yellow-50  z-10'>
              {editSectionData === true ? "Edit Section":" Add Section"}
              {editSectionData !== true && <IoMdAddCircleOutline  
                                              className='rotate-40 ml-2 md:hidden lg:block' />}
            </button>
            {editSectionData === true && (
                <div className="relative group">
                  <IoIosCloseCircle
                    onClick={() => cancelEditSection()}
                    className="text-2xl text-yellow-50 cursor-pointer hover:text-pink-1000"
                  />
                  <div className="absolute left-0 bottom-0 cursor-pointer mb-5 hidden group-hover:block bg-pink-1000 opacity-80 text-richblack-900 text-sm px-2 py-1 rounded shadow-lg">
                    Cancel Edit
                  </div>
                </div>
              )}

              </div>
          </div>
          {course?.courseContent.length > 0 && course?.courseContent?.map((section,index)=>(
            <div className='mt-5 bg-richblack-800 rounded-lg px-5 p-3 flex flex-col gap-4'>
            
                <NestedComponent 
                key={section._id}
                section={section}
                courseId={course?._id}
                openSectionId={openSectionId}
                toggleSection={toggleSection} 
                editSections={editSections}
                />
                
            
            </div>
            ))}
        
       
       
        </div>
        
       
      </div>
      <div className='mt-4 flex gap-3 justify-end'>  
                            
                  <button 
                    onClick={()=>dispatch(setStep(1))}
                    className='   h-[35px] px-2 lg:mr-3 flex items-center justify-between  bottom-0 rounded-lg bg-richblack-400 text-white z-10'> <MdNavigateNext className='rotate-180' /> Back</button>                  
                  
                  <button 
                    onClick={()=>dispatch(setStep(3))}
                    className='   h-[35px] px-2 lg:mr-3 flex items-center justify-between  bottom-0 rounded-lg bg-yellow-50 text-black z-10'>Next <MdNavigateNext /> </button>                  
      </div> 
    </div>
  )
}

export default CoursebuilderForm