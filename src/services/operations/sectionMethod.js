import { apiConnector } from "../apiconnector";
import toast from "react-hot-toast";
import { courseEndPoints } from "../api";


export const createSection = async(token,data)=>{

    let result=[];
    let toastId = toast.success("Creating Section ",{duration:3000})
    try {
      console.log("Creating Section =>",data);
      let response = await apiConnector("POST",courseEndPoints.CREATE_SECTION_API,data,{
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      });
  
            console.log("Creating Section Response =>",response);
            result=response?.data?.data;
            return result;
     
      
    } catch (error) {
        console.log("Error in creating section =>",error)
        toast.error(`${error?.response?.data?.message}`,{duration:3000})
        throw error
    }finally{
      toast.dismiss(toastId);
    }
  }
  