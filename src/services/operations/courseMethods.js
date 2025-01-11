import { apiConnector } from "../apiconnector";
import { courseEndPoints } from "../api";
import toast from "react-hot-toast";
import {setLoading} from "../../slices/courseSlice"
import {logout} from "../operations/authMethods"

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

export const createCourse = (courseData,formData,token,navigate) =>{

        
    return async(dispatch)=>{
        console.log("CourseData =>",courseData)
        console.log("Token =>",token)
        
        const loadingToastId = toast.loading("Uploading display Image...");
        try {
                dispatch(setLoading(true));
                
                const result = await  apiConnector("POST",courseEndPoints.CREATE_COURSE_API,courseData,
                   {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                  });

                  console.log("Create Course =>",result?.data?.data)
                  if(result?.data?.success){
                        // console.log("User Image updated successfully");
                         console.log("Create Course =>",result?.data?.data)
                        toast.success(`${result?.data?.message}`,{duration:3000});
                       // dispatch(setUser(result?.data?.data))
                        //console.log("User =>",result?.data?.data)
                   
                        //navigate('/dashboard/settings')
                  }else{
                    //console.log("Unable to update user Image")
                    toast.error(`${result?.data?.message}`,{duration:3000})
                  }
            
        } catch (error) {
            console.log("Error in  updateDisplayPicture =>",error);
            toast.error(error?.response?.data?.message || "An error occurred", { duration: 3000 });
            if(error?.response?.data?.message=="Token is invalid"){
                dispatch(logout(navigate));
             }
        }finally{
            dispatch(setLoading(false));  // Reset loading state in Redux

            // Dismiss the loading toast if it's still active
            toast.dismiss(loadingToastId);
            
        }
    }
}