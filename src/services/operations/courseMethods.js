import { apiConnector } from "../apiconnector";
import { courseEndPoints } from "../api";
import toast from "react-hot-toast";

export const fetchCategories = async()=>{
        let result =[];
            try{
                
                let data = await apiConnector("GET",courseEndPoints.COURSE_CATEGORIES_API);
                //console.log("FetchCategories data =>",data);
                if(data){
                    result=data;
                    //toast.success("Categories fetch Successfully",{duration:3000})
                }
            }catch(error){
                console.log("Error while fetching Categories =>",error);
                toast.error("Error while fetching Course Category",{duration:3000})
            }
        return result;
}

export const createCourse = async(formData,token) =>{
    const loadingToastId = toast.loading("Creating Course...");
    try {
      const response = await apiConnector("POST", courseEndPoints.CREATE_COURSE_API, formData, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      });
  
      const result = response?.data?.data;
      console.log("response =>",response)
      if (response?.data?.success) {
        toast.success(`${response?.data?.message}`, { duration: 3000 });
      } else {
        toast.error(`${response?.data?.message}`, { duration: 3000 });
      }
      return result;
    } catch (error) {
      console.error("Error while creating course =>", error);
      toast.error(error?.response?.data?.message || "An error occurred", { duration: 3000 });
      throw error; // Ensure errors are propagated
    } finally {
      toast.dismiss(loadingToastId);
    }
};

export const getCourseData =async(token)=>{
    let result=[];

    let loadingId = toast.loading("Getting CourseData")
    try {
        //console.log("Data=>",data," =>token =>",token);
        const response = await apiConnector("GET", courseEndPoints.GET_ALL_INSTRUCTOR_COURSES_API,"",{
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          });
        //console.log("Instructor Courses =>",response);
        result = response?.data?.data;
        return result
       
        
    } catch (error) {
        //console.log("Error while getting CourseData =>",error);
        toast.error(`${error?.response?.data?.message}`,{duration:3000})
        throw error;
    }finally{
        toast.dismiss(loadingId);
       
    }
}  

export const editCourses = async(token,formData)=>{

  let result=[];
  let toastId = toast.success("Editing Course",{duration:3000})
  try {
    console.log("Editing CourseId =>",formData);
    let response = await apiConnector("POST",courseEndPoints.EDIT_COURSE_API,formData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

   console.log("Editing Course Response =>",response);
   result=response?.data?.data;
   return result;
   
    
  } catch (error) {
      console.log("Error in editing Course =>",error)
      toast.error(`${error?.response?.data?.message}`,{duration:3000})
      throw error
  }finally{
    toast.dismiss(toastId);
  }
}

export const deleteCourse = async(token,courseId)=>{

  let result=[];
  let toastId = toast.success("Deleting Course",{duration:3000})
  try {
    console.log("Deleting CourseId =>",courseId);
    let response = await apiConnector("POST",courseEndPoints.DELETE_COURSE_API,courseId,{
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

   console.log("Deleting Course Response =>",response);
   result=response?.data?.data;
   return result;
   
    
  } catch (error) {
      console.log("Error in deleting Course =>",error)
      toast.error(`${error?.response?.data?.message}`,{duration:3000})
      throw error
  }finally{
    toast.dismiss(toastId);
  }
}

