import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { courseEndPoints } from "../api";


export const createSubSection = async(token,data)=>{

    let result=[];
    let toastId = toast.loading("Creating Lecture ")
    try {
      console.log("Creating SubSection =>",data);
      let response = await apiConnector("POST",courseEndPoints.CREATE_SUBSECTION_API,data,{
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      });
  
            console.log("Creating SubSection Response =>",response);
            result=response?.data?.data;
            return result;
     
      
    } catch (error) {
        console.log("Error in creating subsection =>",error)
        toast.error(`${error?.response?.data?.message}`,{duration:3000})
        throw error
    }finally{
      toast.dismiss(toastId);
    }
}
  