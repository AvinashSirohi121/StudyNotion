
import toast from 'react-hot-toast'
import {setLoading,setUser,user} from "../../slices/profileSlice"
import { apiConnector } from '../apiconnector';
import {profileEndPoints} from "../api"

export const updateDisplayPicture =(formData,token)=>{

    return async(dispatch)=>{
        const loadingToastId = toast.loading("Uploading display Image...");
        try {
                dispatch(setLoading(true));
                const result = await  apiConnector("PUT",profileEndPoints.UPDATE_DISPLAY_PICTURE_API,
                    formData,{
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                  });

                 //console.log("updateDisplayPicture result =>",result)
                  if(result?.data?.success){
                        // console.log("User Image updated successfully");
                        // console.log("User =>",result?.data?.data)
                        toast.success(`${result?.data?.message}`,{duration:3000});
                        dispatch(setUser(result?.data?.data))
                        //console.log("User =>",result?.data?.data)
                   
                        //navigate('/dashboard/settings')
                  }else{
                    //console.log("Unable to update user Image")
                    toast.error(`${result?.data?.message}`,{duration:3000})
                  }
            
        } catch (error) {
            console.log("Error in  updateDisplayPicture =>",error);
            toast.error(error?.response?.data?.message || "An error occurred", { duration: 3000 });
        }finally{
            dispatch(setLoading(false));  // Reset loading state in Redux

            // Dismiss the loading toast if it's still active
            toast.dismiss(loadingToastId);
            
        }
    }

}

export const updateProfile=(data,token)=>{
    return async(dispatch)=>{
        const loadingToastId =  toast.loading("Updating profile...");
        try {
            dispatch(setLoading(true));
            const result = await apiConnector("PUT",profileEndPoints.UPDATE_USER_PROFILE_API,data,{
                "Content-Type":"multipart/form-data",
                Authorization:`Bearer ${token}`
            });

            console.log("Updated User profile =>",result);
            if(result?.data?.success){
                toast.success(`${result?.data?.message}`,{duration:3000})
                dispatch(setUser(result?.data?.data));
            }else{
                toast.error(`${result?.data?.message}`,{duration:3000})
            }
            
        } catch (error) {
            console.log("Error while updateing profile =>",error);
            toast.error(`${error?.data?.message}`,{duration:3000})
        }finally{
            dispatch(setLoading(false));  // Reset loading state in Redux

            // Dismiss the loading toast if it's still active
            toast.dismiss(loadingToastId);
        }
    }
}