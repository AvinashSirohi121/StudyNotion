
import toast from 'react-hot-toast'

export const updateDisplayPicture =()=>{

    return async(dispatch)=>{
        const loadingToastId = toast.loading("Uploading display Image...", { duration: 3000 });
        try {
            
        } catch (error) {
            console.log("Inside else of updateDisplayPicture")
            toast.error(error?.response?.data?.message || "An error occurred", { duration: 3000 });
        }
    }

}