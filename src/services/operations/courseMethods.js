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
        console.log("token =>",token);
        const response = await apiConnector("GET", courseEndPoints.GET_ALL_COURSE_API, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          });
        console.log("Instructor Courses =>",response);
        result = response?.data?.data;
        return result
        
    } catch (error) {
        console.log("Error while getting CourseData =>",error)
        toast.error(`${error?.response?.data?.message}`,{duration:3000})
    }finally{
        toast.dismiss(loadingId)
    }
}  